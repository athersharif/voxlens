/**
 * @namespace index
 */

import defaults from 'defaults';
import p5 from 'p5';
import * as Tone from 'tone';
import hotkeys from 'hotkeys-js';
import uniqueId from 'lodash/uniqueId';
import sonifier, { resetSonifier } from 'sonifier';
import { processCommand } from './commands';
import libraries from './libraries';
import tools from './tools';
import {
  addVariationInformation,
  createTemporaryElement,
  computeMetadata,
  formatOptions,
  generateInstructions,
  getArrayFromObject,
  getDefaults,
  getKeyBinds,
  getModifier,
  getSettings,
  isCommandDuplicate,
  logKeyPresses,
  speakResponse,
  validate,
} from './utils';

import './index.css';

require('./dependencies/p5Speech');

let lastIssuedCommand = {
  command: null,
  time: null,
};

let oscillations = [];
let isListening = false;

const SETTINGS = getSettings();

/**
 * Initial voxlens start function that adds listeners for voice commands.
 * @memberOf index
 * @param {Object} data - The data from the viz.
 * @param {string[]} data.x - Values of the independent variable.
 * @param {string[]} data.y - Values of the dependent variable.
 * @param {Object} options - The options supplied to voxlens when creating the viz.
 * @param {string} options.xLabel - Label for the x-axis.
 * @param {number} options.yLabel - Label for the y-axis.
 * @param {string} hotKeysId - ID needed to identify a hotkey bind for the hotkeys library.
 */
const startApp = (data, options, hotKeysId) => {
  const listeningKeys = getModifier(SETTINGS, false, false);

  hotkeys.setScope(hotKeysId);

  const reset = (event) => {
    logKeyPresses(listeningKeys, event);
    event.preventDefault();
    resetSonifier(Tone, oscillations);
    oscillations = [];
    options.speaker?.stop();
  };

  hotkeys(
    getKeyBinds(listeningKeys, options.triggers.mainKey),
    hotKeysId,
    (event) => {
      const mic = new p5.SpeechRec();

      mic.onStart = () => (isListening = true);

      mic.onEnd = () => (isListening = false);

      mic.onResult = () => {
        reset(event);

        const voiceText = mic.resultString.toLowerCase();
        const result = processCommand(
          voiceText,
          data,
          options,
          true,
          lastIssuedCommand
        );

        if (result) {
          speakResponse(result.response, options);
          lastIssuedCommand = result.lastIssuedCommand;
        }
      };

      mic.onError = () => {
        reset(event);

        const error = 'Command not recognized. Please try again.';
        console.log('[VoxLens] ' + error);
        createTemporaryElement(error, options);
        speakResponse(error, options);
      };

      reset(event);

      mic.start();

      const beep = new Tone.OmniOscillator('C4', 'sawtooth').toDestination();
      beep.frequency.value = 300;
      beep.volume.value = -20;
      beep.onstop = () => beep.dispose();
      beep.sync().start().stop(0.5);

      oscillations.push(beep);

      Tone.Transport.start();
    }
  );

  hotkeys(
    getKeyBinds(listeningKeys, options.triggers.instructionsKey),
    hotKeysId,
    (event) => {
      if (isListening) return;

      reset(event);

      const result = processCommand(
        'instructions',
        data,
        options,
        false,
        lastIssuedCommand
      );

      if (result) {
        speakResponse(result.response, options);
        lastIssuedCommand = result.lastIssuedCommand;
      }
    }
  );

  hotkeys(
    getKeyBinds(listeningKeys, options.triggers.trendKey),
    hotKeysId,
    (event) => {
      if (
        isCommandDuplicate(lastIssuedCommand, [{ name: 'trend' }]) ||
        isListening
      )
        return;

      lastIssuedCommand = {
        command: 'trend',
        time: Date.now(),
      };

      reset(event);

      createTemporaryElement(SETTINGS.processingText, {
        ...options,
        stopElement: true,
      });

      oscillations.push(...sonifier(Tone, data));
    }
  );

  hotkeys(
    getKeyBinds(listeningKeys, options.triggers.summaryKey),
    hotKeysId,
    (event) => {
      if (isListening) return;

      reset(event);

      const result = processCommand(
        'summary',
        data,
        options,
        false,
        lastIssuedCommand
      );

      if (result) {
        speakResponse(result.response, options);
        lastIssuedCommand = result.lastIssuedCommand;
      }
    }
  );

  hotkeys(
    getKeyBinds(listeningKeys, options.triggers.pause),
    hotKeysId,
    (event) => {
      reset(event);

      createTemporaryElement(SETTINGS.processingText, {
        ...options,
        stopElement: true,
      });
    }
  );
};

/**
 * Initiates voxlens. Connector between specific viz libraries and voxlens
 * @memberOf index
 * @param {Object} viewportElement - Element that contains the viz.
 * @param {Object[]} data - The raw json data used to create the viz.
 * @param {Object} options - The original options supplied to voxlens before defaults are applied.
 */
const run = (viewportElement, data, options) => {
  options = formatOptions(defaults(options, getDefaults(options)));

  const { title, triggers, x, y } = options;
  const hotkeysId = uniqueId();

  const metadataKey = 'vx_metadata';
  const isMetaDataPresent = data.every(
    (d) => d[metadataKey] != null && d[metadataKey]['isAverage']
  );

  if (isMetaDataPresent) {
    data = data.map((d) => ({
      ...d,
      [metadataKey]: computeMetadata(d[metadataKey], d[y]),
    }));

    data = addVariationInformation(data);
  }

  data = {
    x: getArrayFromObject(data, x),
    y: getArrayFromObject(data, y),
    ...(isMetaDataPresent
      ? { metadata: getArrayFromObject(data, metadataKey) }
      : {}),
  };

  document.getElementsByName('voxlens-response')[0]?.remove();
  document.getElementsByName('voxlens-error-message')[0]?.remove();

  if (options.debug && options.debug?.responses?.onlyText !== true) {
    options = {
      ...options,
      speaker: new p5.Speech(),
    };
  }

  validate(data.y, options);

  options.element = viewportElement;

  generateInstructions(options.element, triggers, title, SETTINGS);
  startApp(data, options, hotkeysId);

  if (options.debug) {
    if (options.debug.instructions !== false) {
      tools.addDebugInstructions(options);
    }

    if (options.debug.contrastChecker !== false) {
      tools.checkColorContrast(options);
    }
  }

  if (options.feedbackCollector) {
    tools.feedbackCollector(options);
  }
};

/**
 * Main export for the voxlens library to identify the viz library and start app
 * @memberOf index
 * @param {string} library - Viz library that includes voxlens.
 * @param {Object} container - Element that contains the viz.
 * @param {Object} vizData - The raw json data used to create the viz.
 * @param {Object} options - The original options supplied to voxlens before defaults are applied.
 */
const voxlens = (library, container, vizData, options = {}) => {
  try {
    const setup = libraries[library];

    if (setup) {
      const { data, viewportElement } = setup(container, vizData);

      run(viewportElement, data, options);
    } else {
      throw new TypeError(
        'Library not supported. Supported libraries are: ' +
          Object.keys(libraries).join(', ') +
          '.'
      );
    }
  } catch (error) {
    const message = 'VoxLens error: ' + error.message;

    console.log(message);

    if (options.debug)
      createTemporaryElement(message, {
        ...options,
        element: document.body.firstChild,
        name: 'voxlens-error-message',
      });
  }
};

export default voxlens;

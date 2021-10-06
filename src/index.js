/**
 * @namespace index
 */

import defaults from 'defaults';
import p5 from 'p5';
import * as Tone from 'tone';
import 'p5.js-speech/lib/p5.speech';
import hotkeys from 'hotkeys-js';
import uniqueId from 'lodash/uniqueId';
import sonifier, { resetSonifier } from 'sonifier';
import { processCommand } from './commands';
import libraries from './libraries';
import {
  createTemporaryElement,
  formatOptions,
  generateInstructions,
  getArrayFromObject,
  getDefaults,
  getKeyBinds,
  getModifier,
  getSettings,
  isCommandDuplicate,
  logKeyPresses,
  validate,
} from './utils';

let lastIssuedCommand = {
  command: null,
  time: null,
};

let oscillations = [];

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

  hotkeys(
    getKeyBinds(listeningKeys, options.triggers.mainKey),
    hotKeysId,
    (event) => {
      logKeyPresses(listeningKeys, event);
      event.preventDefault();
      resetSonifier(Tone, oscillations);
      oscillations = [];

      const mic = new p5.SpeechRec();

      mic.onResult = () => {
        const voiceText = mic.resultString.toLowerCase();
        const result = processCommand(
          voiceText,
          data,
          options,
          lastIssuedCommand
        );
        if (result) lastIssuedCommand = result.lastIssuedCommand;
      };

      mic.onError = () => {
        const error = 'Command not recognized. Please try again.';
        console.log('[VoxLens] ' + error);
        createTemporaryElement(error);
      };

      mic.start();

      const beep = new Tone.OmniOscillator('C4', 'sawtooth').toDestination();
      beep.frequency.value = 300;
      beep.volume.value = -20;
      beep.onstop = () => beep.dispose();
      beep.sync().start(0).stop(0.5);

      oscillations.push(beep);

      Tone.Transport.start();
    }
  );

  hotkeys(
    getKeyBinds(listeningKeys, options.triggers.instructionsKey),
    hotKeysId,
    (event) => {
      logKeyPresses(listeningKeys, event);
      event.preventDefault();
      resetSonifier(Tone, oscillations);
      oscillations = [];
      const result = processCommand(
        'instructions',
        data,
        options,
        lastIssuedCommand
      );
      if (result) lastIssuedCommand = result.lastIssuedCommand;
    }
  );

  hotkeys(
    getKeyBinds(listeningKeys, options.triggers.trendKey),
    hotKeysId,
    (event) => {
      if (isCommandDuplicate(lastIssuedCommand, [{ name: 'trend' }])) return;

      lastIssuedCommand = {
        command: 'trend',
        time: Date.now(),
      };

      createTemporaryElement(SETTINGS.processingText);
      logKeyPresses(listeningKeys, event);
      event.preventDefault();
      resetSonifier(Tone, oscillations);
      oscillations = [];
      oscillations.push(...sonifier(Tone, data));
    }
  );

  hotkeys(
    getKeyBinds(listeningKeys, options.triggers.summaryKey),
    hotKeysId,
    (event) => {
      logKeyPresses(listeningKeys, event);
      event.preventDefault();
      resetSonifier(Tone, oscillations);
      oscillations = [];
      const result = processCommand(
        'summary',
        data,
        options,
        lastIssuedCommand
      );
      if (result) lastIssuedCommand = result.lastIssuedCommand;
    }
  );

  hotkeys(
    getKeyBinds(listeningKeys, options.triggers.pause),
    hotKeysId,
    (event) => {
      logKeyPresses(listeningKeys, event);
      event.preventDefault();
      resetSonifier(Tone, oscillations);
      oscillations = [];
      createTemporaryElement(SETTINGS.processingText);
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

  data = {
    x: getArrayFromObject(data, x),
    y: getArrayFromObject(data, y),
  };

  validate(data.y, options);
  generateInstructions(viewportElement, triggers, title, SETTINGS);
  startApp(data, options, hotkeysId);
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
};

export default voxlens;

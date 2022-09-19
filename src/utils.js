/**
 * @namespace utils
 */

import isNumber from 'lodash/isNumber';
import isEmpty from 'lodash/isEmpty';
import random from 'lodash/random';
import round from 'lodash/round';
import startCase from 'lodash/startCase';
import UAParser from 'ua-parser-js';
import wordsToNumbers from 'words-to-numbers';
import settings from './settings';

/**
 * Finds the operating system of the user.
 * @memberOf utils
 * @returns {Object} - The OS details from the UAParser library.
 */
const os = new UAParser().getOS();

/**
 * Generates a verbose human-friendly response prefixing user's query.
 * @memberOf utils
 * @returns {string} - Human-friendly verbose response.
 */
const getFeedbackText = () => {
  const feedbacks = [
    "I understand you're looking for",
    'It seems like you asked about the',
  ];
  const randomIndex = random(0, feedbacks.length - 1);

  return feedbacks[randomIndex];
};

/**
 * Finds the modifier using the settings. A modifier is the set of key bindings to trigger responses.
 * @memberOf utils
 * @param {Object} settings - Settings for VoxLens based on the OS.
 * @param {boolean} withSpaces - Determines if multiple modifiers should be combined using spaces instead of '+'.
 * @param {boolean} uppercase - Determines if return type should be uppercased
 * @param {string} joiningCharacter - The joining character for multiple modifiers. Defaults to '+'.
 * @returns {string} - Human-friendly verbose response.
 */
export const getModifier = (
  settings,
  withSpaces = true,
  uppercase = true,
  joiningCharacter = '+'
) => {
  if (withSpaces) {
    joiningCharacter = ' ' + joiningCharacter + ' ';
  }

  const modifier = settings.multipleModifiers
    ? settings.modifier.join(joiningCharacter)
    : settings.modifier;

  return uppercase ? modifier.toUpperCase() : modifier;
};

/**
 * Finds the defaults for VoxLens.
 * @memberOf utils
 * @param {Object} options - Options supplied to VoxLens during initiation.
 * @returns {Object} - The default settings and variables.
 */
export const getDefaults = (options = {}) => ({
  triggers: {
    mainKey: ['a', '1'],
    instructionsKey: ['i', '4'],
    trendKey: ['m', '3'],
    summaryKey: ['s', '2'],
    pause: ['p', '5'],
  },
  xLabel: options.x,
  yLabel: options.y,
});

/**
 * Maps the triggers to a human-readable format to be used in instructions.
 * @memberOf utils
 * @param {Object} triggers - Triggers for each VoxLens mode.
 * @param {string} modifier - The key binding for the trigger.
 * @returns {Object} - Triggers with their presentable values.
 */
const getMappedTriggers = (triggers, modifier) => {
  let mappedTriggers = {};

  Object.keys(triggers).forEach((k) => {
    mappedTriggers[k] = triggers[k]
      .map((t) => modifier + ' + ' + t.toUpperCase())
      .join(' or ');
  });

  return mappedTriggers;
};

/**
 * Generates the detailed instructions for VoxLens.
 * @memberOf utils
 * @param {Object} triggers - Triggers for each VoxLens mode.
 * @param {string} title - The title of the viz.
 * @param {Object} settings - Settings for VoxLens based on the OS.
 * @returns {string} - The instructions to interact with VoxLens.
 */
export const getInstructionsText = (triggers, title, settings) => {
  const modifier = getModifier(settings);
  const mappedTriggers = getMappedTriggers(triggers, modifier, settings);

  return `Graph with title: ${title}. To interact with the graph, press ${mappedTriggers.mainKey} all together and in order. You'll hear a beep sound, after which you can ask a question such as what is the average or what is the maximum value in the graph. To hear the textual summary of the graph, press ${mappedTriggers.summaryKey}. To hear the audio graph, press ${mappedTriggers.trendKey}. To repeat these instructions, press ${mappedTriggers.instructionsKey}. Key combinations must be pressed all together and in order.`;
};

/**
 * Generates the initial instructions for VoxLens.
 * @memberOf utils
 * @param {Object} viewportElement - Element that contains the viz.
 * @param {Object} triggers - Triggers for each VoxLens mode.
 * @param {string} title - The title of the viz.
 * @param {Object} settings - Settings for VoxLens based on the OS.
 * @returns {string} - The initial instructions for VoxLens.
 */
export const generateInstructions = (
  viewportElement,
  triggers,
  title,
  settings
) => {
  const modifier = getModifier(settings);
  const mappedTriggers = getMappedTriggers(triggers, modifier, settings);

  const label = `Graph with title: ${title}. To listen to instructions on how to interact with the graph, press ${mappedTriggers.instructionsKey}. Key combinations must be pressed all together and in order.`;

  viewportElement.setAttribute('aria-label', label);

  for (let vc of Array.from(viewportElement.children)) {
    vc.setAttribute('aria-hidden', true);
  }
};

/**
 * Creates a temporary element to relay response to screen readers.
 * @memberOf utils
 * @param {string} text - The response to relay to the screen reader.
 * @param {number} timeout - Time after which the element is automatically removed from the DOM tree.
 */
export const createTemporaryElement = (text, timeout = 1000) => {
  const div = document.createElement('div');

  div.style.position = 'absolute';
  div.style.left = '-10000px';
  div.style.top = 'auto';
  div.style.width = '1px';
  div.style.height = '1px';
  div.style.overflow = 'hidden';
  div.setAttribute('aria-live', 'assertive');

  if (!os.name.includes('Mac OS')) {
    div.setAttribute('role', 'alert');
  }

  document.body.appendChild(div);
  div.innerHTML = text;

  window.setTimeout(() => div.remove(), timeout);
};

/**
 * Converts an object into an array.
 * @memberOf utils
 * @param {Object[]} data - The raw json data used to create the viz.
 * @param {string} key - The key to extract values from.
 * @return {string[]} - An array of values from a given key.
 */
export const getArrayFromObject = (data, key) => data.map((d) => d[key]);

/**
 * Validates the data supplied to VoxLens and throws errors where necessary.
 * @memberOf utils
 * @param {Object[]} data - The raw json data used to create the viz.
 * @param {Object} options - The original options supplied to voxlens before defaults are applied.
 */
export const validate = (data, options) => {
  if (isEmpty(options.x)) {
    throw new TypeError('Independent variable not set.');
  } else if (isEmpty(options.y)) {
    throw new TypeError('Dependent variable not set.');
  } else if (isEmpty(data) || !data.every(isNumber)) {
    throw new TypeError(
      'Dependent variable values are missing or not numeric.'
    );
  } else if (isEmpty(options.title)) {
    throw new TypeError('Title not set.');
  }
};

/**
 * Adds thousands separators for large numbers.
 * @memberOf utils
 * @param {number} value - The value to add separators to.
 * @returns {string} - The value with thousands separators.
 */
export const addThousandsSeparators = (value) => {
  value = round(value, 2).toString();
  value = value.replace(',', '');
  value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return value;
};

/**
 * Formats the options, specifically the xLabel and yLabel.
 * @memberOf utils
 * @param {Object} options - The options supplied to voxlens when creating the viz.
 * @param {string} options.xLabel - Label for the x-axis.
 * @param {number} options.yLabel - Label for the y-axis.
 * @return {Object} - The formatted options.
 */
export const formatOptions = (options) => ({
  ...options,
  xLabel: startCase(options.xLabel),
  yLabel: startCase(options.yLabel),
});

/**
 * Finds settings based on the operating system.
 * @memberOf utils
 * @return {Object} - The settings based on the user's operating system.
 */
export const getSettings = () => {
  if (os.name.includes('Mac OS')) {
    return settings.MacOS;
  } else if (os.name.includes('Windows')) {
    return settings.Windows;
  } else {
    return settings.default;
  }
};

/**
 * Generates the final response by adding feedback and commands to it.
 * @memberOf utils
 * @param {string} response - The response from commands.
 * @param {string} commands - Commands issued by the user.
 * @return {string} - The response relayed to the user's screen reader.
 */
export const addFeedbackToResponse = (response, commands) => {
  commands = verbalise(commands);
  response = response.replace(/ +(?= )/g, '');

  return commands ? `${getFeedbackText()} ${commands}. ${response}` : response;
};

/**
 * Verbalises an array of values by joining each value and adding "and" before the last one.
 * @memberOf utils
 * @param {string[]} values - The array of values to be verbalised.
 * @return {string} - The verbalised response from the values.
 */
export const verbalise = (values) => {
  const total = values.length;

  if (values.length > 1) {
    values[total - 1] = `and ${values[total - 1]}`;
    values = values.join(', ');
  } else {
    values = values[0];
  }

  return values;
};

/**
 * Generates key bindings for a given set of combinations.
 * @memberOf utils
 * @param {string} listeningKeys - Listening keys supported by VoxLens.
 * @param {string[]} combinations - Different combinations to activate a given mode.
 * @return {string} - The key bindings for the "hotkeys" library.
 */
export const getKeyBinds = (listeningKeys, combinations) =>
  combinations.map((c) => listeningKeys + '+' + c).join(',');

/**
 * Logs key presses into the user's local storage.
 * @memberOf utils
 * @param {string} listeningKeys - Listening keys supported by VoxLens.
 * @param {Object} event - Keypress event object.
 */
export const logKeyPresses = (listeningKeys, event) => {
  const key = getKeyFromEvent(event);
  const combination = listeningKeys + '+' + key;

  console.log('[VoxLens] Key combination issued: ' + combination);

  let keyCombinationsPressed =
    window.localStorage.getItem('keyCombinationsPressed') || '[]';

  keyCombinationsPressed = JSON.parse(keyCombinationsPressed);
  keyCombinationsPressed.push({ combination, time: Date.now() });

  window.localStorage.setItem(
    'keyCombinationsPressed',
    JSON.stringify(keyCombinationsPressed)
  );
};

/**
 * Logs command issued into the user's local storage.
 * @memberOf utils
 * @param {string} command - Command issued using VoxLens.
 * @param {string} response - Response generated by VoxLens.
 */
export const logCommand = (command, response) => {
  if (command && command.trim() !== '')
    console.log('[VoxLens] Command issued: ' + command);

  let commandsIssued = window.localStorage.getItem('commandsIssued') || '[]';

  commandsIssued = JSON.parse(commandsIssued);
  commandsIssued.push({ command, response, time: Date.now() });

  window.localStorage.setItem('commandsIssued', JSON.stringify(commandsIssued));
};

/**
 * Converts the event code into the face value of the key.
 * @memberOf utils
 * @param {Object} event - Keypress event object.
 * @return {string} - The face value of the pressed key.
 */
export const getKeyFromEvent = (event) =>
  event.code.toLowerCase().replace('key', '').replace('digit', '');

/**
 * Checks to see if the command issued is duplicate.
 * @memberOf utils
 * @param {Object} lastIssuedCommand - Details about the last issued command.
 * @param {Object[]} activatedCommands - List of commands issued by the user.
 * @return {boolean} - True if the command is duplicate and false otherwise.
 */
export const isCommandDuplicate = (lastIssuedCommand, activatedCommands) => {
  const timeNow = Date.now();
  const isCommandSameAsLast =
    lastIssuedCommand.command &&
    activatedCommands.length === 1 &&
    lastIssuedCommand.command.includes(activatedCommands[0].name);

  if (isCommandSameAsLast) {
    const timeDifferenceFromLastCommand =
      timeNow - (lastIssuedCommand.time || 0);

    if (timeDifferenceFromLastCommand < 1000) return true;
  }

  return false;
};

/**
 * Sanitizes the voice input by removing stop words and converting words to numbers.
 * @memberOf utils
 * @param {Object} voiceText - Voice input from the user.
 * @return {string} - The sanitized voice input query.
 */
export const sanitizeVoiceText = (voiceText = '') => {
  voiceText = voiceText.replace(/(\d+)(st|nd|rd|th)/, '$1');
  voiceText = voiceText.replaceAll("'s", '');
  voiceText = voiceText
    .split(' ')
    .filter(
      (v) =>
        (Number.isInteger(parseInt(wordsToNumbers(v))) ||
          v.trim().length > 2) &&
        !stopWords.includes(v)
    )
    .join(' ')
    .trim();

  return voiceText;
};

/**
 * Set of stop words
 * @memberOf utils
 */
const stopWords = [
  'a',
  'able',
  'about',
  'across',
  'after',
  'all',
  'almost',
  'also',
  'am',
  'among',
  'an',
  'and',
  'any',
  'are',
  'as',
  'at',
  'be',
  'because',
  'been',
  'but',
  'by',
  'can',
  'cannot',
  'could',
  'dear',
  'did',
  'do',
  'does',
  'either',
  'else',
  'ever',
  'every',
  'for',
  'from',
  'get',
  'got',
  'had',
  'has',
  'have',
  'he',
  'her',
  'hers',
  'him',
  'his',
  'how',
  'however',
  'i',
  'if',
  'in',
  'into',
  'is',
  'it',
  'its',
  'just',
  'let',
  'like',
  'likely',
  'may',
  'me',
  'might',
  'must',
  'my',
  'neither',
  'no',
  'nor',
  'not',
  'of',
  'off',
  'often',
  'on',
  'only',
  'or',
  'other',
  'our',
  'own',
  'rather',
  'said',
  'say',
  'says',
  'she',
  'should',
  'since',
  'so',
  'some',
  'than',
  'that',
  'the',
  'their',
  'them',
  'then',
  'there',
  'these',
  'they',
  'this',
  'tis',
  'to',
  'too',
  'twas',
  'us',
  'wants',
  'was',
  'we',
  'were',
  'what',
  'when',
  'where',
  'which',
  'while',
  'who',
  'whom',
  'why',
  'will',
  'with',
  'would',
  'yet',
  'you',
  'your',
  "ain't",
  "aren't",
  "can't",
  "could've",
  "couldn't",
  "didn't",
  "doesn't",
  "don't",
  "hasn't",
  "he'd",
  "he'll",
  "he's",
  "how'd",
  "how'll",
  "how's",
  "i'd",
  "i'll",
  "i'm",
  "i've",
  "isn't",
  "it's",
  "might've",
  "mightn't",
  "must've",
  "mustn't",
  "shan't",
  "she'd",
  "she'll",
  "she's",
  "should've",
  "shouldn't",
  "that'll",
  "that's",
  "there's",
  "they'd",
  "they'll",
  "they're",
  "they've",
  "wasn't",
  "we'd",
  "we'll",
  "we're",
  "weren't",
  "what'd",
  "what's",
  "when'd",
  "when'll",
  "when's",
  "where'd",
  "where'll",
  "where's",
  "who'd",
  "who'll",
  "who's",
  "why'd",
  "why'll",
  "why's",
  "won't",
  "would've",
  "wouldn't",
  "you'd",
  "you'll",
  "you're",
  "you've",
];

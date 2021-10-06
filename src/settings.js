/**
 * @namespace settings
 */

/**
 * Default settings for voice input.
 * @memberOf settings
 */
const defaultSettings = {
  listeningText: ' ',
  processingText: ' ... ',
  multipleModifiers: false,
  modifier: 'option',
};

/**
 * Settings for voice input for each operating system.
 * @memberOf settings
 */
export default {
  MacOS: {
    ...defaultSettings,
    listeningText: 'graph listening...',
  },
  Windows: {
    ...defaultSettings,
    modifier: ['ctrl', 'shift'],
    multipleModifiers: true,
  },
  default: defaultSettings,
};

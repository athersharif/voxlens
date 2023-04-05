/**
 * @namespace commands.instructions
 */

import { getInstructionsText, getSettings } from '../utils';

/**
 * Generates the response for the "instructions" command.
 * @memberOf commands.instructions
 * @param {Object} data - The data from the viz.
 * @param {Object} options - The options supplied to voxlens when creating the viz.
 * @param {string} options.xLabel - Label for the x-axis.
 * @param {number} options.yLabel - Label for the y-axis.
 * @returns {object} - Response for the "instructions" command.
 */
export default (_, options) => ({
  sentence: getInstructionsText(options.triggers, options.title, getSettings()),
});

/**
 * @namespace commands.helpers
 */

import { verbalise } from '../utils';

/**
 * Finds the indices for all data points matching the value.
 * @memberOf commands.helpers
 * @param {string[]} data - The data supplied as array of strings.
 * @param {string} value - The value to find the index of.
 * @returns {number[]} - Array of indices for matching values.
 */
const getAllIndices = (data, value) => {
  let indices = [];
  data.forEach((d, i) => {
    if (d === value) {
      indices.push(i);
    }
  });

  return indices;
};

/**
 * Finds the calculation and the string response of the values.
 * @memberOf commands.helpers
 * @param {Object} data - The data from the viz.
 * @param {string[]} data.x - Values of the independent variable.
 * @param {string[]} data.y - Values of the dependent variable.
 * @param {function} func - The func to call for calculaiton.
 * @returns {string[]} - Response for the calculation and the string response of values.
 */
export const getIndependentValues = (data, func) => {
  const value = func(data.y);
  const indices = getAllIndices(data.y, value);
  let independentValues = data.x.filter((d, i) => indices.includes(i));

  independentValues = verbalise(independentValues);

  return [value, independentValues];
};

/**
 * Generates the response for the screen reader output.
 * @memberOf commands.helpers
 * @param {string} preText - The prefix for the sentence.
 * @param {string} postText - The suffix for the sentence.
 * @param {Object} options - The options supplied to voxlens when creating the viz.
 * @param {string} options.xLabel - Label for the x-axis.
 * @param {number} options.yLabel - Label for the y-axis.
 * @returns {string} - Response for the "average" command.
 */
export const generateSentence = (preText, postText, options) =>
  `${preText} of ${options.yLabel} for ${options.xLabel} is ${postText}.`;

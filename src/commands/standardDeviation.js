/**
 * @namespace commands.standardDeviation
 */

import stats from 'stats-lite';
import { generateSentence, generateXLabel } from './helpers';
import { addThousandsSeparators } from '../utils';

/**
 * Generates the response for the "standard deviation" command.
 * @memberOf commands.standardDeviation
 * @param {Object} data - The data from the viz.
 * @param {string[]} data.x - Values of the independent variable.
 * @param {string[]} data.y - Values of the dependent variable.
 * @param {Object} options - The options supplied to voxlens when creating the viz.
 * @param {string} options.xLabel - Label for the x-axis.
 * @param {number} options.yLabel - Label for the y-axis.
 * @returns {object} - Response for the "standard deviation" command.
 */
export default (data, options) => {
  const value = stats.stdev(data.y);
  const key = generateXLabel(options);

  return {
    key,
    value,
    sentence: generateSentence(
      'Standard Deviation',
      addThousandsSeparators(value),
      options
    ),
  };
};

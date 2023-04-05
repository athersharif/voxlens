/**
 * @namespace commands.total
 */

import stats from 'stats-lite';
import { generateSentence, generateXLabel } from './helpers';
import { addThousandsSeparators } from '../utils';

/**
 * Generates the response for the "total" command.
 * @memberOf commands.total
 * @param {Object} data - The data from the viz.
 * @param {string[]} data.x - Values of the independent variable.
 * @param {string[]} data.y - Values of the dependent variable.
 * @param {Object} options - The options supplied to voxlens when creating the viz.
 * @param {string} options.xLabel - Label for the x-axis.
 * @param {number} options.yLabel - Label for the y-axis.
 * @returns {object} - Response for the "total" command.
 */
export default (data, options) => {
  const value = stats.sum(data.y);
  const key = generateXLabel(options);

  return {
    key,
    value,
    sentence: generateSentence('Total', addThousandsSeparators(value), options),
  };
};

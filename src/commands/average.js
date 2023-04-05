/**
 * @namespace commands.average
 */

import stats from 'stats-lite';
import { generateSentence, generateXLabel } from './helpers';
import { addThousandsSeparators } from '../utils';

/**
 * Generates the response for the "average" command.
 * @memberOf commands.average
 * @param {Object} data - The data from the viz.
 * @param {string[]} data.x - Values of the independent variable.
 * @param {string[]} data.y - Values of the dependent variable.
 * @param {Object} options - The options supplied to voxlens when creating the viz.
 * @param {string} options.xLabel - Label for the x-axis.
 * @param {number} options.yLabel - Label for the y-axis.
 * @returns {object} - Response for the "average" command.
 */
export default (data, options) => {
  const value = stats.mean(data.y);
  const key = generateXLabel(options);

  return {
    key,
    value,
    sentence: generateSentence(
      'Average',
      addThousandsSeparators(value),
      options
    ),
  };
};

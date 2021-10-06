/**
 * @namespace commands.median
 */

import stats from 'stats-lite';
import { generateSentence } from './helpers';
import { addThousandsSeparators } from '../utils';

/**
 * Generates the response for the "median" command.
 * @memberOf commands.median
 * @param {Object} data - The data from the viz.
 * @param {string[]} data.x - Values of the independent variable.
 * @param {string[]} data.y - Values of the dependent variable.
 * @param {Object} options - The options supplied to voxlens when creating the viz.
 * @param {string} options.xLabel - Label for the x-axis.
 * @param {number} options.yLabel - Label for the y-axis.
 * @returns {string} - Response for the "median" command.
 */
const resolver = (data, options) =>
  generateSentence(
    'Median',
    addThousandsSeparators(stats.median(data.y)),
    options
  );

export default resolver;

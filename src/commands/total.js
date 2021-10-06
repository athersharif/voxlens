/**
 * @namespace commands.total
 */

import stats from 'stats-lite';
import { generateSentence } from './helpers';
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
 * @returns {string} - Response for the "total" command.
 */
const resolver = (data, options) =>
  generateSentence('Sum', addThousandsSeparators(stats.sum(data.y)), options);

export default resolver;

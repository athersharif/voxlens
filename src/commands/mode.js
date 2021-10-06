/**
 * @namespace commands.mode
 */

import stats from 'stats-lite';
import isSet from 'lodash/isSet';
import { generateSentence } from './helpers';
import { verbalise } from '../utils';

/**
 * Generates the response for the "mode" command.
 * @memberOf commands.mode
 * @param {Object} data - The data from the viz.
 * @param {string[]} data.x - Values of the independent variable.
 * @param {string[]} data.y - Values of the dependent variable.
 * @param {Object} options - The options supplied to voxlens when creating the viz.
 * @param {string} options.xLabel - Label for the x-axis.
 * @param {number} options.yLabel - Label for the y-axis.
 * @returns {string} - Response for the "mode" command.
 */
const resolver = (data, options) => {
  let mode = stats.mode(data.y);

  if (Array.isArray(mode)) {
    return 'There is no mode. No value appears more than any other.';
  }

  if (isSet(mode)) {
    mode = Array.from(mode);
  } else {
    mode = [mode];
  }

  return generateSentence('Mode', verbalise(mode), options);
};

export default resolver;

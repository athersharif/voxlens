/**
 * @namespace commands.range
 */

import max from 'lodash/max';
import min from 'lodash/min';

/**
 * Generates the response for the "range" command.
 * @memberOf commands.range
 * @param {Object} data - The data from the viz.
 * @param {string[]} data.y - Values of the dependent variable.
 * @param {Object} options - The options supplied to voxlens when creating the viz.
 * @param {string} options.key - key for the y-axis.
 * @returns {object} - Response for the "range" command.
 */
export default (data, options) => {
  const minValue = min(data.y);
  const maxValue = max(data.y);

  return {
    sentence:
      options.yLabel + ' ranges from ' + minValue + ' to ' + maxValue + '.',
  };
};

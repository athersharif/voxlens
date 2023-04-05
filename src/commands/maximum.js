/**
 * @namespace commands.maximum
 */

import max from 'lodash/max';
import { generateSentence, getIndependentValues } from './helpers';
import { addThousandsSeparators } from '../utils';

/**
 * Generates the response for the "maximum" command.
 * @memberOf commands.maximum
 * @param {Object} data - The data from the viz.
 * @param {string[]} data.x - Values of the independent variable.
 * @param {string[]} data.y - Values of the dependent variable.
 * @param {Object} options - The options supplied to voxlens when creating the viz.
 * @param {string} options.xLabel - Label for the x-axis.
 * @param {number} options.yLabel - Label for the y-axis.
 * @returns {object} - Response for the "maximum" command.
 */
export default (data, options) => {
  const values = getIndependentValues(data, max);

  return {
    key: values[1],
    value: values[0],
    sentence: generateSentence(
      'Maximum',
      `${addThousandsSeparators(values[0])} belonging to ${values[1]}`,
      options
    ),
  };
};

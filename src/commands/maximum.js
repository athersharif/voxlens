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
 * @returns {string} - Response for the "maximum" command.
 */
const resolver = (data, options) => {
  const [maxValue, independentValues] = getIndependentValues(
    data,
    max,
    options
  );

  return {
    key: independentValues,
    value: maxValue,
    sentence: generateSentence(
      'Maximum',
      `${addThousandsSeparators(maxValue)} belonging to ${independentValues}`,
      options
    ),
  };
};

export default resolver;

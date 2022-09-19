/**
 * @namespace commands.value
 */

import round from 'lodash/round';
import { addThousandsSeparators } from '../utils';

/**
 * Finds the individual data point and generates the response for the "value" command.
 * @memberOf commands.value
 * @param {Object} data - The data from the viz.
 * @param {string[]} data.x - Values of the independent variable.
 * @param {string[]} data.y - Values of the dependent variable.
 * @param {Object} options - The options supplied to voxlens when creating the viz.
 * @param {string} voiceText - Voice input from the microphone.
 * @returns {string} - Response for the "value" command.
 */
const resolver = (data, options) => {
  const key = data.x[0];
  const value = data.y[0];

  return {
    key,
    value,
    sentence: `${options.yLabel} for ${key} is ${addThousandsSeparators(
      round(value, 2)
    )}.`,
  };
};

export default resolver;

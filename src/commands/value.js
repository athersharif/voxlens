/**
 * @namespace commands.value
 */

import pluralize from 'pluralize';
import round from 'lodash/round';
import { addThousandsSeparators } from '../utils';

/**
 * Finds the individual data point and generates the response for the "value" command.
 * @memberOf commands.value
 * @param {Object} data - The data from the viz.
 * @param {string[]} data.x - Values of the independent variable.
 * @param {string[]} data.y - Values of the dependent variable.
 * @param {Object} options - The options supplied to voxlens when creating the viz.
 * @param {string} options.yLabel - The label for the y-axis
 * @returns {object} - Response for the "value" command.
 */
export default (data, options) => {
  const key = data.x[0];
  const value = data.y[0];

  let min, max, isAverage, isCVHigh, percentileThreshold;

  if (data.metadata) {
    min = data.metadata[0].min;
    max = data.metadata[0].max;
    isAverage = data.metadata[0].isAverage;
    isCVHigh = data.metadata[0].isCVHigh;
    percentileThreshold = data.metadata[0].percentileThreshold;
  }

  let sentence = `${isAverage === true ? 'Average ' : ''}${
    options.yLabel
  } for ${key} is ${addThousandsSeparators(round(value, 2))}.`;

  if (min != null)
    sentence += ` The minimum ${options.y} for ${key} was ${min}.`;
  if (max != null)
    sentence += ` The maximum ${options.y} for ${key} was ${max}.`;
  if (isCVHigh === true)
    sentence += ` Use the data with caution. Data has higher variation than ${percentileThreshold} percent of other ${pluralize(
      options.x
    )} and may not be reliable.`;
  if (isCVHigh === false)
    sentence += ` Data has lower variation than ${percentileThreshold} percent of other ${pluralize(
      options.x
    )} and may be reliable.`;

  return { key, value, sentence };
};

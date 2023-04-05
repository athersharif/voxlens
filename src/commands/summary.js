/**
 * @namespace commands.summary
 */

import stats from 'stats-lite';
import max from 'lodash/max';
import min from 'lodash/min';
import { getIndependentValues } from './helpers';
import { addThousandsSeparators } from '../utils';

/**
 * Generates the response for the "summary" command.
 * @memberOf commands.summary
 * @param {Object} data - The data from the viz.
 * @param {string[]} data.x - Values of the independent variable.
 * @param {string[]} data.y - Values of the dependent variable.
 * @param {Object} options - The options supplied to voxlens when creating the viz.
 * @param {string} options.xLabel - Label for the x-axis.
 * @param {number} options.yLabel - Label for the y-axis.
 * @returns {object} - Response for the "summary" command.
 */
export default (data, options) => {
  const maxValues = getIndependentValues(data, max);
  const minValues = getIndependentValues(data, min);

  const maximum = addThousandsSeparators(maxValues[0]);
  const minimum = addThousandsSeparators(minValues[0]);
  const average = addThousandsSeparators(stats.mean(data.y));

  return {
    sentence: `Graph with title: ${options.title}. The X-axis is ${options.xLabel}. The Y-axis is ${options.yLabel}. The maximum data point is ${maximum} belonging to ${maxValues[1]}, and the minimum data point is ${minimum} belonging to ${minValues[1]}. The average is ${average}.`,
  };
};

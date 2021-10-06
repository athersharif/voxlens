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
 * @returns {string} - Response for the "summary" command.
 */
const resolver = (data, options) => {
  const [maxValue, maxIndependentValues] = getIndependentValues(data, max);
  const [minValue, minIndependentValues] = getIndependentValues(data, min);

  const maximum = addThousandsSeparators(maxValue);
  const minimum = addThousandsSeparators(minValue);
  const average = addThousandsSeparators(stats.mean(data.y));

  return `Graph with title: ${options.title}. The X-axis is ${options.xLabel}. The Y-axis is ${options.yLabel}. The maximum data point is ${maximum} belonging to ${maxIndependentValues}, and the minimum data point is ${minimum} belonging to ${minIndependentValues}. The average is ${average}.`;
};

export default resolver;

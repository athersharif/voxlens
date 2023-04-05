/**
 * @namespace commands.factor
 */

import uniq from 'lodash/uniq';
import pluralize from 'pluralize';

/**
 * Generates the response for the "factor" command.
 * @memberOf commands.factor
 * @param {Object} data - The data from the viz.
 * @param {string[]} data.x - Values of the independent variable.
 * @param {Object} options - The options supplied to voxlens when creating the viz.
 * @param {string} options.key - key for the x-axis.
 * @param {boolean} options.listAll - flag to list all values.
 * @returns {object} - Response for the "factor" command.
 */
export default (data, options) => {
  const formattedData = Array.isArray(data.x[0]) ? data.x : [data.x];

  let xs = Array.isArray(options.x) ? options.x : [options.x];
  let sentence = '';

  xs.forEach((x, i) => {
    if (!options.key || (options.key && x === options.key)) {
      const values = uniq(formattedData[i]);
      sentence += 'Data is from ' + values.length + ' ' + pluralize(x);

      if (options.listAll) {
        sentence += ': ' + values.join(', ');
      } else {
        sentence +=
          '. Say tell me factor levels for ' +
          x +
          ' to hear all ' +
          pluralize(x);
      }

      sentence += '. ';
    }
  });

  if (sentence === '') return null;

  return { sentence: sentence.trim() };
};

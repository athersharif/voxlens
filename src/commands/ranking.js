/**
 * @namespace commands.ranking
 */

import orderBy from 'lodash/orderBy';
import pluralize from 'pluralize';

/**
 * Generates the response for the "ranking" command.
 * @memberOf commands.ranking
 * @param {Object} data - The data from the viz.
 * @param {string[]} data.x - Values of the independent variable.
 * @param {string[]} data.y - Values of the dependent variable.
 * @param {Object} options - The options supplied to voxlens when creating the viz.
 * @param {number} options.rankingCount - Number of elements to rank.
 * @param {string} options.rankingType - Type of ranking.
 * @param {string} options.xLabel - Label for the x-axis.
 * @returns {string} - Response for the "ranking" command.
 */
const resolver = (data, options) => {
  const xs = Array.isArray(data.x[0]) ? [data.x[0]] : [data.x];
  let sentence = '';
  let rankedData = orderBy(
    data.y.map((value, index) => ({
      index,
      keys: xs.map((x) => x[index].toString().toLowerCase()),
      value,
    })),
    ['value'],
    ['desc']
  );
  let dataToSlice = [];

  dataToSlice.push({
    key: null,
    label: pluralize(options.xLabel),
    data: rankedData,
  });

  const rankingCount = options.rankingCount || data.y.length;
  const rankingType = options.rankingType || 'top';

  dataToSlice.forEach((d) => {
    const data =
      rankingType === 'bottom'
        ? d.data.slice(-rankingCount).reverse()
        : d.data.slice(0, rankingCount);

    sentence += `The ${rankingType} ${rankingCount} ${d.label} are: ${data
      .map((s) => s.keys.join(' '))
      .join(', ')}. `;
  });

  return {
    sentence: sentence.trim(),
  };
};

export default resolver;

/**
 * @namespace commands.value
 */

import wordsToNumbers from 'words-to-numbers';
import uniq from 'lodash/uniq';
import { addThousandsSeparators, sanitizeVoiceText } from '../utils';

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
const resolver = (data, _, voiceText = '') => {
  voiceText = sanitizeVoiceText(voiceText);

  let response =
    "Could not find the data you're looking for. Please try again.";

  const matchingDataPointIndices = uniq(
    getPossibleDataPointIndices(data, voiceText)
  );

  if (matchingDataPointIndices.length > 0)
    response = 'Found the following possible matches in the data.';

  matchingDataPointIndices.forEach((i) => {
    const key = data.x[i];
    const value = data.y[i];

    response += ` The value for ${key} is ${addThousandsSeparators(value)}.`;
  });

  return response;
};

/**
 * Finds the indices for matching key values in the data.
 * @memberOf commands.value
 * @param {Object} data - The data from the viz.
 * @param {string[]} data.x - Values of the independent variable.
 * @param {string[]} data.y - Values of the dependent variable.
 * @param {string} voiceText - Voice input from the microphone.
 * @returns {string} - Indices for the matching data points.
 */
const getPossibleDataPointIndices = (data, voiceText) => {
  voiceText = sanitizeVoiceText(voiceText);

  if (!voiceText || voiceText.replaceAll(' ', '') === '')
    return { indices: [] };

  const xFilter = (arr, text) =>
    uniq(
      arr.filter((x) =>
        Number.isNaN(parseInt(x)) && Number.isNaN(parseInt(text))
          ? x.toString().toLowerCase().includes(text)
          : x.toString().toLowerCase() === text
      )
    );

  let filteredData = [];
  voiceText = voiceText
    .split(' ')
    .map((text) => wordsToNumbers(text.toString().toLowerCase()));

  voiceText.forEach((text) => {
    filteredData = [...filteredData, ...xFilter(data.x, text)];
  });

  let indices = [];

  filteredData.forEach((d) => {
    indices = [
      ...indices,
      ...data.x
        .map((d, i) => ({ d, i }))
        .filter((x) => x.d === d)
        .map((x) => x.i),
    ];
  });

  return indices;
};

export default resolver;

/**
 * @namespace commands.value
 */

import wordsToNumbers from 'words-to-numbers';
import uniq from 'lodash/uniq';
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
const resolver = (data, _, voiceText) => {
  voiceText = voiceText ? voiceText.replace(/(\d+)(st|nd|rd|th)/, '$1') : '';

  let possibleDataPoints = [];
  let response =
    "Could not find the data you're looking for. Please try again.";

  if (voiceText.length > 0) {
    voiceText
      .split(' ')
      .map((text) => ({
        text,
        matches: data.x.filter((d) => {
          d = d.toString().toLowerCase();
          text = wordsToNumbers(text.toString().toLowerCase());

          return d.includes(text);
        }),
      }))
      .filter((c) => c.matches.length > 0)
      .forEach((c) => {
        possibleDataPoints = uniq([...possibleDataPoints, ...c.matches]);
      });

    if (possibleDataPoints.length > 0)
      response = 'Found the following possible matches in the data.';

    possibleDataPoints.forEach((p) => {
      const index = data.x.findIndex((d) => d === p);
      const value = data.y[index];

      response += ` The value for ${p} is ${addThousandsSeparators(value)}.`;
    });
  }

  return response;
};

export default resolver;

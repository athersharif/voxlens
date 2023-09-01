/**
 * @namespace commands
 */

import capitalize from 'lodash/capitalize';
import intersection from 'lodash/intersection';
import orderBy from 'lodash/orderBy';
import uniq from 'lodash/uniq';
import uniqBy from 'lodash/uniqBy';
import pluralize from 'pluralize';
import wordsToNumbers from 'words-to-numbers';
import dataModules from '../modules';
import {
  addFeedbackToResponse,
  createTemporaryElement,
  isCommandDuplicate,
  logCommand,
  sanitizeVoiceText,
} from '../utils';

const nonVACommands = [];

const getComparisonText = (values, options) => {
  values = values.map((v) => {
    let text = v.key;

    if (v.command === 'average') text += ' average';

    return {
      ...v,
      text,
    };
  });

  const orderedValues = orderBy(values, ['value'], ['desc']);
  const highest = orderedValues.shift();
  const lowest = orderedValues.pop();

  const preText = `${options.yLabel} for ${highest.text} is `;

  if (values.length === 2) {
    return preText + 'greater than ' + lowest.text + '.';
  }

  return (
    preText +
    'the highest, followed by ' +
    orderedValues.map((v) => v.text).join(', ') +
    ', and ' +
    lowest.text +
    '.'
  );
};

const getMatchingRanking = (voiceText, datapoints, factors, data) => {
  voiceText = sanitizeVoiceText(voiceText);
  const words = voiceText.split(' ');
  const size = data.x.length;
  let matches = [];
  let types = [
    { type: 'top', keywords: ['top', 'first'] },
    { type: 'bottom', keywords: ['bottom', 'last'] },
  ];

  types.forEach((type) => {
    const index = words.findIndex((w) =>
      type.keywords.find((t) => t === w || t === wordsToNumbers(w))
    );

    if (index >= 0 && words.length > index + 1) {
      const rankingCount = parseInt(wordsToNumbers(words[index + 1]));

      if (
        !Number.isNaN(parseInt(rankingCount)) &&
        rankingCount > 0 &&
        rankingCount <= size
      ) {
        matches.push({
          command: 'ranking',
          opts: {
            datapoints,
            factors,
            rankingType: type.type,
            rankingCount,
          },
        });
      }
    }
  });

  return matches;
};

const getPossibleDataPoints = (data, voiceText, chartType) => {
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

  if (chartType === 'multiseries') {
    voiceText.forEach((text) => {
      data.x.forEach((arr, i) => {
        filteredData[i] = [...(filteredData[i] || []), ...xFilter(arr, text)];
      });
    });

    let indices = [[], []];
    let extraOptions = {};

    filteredData[0].forEach((d) => {
      indices[0] = [
        ...indices[0],
        ...data.x[0]
          .map((d, i) => ({ d, i }))
          .filter((x) => x.d === d)
          .map((x) => x.i),
      ];
    });

    filteredData[1].forEach((d) => {
      indices[1] = [
        ...indices[1],
        ...data.x[1]
          .map((d, i) => ({ d, i }))
          .filter((x) => x.d === d)
          .map((x) => x.i),
      ];
    });

    let finalIndices = intersection(indices[0], indices[1]);

    if (filteredData[0].length > 0 && filteredData[1].length === 0) {
      extraOptions = {
        combine: true,
        combineIndex: 0,
        combineCommand: 'average',
      };
      finalIndices = indices[0];
    }

    if (filteredData[1].length > 0 && filteredData[0].length === 0) {
      extraOptions = {
        combine: true,
        combineIndex: 1,
        combineCommand: 'average',
      };
      finalIndices = indices[1];
    }

    return {
      extraOptions,
      indices: finalIndices,
    };
  } else {
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

    return { indices };
  }
};

const getMatchingDataPoints = (data, voiceText, options, activatedCommands) => {
  const getKey = (k) =>
    options.chartType === 'multiseries'
      ? data.x[1][k] + ' ' + data.x[0][k]
      : data.x[k];
  let { extraOptions = {}, indices } = getPossibleDataPoints(
    data,
    voiceText,
    options.chartType
  );

  indices = uniq(indices);

  if (extraOptions.combine) {
    let possibleCommands = [];
    let datapoints = [];

    if (activatedCommands && activatedCommands.length > 0) {
      activatedCommands.forEach((ac) => {
        possibleCommands.push(ac.name);
      });
    }

    if (possibleCommands.length === 0) possibleCommands.push('average');

    const series = uniq(
      indices.map((i) => data.x[extraOptions.combineIndex][i])
    );

    const combinedOn = options.x.filter(
      (x, i) => i !== extraOptions.combineIndex
    )[0];

    series.forEach((key) => {
      const keyIndices = indices.filter(
        (i) => data.x[extraOptions.combineIndex][i] === key
      );
      const keys = keyIndices.map((i) => data.x[extraOptions.combineIndex][i]);
      const values = data.y.filter((y, i) => keyIndices.includes(i));

      let allFilteredData = {
        x: [
          data.x[0].filter((x, i) => keyIndices.includes(i)),
          data.x[1].filter((x, i) => keyIndices.includes(i)),
        ],
        y: values,
      };

      possibleCommands.forEach((command) => {
        if (options.chartType === 'multiseries' && command === 'value')
          command = 'average';

        datapoints.push({
          type: 'all',
          key,
          command,
          data: {
            x: keys,
            y: values,
          },
          opts: {
            allFilteredData,
            combinedOn,
          },
        });
      });
    });

    return datapoints;
  } else {
    return indices.map((i) => {
      const key = getKey(i);

      return {
        type: 'datapoint',
        key,
        command: 'value',
        data: {
          x: [key],
          y: [data.y[i]],
          ...(data.metadata && { metadata: [data.metadata[i]] }),
        },
      };
    });
  }
};

const getMatchingFactors = (options, voiceText) => {
  voiceText = sanitizeVoiceText(voiceText);

  if (!voiceText || voiceText.replaceAll(' ', '') === '') return null;

  const xs = Array.isArray(options.x) ? options.x : [options.x];

  const matches = xs.filter((x) => {
    const words = voiceText.split(' ');

    return (
      words.some(
        (v) =>
          v.toLowerCase() === x.toLowerCase() ||
          v.toLowerCase() === pluralize(x.toLowerCase())
      ) ||
      (words.includes('data') &&
        (words.includes('point') || words.includes('points')))
    );
  });

  return {
    factors: matches.length > 0 ? matches : [],
    opts: {
      listAll:
        voiceText.split(' ').includes('levels') ||
        voiceText.split(' ').includes('level'),
    },
  };
};
/**
 * Processes the command.
 * @memberOf commands
 * @param {string} voiceText - Voice input from the microphone.
 * @param {Object} data - The data from the viz.
 * @param {string[]} data.x - Values of the independent variable.
 * @param {string[]} data.y - Values of the dependent variable.
 * @param {Object} options - The options supplied to voxlens when creating the viz.
 * @param {string} options.xLabel - Label for the x-axis.
 * @param {number} options.yLabel - Label for the y-axis.
 * @param {boolean} isVoiceCommand - Flag to determine if command should produce a verbal response.
 * @param {Object} lastIssuedCommand - The last issued command by the user.
 * @returns {string} - Response for the "instructions" command.
 */
export const processCommand = (
  voiceText,
  data,
  options,
  isVoiceCommand = false,
  lastIssuedCommand
) => {
  const { chartType, dataModule } = options;
  let allData = [];
  let regions = [];

  const mod = dataModule ? dataModules[dataModule] : null;

  const factors = getMatchingFactors(options, voiceText);

  if (factors && factors.factors && factors.factors.length > 0) {
    factors.factors.forEach((factor) => {
      allData.push({
        type: 'metadata',
        key: factor,
        data,
        command: 'factor',
        opts: factors.opts,
      });
    });
  }

  const activatedCommands = uniqBy(
    commands
      .filter((c) => {
        let voiceCommandCheck = true;

        if (isVoiceCommand) {
          voiceCommandCheck = !(
            nonVACommands.includes(c.name) || nonVACommands.includes(c.alias)
          );
        }

        return voiceText && voiceText.includes(c.name) && voiceCommandCheck;
      })
      .map((ac) => (ac.alias ? commands.find((c) => c.name === ac.alias) : ac)),
    (ac) => ac.name
  );

  activatedCommands.forEach((ac) => {
    if (ac.kind && ac.kind === 'stats') {
      allData.push({
        type: 'all',
        key: null,
        data,
        command: ac.name,
      });
    }
  });

  if (chartType === 'map' && mod) {
    const moduleHelper = require('../modules/helpers/' + mod.category);
    regions = moduleHelper.getMatchingRegions(voiceText, dataModule);

    if (regions.length > 0) {
      regions.forEach((r) => {
        const filteredData = moduleHelper.filterDataByRegion(data, r, mod);

        if (filteredData.x.length > 0) {
          if (activatedCommands.length > 0) {
            activatedCommands.forEach((ac) => {
              allData.push({
                type: 'region',
                key: capitalize(r.name) + ' region',
                data: filteredData,
                command: ac.kind === 'stats' ? ac.name : 'average',
              });
            });
          } else {
            allData.push({
              type: 'region',
              key: capitalize(r.name) + ' region',
              data: filteredData,
              command: 'average',
            });
          }
        }
      });
    }
  }

  const dataPoints = getMatchingDataPoints(
    data,
    voiceText,
    options,
    activatedCommands
  );

  if (dataPoints && dataPoints.length > 0) {
    dataPoints.forEach((d) => {
      allData.push(d);
    });
  }

  const rankings = getMatchingRanking(voiceText, dataPoints, factors, data);

  rankings.forEach((ranking) => {
    allData.push({
      type: 'metadata',
      key: null,
      data,
      command: ranking.command,
      opts: ranking.opts,
    });
  });

  if (allData.length === 0) {
    allData = [{ key: null, type: 'all', data }];
  }

  if (
    lastIssuedCommand &&
    isCommandDuplicate(lastIssuedCommand, activatedCommands)
  )
    return;

  lastIssuedCommand = {
    command: activatedCommands.map((a) => a.name).join(','),
    time: Date.now(),
  };

  let response = 'Found the following possible results in the data. ';
  let commandsStaged = [];
  let dataValues = [];

  allData.forEach(({ command, data, key, type, opts = {} }) => {
    let acs = activatedCommands;

    if (
      type === 'datapoint' ||
      type === 'metadata' ||
      (type === 'all' && command)
    ) {
      acs = [commands.find((c) => c.name === command)];
    } else if (acs.length === 0 && type !== 'all') {
      acs = [commands.find((c) => c.name === 'value')];
    }

    acs.forEach((ac) => {
      if (type === 'region' && ac.name === 'value') {
        ac = commands.find((c) => c.name === 'average');
      }

      let { kind, name, func } = ac;

      if (
        (command && name !== command) ||
        (type === 'all' && key == null && name === 'value')
      )
        return;

      const functionResponse = func(
        data,
        { ...options, ...opts, key, type },
        voiceText
      );

      dataValues.push({
        command: name,
        kind,
        type,
        key: functionResponse.key,
        value: functionResponse.value,
      });
      response += functionResponse.sentence + ' ';

      logCommand(name, response);
      commandsStaged.push(name);
    });
  });

  if (dataValues.length === 0) {
    response = 'Unable to get data. Please try again.';

    if (voiceText && voiceText.trim() !== '')
      response = `I heard you say ${voiceText.trim()}. ` + response;

    logCommand(voiceText, response);
  }

  response = addFeedbackToResponse(response, uniq(commandsStaged));
  dataValues = dataValues.filter(
    (d) =>
      (d.type === 'region' && d.command === 'average') ||
      (d.type !== 'region' && (d.kind === 'stats' || d.command === 'value'))
  );

  if (dataValues.length > 1) {
    response = response.trim() + ' ' + getComparisonText(dataValues, options);
  }

  // eslint-disable-next-line no-console
  console.log('Response is ', response);

  createTemporaryElement(response);

  return { lastIssuedCommand };
};

/**
 * List of all the supported commands.
 * @memberOf commands
 */
export const commands = [
  { name: 'average', func: require('./average').default, kind: 'stats' },
  { name: 'mean', alias: 'average' },
  { name: 'median', func: require('./median').default, kind: 'stats' },
  { name: 'mode', func: require('./mode').default, kind: 'stats' },
  { name: 'maximum', func: require('./maximum').default, kind: 'stats' },
  { name: 'highest', alias: 'maximum' },
  { name: 'minimum', func: require('./minimum').default, kind: 'stats' },
  { name: 'lowest', alias: 'minimum' },
  { name: 'variance', func: require('./variance').default, kind: 'stats' },
  {
    name: 'standard deviation',
    func: require('./standardDeviation').default,
    kind: 'stats',
  },
  { name: 'total', func: require('./total').default, kind: 'stats' },
  { name: 'instructions', func: require('./instructions').default },
  { name: 'directions', alias: 'instructions' },
  { name: 'help', alias: 'instructions' },
  { name: 'summary', func: require('./summary').default },
  { name: 'value', func: require('./value').default },
  { name: 'data', alias: 'value' },
  { name: 'range', func: require('./range').default },
  { name: 'factor', func: require('./factor').default },
  { name: 'ranking', func: require('./ranking').default },
  { name: 'commands', func: require('./commands').default },
];

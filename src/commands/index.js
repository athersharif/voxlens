/**
 * @namespace commands
 */

import {
  addFeedbackToResponse,
  createTemporaryElement,
  isCommandDuplicate,
  logCommand,
} from '../utils';

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
 * @returns {string} - Response for the "instructions" command.
 */
export const processCommand = (voiceText, data, options, lastIssuedCommand) => {
  const activatedCommands = commands.filter((c) => voiceText.includes(c.name));

  if (isCommandDuplicate(lastIssuedCommand, activatedCommands)) return;

  lastIssuedCommand = {
    command: activatedCommands.map((a) => a.name).join(','),
    time: Date.now(),
  };

  let response = '';

  if (activatedCommands.length > 0) {
    let commandsStaged = [];

    activatedCommands.forEach((ac) => {
      let { name, func, alias } = ac;

      if (alias) {
        const command = commands.filter((a) => a.name === alias)[0];
        func = command.func;
        name = command.name;
      }

      if (!commandsStaged.includes(name)) {
        const functionResponse = func(data, options, voiceText);

        response += functionResponse + ' ';

        logCommand(name, response);
      }

      commandsStaged.push(name);
    });

    response = addFeedbackToResponse(response, commandsStaged);
  } else {
    response = `I heard you say ${voiceText}. Command not recognized. Please try again.`;
    logCommand(voiceText, response);
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
  { name: 'average', func: require('./average').default },
  { name: 'mean', alias: 'average' },
  { name: 'median', func: require('./median').default },
  { name: 'mode', func: require('./mode').default },
  { name: 'maximum', func: require('./maximum').default },
  { name: 'highest', alias: 'maximum' },
  { name: 'minimum', func: require('./minimum').default },
  { name: 'lowest', alias: 'minimum' },
  { name: 'variance', func: require('./variance').default },
  { name: 'standard deviation', func: require('./standardDeviation').default },
  { name: 'total', func: require('./total').default },
  { name: 'instructions', func: require('./instructions').default },
  { name: 'directions', alias: 'instructions' },
  { name: 'help', alias: 'instructions' },
  { name: 'summary', func: require('./summary').default },
  { name: 'value', func: require('./value').default },
  { name: 'data', alias: 'value' },
  { name: 'commands', func: require('./commands').default },
];

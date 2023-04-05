/**
 * @namespace commands.commands
 */

import { commands } from './';

/**
 * Generates the response for the "commands" command.
 * @memberOf commands.commands
 * @returns {object} - Response for the "commands" command.
 */
export default () => {
  let response = 'VoxLens supports the following commands.';

  commands.forEach((c) => (response += ' ' + c.name + ','));

  return {
    sentence: response.replace(/.$/, '.'),
  };
};

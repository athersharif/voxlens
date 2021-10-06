/**
 * @namespace commands.commands
 */

import { commands } from './';

/**
 * Generates the response for the "commands" command.
 * @memberOf commands.commands
 * @returns {string} - Response for the "commands" command.
 */
const resolver = () => {
  let response = 'VoxLens supports the following commands.';

  commands.forEach((c) => (response += ' ' + c.name + ','));

  return response.replace(/.$/, '.');
};

export default resolver;

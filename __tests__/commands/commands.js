import { expect } from 'chai';
import * as allCommands from '../../src/commands';

const commands = allCommands.commands;

describe('getAllCommands', () => {
  const command = commands.find((c) => c.name === 'commands');

  it('should return correct list of commands', () => {
    const result = command.func();

    expect(result).to.equal(
      'VoxLens supports the following commands. average, mean, median, mode, maximum, highest, minimum, lowest, variance, standard deviation, total, instructions, directions, help, summary, value, data, commands.'
    );
  });
});

import { expect } from 'chai';
import * as allCommands from '../../src/commands';

const commands = allCommands.commands;

const data = {
  x: ['x1', 'x2'],
  y: [12, 22],
};

const options = {
  xLabel: 'dummy',
  yLabel: 'label',
};

describe('getStandardDeviationSummary', () => {
  const command = commands.find((c) => c.name === 'standard deviation');

  it('should return correct standard deviation', () => {
    const result = command.func(data, options);

    expect(result.sentence).to.equal(
      'Standard Deviation label for dummies is 5.'
    );
  });
});

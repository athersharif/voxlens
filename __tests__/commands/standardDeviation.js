import { expect } from 'chai';
import * as allCommands from '../../src/commands';

const commands = allCommands.commands;

const data = {
  x: ['x1', 'x2'],
  y: [12, 22],
};

const options = {
  xLabel: 'labelX',
  yLabel: 'labelY',
};

describe('getStandardDeviationSummary', () => {
  const command = commands.find((c) => c.name === 'standard deviation');

  it('should return correct standard deviation', () => {
    const result = command.func(data, options);

    expect(result).to.equal('Standard Deviation of labelY for labelX is 5.');
  });
});

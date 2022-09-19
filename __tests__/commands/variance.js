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

describe('getVarianceSummary', () => {
  const command = commands.find((c) => c.name === 'variance');

  it('should return correct variance', () => {
    const result = command.func(data, options);

    expect(result.sentence).to.equal('Variance label for dummies is 25.');
  });
});

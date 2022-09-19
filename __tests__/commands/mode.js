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

describe('getModeSummary', () => {
  const command = commands.find((c) => c.name === 'mode');

  it('should return no mode when there is no mode', () => {
    const result = command.func(data, options);

    expect(result.sentence).to.equal(
      'There is no mode. No value appears more than any other.'
    );
  });

  it('should return correct mode when multiple modes are present', () => {
    const data = {
      x: ['x1', 'x2', 'x3', 'x4'],
      y: [12, 12, 14, 14],
    };
    const result = command.func(data, options);

    expect(result.sentence).to.equal('Mode label for dummies is 12, and 14.');
  });

  it('should return correct mode when single modes are present', () => {
    const data = {
      x: ['x1', 'x2'],
      y: [12, 12],
    };
    const result = command.func(data, options);

    expect(result.sentence).to.equal('Mode label for dummies is 12.');
  });
});

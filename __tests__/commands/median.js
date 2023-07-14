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
  element: document.body,
};

describe('getMedianSummary', () => {
  const command = commands.find((c) => c.name === 'median');

  it('should return correct median', () => {
    const result = command.func(data, options);

    expect(result.sentence).to.equal('Median label for dummies is 17.');
  });
});

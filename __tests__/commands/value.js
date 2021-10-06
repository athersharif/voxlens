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

describe('getIndividualDataPoint', () => {
  const command = commands.find((c) => c.name === 'value');

  it('should return correct response when voice input is not provided', () => {
    const result = command.func(data, options);

    expect(result).to.equal(
      "Could not find the data you're looking for. Please try again."
    );
  });

  it('should return correct response when voice input is empty', () => {
    const voiceText = '';
    const result = command.func(data, options, voiceText);

    expect(result).to.equal(
      "Could not find the data you're looking for. Please try again."
    );
  });

  it('should return correct response when voice input has no matches', () => {
    const voiceText = 'tell me about y';
    const result = command.func(data, options, voiceText);

    expect(result).to.equal(
      "Could not find the data you're looking for. Please try again."
    );
  });

  it('should return correct response when voice input has matches', () => {
    const voiceText = 'tell me about x1';
    const result = command.func(data, options, voiceText);

    expect(result).to.equal(
      'Found the following possible matches in the data. The value for x1 is 12.'
    );
  });
});

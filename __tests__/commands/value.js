import { expect } from 'chai';
import sinon from 'sinon';
import * as allCommands from '../../src/commands';

const commands = allCommands.commands;

const data = {
  x: ['something', 'different', 'unique'],
  y: [12, 22, 33],
};

const options = {
  chartType: 'bar',
  x: 'dummy',
  y: 'label',
  xLabel: 'dummy',
  yLabel: 'label',
};

const stateData = {
  x: ['California', 'Pennsylvania', 'Illinois', 'Kentucky'],
  y: [55, 37, 93, 44],
};

const stateOptions = {
  chartType: 'map',
  dataModule: 'state',
  x: 'state',
  y: 'score',
  xLabel: 'state',
  yLabel: 'score',
};

const countryData = {
  x: ['Japan', 'Turkey', 'Italy'],
  y: [58, 38, 63],
};

const countryOptions = {
  chartType: 'map',
  dataModule: 'country',
  x: 'country',
  y: 'score',
  xLabel: 'country',
  yLabel: 'score',
};

describe('getIndividualDataPoint', () => {
  let consoleStub = sinon.stub();

  beforeEach(() => {
    consoleStub = sinon.stub(global.console, 'log');
  });

  afterEach(() => {
    consoleStub.restore();
  });

  const command = commands.find((c) => c.name === 'value');

  it('should return correct response when voice input has matches', () => {
    const result = command.func(data, options);

    expect(result.sentence).to.equal('label for something is 12.');
  });

  it('should return correct response when voice input has numbers as keys', () => {
    const data = { x: [2014], y: [2345] };
    const result = command.func(data, options);

    expect(result.sentence).to.equal('label for 2014 is 2,345.');
  });

  it('should return correct response when value command is issued', () => {
    allCommands.processCommand('data different', data, options, true, {});

    sinon.assert.callCount(consoleStub, 2);

    expect(consoleStub.getCall(0).args.join('')).to.contain(
      'Command issued: value'
    );
    expect(consoleStub.getCall(1).args.join('')).to.contain(
      'label for different is 22.'
    );
  });

  it('should return correct response when two data points are queries', () => {
    allCommands.processCommand(
      'data different something',
      data,
      options,
      true,
      {}
    );

    sinon.assert.callCount(consoleStub, 3);

    expect(consoleStub.getCall(0).args.join('')).to.contain(
      'Command issued: value'
    );
    expect(consoleStub.getCall(1).args.join('')).to.contain(
      'Command issued: value'
    );
    expect(consoleStub.getCall(2).args.join('')).to.contain(
      'label for different is 22. label for something is 12. label for different is greater than something.'
    );
  });

  it('should return correct response when more than two data points are queries', () => {
    allCommands.processCommand(
      'data different something unique',
      data,
      options,
      true,
      {}
    );

    sinon.assert.callCount(consoleStub, 4);

    expect(consoleStub.getCall(0).args.join('')).to.contain(
      'Command issued: value'
    );
    expect(consoleStub.getCall(1).args.join('')).to.contain(
      'Command issued: value'
    );
    expect(consoleStub.getCall(2).args.join('')).to.contain(
      'Command issued: value'
    );
    expect(consoleStub.getCall(3).args.join('')).to.contain(
      'label for different is 22. label for something is 12. label for unique is 33. label for unique is the highest, followed by different, and something.'
    );
  });

  it('should return correct response when value command is issued for a region', () => {
    allCommands.processCommand('west', stateData, stateOptions, true, {});

    sinon.assert.callCount(consoleStub, 2);

    expect(consoleStub.getCall(0).args.join('')).to.contain(
      'Command issued: average'
    );
    expect(consoleStub.getCall(1).args.join('')).to.contain(
      'Average score for West regions is 55.'
    );
  });

  it('should return correct response when value command is issued for a region with specific stats', () => {
    allCommands.processCommand('west total', stateData, stateOptions, true, {});

    sinon.assert.callCount(consoleStub, 3);

    expect(consoleStub.getCall(0).args.join('')).to.contain(
      'Command issued: total'
    );
    expect(consoleStub.getCall(1).args.join('')).to.contain(
      'Command issued: total'
    );
    expect(consoleStub.getCall(2).args.join('')).to.contain(
      'Total score for West regions is 55.'
    );
  });

  it('should return correct response when value command is issued for a region when abbreviations dont exist', () => {
    allCommands.processCommand(
      'data asia',
      countryData,
      countryOptions,
      true,
      {}
    );

    sinon.assert.callCount(consoleStub, 2);

    expect(consoleStub.getCall(0).args.join('')).to.contain(
      'Command issued: average'
    );
    expect(consoleStub.getCall(1).args.join('')).to.contain(
      'Average score for Asia regions is 48.'
    );
  });

  it('should return correct response when value command is issued for multiple regions', () => {
    allCommands.processCommand(
      'data west north east great lakes',
      stateData,
      stateOptions,
      true,
      {}
    );

    sinon.assert.callCount(consoleStub, 4);

    expect(consoleStub.getCall(0).args.join('')).to.contain(
      'Command issued: average'
    );
    expect(consoleStub.getCall(1).args.join('')).to.contain(
      'Command issued: average'
    );
    expect(consoleStub.getCall(2).args.join('')).to.contain(
      'Command issued: average'
    );
    expect(consoleStub.getCall(3).args.join('')).to.contain(
      'Average score for north region Easts is 37. Average score for North regions is 65. Average score for Greatlakes regions is 93. score for Greatlakes region average is the highest, followed by North region average, and north region East average.'
    );
  });

  it('should return correct response when no voice input', () => {
    allCommands.processCommand(undefined, data, options, true, {});

    sinon.assert.callCount(consoleStub, 1);

    expect(consoleStub.getCall(0).args.join('')).to.contain(
      'Unable to get data. Please try again.'
    );
  });

  it('should return correct response when empty voice input', () => {
    allCommands.processCommand(' ', data, options, true, {});

    sinon.assert.callCount(consoleStub, 1);

    expect(consoleStub.getCall(0).args.join('')).to.contain(
      'Unable to get data. Please try again.'
    );
  });

  it('should return correct response when value command is issued for a non-existing region', () => {
    allCommands.processCommand('blah', stateData, stateOptions, true, {});

    sinon.assert.callCount(consoleStub, 2);

    expect(consoleStub.getCall(0).args.join('')).to.contain(
      'Command issued: blah'
    );
    expect(consoleStub.getCall(1).args.join('')).to.contain(
      'I heard you say blah. Unable to get data. Please try again.'
    );
  });
});

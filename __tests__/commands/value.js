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

const uncertaintyData = [
  {
    x: ['dummy'],
    y: [72],
    metadata: [
      {
        min: 53,
        max: 95,
        stdev: 18,
        isAverage: true,
        isCVHigh: true,
      },
    ],
  },
  {
    x: ['fake'],
    y: [78],
    metadata: [
      {
        min: 66,
        max: 90,
        stdev: 9.27,
        isAverage: true,
        isCVHigh: false,
      },
    ],
  },
  {
    x: ['blah'],
    y: [78],
    metadata: [
      {
        min: 66,
        max: 90,
        isAverage: true,
      },
    ],
  },
  {
    x: ['blah2'],
    y: [0],
    metadata: [
      {
        min: 0,
        max: 0,
        isAverage: true,
      },
    ],
  },
];

const countryOptions = {
  chartType: 'map',
  dataModule: 'country',
  x: 'country',
  y: 'score',
  xLabel: 'country',
  yLabel: 'score',
};

const multiSeriesData = {
  x: [
    ['Jake', 'Kelly', 'Megan'],
    [2010, 2010, 2011],
  ],
  y: [17, 63, 25],
};

const multiSeriesOptions = {
  chartType: 'multiseries',
  x: ['name', 'year'],
  y: 'cars',
  xLabel: 'Name And Year',
  yLabel: 'Cars',
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

  it('should return correct response when value command is issued for multiseries data', () => {
    allCommands.processCommand(
      'megan 2011',
      multiSeriesData,
      multiSeriesOptions,
      true,
      {}
    );

    sinon.assert.callCount(consoleStub, 2);

    expect(consoleStub.getCall(0).args.join('')).to.contain(
      'Command issued: value'
    );
    expect(consoleStub.getCall(1).args.join('')).to.contain(
      'Cars for 2011 Megan is 25.'
    );
  });

  it('should return correct response when value command is issued for average of multiseries data of the first axis', () => {
    allCommands.processCommand(
      '2010 average',
      multiSeriesData,
      multiSeriesOptions,
      true,
      {}
    );

    sinon.assert.callCount(consoleStub, 3);

    expect(consoleStub.getCall(0).args.join('')).to.contain(
      'Command issued: average'
    );
    expect(consoleStub.getCall(1).args.join('')).to.contain(
      'Command issued: average'
    );
    expect(consoleStub.getCall(2).args.join('')).to.contain(
      'Average Cars for 2010s is 40.'
    );
  });

  it('should return correct response when value command is issued for sum of multiseries data of the first axis', () => {
    allCommands.processCommand(
      '2010 total',
      multiSeriesData,
      multiSeriesOptions,
      true,
      {}
    );

    sinon.assert.callCount(consoleStub, 3);

    expect(consoleStub.getCall(0).args.join('')).to.contain(
      'Command issued: total'
    );
    expect(consoleStub.getCall(1).args.join('')).to.contain(
      'Command issued: total'
    );
    expect(consoleStub.getCall(2).args.join('')).to.contain(
      'Total Cars for 2010s is 80.'
    );
  });

  it('should return correct response when value command is issued for average of multiseries data of the second axis', () => {
    allCommands.processCommand(
      'jake average',
      multiSeriesData,
      multiSeriesOptions,
      true,
      {}
    );

    sinon.assert.callCount(consoleStub, 3);

    expect(consoleStub.getCall(0).args.join('')).to.contain(
      'Command issued: average'
    );
    expect(consoleStub.getCall(1).args.join('')).to.contain(
      'Command issued: average'
    );
    expect(consoleStub.getCall(2).args.join('')).to.contain(
      'Average Cars for Jakes is 17.'
    );
  });

  it('should return correct response when value command is issued for uncertainty data when cv high', () => {
    const result = command.func(uncertaintyData[0], options);

    expect(result.sentence).to.equal(
      'Average label for dummy is 72. The minimum label for dummy was 53. The maximum label for dummy was 95. Use the data with caution. Data has higher variation than undefined percent of other dummies and may not be reliable.'
    );
  });

  it('should return correct response when value command is issued for uncertainty data when cv not high', () => {
    const result = command.func(uncertaintyData[1], options);

    expect(result.sentence).to.equal(
      'Average label for fake is 78. The minimum label for fake was 66. The maximum label for fake was 90. Data has lower variation than undefined percent of other dummies and may be reliable.'
    );
  });

  it('should return correct response when value command is issued for uncertainty data when stdev not present', () => {
    const result = command.func(uncertaintyData[2], options);

    expect(result.sentence).to.equal(
      'Average label for blah is 78. The minimum label for blah was 66. The maximum label for blah was 90.'
    );
  });

  it('should return correct response when value command is issued for uncertainty data when value is zero', () => {
    const result = command.func(uncertaintyData[3], options);

    expect(result.sentence).to.equal(
      'Average label for blah2 is 0. The minimum label for blah2 was 0. The maximum label for blah2 was 0.'
    );
  });

  it('should return correct response when value command is issued without an explicit query for average', () => {
    allCommands.processCommand(
      'jake value',
      multiSeriesData,
      multiSeriesOptions,
      true
    );

    sinon.assert.callCount(consoleStub, 2);

    expect(consoleStub.getCall(0).args.join('')).to.contain(
      'Command issued: average'
    );
    expect(consoleStub.getCall(1).args.join('')).to.contain(
      'Average Cars for Jakes is 17.'
    );
  });

  it('should return correct response when value command is issued without any explicit command', () => {
    allCommands.processCommand(
      'jake',
      multiSeriesData,
      multiSeriesOptions,
      true,
      {}
    );

    sinon.assert.callCount(consoleStub, 2);

    expect(consoleStub.getCall(0).args.join('')).to.contain(
      'Command issued: average'
    );
    expect(consoleStub.getCall(1).args.join('')).to.contain(
      'Average Cars for Jakes is 17.'
    );
  });

  it('should return correct response when value command is issued without an explicit query for independent variables', () => {
    allCommands.processCommand(
      'total',
      multiSeriesData,
      multiSeriesOptions,
      true,
      {}
    );

    sinon.assert.callCount(consoleStub, 2);

    expect(consoleStub.getCall(0).args.join('')).to.contain(
      'Command issued: total'
    );
    expect(consoleStub.getCall(1).args.join('')).to.contain(
      'Total Cars for Name And Years is 105.'
    );
  });

  it('should return correct response when value command is issued without an incomplete value command', () => {
    allCommands.processCommand(
      'value',
      multiSeriesData,
      multiSeriesOptions,
      true,
      {}
    );

    sinon.assert.callCount(consoleStub, 2);

    expect(consoleStub.getCall(0).args.join('')).to.contain(
      'Command issued: value'
    );
    expect(consoleStub.getCall(1).args.join('')).to.contain(
      'Unable to get data. Please try again.'
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

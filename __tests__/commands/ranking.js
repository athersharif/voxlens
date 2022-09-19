import { expect } from 'chai';
import sinon from 'sinon';
import hotkeys from 'hotkeys-js';
import voxlens from '../../src';
import * as allCommands from '../../src/commands';
import { element, fireEvent } from '../../testHelpers';

const commands = allCommands.commands;

const data = {
  x: ['x1', 'x2', 'x3', 'x4'],
  y: [12, 52, 33, 44],
};

const voxlensData = [
  {
    xKey: 'x1',
    yKey: 12,
  },
  {
    xKey: 'x2',
    yKey: 52,
  },
  {
    xKey: 'x3',
    yKey: 33,
  },
  {
    xKey: 'x4',
    yKey: 44,
  },
];

const options = {
  x: 'xKey',
  y: 'yKey',
  rankingCount: 2,
  rankingType: 'top',
  xLabel: 'dummy',
  yLabel: 'label',
  title: 'some title',
};

describe('getRanking', () => {
  let consoleStub = sinon.stub();

  beforeEach(() => {
    consoleStub = sinon.stub(global.console, 'log');
  });

  afterEach(() => {
    consoleStub.restore();

    hotkeys.unbind();

    process.env.TEST_P5_RESULT = '';
  });

  const command = commands.find((c) => c.name === 'ranking');

  it('should return correct response when data x is an array', () => {
    const result = command.func(
      {
        ...data,
        x: [['x1', 'x2', 'x3', 'x4'], 'd1', ['e2', 'e3']],
      },
      {
        ...options,
        rankingCount: 3,
      }
    );

    expect(result.sentence).to.equal('The top 3 dummies are: x2, x4, x3.');
  });

  it('should return correct response when rankingType is not defined', () => {
    const result = command.func(data, {
      ...options,
      rankingType: null,
    });

    expect(result.sentence).to.equal('The top 2 dummies are: x2, x4.');
  });

  it('should return correct response when rankingCount is not defined', () => {
    const result = command.func(data, {
      ...options,
      rankingCount: null,
    });

    expect(result.sentence).to.equal('The top 4 dummies are: x2, x4, x3, x1.');
  });

  it('should return correct response when rankingType is top', () => {
    const result = command.func(data, options);

    expect(result.sentence).to.equal('The top 2 dummies are: x2, x4.');
  });

  it('should return correct response when rankingType is bottom', () => {
    const result = command.func(data, {
      ...options,
      rankingType: 'bottom',
    });

    expect(result.sentence).to.equal('The bottom 2 dummies are: x1, x3.');
  });

  it('should return correct response from when ranking command is issued', () => {
    process.env.TEST_P5_RESULT = 'top 2';

    voxlens('chartjs', element, voxlensData, options);

    fireEvent('a');

    sinon.assert.callCount(consoleStub, 3);

    expect(consoleStub.getCall(0).args.join('')).to.contain(
      'Key combination issued: option+a'
    );
    expect(consoleStub.getCall(1).args.join('')).to.contain(
      'Command issued: ranking'
    );
    expect(consoleStub.getCall(2).args.join('')).to.contain(
      'The top 2 Dummies are: x2, x4.'
    );
  });

  it('should return correct response when rankingCount is not a number', () => {
    allCommands.processCommand('top blah', data, options, true, {});

    sinon.assert.callCount(consoleStub, 2);

    expect(consoleStub.getCall(0).args.join('')).to.contain(
      'Command issued: top blah'
    );
    expect(consoleStub.getCall(1).args.join('')).to.contain(
      'I heard you say top blah. Unable to get data. Please try again.'
    );
  });

  it('should return correct response when datapoints is not a number', () => {
    allCommands.processCommand('top blah', data, options, true, {});

    sinon.assert.callCount(consoleStub, 2);

    expect(consoleStub.getCall(0).args.join('')).to.contain(
      'Command issued: top blah'
    );
    expect(consoleStub.getCall(1).args.join('')).to.contain(
      'I heard you say top blah. Unable to get data. Please try again.'
    );
  });
});

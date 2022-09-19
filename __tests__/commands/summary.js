import { expect } from 'chai';
import sinon from 'sinon';
import * as allCommands from '../../src/commands';

const commands = allCommands.commands;

const data = {
  x: ['x1', 'x2', 'x3', 'x4'],
  y: [12, 52, 33, 44],
};

const options = {
  x: 'xKey',
  y: 'yKey',
  xLabel: 'dummy',
  yLabel: 'label',
  title: 'some title',
};

describe('getSummary', () => {
  let consoleStub = sinon.stub();

  beforeEach(() => {
    consoleStub = sinon.stub(global.console, 'log');
  });

  afterEach(() => {
    consoleStub.restore();
  });

  it('should return correct response when summary is asked', () => {
    allCommands.processCommand('summary', data, options, undefined, {});

    sinon.assert.callCount(consoleStub, 2);

    expect(consoleStub.getCall(0).args.join('')).to.contain(
      'Command issued: summary'
    );
    expect(consoleStub.getCall(1).args.join('')).to.contain(
      'Graph with title: some title. The X-axis is dummy. The Y-axis is label. The maximum data point is 52 belonging to x2, and the minimum data point is 12 belonging to x1. The average is 35.25.'
    );
  });
});

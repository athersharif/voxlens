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
  xLabel: 'dummy',
  yLabel: 'label',
  title: 'some title',
  element: document.body,
};

describe('getRange', () => {
  let consoleStub = sinon.stub();

  beforeEach(() => {
    consoleStub = sinon.stub(global.console, 'log');
  });

  afterEach(() => {
    consoleStub.restore();

    hotkeys.unbind();

    process.env.TEST_P5_RESULT = '';
  });

  const command = commands.find((c) => c.name === 'range');

  it('should return correct response from range function', () => {
    const result = command.func(data, options);

    expect(result.sentence).to.equal('label ranges from 12 to 52.');
  });

  it('should return correct response from when ranking command is issued', () => {
    process.env.TEST_P5_RESULT = 'range';

    voxlens('chartjs', element, voxlensData, options);

    fireEvent('a');

    sinon.assert.callCount(consoleStub, 4);

    expect(consoleStub.getCall(0).args.join('')).to.contain(
      'Key combination issued: option+a'
    );
    expect(consoleStub.getCall(2).args.join('')).to.contain(
      'Command issued: range'
    );
    expect(consoleStub.getCall(3).args.join('')).to.contain(
      'Label ranges from 12 to 52.'
    );
  });
});

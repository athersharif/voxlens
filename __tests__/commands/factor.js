import { expect } from 'chai';
import sinon from 'sinon';
import hotkeys from 'hotkeys-js';
import voxlens from '../../src';
import * as allCommands from '../../src/commands';
import { element, fireEvent } from '../../testHelpers';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const commands = allCommands.commands;

const data = {
  x: ['allen', 'jake', 'susan', 'megan'],
  y: [12, 52, 33, 44],
};

const voxlensData = [
  {
    xKey: 'allen',
    yKey: 12,
  },
  {
    xKey: 'jake',
    yKey: 52,
  },
  {
    xKey: 'susan',
    yKey: 33,
  },
  {
    xKey: 'megan',
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

describe('getFactor', () => {
  let consoleStub = sinon.stub();

  beforeEach(() => {
    consoleStub = sinon.stub(global.console, 'log');
  });

  afterEach(() => {
    consoleStub.restore();

    hotkeys.unbind();

    process.env.TEST_P5_RESULT = '';
  });

  const command = commands.find((c) => c.name === 'factor');

  it('should return correct response from factor function', () => {
    const result = command.func(data, options);

    expect(result.sentence).to.equal(
      'Data is from 4 xKeys. Say tell me factor levels for xKey to hear all xKeys.'
    );
  });

  it('should return correct response from factor function when key does not match', () => {
    const updatedOptions = {
      ...options,
      key: 'some-random-key',
    };

    const result = command.func(data, updatedOptions);

    expect(result).to.equal(null);
  });

  it('should return correct response from when factor command is issued for single-series data', () => {
    process.env.TEST_P5_RESULT = 'factors';

    voxlens('chartjs', element, voxlensData, options);

    fireEvent('a');

    sinon.assert.callCount(consoleStub, 4);

    expect(consoleStub.getCall(0).args.join('')).to.contain(
      'Key combination issued: option+a'
    );
    expect(consoleStub.getCall(2).args.join('')).to.contain(
      'Command issued: factor'
    );
    expect(consoleStub.getCall(3).args.join('')).to.contain(
      'Data is from 4 xKeys. Say tell me factor levels for xKey to hear all xKeys.'
    );
  });

  it('should return correct response from when factor levels command is issued for single-series data', async () => {
    process.env.TEST_P5_RESULT = 'factor levels for xKey';

    await sleep(1000);

    voxlens('chartjs', element, voxlensData, options);

    fireEvent('a');

    sinon.assert.callCount(consoleStub, 4);

    expect(consoleStub.getCall(0).args.join('')).to.contain(
      'Key combination issued: option+a'
    );
    expect(consoleStub.getCall(2).args.join('')).to.contain(
      'Command issued: factor'
    );
    expect(consoleStub.getCall(3).args.join('')).to.contain(
      'Data is from 4 xKeys: allen, jake, susan, megan.'
    );
  });

  it('should return correct response from when factor command is issued for multi-series data', async () => {
    const voxlensData = [
      {
        xKey: 'allen',
        yKey: 12,
        zKey: 2022,
      },
      {
        xKey: 'jake',
        yKey: 52,
        zKey: 2022,
      },
      {
        xKey: 'susan',
        yKey: 33,
        zKey: 2023,
      },
      {
        xKey: 'megan',
        yKey: 44,
        zKey: 2023,
      },
    ];

    const options = {
      x: ['xKey', 'zKey'],
      y: 'yKey',
      xLabel: 'dummy and deedee',
      yLabel: 'label',
      title: 'some title',
    };

    process.env.TEST_P5_RESULT = 'factors';

    await sleep(1000);

    voxlens('chartjs', element, voxlensData, options);

    fireEvent('a');

    sinon.assert.callCount(consoleStub, 4);

    expect(consoleStub.getCall(0).args.join('')).to.contain(
      'Key combination issued: option+a'
    );
    expect(consoleStub.getCall(2).args.join('')).to.contain(
      'Command issued: factor'
    );
    expect(consoleStub.getCall(3).args.join('')).to.contain(
      'Data is from 4 xKeys.'
    );
    expect(consoleStub.getCall(3).args.join('')).to.contain(
      'Data is from 2 zKeys.'
    );
  });
});

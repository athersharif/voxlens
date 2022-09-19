import { expect } from 'chai';
import sinon from 'sinon';
import hotkeys from 'hotkeys-js';
import voxlens from '../src';
import { element, fireEvent } from '../testHelpers';

const data = [
  {
    xKey: 'dummy',
    yKey: 1,
  },
  {
    xKey: 'fake',
    yKey: 2,
  },
];

const expectedData = {
  x: ['dummy', 'fake'],
  y: [1, 2],
};

const options = {
  x: 'xKey',
  y: 'yKey',
  xLabel: 'X Label',
  yLabel: 'Y Label',
  title: 'some title',
};

describe('index.js', () => {
  let consoleStub = sinon.stub();

  beforeEach(() => {
    consoleStub = sinon.stub(global.console, 'log');
  });

  afterEach(() => {
    consoleStub.restore();

    hotkeys.unbind();

    process.env.TEST_P5_RESULT = '';
    process.env.TEST_P5_FAIL = '';
  });

  it('should call d3Voxlens when library is d3', () => {
    const stub = sinon.stub();
    const originalFunc = voxlens.__get__('run');
    voxlens.__set__('run', stub);

    const viewportElement = {
      node: () => ({
        parentElement: {
          parentElement: {
            parentElement: null,
          },
        },
      }),
      data: () => [],
    };

    voxlens('d3', viewportElement, null);

    sinon.assert.calledWith(
      stub,
      viewportElement.node().parentElement.parentElement.parentElement,
      viewportElement.data(),
      {}
    );

    voxlens.__set__('run', originalFunc);
  });

  it('should call d3Voxlens when library is d3 with correct data and options', () => {
    const stub = sinon.stub();
    const originalFunc = voxlens.__get__('startApp');
    voxlens.__set__('startApp', stub);

    const viewportElement = {
      node: () => ({
        parentElement: {
          parentElement: {
            parentElement: element,
          },
        },
      }),
      data: () => [data],
    };

    voxlens('d3', viewportElement, null, options);

    sinon.assert.calledWith(stub, expectedData, options, 'unique-id');

    voxlens.__set__('startApp', originalFunc);
  });

  it('should call googleChartsVoxlens when library is googlecharts', () => {
    const stub = sinon.stub();
    const originalFunc = voxlens.__get__('run');
    voxlens.__set__('run', stub);

    const viewportElement = { container: null };
    const data = null;

    voxlens('googlecharts', viewportElement, data);

    sinon.assert.calledWith(stub, viewportElement.container, data, {});

    voxlens.__set__('run', originalFunc);
  });

  it('should call googleChartsVoxlens when library is googlecharts with correct data and options', () => {
    const stub = sinon.stub();
    const originalFunc = voxlens.__get__('startApp');
    voxlens.__set__('startApp', stub);

    const viewportElement = { container: element };

    voxlens('googlecharts', viewportElement, data, options);

    sinon.assert.calledWith(stub, expectedData, options, 'unique-id');

    voxlens.__set__('startApp', originalFunc);
  });

  it('should call chartJSVoxlens when library is chartjs', () => {
    const stub = sinon.stub();
    const originalFunc = voxlens.__get__('run');
    voxlens.__set__('run', stub);

    voxlens('chartjs', null, null);

    sinon.assert.calledWith(stub, null, null, {});

    voxlens.__set__('run', originalFunc);
  });

  it('should call chartJSVoxlens when library is chartjs with correct data and options', () => {
    const stub = sinon.stub();
    const originalFunc = voxlens.__get__('startApp');
    voxlens.__set__('startApp', stub);

    voxlens('chartjs', element, data, options);

    sinon.assert.calledWith(stub, expectedData, options, 'unique-id');

    voxlens.__set__('startApp', originalFunc);
  });

  it('should start the app and perform voice recognition when activated with key A', () => {
    process.env.TEST_P5_RESULT = 'maximum';

    voxlens('chartjs', element, data, options);

    fireEvent('a');

    sinon.assert.callCount(consoleStub, 3);

    expect(consoleStub.getCall(0).args.join('')).to.contain(
      'Key combination issued: option+a'
    );
    expect(consoleStub.getCall(1).args.join('')).to.contain(
      'Command issued: maximum'
    );
    expect(consoleStub.getCall(2).args.join('')).to.contain(
      'Maximum Y Label for X Labels is 2 belonging to fake.'
    );
  });

  it('should start the app but skip execution if command duplicate when activated with key A', () => {
    process.env.TEST_P5_RESULT = 'maximum';

    voxlens('chartjs', element, data, options);

    fireEvent('a');

    sinon.assert.callCount(consoleStub, 1);

    expect(consoleStub.getCall(0).args.join('')).to.contain(
      'Key combination issued: option+a'
    );
  });

  it('should start the app and log summary when activated with key S', () => {
    voxlens('chartjs', element, data, options);

    fireEvent('s');

    sinon.assert.callCount(consoleStub, 3);

    expect(consoleStub.getCall(0).args.join('')).to.contain(
      'Key combination issued: option+s'
    );
    expect(consoleStub.getCall(1).args.join('')).to.contain(
      'Command issued: summary'
    );
    expect(consoleStub.getCall(2).args.join('')).to.contain(
      'Graph with title: some title. The X-axis is X Label. The Y-axis is Y Label. The maximum data point is 2 belonging to fake, and the minimum data point is 1 belonging to dummy. The average is 1.5.'
    );
  });

  it('should start the app but skip execution if command duplicate when activated with key S', () => {
    voxlens('chartjs', element, data, options);

    fireEvent('s');

    sinon.assert.callCount(consoleStub, 1);

    expect(consoleStub.getCall(0).args.join('')).to.contain(
      'Key combination issued: option+s'
    );
  });

  it('should start the app and play sonification when activated with key M', () => {
    voxlens('chartjs', element, data, options);

    fireEvent('m');

    sinon.assert.callCount(consoleStub, 2);

    expect(consoleStub.getCall(0).args.join('')).to.contain(
      'Key combination issued: option+m'
    );
    expect(consoleStub.getCall(1).args.join('')).to.contain(
      'Playing sonification'
    );
  });

  it('should start the app but skip execution if command duplicate when activated with key M', () => {
    voxlens('chartjs', element, data, options);

    fireEvent('m');

    sinon.assert.callCount(consoleStub, 0);
  });

  it('should start the app and log instructions when activated with key I', () => {
    voxlens('chartjs', element, data, options);

    fireEvent('i');

    sinon.assert.callCount(consoleStub, 3);

    expect(consoleStub.getCall(0).args.join('')).to.contain(
      'Key combination issued: option+i'
    );
    expect(consoleStub.getCall(1).args.join('')).to.contain(
      'Command issued: instructions'
    );
    expect(consoleStub.getCall(2).args.join('')).to.contain(
      "Graph with title: some title. To interact with the graph, press OPTION + A or OPTION + 1 all together and in order. You'll hear a beep sound, after which you can ask a question such as what is the average or what is the maximum value in the graph. To hear the textual summary of the graph, press OPTION + S or OPTION + 2. To hear the audio graph, press OPTION + M or OPTION + 3. To repeat these instructions, press OPTION + I or OPTION + 4. Key combinations must be pressed all together and in order."
    );
  });

  it('should start the app but skip execution if command duplicate when activated with key I', () => {
    voxlens('chartjs', element, data, options);

    fireEvent('i');

    sinon.assert.callCount(consoleStub, 1);

    expect(consoleStub.getCall(0).args.join('')).to.contain(
      'Key combination issued: option+i'
    );
  });

  it('should start the app and pause output when activated with key P', () => {
    voxlens('chartjs', element, data, options);

    fireEvent('p');

    sinon.assert.callCount(consoleStub, 1);

    expect(consoleStub.getCall(0).args.join('')).to.contain(
      'Key combination issued: option+p'
    );
  });

  it('should start the app and perform voice recognition when activated with key 1', () => {
    process.env.TEST_P5_RESULT = 'maximum';

    voxlens('chartjs', element, data, options);

    fireEvent('1');

    sinon.assert.callCount(consoleStub, 3);

    expect(consoleStub.getCall(0).args.join('')).to.contain(
      'Key combination issued: option+1'
    );
    expect(consoleStub.getCall(1).args.join('')).to.contain(
      'Command issued: maximum'
    );
    expect(consoleStub.getCall(2).args.join('')).to.contain(
      'Maximum Y Label for X Labels is 2 belonging to fake.'
    );
  });

  it('should start the app and log summary when activated with key 2', () => {
    voxlens('chartjs', element, data, options);

    fireEvent('2');

    sinon.assert.callCount(consoleStub, 3);

    expect(consoleStub.getCall(0).args.join('')).to.contain(
      'Key combination issued: option+2'
    );
    expect(consoleStub.getCall(1).args.join('')).to.contain(
      'Command issued: summary'
    );
    expect(consoleStub.getCall(2).args.join('')).to.contain(
      'Graph with title: some title. The X-axis is X Label. The Y-axis is Y Label. The maximum data point is 2 belonging to fake, and the minimum data point is 1 belonging to dummy. The average is 1.5.'
    );
  });

  it('should start the app and log command not recognized when p5 throws error on speech input', () => {
    process.env.TEST_P5_FAIL = 'true';

    voxlens('chartjs', element, data, options);

    fireEvent('a');

    sinon.assert.callCount(consoleStub, 2);

    expect(consoleStub.getCall(0).args.join('')).to.contain(
      'Key combination issued: option+a'
    );
    expect(consoleStub.getCall(1).args.join('')).to.contain(
      'Command not recognized. Please try again.'
    );
  });

  it('should start the app and play sonification when activated with key 3', () => {
    voxlens('chartjs', element, data, options);

    fireEvent('3');

    sinon.assert.callCount(consoleStub, 2);

    expect(consoleStub.getCall(0).args.join('')).to.contain(
      'Key combination issued: option+3'
    );
    expect(consoleStub.getCall(1).args.join('')).to.contain(
      'Playing sonification'
    );
  });

  it('should start the app and log command not recognized when unsupported command issued', () => {
    process.env.TEST_P5_RESULT = 'blah';

    voxlens('chartjs', element, data, options);

    fireEvent('a');

    sinon.assert.callCount(consoleStub, 3);

    expect(consoleStub.getCall(0).args.join('')).to.contain(
      'Key combination issued: option+a'
    );
    expect(consoleStub.getCall(1).args.join('')).to.contain(
      'Command issued: blah'
    );
    expect(consoleStub.getCall(2).args.join('')).to.contain(
      'Unable to get data. Please try again.'
    );
  });

  it('should start the app and log instructions when activated with key 4', () => {
    voxlens('chartjs', element, data, options);

    fireEvent('4');

    sinon.assert.callCount(consoleStub, 3);

    expect(consoleStub.getCall(0).args.join('')).to.contain(
      'Key combination issued: option+4'
    );
    expect(consoleStub.getCall(1).args.join('')).to.contain(
      'Command issued: instructions'
    );
    expect(consoleStub.getCall(2).args.join('')).to.contain(
      "Graph with title: some title. To interact with the graph, press OPTION + A or OPTION + 1 all together and in order. You'll hear a beep sound, after which you can ask a question such as what is the average or what is the maximum value in the graph. To hear the textual summary of the graph, press OPTION + S or OPTION + 2. To hear the audio graph, press OPTION + M or OPTION + 3. To repeat these instructions, press OPTION + I or OPTION + 4. Key combinations must be pressed all together and in order."
    );
  });

  it('should start the app and perform all operations when multiple commands issued', () => {
    process.env.TEST_P5_RESULT = 'minimum mean average blah';

    voxlens('chartjs', element, data, options);

    fireEvent('a');

    sinon.assert.callCount(consoleStub, 4);

    expect(consoleStub.getCall(0).args.join('')).to.contain(
      'Key combination issued: option+a'
    );
    expect(consoleStub.getCall(1).args.join('')).to.contain(
      'Command issued: average'
    );
    expect(consoleStub.getCall(2).args.join('')).to.contain(
      'Command issued: minimum'
    );
    expect(consoleStub.getCall(3).args.join('')).to.contain(
      'Average Y Label for X Labels is 1.5. Minimum Y Label for X Labels is 1 belonging to dummy.'
    );
  });

  it('should start the app and pause output when activated with key 5', () => {
    voxlens('chartjs', element, data, options);

    fireEvent('5');

    sinon.assert.callCount(consoleStub, 1);

    expect(consoleStub.getCall(0).args.join('')).to.contain(
      'Key combination issued: option+5'
    );
  });

  it('should error out when library is not supported', () => {
    expect(function () {
      voxlens('some-unsupported-library');
    }).to.throw(
      'Library not supported. Supported libraries are: chartjs, d3, googlecharts.'
    );
  });
});

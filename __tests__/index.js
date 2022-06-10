import { expect } from 'chai';
import sinon from 'sinon';
import voxlens from '../src';
import { setHotkeysArgs, setP5Args, stubs } from '../testHelpers';

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

const element = {
  setAttribute: () => {},
  children: [{ setAttribute: () => {} }, { setAttribute: () => {} }],
};

describe('index.js', () => {
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
    setHotkeysArgs('a');
    setP5Args('maximum', true);

    voxlens('chartjs', element, data, options);

    expect(stubs.hotkeys.setScope.called).to.be.true;
    sinon.assert.callCount(stubs.console.log, 3);
    expect(stubs.tone.dispose.called).to.be.true;

    expect(stubs.console.log.getCall(0).args.join('')).to.contain(
      'Key combination issued: option+a'
    );
    expect(stubs.console.log.getCall(1).args.join('')).to.contain(
      'Command issued: maximum'
    );
    expect(stubs.console.log.getCall(2).args.join('')).to.contain(
      'Maximum value of Y Label for X Label is 2 belonging to fake.'
    );

    stubs.console.log.resetHistory();
  });

  it('should start the app but skip execution if command duplicate when activated with key A', () => {
    setHotkeysArgs('a');
    setP5Args('maximum', true);

    voxlens('chartjs', element, data, options);

    expect(stubs.hotkeys.setScope.called).to.be.true;
    sinon.assert.callCount(stubs.console.log, 1);
    expect(stubs.tone.dispose.called).to.be.true;

    expect(stubs.console.log.getCall(0).args.join('')).to.contain(
      'Key combination issued: option+a'
    );

    stubs.console.log.resetHistory();
  });

  it('should start the app and log summary when activated with key S', () => {
    setHotkeysArgs('s');

    voxlens('chartjs', element, data, options);

    expect(stubs.hotkeys.setScope.called).to.be.true;
    sinon.assert.callCount(stubs.console.log, 3);
    expect(stubs.tone.dispose.called).to.be.true;

    expect(stubs.console.log.getCall(0).args.join('')).to.contain(
      'Key combination issued: option+s'
    );
    expect(stubs.console.log.getCall(1).args.join('')).to.contain(
      'Command issued: summary'
    );
    expect(stubs.console.log.getCall(2).args.join('')).to.contain(
      'Graph with title: some title. The X-axis is X Label. The Y-axis is Y Label. The maximum data point is 2 belonging to fake, and the minimum data point is 1 belonging to dummy. The average is 1.5.'
    );

    stubs.console.log.resetHistory();
  });

  it('should start the app but skip execution if command duplicate when activated with key S', () => {
    setHotkeysArgs('s');

    voxlens('chartjs', element, data, options);

    expect(stubs.hotkeys.setScope.called).to.be.true;
    sinon.assert.callCount(stubs.console.log, 1);
    expect(stubs.tone.dispose.called).to.be.true;

    expect(stubs.console.log.getCall(0).args.join('')).to.contain(
      'Key combination issued: option+s'
    );

    stubs.console.log.resetHistory();
  });

  it('should start the app and play sonification when activated with key M', () => {
    setHotkeysArgs('m');

    voxlens('chartjs', element, data, options);

    expect(stubs.hotkeys.setScope.called).to.be.true;
    sinon.assert.callCount(stubs.console.log, 2);
    expect(stubs.tone.dispose.called).to.be.true;

    expect(stubs.console.log.getCall(0).args.join('')).to.contain(
      'Key combination issued: option+m'
    );
    expect(stubs.console.log.getCall(1).args.join('')).to.contain(
      'Playing sonification'
    );

    stubs.console.log.resetHistory();
  });

  it('should start the app but skip execution if command duplicate when activated with key M', () => {
    setHotkeysArgs('m');

    voxlens('chartjs', element, data, options);

    expect(stubs.hotkeys.setScope.called).to.be.true;
    sinon.assert.callCount(stubs.console.log, 0);
    expect(stubs.tone.dispose.called).to.be.true;

    stubs.console.log.resetHistory();
  });

  it('should start the app and log instructions when activated with key I', () => {
    setHotkeysArgs('i');

    voxlens('chartjs', element, data, options);

    expect(stubs.hotkeys.setScope.called).to.be.true;
    sinon.assert.callCount(stubs.console.log, 3);
    expect(stubs.tone.dispose.called).to.be.true;

    expect(stubs.console.log.getCall(0).args.join('')).to.contain(
      'Key combination issued: option+i'
    );
    expect(stubs.console.log.getCall(1).args.join('')).to.contain(
      'Command issued: instructions'
    );
    expect(stubs.console.log.getCall(2).args.join('')).to.contain(
      "Graph with title: some title. To interact with the graph, press OPTION + A or OPTION + 1 all together and in order. You'll hear a beep sound, after which you can ask a question such as what is the average or what is the maximum value in the graph. To hear the textual summary of the graph, press OPTION + S or OPTION + 2. To hear the audio graph, press OPTION + M or OPTION + 3. To repeat these instructions, press OPTION + I or OPTION + 4. Key combinations must be pressed all together and in order."
    );

    stubs.console.log.resetHistory();
  });

  it('should start the app but skip execution if command duplicate when activated with key I', () => {
    setHotkeysArgs('i');

    voxlens('chartjs', element, data, options);

    expect(stubs.hotkeys.setScope.called).to.be.true;
    sinon.assert.callCount(stubs.console.log, 1);
    expect(stubs.tone.dispose.called).to.be.true;

    expect(stubs.console.log.getCall(0).args.join('')).to.contain(
      'Key combination issued: option+i'
    );

    stubs.console.log.resetHistory();
  });

  it('should start the app and pause output when activated with key P', () => {
    setHotkeysArgs('p');

    voxlens('chartjs', element, data, options);

    expect(stubs.hotkeys.setScope.called).to.be.true;
    sinon.assert.callCount(stubs.console.log, 1);
    expect(stubs.tone.dispose.called).to.be.true;

    expect(stubs.console.log.getCall(0).args.join('')).to.contain(
      'Key combination issued: option+p'
    );

    stubs.console.log.resetHistory();
  });

  it('should start the app and perform voice recognition when activated with key 1', () => {
    setHotkeysArgs('1');
    setP5Args('maximum', true);

    voxlens('chartjs', element, data, options);

    expect(stubs.hotkeys.setScope.called).to.be.true;
    sinon.assert.callCount(stubs.console.log, 3);
    expect(stubs.tone.dispose.called).to.be.true;

    expect(stubs.console.log.getCall(0).args.join('')).to.contain(
      'Key combination issued: option+1'
    );
    expect(stubs.console.log.getCall(1).args.join('')).to.contain(
      'Command issued: maximum'
    );
    expect(stubs.console.log.getCall(2).args.join('')).to.contain(
      'Maximum value of Y Label for X Label is 2 belonging to fake.'
    );

    stubs.console.log.resetHistory();
  });

  it('should start the app and log summary when activated with key 2', () => {
    setHotkeysArgs('2');

    voxlens('chartjs', element, data, options);

    expect(stubs.hotkeys.setScope.called).to.be.true;
    sinon.assert.callCount(stubs.console.log, 3);
    expect(stubs.tone.dispose.called).to.be.true;

    expect(stubs.console.log.getCall(0).args.join('')).to.contain(
      'Key combination issued: option+2'
    );
    expect(stubs.console.log.getCall(1).args.join('')).to.contain(
      'Command issued: summary'
    );
    expect(stubs.console.log.getCall(2).args.join('')).to.contain(
      'Graph with title: some title. The X-axis is X Label. The Y-axis is Y Label. The maximum data point is 2 belonging to fake, and the minimum data point is 1 belonging to dummy. The average is 1.5.'
    );

    stubs.console.log.resetHistory();
  });

  it('should start the app and log command not recognized when p5 throws error on speech input', () => {
    setHotkeysArgs('a');
    setP5Args('blah', false);

    voxlens('chartjs', element, data, options);

    expect(stubs.hotkeys.setScope.called).to.be.true;
    sinon.assert.callCount(stubs.console.log, 2);

    expect(stubs.console.log.getCall(0).args.join('')).to.contain(
      'Key combination issued: option+a'
    );
    expect(stubs.console.log.getCall(1).args.join('')).to.contain(
      'Command not recognized. Please try again.'
    );

    stubs.console.log.resetHistory();
  });

  it('should start the app and play sonification when activated with key 3', () => {
    setHotkeysArgs('3');

    voxlens('chartjs', element, data, options);

    expect(stubs.hotkeys.setScope.called).to.be.true;
    sinon.assert.callCount(stubs.console.log, 2);
    expect(stubs.tone.dispose.called).to.be.true;

    expect(stubs.console.log.getCall(0).args.join('')).to.contain(
      'Key combination issued: option+3'
    );
    expect(stubs.console.log.getCall(1).args.join('')).to.contain(
      'Playing sonification'
    );

    stubs.console.log.resetHistory();
  });

  it('should start the app and log command not recognized when unsupported command issued', () => {
    setHotkeysArgs('a');
    setP5Args('blah', true);

    voxlens('chartjs', element, data, options);

    expect(stubs.hotkeys.setScope.called).to.be.true;
    sinon.assert.callCount(stubs.console.log, 3);

    expect(stubs.console.log.getCall(0).args.join('')).to.contain(
      'Key combination issued: option+a'
    );
    expect(stubs.console.log.getCall(1).args.join('')).to.contain(
      'Command issued: blah'
    );
    expect(stubs.console.log.getCall(2).args.join('')).to.contain(
      'Command not recognized. Please try again.'
    );

    stubs.console.log.resetHistory();
  });

  it('should start the app and log instructions when activated with key 4', () => {
    setHotkeysArgs('4');

    voxlens('chartjs', element, data, options);

    expect(stubs.hotkeys.setScope.called).to.be.true;
    sinon.assert.callCount(stubs.console.log, 3);
    expect(stubs.tone.dispose.called).to.be.true;

    expect(stubs.console.log.getCall(0).args.join('')).to.contain(
      'Key combination issued: option+4'
    );
    expect(stubs.console.log.getCall(1).args.join('')).to.contain(
      'Command issued: instructions'
    );
    expect(stubs.console.log.getCall(2).args.join('')).to.contain(
      "Graph with title: some title. To interact with the graph, press OPTION + A or OPTION + 1 all together and in order. You'll hear a beep sound, after which you can ask a question such as what is the average or what is the maximum value in the graph. To hear the textual summary of the graph, press OPTION + S or OPTION + 2. To hear the audio graph, press OPTION + M or OPTION + 3. To repeat these instructions, press OPTION + I or OPTION + 4. Key combinations must be pressed all together and in order."
    );

    stubs.console.log.resetHistory();
  });

  it('should start the app and perform all operations when multiple commands issued', () => {
    setHotkeysArgs('a');
    setP5Args('minimum mean average blah', true);

    voxlens('chartjs', element, data, options);

    expect(stubs.hotkeys.setScope.called).to.be.true;
    sinon.assert.callCount(stubs.console.log, 4);
    expect(stubs.tone.dispose.called).to.be.true;

    expect(stubs.console.log.getCall(0).args.join('')).to.contain(
      'Key combination issued: option+a'
    );
    expect(stubs.console.log.getCall(1).args.join('')).to.contain(
      'Command issued: average'
    );
    expect(stubs.console.log.getCall(2).args.join('')).to.contain(
      'Command issued: minimum'
    );
    expect(stubs.console.log.getCall(3).args.join('')).to.contain(
      'Average of Y Label for X Label is 1.5. Minimum value of Y Label for X Label is 1 belonging to dummy.'
    );

    stubs.console.log.resetHistory();
  });

  it('should start the app and pause output when activated with key 5', () => {
    setHotkeysArgs('5');

    voxlens('chartjs', element, data, options);

    expect(stubs.hotkeys.setScope.called).to.be.true;
    sinon.assert.callCount(stubs.console.log, 1);
    expect(stubs.tone.dispose.called).to.be.true;

    expect(stubs.console.log.getCall(0).args.join('')).to.contain(
      'Key combination issued: option+5'
    );

    stubs.console.log.resetHistory();
  });

  it('should error out when library is not supported', () => {
    expect(function () {
      voxlens('some-unsupported-library');
    }).to.throw(
      'Library not supported. Supported libraries are: chartjs, d3, googlecharts.'
    );
  });
});

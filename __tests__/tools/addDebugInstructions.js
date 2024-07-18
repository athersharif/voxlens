import { expect } from 'chai';
import addDebugInstructions from '../../src/tools/addDebugInstructions';
import sinon from 'sinon';

const options = {
  x: 'xKey',
  y: 'yKey',
  xLabel: 'dummy',
  yLabel: 'label',
  title: 'some title',
  element: document.getElementById('root'),
  debug: true,
};

describe('addDebugInstructions', () => {
  afterEach(() => {
    document.body.childNodes.forEach((child) => {
      if (child.getAttribute('name') === 'voxlens-instructions')
        document.body.removeChild(child);
    });
  });

  it('should return correct response', () => {
    addDebugInstructions(options);

    expect(document.documentElement.innerHTML).to.contain(
      'You’re now using the VoxLens debug mode'
    );

    expect(document.documentElement.innerHTML).to.contain(
      'Click on the start button to hear what a screen reader'
    );
  });

  it('should return correct response when onlyMain flag is true', () => {
    addDebugInstructions({
      ...options,
      debug: { instructions: { onlyMain: true } },
    });

    expect(document.documentElement.innerHTML).to.not.contain(
      'You’re now using the VoxLens debug mode'
    );

    expect(document.documentElement.innerHTML).to.contain(
      'Click on the start button to hear what a screen reader'
    );
  });

  it('should execute correctly when button pressed', () => {
    const stop = sinon.stub();
    const speak = sinon.stub();

    addDebugInstructions({ ...options, speaker: { stop, speak } });

    const button = document
      .getElementsByName('voxlens-instructions')[0]
      .getElementsByTagName('button')[0];

    button.addEventListener('click', window.playVoxLensInstructions);
    button.click();

    sinon.assert.callCount(stop, 1);
    sinon.assert.callCount(speak, 1);
  });
});

import jsdom from 'jsdom';
import mock from 'mock-require';
import sinon from 'sinon';

const { JSDOM } = jsdom;
const { window } = new JSDOM(
  '<!DOCTYPE html><html><head></head><body><div id="root"><svg id="svg"><circle color="black"></circle><circle color="white"></circle><g></g><text color="black"></text><text color="white"></text></svg><canvas></canvas></div></body></html>',
  {
    url: 'http://localhost',
  }
);

export const stubs = {
  tone: {
    Transport: {
      start: sinon.stub(),
      stop: sinon.stub(),
      clear: sinon.stub(),
    },
    OmniOscillator: () => ({
      toDestination: () => ({
        frequency: { value: null },
        volume: { value: null },
        sync: function () {
          return this;
        },
        start: function () {
          return this;
        },
        stop: function () {
          this.onstop();
          return this;
        },
        onstop: () => {},
        dispose: stubs.tone.dispose,
      }),
    }),
    dispose: sinon.stub(),
  },
};

export const mockUAParser = (name = 'Mac OS') => {
  mock('ua-parser-js', () => ({
    getOS: () => ({ name }),
  }));
};

global.window = window;
global.document = window.document;
global.HTMLElement = window.HTMLElement;
global.screen = window.screen;

global.Image = class {
  constructor() {
    setTimeout(() => {
      this.onload();
    }, 1);
  }
};

const getPropertyValue = (p) => {
  if (p === 'fill' && process.env.CC_NO_FILL === 'true') return 'none';

  if (p === 'stroke' && process.env.CC_NO_STROKE === 'true') return 'none';

  if (process.env.CC_BG_FG_SAME === 'true') return 'rgba(0, 0, 0, 0)';

  if (p === 'background-color') {
    return process.env.CC_COMPLIANT === 'true'
      ? 'rgba(255, 255, 255, 1)'
      : 'rgba(0, 0, 2, 1)';
  }

  return 'rgba(0, 0, 1, 1)';
};

window.getComputedStyle = (e, x) => ({ getPropertyValue });

mock('./src/dependencies/p5Speech.js', {});

mock('lodash/uniqueId', () => 'unique-id');

const checkCompliance = () =>
  process.env.CC_COMPLIANT === 'true' ? true : false;

mock('color-contrast-checker', () => ({
  isLevelCustom: checkCompliance,
  isLevelAA: checkCompliance,
}));

mock('colorthief', () => ({
  getColor: (i) => 'blue',
}));

mock('background-color-recursive', {
  getBackgroundColor: () => 'rgba(0, 0, 0, 0)',
});

mockUAParser();

mock('tone', {
  OmniOscillator: stubs.tone.OmniOscillator,
  Transport: stubs.tone.Transport,
});

mock('p5', {
  Speech: () => {},
  SpeechRec: () => ({
    resultString: process.env.TEST_P5_RESULT || '',
    start: function () {
      this.onStart();
      if (process.env.TEST_P5_FAIL === 'true') {
        this.onError();
      } else {
        this.onResult();
      }
      setTimeout(() => this.onEnd(), 500);
    },
    onStart: () => {},
    onEnd: () => {},
    onResult: () => {},
    onError: () => {},
  }),
});

mock('@emailjs/browser', {
  send: () => {
    if (process.env.FC_SEND_ERROR === 'true') return Promise.reject();

    return Promise.resolve();
  },
});

mock('./src/index.css', {});

const keyMapper = {
  1: 49,
  2: 50,
  3: 51,
  4: 52,
  5: 53,
  a: 65,
  i: 73,
  m: 77,
  p: 80,
  s: 83,
};

export const fireEvent = (key) => {
  window.document.dispatchEvent(
    new window.KeyboardEvent('keydown', {
      keyCode: keyMapper[key],
      code: 'Key' + key.toUpperCase(),
      altKey: true,
      bubbles: true,
    })
  );
};

export const element = {
  setAttribute: () => {},
  children: [{ setAttribute: () => {} }, { setAttribute: () => {} }],
  parentElement: document.body,
  tagName: 'svg',
};

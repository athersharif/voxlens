import jsdom from 'jsdom';
import mock from 'mock-require';
import sinon from 'sinon';

const { JSDOM } = jsdom;
const { window } = new JSDOM(
  '<!DOCTYPE html><html><head></head><body></body></html>',
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
global.navigator = window.navigator;

mock('./src/dependencies/p5Speech.js', {});

mock('lodash/uniqueId', () => 'unique-id');

mockUAParser();

mock('tone', {
  OmniOscillator: stubs.tone.OmniOscillator,
  Transport: stubs.tone.Transport,
});

mock('p5', {
  SpeechRec: () => ({
    resultString: process.env.TEST_P5_RESULT || '',
    start: function () {
      if (process.env.TEST_P5_FAIL === 'true') {
        this.onError();
      } else {
        this.onResult();
      }
    },
    onResult: () => {},
    onError: () => {},
  }),
});

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
};

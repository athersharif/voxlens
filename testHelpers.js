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
  console: {
    error: sinon.stub(),
    log: sinon.stub(),
  },
  hotkeys: {
    setScope: sinon.stub(),
  },
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
global.console = stubs.console;

mock('./src/dependencies/p5Speech.js', {});

mock('lodash/uniqueId', () => 'unique-id');

mockUAParser();

mock('tone', {
  OmniOscillator: stubs.tone.OmniOscillator,
  Transport: stubs.tone.Transport,
});

export const setP5Args = (command, success) => {
  p5Args = { command, success };
};

let p5Args = {
  command: '',
  success: true,
};

mock('p5', {
  SpeechRec: () => ({
    resultString: p5Args.command,
    start: function () {
      if (p5Args.success) {
        this.onResult();
      } else {
        this.onError();
      }
    },
    onResult: () => {},
    onError: () => {},
  }),
});

export const setHotkeysArgs = (letter) => {
  hotkeysArgs = { code: letter };
};

let hotkeysArgs = {
  code: '',
};

const hotkeys = (binds, id, call) => {
  binds = binds.split(',').map((b) => b.split('+').pop());
  const event = {
    code: 'key' + hotkeysArgs.code,
    preventDefault: () => {},
  };

  if (binds.includes(hotkeysArgs.code)) {
    call(event);
  }
};

hotkeys.setScope = stubs.hotkeys.setScope;

mock('hotkeys-js', hotkeys);

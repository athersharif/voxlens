import { expect } from 'chai';
import mock from 'mock-require';
import sinon from 'sinon';
import settings from '../src/settings';
import { mockUAParser } from '../testHelpers';

let utils = require('../src/utils');

describe('utils.js', () => {
  describe('getModifier', () => {
    it('should return correct modifier with default parameters', () => {
      const modifier = utils.getModifier(settings.Windows);

      expect(modifier).to.equal('CTRL + SHIFT');
    });

    it('should return correct modifier when withSpaces is false', () => {
      const modifier = utils.getModifier(settings.Windows, false);

      expect(modifier).to.equal('CTRL+SHIFT');
    });

    it('should return correct modifier when uppercase is false', () => {
      const modifier = utils.getModifier(settings.Windows, false, false);

      expect(modifier).to.equal('ctrl+shift');
    });

    it('should return correct modifier when joining character is specified', () => {
      const modifier = utils.getModifier(settings.Windows, false, false, '-');

      expect(modifier).to.equal('ctrl-shift');
    });

    it('should return correct modifier when modifier is singular', () => {
      const modifier = utils.getModifier(settings.MacOS);

      expect(modifier).to.equal('OPTION');
    });
  });

  describe('getDefaults', () => {
    it('should correctly generate defaults with empty options', () => {
      const defaults = utils.getDefaults();

      expect(defaults.triggers).to.deep.equal({
        mainKey: ['a', '1'],
        instructionsKey: ['i', '4'],
        trendKey: ['m', '3'],
        summaryKey: ['s', '2'],
        pause: ['p', '5'],
      });
      expect(defaults.xLabel).to.be.undefined;
      expect(defaults.yLabel).to.be.undefined;
    });

    it('should correctly generate defaults with options', () => {
      const defaults = utils.getDefaults({ x: 'label1', y: 'label2' });

      expect(defaults.triggers).to.deep.equal({
        mainKey: ['a', '1'],
        instructionsKey: ['i', '4'],
        trendKey: ['m', '3'],
        summaryKey: ['s', '2'],
        pause: ['p', '5'],
      });
      expect(defaults.xLabel).to.equal('label1');
      expect(defaults.yLabel).to.equal('label2');
    });
  });

  describe('createTemporaryElement', () => {
    it('should generate temporary element when os is windows', () => {
      mockUAParser('Windows');
      utils = mock.reRequire('../src/utils');

      utils.createTemporaryElement('random text', { element: document.body });

      const divs = document.getElementsByTagName('div');
      const div = divs[divs.length - 1];

      expect(div.innerHTML).to.equal('random text');
      expect(div.getAttribute('role')).to.equal('alert');

      mockUAParser();
      utils = mock.reRequire('../src/utils');
    });

    it('should generate temporary element when os is mac', () => {
      utils.createTemporaryElement('random text 2', { element: document.body });

      const divs = document.getElementsByTagName('div');
      const div = divs[divs.length - 1];

      expect(div.innerHTML).to.equal('random text 2');
      expect(div.getAttribute('role')).to.be.null;
    });
  });

  describe('validate', () => {
    it('should throw error when options.x is not set', () => {
      expect(() => utils.validate([], {})).to.throw(
        'Independent variable not set.'
      );
    });

    it('should throw error when options.y is not set', () => {
      expect(() => utils.validate([], { x: 'x' })).to.throw(
        'Dependent variable not set.'
      );
    });

    it('should throw error when data is empty', () => {
      expect(() => utils.validate([], { x: 'x', y: 'y' })).to.throw(
        'Dependent variable values are missing or not numeric.'
      );
    });

    it('should throw error when data is not all numeric', () => {
      expect(() => utils.validate(['a', 1, 'b'], { x: 'x', y: 'y' })).to.throw(
        'Dependent variable values are missing or not numeric.'
      );
    });

    it('should throw error when options.title is not set', () => {
      expect(() => utils.validate([1, 2, 3], { x: 'x', y: 'y' })).to.throw(
        'Title not set.'
      );
    });
  });

  describe('getSettings', () => {
    it('should return mac settings when OS is mac', () => {
      const settings = utils.getSettings();

      expect(settings).to.deep.equal({
        listeningText: 'graph listening...',
        processingText: ' ... ',
        multipleModifiers: false,
        modifier: 'option',
      });
    });

    it('should return mac settings when OS is windows', () => {
      mockUAParser('Windows');
      utils = mock.reRequire('../src/utils');

      const settings = utils.getSettings();

      expect(settings).to.deep.equal({
        listeningText: ' ',
        processingText: ' ... ',
        multipleModifiers: false,
        modifier: ['ctrl', 'shift'],
        multipleModifiers: true,
      });

      mockUAParser();
      utils = mock.reRequire('../src/utils');
    });

    it('should return mac settings when OS is other than mac or windows', () => {
      mockUAParser('Linux');
      utils = mock.reRequire('../src/utils');

      const settings = utils.getSettings();

      expect(settings).to.deep.equal({
        listeningText: ' ',
        processingText: ' ... ',
        multipleModifiers: false,
        modifier: 'option',
      });

      mockUAParser();
      utils = mock.reRequire('../src/utils');
    });
  });

  describe('isCommandDuplicate', () => {
    it('should return true when time difference is less than 1000', () => {
      const now = new Date();
      const clock = sinon.useFakeTimers(now.getTime());

      const result = utils.isCommandDuplicate({ command: 'abc', time: now }, [
        { name: 'abc' },
      ]);

      expect(result).to.be.true;

      clock.restore();
    });

    it('should return false when time difference is greater than 1000', () => {
      const now = new Date();
      const clock = sinon.useFakeTimers(now.getTime());

      const result = utils.isCommandDuplicate({ command: 'abc', time: 500 }, [
        { name: 'abc' },
      ]);

      expect(result).to.be.false;

      clock.restore();
    });

    it('should return false when time is not provided', () => {
      const now = new Date();
      const clock = sinon.useFakeTimers(now.getTime());

      const result = utils.isCommandDuplicate({ command: 'abc' }, [
        { name: 'abc' },
      ]);

      expect(result).to.be.false;

      clock.restore();
    });

    it('should return false when command is not the same as last', () => {
      const now = new Date();
      const clock = sinon.useFakeTimers(now.getTime());

      const result = utils.isCommandDuplicate({ command: 'abc' }, [
        { name: 'abc2' },
      ]);

      expect(result).to.be.false;

      clock.restore();
    });
  });

  describe('formatOptions', () => {
    it('should format correctly when single-series data provided', () => {
      const options = {
        xLabel: 'something',
        yLabel: 'dummy',
      };

      const result = utils.formatOptions(options);

      expect(result).to.deep.equal({
        xLabel: 'Something',
        yLabel: 'Dummy',
      });
    });
  });

  it('should format correctly when multi-series data provided', () => {
    const options = {
      xLabel: ['something', 'blah'],
      yLabel: 'dummy',
    };

    const result = utils.formatOptions(options);

    expect(result).to.deep.equal({
      xLabel: 'Blah And Something',
      yLabel: 'Dummy',
    });
  });
});

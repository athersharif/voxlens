import { expect } from 'chai';
import * as helpers from '../../src/commands/helpers';

describe('generateXLabel', () => {
  it('should return correct response when key and type are not defined', () => {
    const options = {
      key: null,
      type: null,
      xLabel: 'some x label',
    };

    const result = helpers.generateXLabel(options);

    expect(result).to.equal('some x label');
  });

  it('should return correct response when key is defined and type is not', () => {
    const options = {
      key: 'some-key',
      type: null,
      xLabel: 'some x label',
    };

    const result = helpers.generateXLabel(options);

    expect(result).to.equal('some-key');
  });

  it('should return correct response when key is nested and type is not', () => {
    const options = {
      key: 'some.key',
      type: null,
      xLabel: 'some x label',
    };

    const result = helpers.generateXLabel(options);

    expect(result).to.equal('key some');
  });

  it('should return correct response when type is region', () => {
    const options = {
      key: 'some.key',
      type: ' region',
      xLabel: 'some x label',
    };

    const result = helpers.generateXLabel(options);

    expect(result).to.equal('key some region');
  });
});

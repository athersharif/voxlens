import { expect } from 'chai';
import colorContrastChecker from '../../src/tools/colorContrastChecker';
import sinon from 'sinon';

const options = {
  x: 'xKey',
  y: 'yKey',
  xLabel: 'dummy',
  yLabel: 'label',
  title: 'some title',
  element: document.getElementsByTagName('svg')[0],
  debug: true,
};

describe('colorContrastChecker', () => {
  let consoleStub = sinon.stub();

  beforeEach(() => {
    consoleStub = sinon.stub(global.console, 'log');
  });

  afterEach(() => {
    consoleStub.restore();

    const root = document.getElementById('root');

    root.childNodes.forEach((child) => {
      if (child.getAttribute('name') === 'voxlens-contrast-checker')
        root.removeChild(child);
    });

    process.env.CC_COMPLIANT = '';
    process.env.CC_BG_FG_SAME = '';
    process.env.CC_NO_FILL = '';
    process.env.CC_NO_STROKE = '';
  });

  it('should return correct response when element is svg', () => {
    process.env.CC_COMPLIANT = 'true';

    colorContrastChecker(options);

    expect(document.documentElement.innerHTML).to.contain(
      'Contrast checker is experimental'
    );

    expect(document.documentElement.innerHTML).to.contain(
      'All colors have a compliant ratio with the background (#FFFFFF) based on WCAG 2.1 level AA standards'
    );
  });

  it('should return correct response when element is svg and not in compliance', () => {
    process.env.CC_COMPLIANT = 'false';

    colorContrastChecker(options);

    expect(document.documentElement.innerHTML).to.contain(
      'Contrast checker is experimental'
    );

    expect(document.documentElement.innerHTML).to.contain(
      'Found the following color(s) that have a low contrast ratio with the background (#000002) based on WCAG 2.1 level AA standards'
    );
  });

  it('should return correct response when element is canvas', (done) => {
    process.env.CC_COMPLIANT = 'true';

    const element = document.getElementsByTagName('canvas')[0];
    element.toDataURL = () => 'data:image/png;base64,';

    colorContrastChecker({ ...options, element });

    setTimeout(() => {
      expect(document.documentElement.innerHTML).to.contain(
        'Contrast checker is experimental'
      );

      expect(document.documentElement.innerHTML).to.contain(
        'All colors have a compliant ratio with the background (#FFFFFF) based on WCAG 2.1 level AA standards.'
      );

      done();
    }, 100);
  });

  it('should return correct response when element is canvas and image not loaded', (done) => {
    process.env.CC_COMPLIANT = 'true';

    const element = document.getElementsByTagName('canvas')[0];
    element.toDataURL = () => 'data:image/png;base64,blah';

    colorContrastChecker({ ...options, element });

    setTimeout(() => {
      element.toDataURL = () => 'data:image/png;base64,';

      expect(document.documentElement.innerHTML).to.contain(
        'Contrast checker is experimental'
      );

      expect(document.documentElement.innerHTML).to.contain(
        'All colors have a compliant ratio with the background (#FFFFFF) based on WCAG 2.1 level AA standards.'
      );

      done();
    }, 1000);
  });

  it('should return correct response when element is canvas and not in compliance', (done) => {
    process.env.CC_COMPLIANT = 'false';

    const element = document.getElementsByTagName('canvas')[0];
    element.toDataURL = () => 'data:image/png;base64,';

    colorContrastChecker({ ...options, element });

    setTimeout(() => {
      expect(document.documentElement.innerHTML).to.contain(
        'Contrast checker is experimental'
      );

      expect(document.documentElement.innerHTML).to.contain(
        'Found the following color(s) that have a low contrast ratio with the background (#000002) based on WCAG 2.1 level AA standards'
      );

      done();
    }, 100);
  });

  it('should return correct response when background and foreground colors are the same', () => {
    process.env.CC_COMPLIANT = 'true';
    process.env.CC_BG_FG_SAME = 'true';

    colorContrastChecker(options);

    expect(document.documentElement.innerHTML).to.contain(
      'Contrast checker is experimental'
    );

    expect(document.documentElement.innerHTML).to.contain(
      'All colors have a compliant ratio with the background (#000000) based on WCAG 2.1 level AA standards'
    );
  });

  it('should return correct response when no fill', () => {
    process.env.CC_COMPLIANT = 'true';
    process.env.CC_NO_FILL = 'true';

    colorContrastChecker(options);

    expect(document.documentElement.innerHTML).to.contain(
      'Contrast checker is experimental'
    );

    expect(document.documentElement.innerHTML).to.contain(
      'All colors have a compliant ratio with the background (#FFFFFF) based on WCAG 2.1 level AA standards'
    );
  });

  it('should return correct response when no stroke', () => {
    process.env.CC_COMPLIANT = 'true';
    process.env.CC_NO_STROKE = 'true';

    colorContrastChecker(options);

    expect(document.documentElement.innerHTML).to.contain(
      'Contrast checker is experimental'
    );

    expect(document.documentElement.innerHTML).to.contain(
      'All colors have a compliant ratio with the background (#FFFFFF) based on WCAG 2.1 level AA standards'
    );
  });

  it('should return correct response when no fill and no stroke', () => {
    process.env.CC_COMPLIANT = 'true';
    process.env.CC_NO_FILL = 'true';
    process.env.CC_NO_STROKE = 'true';

    colorContrastChecker(options);

    expect(document.documentElement.innerHTML).to.contain(
      'Contrast checker is experimental'
    );

    expect(document.documentElement.innerHTML).to.contain(
      'All colors have a compliant ratio with the background (#FFFFFF) based on WCAG 2.1 level AA standards'
    );
  });

  it('should return correct response when element is neither svg nor canvas', () => {
    colorContrastChecker({ ...options, element: document.body });

    expect(document.documentElement.innerHTML).to.not.contain(
      'Contrast checker is experimental'
    );

    expect(document.documentElement.innerHTML).to.not.contain(
      'All colors have a compliant ratio with the background (#000000) based on WCAG 2.1 level AA standards'
    );
  });
});

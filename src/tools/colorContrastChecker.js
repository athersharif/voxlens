import Color from 'color';
import ColorContrastChecker from 'color-contrast-checker';
import { getBackgroundColor } from 'background-color-recursive';
import round from 'lodash/round';
import uniq from 'lodash/uniq';
import ColorThief from 'colorthief';

const fetchBackgroundColorFromElement = (element) => {
  let color = window
    .getComputedStyle(element, null)
    .getPropertyValue('background-color');

  if (color === 'rgba(0, 0, 0, 0)')
    color = getBackgroundColor(element.parentElement);

  return Color(color).hex();
};

const traverseSVGElements = (element) => {
  let elements = [];

  element.childNodes.forEach((child) => {
    elements.push(...traverseSVGElements(child));
  });

  if (element.tagName && element.tagName !== 'svg' && element.tagName !== 'g') {
    const fill = window
      .getComputedStyle(element, null)
      .getPropertyValue('fill');
    const stroke = window
      .getComputedStyle(element, null)
      .getPropertyValue('stroke');
    const size = window
      .getComputedStyle(element, null)
      .getPropertyValue('font-size');
    const content = element.tagName === 'text' ? element.innerHTML : null;

    if (fill === 'none' && stroke === 'none') return [];

    const color = Color(fill === 'none' ? stroke : fill).hex();

    elements.push({ color, content, size, type: element.tagName });
  }

  return elements;
};

const addHtmlFeedback = (options, violations, inspectedElements) => {
  let html = '<div name="voxlens-contrast-checker">';

  const experimentalHtml = `
    <span>
      <strong>Contrast checker is experimental.</strong>
    <span>
  `;

  html += experimentalHtml;

  if (inspectedElements) {
    const inspectedElementsHtml =
      '<span>Inspected ' + inspectedElements.toString() + ' elements. ';

    html += inspectedElementsHtml;
  }

  const backgroundColor = violations[0];
  const foregroundColors = uniq(violations[1].map((c) => c.foregroundColor));

  let violationsHtml = '<span>';

  if (foregroundColors.length === 0)
    violationsHtml +=
      'All colors have a compliant ratio with the background (' +
      backgroundColor +
      ') based on WCAG 2.1 level AA standards.';
  else {
    console.log('non-compliant elements: ', violations[1]);

    violationsHtml +=
      'Found the following color(s) that have a low contrast ratio with the background (' +
      backgroundColor +
      ') based on WCAG 2.1 level AA standards: ' +
      foregroundColors
        .map((c) => '<span style="color: ' + c + '">' + c + '</span>')
        .join(' | ') +
      '. View the console for detailed information.';
  }

  violationsHtml += '</span>';

  html += violationsHtml;
  html += '</div>';

  options.element.insertAdjacentHTML('afterend', html);
};

export default (options) => {
  const { element } = options;
  const contrastChecker = new ColorContrastChecker();
  const backgroundColor = fetchBackgroundColorFromElement(element);
  const ratioStandard = 3;

  const checkForCompliance = (options) => {
    const { backgroundColor, foregroundColor } = options;

    if (backgroundColor === foregroundColor) return true;

    return options.custom
      ? contrastChecker.isLevelCustom(
          backgroundColor,
          foregroundColor,
          options.ratio
        )
      : contrastChecker.isLevelAA(
          backgroundColor,
          foregroundColor,
          options.size
        );
  };

  const violations = [];

  violations.push(backgroundColor);
  violations.push([]);

  if (element.tagName.toLowerCase() === 'svg') {
    const svgElements = traverseSVGElements(element);
    const graphicalElements = svgElements.filter((e) => e.type !== 'text');
    const textElements = svgElements.filter((e) => e.type === 'text');

    graphicalElements.forEach((e) => {
      const isCompliant = checkForCompliance({
        backgroundColor,
        custom: true,
        foregroundColor: e.color,
        ratio: ratioStandard,
      });

      if (!isCompliant) {
        violations[1].push({
          backgroundColor,
          foregroundColor: e.color,
          type: e.type,
        });
      }
    });

    textElements.forEach((e) => {
      const isCompliant = checkForCompliance({
        backgroundColor,
        foregroundColor: e.color,
        size: e.size,
      });

      if (!isCompliant) {
        violations[1].push({
          backgroundColor,
          foregroundColor: e.color,
          text: e.content,
          type: e.type,
        });
      }
    });

    addHtmlFeedback(options, violations, svgElements.length);
  } else if (element.tagName.toLowerCase() === 'canvas') {
    const colorThief = new ColorThief();

    const head = 'data:image/png;base64,';
    let size = 0;

    const getSize = () =>
      round(((element.toDataURL().length - head.length) * 3) / 4);

    const getImage = () => {
      const newSize = getSize();

      if (size === newSize) {
        const image = new Image();
        image.src = element.toDataURL();
        image.onload = () => {
          const color = Color.rgb(colorThief.getColor(image)).hex();

          const isCompliant = checkForCompliance({
            backgroundColor,
            custom: true,
            foregroundColor: color,
            ratio: ratioStandard,
          });

          if (!isCompliant) {
            violations[1].push({
              backgroundColor,
              foregroundColor: color,
            });
          }

          addHtmlFeedback(options, violations);
        };

        return image;
      } else {
        size = newSize;
        setTimeout(getImage, 500);
      }
    };

    getImage();
  }
};

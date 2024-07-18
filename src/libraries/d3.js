/**
 * @namespace libraries.d3
 */

import isArray from 'lodash/isArray';

/**
 * Initiator for D3 library to connect with voxlens
 * @memberOf libraries.d3
 * @param {Object} element - Object that contains the container for the viz.
 * @returns {Object} - Object containing the viewport element, data, and options
 */
export default (element) => {
  let data = element.data();
  let svgFound = false;

  if (isArray(data[0])) data = data[0];

  let viewportElement = element.node();

  while (!svgFound && viewportElement) {
    const tag = viewportElement.tagName?.toLowerCase();

    if (tag !== 'body' && tag !== 'svg')
      viewportElement = viewportElement.parentElement;
    else {
      if (tag === 'body') viewportElement = element.node();
      svgFound = true;
    }
  }

  return {
    data,
    viewportElement,
  };
};

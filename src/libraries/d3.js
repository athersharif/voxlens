/**
 * @namespace libraries.d3
 */

import isArray from 'lodash/isArray';

/**
 * Initiator for D3 library to connect with voxlens
 * @memberOf libraries.d3
 * @param {Object} viewportElement - Object that contains the container for the viz.
 * @returns {Object} - Object containing the viewport element, data, and options
 */
const setup = (viewportElement) => {
  let data = viewportElement.data();
  if (isArray(data[0])) data = data[0];

  viewportElement =
    viewportElement.node().parentElement.parentElement.parentElement;

  return {
    data,
    viewportElement,
  };
};

export default setup;

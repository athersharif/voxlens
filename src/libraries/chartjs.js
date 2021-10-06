/**
 * @namespace libraries.chartJS
 */

/**
 * Initiator for ChartJS library to connect with voxlens
 * @memberOf libraries.chartJS
 * @param {Object} viewportElement - Object that contains the container for the viz.
 * @param {Object[]} data - The raw json data used to create the viz.
 * @returns {Object} - Object containing the viewport element, data, and options
 */
const setup = (viewportElement, data) => ({
  data,
  viewportElement,
});

export default setup;

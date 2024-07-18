/**
 * @namespace libraries.googleCharts
 */

/**
 * Initiator for Google Charts library to connect with voxlens
 * @memberOf libraries.googleCharts
 * @param {Object} viewportElement - Object that contains the container for the viz.
 * @param {Object[]} data - The raw json data used to create the viz.
 * @returns {Object} - Object containing the viewport element, data, and options
 */
export default (viewportElement, data) => ({
  data,
  viewportElement: viewportElement.container?.getElementsByTagName('svg')[0],
});

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _DefaultExportValue = function _DefaultExportValue(viewportElement, data) {
  var _viewportElement$cont;
  return {
    data: data,
    viewportElement: (_viewportElement$cont = viewportElement.container) === null || _viewportElement$cont === void 0 ? void 0 : _viewportElement$cont.getElementsByTagName('svg')[0]
  };
};
var _default = _DefaultExportValue;
exports["default"] = _default;
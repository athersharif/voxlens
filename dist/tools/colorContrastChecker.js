"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__ResetDependency__ = _reset__;
exports.__RewireAPI__ = void 0;
exports.__set__ = exports.__Rewire__ = _set__;
exports.__GetDependency__ = exports.__get__ = _get__;
exports["default"] = void 0;
var _color = _interopRequireDefault(require("color"));
var _colorContrastChecker = _interopRequireDefault(require("color-contrast-checker"));
var _backgroundColorRecursive = require("background-color-recursive");
var _round = _interopRequireDefault(require("lodash/round"));
var _uniq = _interopRequireDefault(require("lodash/uniq"));
var _colorthief = _interopRequireDefault(require("colorthief"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var fetchBackgroundColorFromElement = function fetchBackgroundColorFromElement(element) {
  var color = window.getComputedStyle(element, null).getPropertyValue('background-color');
  if (color === 'rgba(0, 0, 0, 0)') color = _get__("getBackgroundColor")(element.parentElement);
  return _get__("Color")(color).hex();
};
var traverseSVGElements = function traverseSVGElements(element) {
  var elements = [];
  element.childNodes.forEach(function (child) {
    elements.push.apply(elements, _toConsumableArray(_get__("traverseSVGElements")(child)));
  });
  if (element.tagName && element.tagName !== 'svg' && element.tagName !== 'g') {
    var fill = window.getComputedStyle(element, null).getPropertyValue('fill');
    var stroke = window.getComputedStyle(element, null).getPropertyValue('stroke');
    var size = window.getComputedStyle(element, null).getPropertyValue('font-size');
    var content = element.tagName === 'text' ? element.innerHTML : null;
    if (fill === 'none' && stroke === 'none') return [];
    var color = _get__("Color")(fill === 'none' ? stroke : fill).hex();
    elements.push({
      color: color,
      content: content,
      size: size,
      type: element.tagName
    });
  }
  return elements;
};
var addHtmlFeedback = function addHtmlFeedback(options, violations, inspectedElements) {
  var html = '<div name="voxlens-contrast-checker">';
  var experimentalHtml = "\n    <span>\n      <strong>Contrast checker is experimental.</strong>\n    <span>\n  ";
  html += experimentalHtml;
  if (inspectedElements) {
    var inspectedElementsHtml = '<span>Inspected ' + inspectedElements.toString() + ' elements. ';
    html += inspectedElementsHtml;
  }
  var backgroundColor = violations[0];
  var foregroundColors = _get__("uniq")(violations[1].map(function (c) {
    return c.foregroundColor;
  }));
  var violationsHtml = '<span>';
  if (foregroundColors.length === 0) violationsHtml += 'All colors have a compliant ratio with the background (' + backgroundColor + ') based on WCAG 2.1 level AA standards.';else {
    console.log('non-compliant elements: ', violations[1]);
    violationsHtml += 'Found the following color(s) that have a low contrast ratio with the background (' + backgroundColor + ') based on WCAG 2.1 level AA standards: ' + foregroundColors.map(function (c) {
      return '<span style="color: ' + c + '">' + c + '</span>';
    }).join(' | ') + '. View the console for detailed information.';
  }
  violationsHtml += '</span>';
  html += violationsHtml;
  html += '</div>';
  options.element.insertAdjacentHTML('afterend', html);
};
var _DefaultExportValue = function _DefaultExportValue(options) {
  var element = options.element;
  var contrastChecker = new (_get__("ColorContrastChecker"))();
  var backgroundColor = _get__("fetchBackgroundColorFromElement")(element);
  var ratioStandard = 3;
  var checkForCompliance = function checkForCompliance(options) {
    var backgroundColor = options.backgroundColor,
      foregroundColor = options.foregroundColor;
    if (backgroundColor === foregroundColor) return true;
    return options.custom ? contrastChecker.isLevelCustom(backgroundColor, foregroundColor, options.ratio) : contrastChecker.isLevelAA(backgroundColor, foregroundColor, options.size);
  };
  var violations = [];
  violations.push(backgroundColor);
  violations.push([]);
  if (element.tagName.toLowerCase() === 'svg') {
    var svgElements = _get__("traverseSVGElements")(element);
    var graphicalElements = svgElements.filter(function (e) {
      return e.type !== 'text';
    });
    var textElements = svgElements.filter(function (e) {
      return e.type === 'text';
    });
    graphicalElements.forEach(function (e) {
      var isCompliant = checkForCompliance({
        backgroundColor: backgroundColor,
        custom: true,
        foregroundColor: e.color,
        ratio: ratioStandard
      });
      if (!isCompliant) {
        violations[1].push({
          backgroundColor: backgroundColor,
          foregroundColor: e.color,
          type: e.type
        });
      }
    });
    textElements.forEach(function (e) {
      var isCompliant = checkForCompliance({
        backgroundColor: backgroundColor,
        foregroundColor: e.color,
        size: e.size
      });
      if (!isCompliant) {
        violations[1].push({
          backgroundColor: backgroundColor,
          foregroundColor: e.color,
          text: e.content,
          type: e.type
        });
      }
    });
    _get__("addHtmlFeedback")(options, violations, svgElements.length);
  } else if (element.tagName.toLowerCase() === 'canvas') {
    var colorThief = new (_get__("ColorThief"))();
    var head = 'data:image/png;base64,';
    var size = 0;
    var getSize = function getSize() {
      return _get__("round")((element.toDataURL().length - head.length) * 3 / 4);
    };
    var getImage = function getImage() {
      var newSize = getSize();
      if (size === newSize) {
        var image = new Image();
        image.src = element.toDataURL();
        image.onload = function () {
          var color = _get__("Color").rgb(colorThief.getColor(image)).hex();
          var isCompliant = checkForCompliance({
            backgroundColor: backgroundColor,
            custom: true,
            foregroundColor: color,
            ratio: ratioStandard
          });
          if (!isCompliant) {
            violations[1].push({
              backgroundColor: backgroundColor,
              foregroundColor: color
            });
          }
          _get__("addHtmlFeedback")(options, violations);
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
var _default = _DefaultExportValue;
exports["default"] = _default;
function _getGlobalObject() {
  try {
    if (!!global) {
      return global;
    }
  } catch (e) {
    try {
      if (!!window) {
        return window;
      }
    } catch (e) {
      return this;
    }
  }
}
;
var _RewireModuleId__ = null;
function _getRewireModuleId__() {
  if (_RewireModuleId__ === null) {
    var globalVariable = _getGlobalObject();
    if (!globalVariable.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__) {
      globalVariable.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ = 0;
    }
    _RewireModuleId__ = __$$GLOBAL_REWIRE_NEXT_MODULE_ID__++;
  }
  return _RewireModuleId__;
}
function _getRewireRegistry__() {
  var theGlobalVariable = _getGlobalObject();
  if (!theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__) {
    theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
  }
  return theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__;
}
function _getRewiredData__() {
  var moduleId = _getRewireModuleId__();
  var registry = _getRewireRegistry__();
  var rewireData = registry[moduleId];
  if (!rewireData) {
    registry[moduleId] = Object.create(null);
    rewireData = registry[moduleId];
  }
  return rewireData;
}
(function registerResetAll() {
  var theGlobalVariable = _getGlobalObject();
  if (!theGlobalVariable['__rewire_reset_all__']) {
    theGlobalVariable['__rewire_reset_all__'] = function () {
      theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
    };
  }
})();
var INTENTIONAL_UNDEFINED = '__INTENTIONAL_UNDEFINED__';
var _RewireAPI__ = {};
exports.__RewireAPI__ = _RewireAPI__;
(function () {
  function addPropertyToAPIObject(name, value) {
    Object.defineProperty(_RewireAPI__, name, {
      value: value,
      enumerable: false,
      configurable: true
    });
  }
  addPropertyToAPIObject('__get__', _get__);
  addPropertyToAPIObject('__GetDependency__', _get__);
  addPropertyToAPIObject('__Rewire__', _set__);
  addPropertyToAPIObject('__set__', _set__);
  addPropertyToAPIObject('__reset__', _reset__);
  addPropertyToAPIObject('__ResetDependency__', _reset__);
  addPropertyToAPIObject('__with__', _with__);
})();
function _get__(variableName) {
  var rewireData = _getRewiredData__();
  if (rewireData[variableName] === undefined) {
    return _get_original__(variableName);
  } else {
    var value = rewireData[variableName];
    if (value === INTENTIONAL_UNDEFINED) {
      return undefined;
    } else {
      return value;
    }
  }
}
function _get_original__(variableName) {
  switch (variableName) {
    case "getBackgroundColor":
      return _backgroundColorRecursive.getBackgroundColor;
    case "Color":
      return _color["default"];
    case "traverseSVGElements":
      return traverseSVGElements;
    case "uniq":
      return _uniq["default"];
    case "ColorContrastChecker":
      return _colorContrastChecker["default"];
    case "fetchBackgroundColorFromElement":
      return fetchBackgroundColorFromElement;
    case "addHtmlFeedback":
      return addHtmlFeedback;
    case "ColorThief":
      return _colorthief["default"];
    case "round":
      return _round["default"];
  }
  return undefined;
}
function _assign__(variableName, value) {
  var rewireData = _getRewiredData__();
  if (rewireData[variableName] === undefined) {
    return _set_original__(variableName, value);
  } else {
    return rewireData[variableName] = value;
  }
}
function _set_original__(variableName, _value) {
  switch (variableName) {}
  return undefined;
}
function _update_operation__(operation, variableName, prefix) {
  var oldValue = _get__(variableName);
  var newValue = operation === '++' ? oldValue + 1 : oldValue - 1;
  _assign__(variableName, newValue);
  return prefix ? newValue : oldValue;
}
function _set__(variableName, value) {
  var rewireData = _getRewiredData__();
  if (_typeof(variableName) === 'object') {
    Object.keys(variableName).forEach(function (name) {
      rewireData[name] = variableName[name];
    });
    return function () {
      Object.keys(variableName).forEach(function (name) {
        _reset__(variableName);
      });
    };
  } else {
    if (value === undefined) {
      rewireData[variableName] = INTENTIONAL_UNDEFINED;
    } else {
      rewireData[variableName] = value;
    }
    return function () {
      _reset__(variableName);
    };
  }
}
function _reset__(variableName) {
  var rewireData = _getRewiredData__();
  delete rewireData[variableName];
  if (Object.keys(rewireData).length == 0) {
    delete _getRewireRegistry__()[_getRewireModuleId__];
  }
  ;
}
function _with__(object) {
  var rewireData = _getRewiredData__();
  var rewiredVariableNames = Object.keys(object);
  var previousValues = {};
  function reset() {
    rewiredVariableNames.forEach(function (variableName) {
      rewireData[variableName] = previousValues[variableName];
    });
  }
  return function (callback) {
    rewiredVariableNames.forEach(function (variableName) {
      previousValues[variableName] = rewireData[variableName];
      rewireData[variableName] = object[variableName];
    });
    var result = callback();
    if (!!result && typeof result.then == 'function') {
      result.then(reset)["catch"](reset);
    } else {
      reset();
    }
    return result;
  };
}
var _typeOfOriginalExport = _typeof(_DefaultExportValue);
function addNonEnumerableProperty(name, value) {
  Object.defineProperty(_DefaultExportValue, name, {
    value: value,
    enumerable: false,
    configurable: true
  });
}
if ((_typeOfOriginalExport === 'object' || _typeOfOriginalExport === 'function') && Object.isExtensible(_DefaultExportValue)) {
  addNonEnumerableProperty('__get__', _get__);
  addNonEnumerableProperty('__GetDependency__', _get__);
  addNonEnumerableProperty('__Rewire__', _set__);
  addNonEnumerableProperty('__set__', _set__);
  addNonEnumerableProperty('__reset__', _reset__);
  addNonEnumerableProperty('__ResetDependency__', _reset__);
  addNonEnumerableProperty('__with__', _with__);
  addNonEnumerableProperty('__RewireAPI__', _RewireAPI__);
}
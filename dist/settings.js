"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__ResetDependency__ = _reset__;
exports.__RewireAPI__ = void 0;
exports.__set__ = exports.__Rewire__ = _set__;
exports.__GetDependency__ = exports.__get__ = _get__;
exports["default"] = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var defaultSettings = {
  listeningText: ' ',
  processingText: ' ... ',
  multipleModifiers: false,
  modifier: 'option'
};
var _DefaultExportValue = {
  MacOS: _objectSpread(_objectSpread({}, _get__("defaultSettings")), {}, {
    listeningText: 'graph listening...'
  }),
  Windows: _objectSpread(_objectSpread({}, _get__("defaultSettings")), {}, {
    modifier: ['ctrl', 'shift'],
    multipleModifiers: true
  }),
  "default": _get__("defaultSettings")
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
    case "defaultSettings":
      return defaultSettings;
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
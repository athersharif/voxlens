"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__ResetDependency__ = _reset__;
exports.__RewireAPI__ = void 0;
exports.__set__ = exports.__Rewire__ = _set__;
exports.__GetDependency__ = exports.__get__ = _get__;
exports["default"] = void 0;
var _defaults = _interopRequireDefault(require("defaults"));
var _p = _interopRequireDefault(require("p5"));
var Tone = _interopRequireWildcard(require("tone"));
var _hotkeysJs = _interopRequireDefault(require("hotkeys-js"));
var _uniqueId = _interopRequireDefault(require("lodash/uniqueId"));
var _sonifier = _interopRequireWildcard(require("sonifier"));
var _commands = require("./commands");
var _libraries = _interopRequireDefault(require("./libraries"));
var _tools = _interopRequireDefault(require("./tools"));
var _utils = require("./utils");
require("./index.css");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
require('./dependencies/p5Speech');
var lastIssuedCommand = {
  command: null,
  time: null
};
var oscillations = [];
var isListening = false;
var SETTINGS = _get__("getSettings")();
var startApp = function startApp(data, options, hotKeysId) {
  var listeningKeys = _get__("getModifier")(_get__("SETTINGS"), false, false);
  _get__("hotkeys").setScope(hotKeysId);
  var reset = function reset(event) {
    var _options$speaker;
    _get__("logKeyPresses")(listeningKeys, event);
    event.preventDefault();
    _get__("resetSonifier")(_get__("Tone"), _get__("oscillations"));
    _assign__("oscillations", []);
    (_options$speaker = options.speaker) === null || _options$speaker === void 0 || _options$speaker.stop();
  };
  _get__("hotkeys")(_get__("getKeyBinds")(listeningKeys, options.triggers.mainKey), hotKeysId, function (event) {
    var mic = new (_get__("p5").SpeechRec)();
    mic.onStart = function () {
      return _assign__("isListening", true);
    };
    mic.onEnd = function () {
      return _assign__("isListening", false);
    };
    mic.onResult = function () {
      reset(event);
      var voiceText = mic.resultString.toLowerCase();
      var result = _get__("processCommand")(voiceText, data, options, true, _get__("lastIssuedCommand"));
      if (result) {
        _get__("speakResponse")(result.response, options);
        _assign__("lastIssuedCommand", result.lastIssuedCommand);
      }
    };
    mic.onError = function () {
      reset(event);
      var error = 'Command not recognized. Please try again.';
      console.log('[VoxLens] ' + error);
      _get__("createTemporaryElement")(error, options);
      _get__("speakResponse")(error, options);
    };
    reset(event);
    mic.start();
    var beep = new (_get__("Tone").OmniOscillator)('C4', 'sawtooth').toDestination();
    beep.frequency.value = 300;
    beep.volume.value = -20;
    beep.onstop = function () {
      return beep.dispose();
    };
    beep.sync().start().stop(0.5);
    _get__("oscillations").push(beep);
    _get__("Tone").Transport.start();
  });
  _get__("hotkeys")(_get__("getKeyBinds")(listeningKeys, options.triggers.instructionsKey), hotKeysId, function (event) {
    if (_get__("isListening")) return;
    reset(event);
    var result = _get__("processCommand")('instructions', data, options, false, _get__("lastIssuedCommand"));
    if (result) {
      _get__("speakResponse")(result.response, options);
      _assign__("lastIssuedCommand", result.lastIssuedCommand);
    }
  });
  _get__("hotkeys")(_get__("getKeyBinds")(listeningKeys, options.triggers.trendKey), hotKeysId, function (event) {
    var _get__2;
    if (_get__("isCommandDuplicate")(_get__("lastIssuedCommand"), [{
      name: 'trend'
    }]) || _get__("isListening")) return;
    _assign__("lastIssuedCommand", {
      command: 'trend',
      time: Date.now()
    });
    reset(event);
    _get__("createTemporaryElement")(_get__("SETTINGS").processingText, _objectSpread(_objectSpread({}, options), {}, {
      stopElement: true
    }));
    (_get__2 = _get__("oscillations")).push.apply(_get__2, _toConsumableArray(_get__("sonifier")(_get__("Tone"), data)));
  });
  _get__("hotkeys")(_get__("getKeyBinds")(listeningKeys, options.triggers.summaryKey), hotKeysId, function (event) {
    if (_get__("isListening")) return;
    reset(event);
    var result = _get__("processCommand")('summary', data, options, false, _get__("lastIssuedCommand"));
    if (result) {
      _get__("speakResponse")(result.response, options);
      _assign__("lastIssuedCommand", result.lastIssuedCommand);
    }
  });
  _get__("hotkeys")(_get__("getKeyBinds")(listeningKeys, options.triggers.pause), hotKeysId, function (event) {
    reset(event);
    _get__("createTemporaryElement")(_get__("SETTINGS").processingText, _objectSpread(_objectSpread({}, options), {}, {
      stopElement: true
    }));
  });
};
var run = function run(viewportElement, data, options) {
  var _document$getElements, _document$getElements2, _options$debug;
  options = _get__("formatOptions")(_get__("defaults")(options, _get__("getDefaults")(options)));
  var _options = options,
    title = _options.title,
    triggers = _options.triggers,
    x = _options.x,
    y = _options.y;
  var hotkeysId = _get__("uniqueId")();
  var metadataKey = 'vx_metadata';
  var isMetaDataPresent = data.every(function (d) {
    return d[metadataKey] != null && d[metadataKey]['isAverage'];
  });
  if (isMetaDataPresent) {
    data = data.map(function (d) {
      return _objectSpread(_objectSpread({}, d), {}, _defineProperty({}, metadataKey, _get__("computeMetadata")(d[metadataKey], d[y])));
    });
    data = _get__("addVariationInformation")(data);
  }
  data = _objectSpread({
    x: _get__("getArrayFromObject")(data, x),
    y: _get__("getArrayFromObject")(data, y)
  }, isMetaDataPresent ? {
    metadata: _get__("getArrayFromObject")(data, metadataKey)
  } : {});
  (_document$getElements = document.getElementsByName('voxlens-response')[0]) === null || _document$getElements === void 0 || _document$getElements.remove();
  (_document$getElements2 = document.getElementsByName('voxlens-error-message')[0]) === null || _document$getElements2 === void 0 || _document$getElements2.remove();
  if (options.debug && ((_options$debug = options.debug) === null || _options$debug === void 0 || (_options$debug = _options$debug.responses) === null || _options$debug === void 0 ? void 0 : _options$debug.onlyText) !== true) {
    options = _objectSpread(_objectSpread({}, options), {}, {
      speaker: new (_get__("p5").Speech)()
    });
  }
  _get__("validate")(data.y, options);
  options.element = viewportElement;
  _get__("generateInstructions")(options.element, triggers, title, _get__("SETTINGS"));
  _get__("startApp")(data, options, hotkeysId);
  if (options.debug) {
    if (options.debug.instructions !== false) {
      _get__("tools").addDebugInstructions(options);
    }
    if (options.debug.contrastChecker !== false) {
      _get__("tools").checkColorContrast(options);
    }
  }
  if (options.feedbackCollector) {
    _get__("tools").feedbackCollector(options);
  }
};
var voxlens = function voxlens(library, container, vizData) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  try {
    var setup = _get__("libraries")[library];
    if (setup) {
      var _setup = setup(container, vizData),
        data = _setup.data,
        viewportElement = _setup.viewportElement;
      _get__("run")(viewportElement, data, options);
    } else {
      throw new TypeError('Library not supported. Supported libraries are: ' + Object.keys(_get__("libraries")).join(', ') + '.');
    }
  } catch (error) {
    var message = 'VoxLens error: ' + error.message;
    console.log(message);
    if (options.debug) _get__("createTemporaryElement")(message, _objectSpread(_objectSpread({}, options), {}, {
      element: document.body.firstChild,
      name: 'voxlens-error-message'
    }));
  }
};
var _default = _get__("voxlens");
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
    case "getSettings":
      return _utils.getSettings;
    case "getModifier":
      return _utils.getModifier;
    case "SETTINGS":
      return SETTINGS;
    case "hotkeys":
      return _hotkeysJs["default"];
    case "logKeyPresses":
      return _utils.logKeyPresses;
    case "resetSonifier":
      return _sonifier.resetSonifier;
    case "Tone":
      return _filterWildcardImport__(Tone);
    case "oscillations":
      return oscillations;
    case "getKeyBinds":
      return _utils.getKeyBinds;
    case "p5":
      return _p["default"];
    case "isListening":
      return isListening;
    case "processCommand":
      return _commands.processCommand;
    case "lastIssuedCommand":
      return lastIssuedCommand;
    case "speakResponse":
      return _utils.speakResponse;
    case "createTemporaryElement":
      return _utils.createTemporaryElement;
    case "isCommandDuplicate":
      return _utils.isCommandDuplicate;
    case "sonifier":
      return _sonifier["default"];
    case "formatOptions":
      return _utils.formatOptions;
    case "defaults":
      return _defaults["default"];
    case "getDefaults":
      return _utils.getDefaults;
    case "uniqueId":
      return _uniqueId["default"];
    case "computeMetadata":
      return _utils.computeMetadata;
    case "addVariationInformation":
      return _utils.addVariationInformation;
    case "getArrayFromObject":
      return _utils.getArrayFromObject;
    case "validate":
      return _utils.validate;
    case "generateInstructions":
      return _utils.generateInstructions;
    case "startApp":
      return startApp;
    case "tools":
      return _tools["default"];
    case "libraries":
      return _libraries["default"];
    case "run":
      return run;
    case "voxlens":
      return voxlens;
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
  switch (variableName) {
    case "oscillations":
      return oscillations = _value;
    case "isListening":
      return isListening = _value;
    case "lastIssuedCommand":
      return lastIssuedCommand = _value;
  }
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
var _typeOfOriginalExport = _typeof(voxlens);
function addNonEnumerableProperty(name, value) {
  Object.defineProperty(voxlens, name, {
    value: value,
    enumerable: false,
    configurable: true
  });
}
if ((_typeOfOriginalExport === 'object' || _typeOfOriginalExport === 'function') && Object.isExtensible(voxlens)) {
  addNonEnumerableProperty('__get__', _get__);
  addNonEnumerableProperty('__GetDependency__', _get__);
  addNonEnumerableProperty('__Rewire__', _set__);
  addNonEnumerableProperty('__set__', _set__);
  addNonEnumerableProperty('__reset__', _reset__);
  addNonEnumerableProperty('__ResetDependency__', _reset__);
  addNonEnumerableProperty('__with__', _with__);
  addNonEnumerableProperty('__RewireAPI__', _RewireAPI__);
}
function _filterWildcardImport__() {
  var wildcardImport = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var validPropertyNames = Object.keys(wildcardImport).filter(function (propertyName) {
    return propertyName !== '__get__' && propertyName !== '__set__' && propertyName !== '__reset__' && propertyName !== '__with__' && propertyName !== '__GetDependency__' && propertyName !== '__Rewire__' && propertyName !== '__ResetDependency__' && propertyName !== '__RewireAPI__';
  });
  return validPropertyNames.reduce(function (filteredWildcardImport, propertyName) {
    filteredWildcardImport[propertyName] = wildcardImport[propertyName];
    return filteredWildcardImport;
  }, {});
}
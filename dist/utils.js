"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__ResetDependency__ = _reset__;
exports.__RewireAPI__ = void 0;
exports.__set__ = exports.__Rewire__ = _set__;
exports.__GetDependency__ = exports.__get__ = _get__;
exports.verbalise = exports.validate = exports.speakResponse = exports.sanitizeVoiceText = exports.performFuzzySearch = exports.logKeyPresses = exports.logCommand = exports.isCommandDuplicate = exports.getSettings = exports.getModifier = exports.getKeyFromEvent = exports.getKeyBinds = exports.getInstructionsText = exports.getDefaults = exports.getArrayFromObject = exports.generateInstructions = exports.formatOptions = exports["default"] = exports.createTemporaryElement = exports.computeMetadata = exports.addVariationInformation = exports.addThousandsSeparators = exports.addFeedbackToResponse = void 0;
var _isNumber = _interopRequireDefault(require("lodash/isNumber"));
var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));
var _random = _interopRequireDefault(require("lodash/random"));
var _round = _interopRequireDefault(require("lodash/round"));
var _startCase = _interopRequireDefault(require("lodash/startCase"));
var _uniq = _interopRequireDefault(require("lodash/uniq"));
var _statsLite = _interopRequireDefault(require("stats-lite"));
var _uaParserJs = _interopRequireDefault(require("ua-parser-js"));
var _ufuzzy = _interopRequireDefault(require("@leeoniya/ufuzzy"));
var _wordsToNumbers = _interopRequireDefault(require("words-to-numbers"));
var _settings = _interopRequireDefault(require("./settings"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var fuzzy = _get__("uFuzzy")();
var os = new (_get__("UAParser"))().getOS();
var getFeedbackText = function getFeedbackText() {
  var feedbacks = ['I understand you said', 'It seems like you asked'];
  var randomIndex = _get__("random")(0, feedbacks.length - 1);
  return feedbacks[randomIndex];
};
var getModifier = function getModifier(settings) {
  var withSpaces = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var uppercase = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var joiningCharacter = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '+';
  if (withSpaces) {
    joiningCharacter = ' ' + joiningCharacter + ' ';
  }
  var modifier = settings.multipleModifiers ? settings.modifier.join(joiningCharacter) : settings.modifier;
  return uppercase ? modifier.toUpperCase() : modifier;
};
exports.getModifier = getModifier;
var getDefaults = function getDefaults() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    triggers: {
      mainKey: ['a', '1'],
      instructionsKey: ['i', '4'],
      trendKey: ['m', '3'],
      summaryKey: ['s', '2'],
      pause: ['p', '5']
    },
    xLabel: options.x,
    yLabel: options.y
  };
};
exports.getDefaults = getDefaults;
var getMappedTriggers = function getMappedTriggers(triggers, modifier) {
  var mappedTriggers = {};
  Object.keys(triggers).forEach(function (k) {
    mappedTriggers[k] = triggers[k].map(function (t) {
      return modifier + ' + ' + t.toUpperCase();
    }).join(' or ');
  });
  return mappedTriggers;
};
var getInstructionsText = function getInstructionsText(triggers, title, settings) {
  var modifier = _get__("getModifier")(settings);
  var mappedTriggers = _get__("getMappedTriggers")(triggers, modifier, settings);
  return "Graph with title: ".concat(title, ". To interact with the graph, press ").concat(mappedTriggers.mainKey, " all together and in order. You'll hear a beep sound, after which you can ask a question such as what is the average or what is the maximum value in the graph. To hear the textual summary of the graph, press ").concat(mappedTriggers.summaryKey, ". To hear the audio graph, press ").concat(mappedTriggers.trendKey, ". To repeat these instructions, press ").concat(mappedTriggers.instructionsKey, ". Key combinations must be pressed all together and in order.");
};
exports.getInstructionsText = getInstructionsText;
var generateInstructions = function generateInstructions(viewportElement, triggers, title, settings) {
  var modifier = _get__("getModifier")(settings);
  var mappedTriggers = _get__("getMappedTriggers")(triggers, modifier, settings);
  var label = "Graph with title: ".concat(title, ". To listen to instructions on how to interact with the graph, press ").concat(mappedTriggers.instructionsKey, ". Key combinations must be pressed all together and in order.");
  viewportElement.setAttribute('aria-label', label);
  for (var _i = 0, _Array$from = Array.from(viewportElement.children); _i < _Array$from.length; _i++) {
    var vc = _Array$from[_i];
    vc.setAttribute('aria-hidden', true);
  }
};
exports.generateInstructions = generateInstructions;
var createTemporaryElement = function createTemporaryElement(text, options) {
  var name = options.name || 'voxlens-response';
  var existingElement = document.getElementsByName(name)[0];
  if (existingElement) existingElement.remove();
  var div = document.createElement('div');
  if (options.stopElement || !options.debug) div.setAttribute('class', 'hidden');
  div.setAttribute('name', name);
  div.setAttribute('aria-live', 'assertive');
  if (!_get__("os").name.includes('Mac OS')) {
    div.setAttribute('role', 'alert');
  }
  options.element.parentElement.appendChild(div);
  div.innerHTML = text;
};
exports.createTemporaryElement = createTemporaryElement;
var getArrayFromObject = function getArrayFromObject(data, key) {
  return Array.isArray(key) ? key.map(function (k) {
    return data.map(function (d) {
      return d[k];
    });
  }) : data.map(function (d) {
    return d[key];
  });
};
exports.getArrayFromObject = getArrayFromObject;
var validate = function validate(data, options) {
  if (_get__("isEmpty")(options.x)) {
    throw new TypeError('Independent variable not set.');
  } else if (_get__("isEmpty")(options.y)) {
    throw new TypeError('Dependent variable not set.');
  } else if (_get__("isEmpty")(data) || !data.every(_get__("isNumber"))) {
    throw new TypeError('Dependent variable values are missing or not numeric.');
  } else if (_get__("isEmpty")(options.title)) {
    throw new TypeError('Title not set.');
  }
};
exports.validate = validate;
var addThousandsSeparators = function addThousandsSeparators(value) {
  value = _get__("round")(value, 2).toString();
  value = value.replace(',', '');
  value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return value;
};
exports.addThousandsSeparators = addThousandsSeparators;
var formatOptions = function formatOptions(options) {
  var xLabel = Array.isArray(options.xLabel) ? options.xLabel.reverse().join(' and ') : options.xLabel;
  return _objectSpread(_objectSpread({}, options), {}, {
    xLabel: _get__("startCase")(xLabel),
    yLabel: _get__("startCase")(options.yLabel)
  });
};
exports.formatOptions = formatOptions;
var getSettings = function getSettings() {
  if (_get__("os").name.includes('Mac OS')) {
    return _get__("settings").MacOS;
  } else if (_get__("os").name.includes('Windows')) {
    return _get__("settings").Windows;
  } else {
    return _get__("settings")["default"];
  }
};
exports.getSettings = getSettings;
var addFeedbackToResponse = function addFeedbackToResponse(response, voiceText) {
  response = response.replace(/ +(?= )/g, '');
  return "".concat(_get__("getFeedbackText")(), " ").concat(voiceText, ". ").concat(response);
};
exports.addFeedbackToResponse = addFeedbackToResponse;
var verbalise = function verbalise(values) {
  var total = values.length;
  if (values.length > 1) {
    values[total - 1] = "and ".concat(values[total - 1]);
    values = values.join(', ');
  } else {
    values = values[0];
  }
  return values;
};
exports.verbalise = verbalise;
var getKeyBinds = function getKeyBinds(listeningKeys, combinations) {
  return combinations.map(function (c) {
    return listeningKeys + '+' + c;
  }).join(',');
};
exports.getKeyBinds = getKeyBinds;
var logKeyPresses = function logKeyPresses(listeningKeys, event) {
  var key = _get__("getKeyFromEvent")(event);
  var combination = listeningKeys + '+' + key;
  console.log('[VoxLens] Key combination issued: ' + combination);
  var keyCombinationsPressed = window.localStorage.getItem('keyCombinationsPressed') || '[]';
  keyCombinationsPressed = JSON.parse(keyCombinationsPressed);
  keyCombinationsPressed.push({
    combination: combination,
    time: Date.now()
  });
  window.localStorage.setItem('keyCombinationsPressed', JSON.stringify(keyCombinationsPressed));
};
exports.logKeyPresses = logKeyPresses;
var logCommand = function logCommand(command, response) {
  if (command && command.trim() !== '') console.log('[VoxLens] Command issued: ' + command);
  var commandsIssued = window.localStorage.getItem('commandsIssued') || '[]';
  commandsIssued = JSON.parse(commandsIssued);
  commandsIssued.push({
    command: command,
    response: response,
    time: Date.now()
  });
  window.localStorage.setItem('commandsIssued', JSON.stringify(commandsIssued));
};
exports.logCommand = logCommand;
var getKeyFromEvent = function getKeyFromEvent(event) {
  return event.code.toLowerCase().replace('key', '').replace('digit', '');
};
exports.getKeyFromEvent = getKeyFromEvent;
var isCommandDuplicate = function isCommandDuplicate(lastIssuedCommand, activatedCommands) {
  var timeNow = Date.now();
  var isCommandSameAsLast = lastIssuedCommand.command && activatedCommands.length === 1 && lastIssuedCommand.command.includes(activatedCommands[0].name);
  if (isCommandSameAsLast) {
    var timeDifferenceFromLastCommand = timeNow - (lastIssuedCommand.time || 0);
    if (timeDifferenceFromLastCommand < 1000) return true;
  }
  return false;
};
exports.isCommandDuplicate = isCommandDuplicate;
var sanitizeVoiceText = function sanitizeVoiceText() {
  var voiceText = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  voiceText = voiceText.replace(/(\d+)(st|nd|rd|th)/, '$1');
  voiceText = voiceText.replaceAll("'s", '');
  voiceText = voiceText.split(' ').filter(function (v) {
    return (Number.isInteger(parseInt(_get__("wordsToNumbers")(v))) || v.trim().length > 2) && !_get__("stopWords").includes(v);
  }).join(' ').trim();
  return voiceText;
};
exports.sanitizeVoiceText = sanitizeVoiceText;
var performFuzzySearch = function performFuzzySearch(data, voiceText) {
  var haystack = data.map(function (e) {
    return e.toString().toLowerCase();
  });
  var results = [];
  var result = {};
  var maxScore = 0;
  _get__("uniq")(voiceText).forEach(function (needle) {
    var _get__$search = _get__("fuzzy").search(haystack, needle.toString()),
      _get__$search2 = _slicedToArray(_get__$search, 1),
      fuzzyresults = _get__$search2[0];
    fuzzyresults.forEach(function (i) {
      var value = data[i];
      var score = 1;
      if (result[value]) score = result[value] + 1;
      result[value] = score;
      if (score > maxScore) maxScore = score;
    });
    Object.keys(result).forEach(function (r) {
      results.push({
        score: result[r],
        value: r
      });
    });
  });
  results = results.filter(function (v) {
    return v.score === maxScore;
  }).map(function (v) {
    return v.value;
  });
  var indices = data.map(function (v, i) {
    return {
      v: v.toString(),
      i: i
    };
  }).filter(function (v) {
    return results.includes(v.v);
  }).map(function (v) {
    return v.i;
  });
  return indices;
};
exports.performFuzzySearch = performFuzzySearch;
var speakResponse = function speakResponse(text, options) {
  var _options$debug;
  if (options.debug && ((_options$debug = options.debug) === null || _options$debug === void 0 || (_options$debug = _options$debug.responses) === null || _options$debug === void 0 ? void 0 : _options$debug.onlyText) !== true) {
    options.speaker.stop();
    options.speaker.speak(text);
  }
};
exports.speakResponse = speakResponse;
var stopWords = ['a', 'able', 'about', 'across', 'after', 'all', 'almost', 'also', 'am', 'among', 'an', 'and', 'any', 'are', 'as', 'at', 'be', 'because', 'been', 'but', 'by', 'can', 'cannot', 'could', 'dear', 'did', 'do', 'does', 'either', 'else', 'ever', 'every', 'for', 'from', 'get', 'got', 'had', 'has', 'have', 'he', 'her', 'hers', 'him', 'his', 'how', 'however', 'i', 'if', 'in', 'into', 'is', 'it', 'its', 'just', 'let', 'like', 'likely', 'may', 'me', 'might', 'must', 'my', 'neither', 'no', 'nor', 'not', 'of', 'off', 'often', 'on', 'only', 'or', 'other', 'our', 'own', 'rather', 'said', 'say', 'says', 'she', 'should', 'since', 'so', 'some', 'than', 'that', 'the', 'their', 'them', 'then', 'there', 'these', 'they', 'this', 'tis', 'to', 'too', 'twas', 'us', 'wants', 'was', 'we', 'were', 'what', 'when', 'where', 'which', 'while', 'who', 'whom', 'why', 'will', 'with', 'would', 'yet', 'you', 'your', "ain't", "aren't", "can't", "could've", "couldn't", "didn't", "doesn't", "don't", "hasn't", "he'd", "he'll", "he's", "how'd", "how'll", "how's", "i'd", "i'll", "i'm", "i've", "isn't", "it's", "might've", "mightn't", "must've", "mustn't", "shan't", "she'd", "she'll", "she's", "should've", "shouldn't", "that'll", "that's", "there's", "they'd", "they'll", "they're", "they've", "wasn't", "we'd", "we'll", "we're", "weren't", "what'd", "what's", "when'd", "when'll", "when's", "where'd", "where'll", "where's", "who'd", "who'll", "who's", "why'd", "why'll", "why's", "won't", "would've", "wouldn't", "you'd", "you'll", "you're", "you've"];
var computeMetadata = function computeMetadata(metadata, value) {
  if (metadata.stdev != null && value > 0) {
    metadata.cv = metadata.stdev / value;
  }
  return metadata;
};
exports.computeMetadata = computeMetadata;
var addVariationInformation = function addVariationInformation(data) {
  var cvs = data.map(function (d) {
    return d['vx_metadata'].cv;
  });
  var percentileThreshold = 0.5;
  var percentileLimit = _get__("stats").percentile(cvs, percentileThreshold);
  return data.map(function (d) {
    return _objectSpread(_objectSpread({}, d), {}, {
      vx_metadata: _objectSpread(_objectSpread({}, d['vx_metadata']), {}, {
        isCVHigh: d['vx_metadata'].cv >= percentileLimit,
        percentileThreshold: percentileThreshold * 100
      })
    });
  });
};
exports.addVariationInformation = addVariationInformation;
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
    case "uFuzzy":
      return _ufuzzy["default"];
    case "UAParser":
      return _uaParserJs["default"];
    case "random":
      return _random["default"];
    case "getModifier":
      return getModifier;
    case "getMappedTriggers":
      return getMappedTriggers;
    case "os":
      return os;
    case "isEmpty":
      return _isEmpty["default"];
    case "isNumber":
      return _isNumber["default"];
    case "round":
      return _round["default"];
    case "startCase":
      return _startCase["default"];
    case "settings":
      return _settings["default"];
    case "getFeedbackText":
      return getFeedbackText;
    case "getKeyFromEvent":
      return getKeyFromEvent;
    case "wordsToNumbers":
      return _wordsToNumbers["default"];
    case "stopWords":
      return stopWords;
    case "uniq":
      return _uniq["default"];
    case "fuzzy":
      return fuzzy;
    case "stats":
      return _statsLite["default"];
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
var _default = _RewireAPI__;
exports["default"] = _default;
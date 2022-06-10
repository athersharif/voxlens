"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__ResetDependency__ = _reset__;
exports.__RewireAPI__ = void 0;
exports.__set__ = exports.__Rewire__ = _set__;
exports.__GetDependency__ = exports.__get__ = _get__;
exports.verbalise = exports.validate = exports.sanitizeVoiceText = exports.logKeyPresses = exports.logCommand = exports.isCommandDuplicate = exports.getSettings = exports.getModifier = exports.getKeyFromEvent = exports.getKeyBinds = exports.getInstructionsText = exports.getDefaults = exports.getArrayFromObject = exports.generateInstructions = exports.formatOptions = exports["default"] = exports.createTemporaryElement = exports.addThousandsSeparators = exports.addFeedbackToResponse = void 0;

var _isNumber = _interopRequireDefault(require("lodash/isNumber"));

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _random = _interopRequireDefault(require("lodash/random"));

var _round = _interopRequireDefault(require("lodash/round"));

var _startCase = _interopRequireDefault(require("lodash/startCase"));

var _uaParserJs = _interopRequireDefault(require("ua-parser-js"));

var _wordsToNumbers = _interopRequireDefault(require("words-to-numbers"));

var _settings = _interopRequireDefault(require("./settings"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var os = new (_get__("UAParser"))().getOS();

var getFeedbackText = function getFeedbackText() {
  var feedbacks = ["I understand you're looking for", 'It seems like you asked about the'];

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

var createTemporaryElement = function createTemporaryElement(text) {
  var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;
  var div = document.createElement('div');
  div.style.position = 'absolute';
  div.style.left = '-10000px';
  div.style.top = 'auto';
  div.style.width = '1px';
  div.style.height = '1px';
  div.style.overflow = 'hidden';
  div.setAttribute('aria-live', 'assertive');

  if (!_get__("os").name.includes('Mac OS')) {
    div.setAttribute('role', 'alert');
  }

  document.body.appendChild(div);
  div.innerHTML = text;
  window.setTimeout(function () {
    return div.remove();
  }, timeout);
};

exports.createTemporaryElement = createTemporaryElement;

var getArrayFromObject = function getArrayFromObject(data, key) {
  return data.map(function (d) {
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
  return _objectSpread(_objectSpread({}, options), {}, {
    xLabel: _get__("startCase")(options.xLabel),
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

var addFeedbackToResponse = function addFeedbackToResponse(response, commands) {
  commands = _get__("verbalise")(commands);
  response = response.replace(/ +(?= )/g, '');
  return "".concat(_get__("getFeedbackText")(), " ").concat(commands, ". ").concat(response);
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
  console.log('[VoxLens] Command issued: ' + command);
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

var sanitizeVoiceText = function sanitizeVoiceText(voiceText) {
  voiceText = voiceText.replace(/(\d+)(st|nd|rd|th)/, '$1');
  voiceText = voiceText.replaceAll("'s", '');
  voiceText = voiceText.split(' ').filter(function (v) {
    return (Number.isInteger(parseInt(_get__("wordsToNumbers")(v))) || v.trim().length > 2) && !_get__("stopWords").includes(v);
  }).join(' ').trim();
  return voiceText;
};

exports.sanitizeVoiceText = sanitizeVoiceText;
var stopWords = ['a', 'able', 'about', 'across', 'after', 'all', 'almost', 'also', 'am', 'among', 'an', 'and', 'any', 'are', 'as', 'at', 'be', 'because', 'been', 'but', 'by', 'can', 'cannot', 'could', 'dear', 'did', 'do', 'does', 'either', 'else', 'ever', 'every', 'for', 'from', 'get', 'got', 'had', 'has', 'have', 'he', 'her', 'hers', 'him', 'his', 'how', 'however', 'i', 'if', 'in', 'into', 'is', 'it', 'its', 'just', 'let', 'like', 'likely', 'may', 'me', 'might', 'must', 'my', 'neither', 'no', 'nor', 'not', 'of', 'off', 'often', 'on', 'only', 'or', 'other', 'our', 'own', 'rather', 'said', 'say', 'says', 'she', 'should', 'since', 'so', 'some', 'than', 'that', 'the', 'their', 'them', 'then', 'there', 'these', 'they', 'this', 'tis', 'to', 'too', 'twas', 'us', 'wants', 'was', 'we', 'were', 'what', 'when', 'where', 'which', 'while', 'who', 'whom', 'why', 'will', 'with', 'would', 'yet', 'you', 'your', "ain't", "aren't", "can't", "could've", "couldn't", "didn't", "doesn't", "don't", "hasn't", "he'd", "he'll", "he's", "how'd", "how'll", "how's", "i'd", "i'll", "i'm", "i've", "isn't", "it's", "might've", "mightn't", "must've", "mustn't", "shan't", "she'd", "she'll", "she's", "should've", "shouldn't", "that'll", "that's", "there's", "they'd", "they'll", "they're", "they've", "wasn't", "we'd", "we'll", "we're", "weren't", "what'd", "what's", "when'd", "when'll", "when's", "where'd", "where'll", "where's", "who'd", "who'll", "who's", "why'd", "why'll", "why's", "won't", "would've", "wouldn't", "you'd", "you'll", "you're", "you've"];

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

    case "verbalise":
      return verbalise;

    case "getFeedbackText":
      return getFeedbackText;

    case "getKeyFromEvent":
      return getKeyFromEvent;

    case "wordsToNumbers":
      return _wordsToNumbers["default"];

    case "stopWords":
      return stopWords;
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
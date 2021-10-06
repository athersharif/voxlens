"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__ResetDependency__ = _reset__;
exports.__RewireAPI__ = void 0;
exports.__set__ = exports.__Rewire__ = _set__;
exports.__GetDependency__ = exports.__get__ = _get__;
exports.processCommand = exports["default"] = exports.commands = void 0;

var _utils = require("../utils");

var processCommand = function processCommand(voiceText, data, options, lastIssuedCommand) {
  var activatedCommands = _get__("commands").filter(function (c) {
    return voiceText.includes(c.name);
  });

  if (_get__("isCommandDuplicate")(lastIssuedCommand, activatedCommands)) return;
  lastIssuedCommand = {
    command: activatedCommands.map(function (a) {
      return a.name;
    }).join(','),
    time: Date.now()
  };
  var response = '';

  if (activatedCommands.length > 0) {
    var commandsStaged = [];
    activatedCommands.forEach(function (ac) {
      var name = ac.name,
          func = ac.func,
          alias = ac.alias;

      if (alias) {
        var command = _get__("commands").filter(function (a) {
          return a.name === alias;
        })[0];

        func = command.func;
        name = command.name;
      }

      if (!commandsStaged.includes(name)) {
        var functionResponse = func(data, options, voiceText);
        response += functionResponse + ' ';

        _get__("logCommand")(name, response);
      }

      commandsStaged.push(name);
    });
    response = _get__("addFeedbackToResponse")(response, commandsStaged);
  } else {
    response = "I heard you say ".concat(voiceText, ". Command not recognized. Please try again.");

    _get__("logCommand")(voiceText, response);
  }

  console.log('Response is ', response);

  _get__("createTemporaryElement")(response);

  return {
    lastIssuedCommand: lastIssuedCommand
  };
};

exports.processCommand = processCommand;
var commands = [{
  name: 'average',
  func: require('./average')["default"]
}, {
  name: 'mean',
  alias: 'average'
}, {
  name: 'median',
  func: require('./median')["default"]
}, {
  name: 'mode',
  func: require('./mode')["default"]
}, {
  name: 'maximum',
  func: require('./maximum')["default"]
}, {
  name: 'highest',
  alias: 'maximum'
}, {
  name: 'minimum',
  func: require('./minimum')["default"]
}, {
  name: 'lowest',
  alias: 'minimum'
}, {
  name: 'variance',
  func: require('./variance')["default"]
}, {
  name: 'standard deviation',
  func: require('./standardDeviation')["default"]
}, {
  name: 'total',
  func: require('./total')["default"]
}, {
  name: 'instructions',
  func: require('./instructions')["default"]
}, {
  name: 'directions',
  alias: 'instructions'
}, {
  name: 'help',
  alias: 'instructions'
}, {
  name: 'summary',
  func: require('./summary')["default"]
}, {
  name: 'value',
  func: require('./value')["default"]
}, {
  name: 'data',
  alias: 'value'
}, {
  name: 'commands',
  func: require('./commands')["default"]
}];
exports.commands = commands;

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
    case "commands":
      return commands;

    case "isCommandDuplicate":
      return _utils.isCommandDuplicate;

    case "logCommand":
      return _utils.logCommand;

    case "addFeedbackToResponse":
      return _utils.addFeedbackToResponse;

    case "createTemporaryElement":
      return _utils.createTemporaryElement;
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
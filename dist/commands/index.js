"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__ResetDependency__ = _reset__;
exports.__RewireAPI__ = void 0;
exports.__set__ = exports.__Rewire__ = _set__;
exports.__GetDependency__ = exports.__get__ = _get__;
exports.processCommand = exports["default"] = exports.commands = void 0;
var _capitalize = _interopRequireDefault(require("lodash/capitalize"));
var _intersection = _interopRequireDefault(require("lodash/intersection"));
var _orderBy = _interopRequireDefault(require("lodash/orderBy"));
var _uniq = _interopRequireDefault(require("lodash/uniq"));
var _uniqBy = _interopRequireDefault(require("lodash/uniqBy"));
var _pluralize = _interopRequireDefault(require("pluralize"));
var _wordsToNumbers = _interopRequireDefault(require("words-to-numbers"));
var _modules = _interopRequireDefault(require("../modules"));
var _utils = require("../utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var nonVACommands = [];
var getComparisonText = function getComparisonText(values, options) {
  values = values.map(function (v) {
    var text = v.key;
    if (v.command === 'average') text += ' average';
    return _objectSpread(_objectSpread({}, v), {}, {
      text: text
    });
  });
  var orderedValues = _get__("orderBy")(values, ['value'], ['desc']);
  var highest = orderedValues.shift();
  var lowest = orderedValues.pop();
  var preText = "".concat(options.yLabel, " for ").concat(highest.text, " is ");
  if (values.length === 2) {
    return preText + 'greater than ' + lowest.text + '.';
  }
  return preText + 'the highest, followed by ' + orderedValues.map(function (v) {
    return v.text;
  }).join(', ') + ', and ' + lowest.text + '.';
};
var getMatchingRanking = function getMatchingRanking(voiceText, datapoints, factors, data) {
  voiceText = _get__("sanitizeVoiceText")(voiceText);
  var words = voiceText.split(' ');
  var size = data.x.length;
  var matches = [];
  var types = [{
    type: 'top',
    keywords: ['top', 'first']
  }, {
    type: 'bottom',
    keywords: ['bottom', 'last']
  }];
  types.forEach(function (type) {
    var index = words.findIndex(function (w) {
      return type.keywords.find(function (t) {
        return t === w || t === _get__("wordsToNumbers")(w);
      });
    });
    if (index >= 0 && words.length > index + 1) {
      var rankingCount = parseInt(_get__("wordsToNumbers")(words[index + 1]));
      if (!Number.isNaN(parseInt(rankingCount)) && rankingCount > 0 && rankingCount <= size) {
        matches.push({
          command: 'ranking',
          opts: {
            datapoints: datapoints,
            factors: factors,
            rankingType: type.type,
            rankingCount: rankingCount
          }
        });
      }
    }
  });
  return matches;
};
var getPossibleDataPoints = function getPossibleDataPoints(data, voiceText, chartType) {
  voiceText = _get__("sanitizeVoiceText")(voiceText);
  if (!voiceText || voiceText.replaceAll(' ', '') === '') return {
    indices: []
  };
  var xFilter = function xFilter(arr, text) {
    return _get__("uniq")(arr.filter(function (x) {
      return Number.isNaN(parseInt(x)) && Number.isNaN(parseInt(text)) ? x.toString().toLowerCase().includes(text) : x.toString().toLowerCase() === text;
    }));
  };
  var filteredData = [];
  voiceText = voiceText.split(' ').map(function (text) {
    return _get__("wordsToNumbers")(text.toString().toLowerCase());
  });
  if (chartType === 'multiseries') {
    voiceText.forEach(function (text) {
      data.x.forEach(function (arr, i) {
        filteredData[i] = [].concat(_toConsumableArray(filteredData[i] || []), _toConsumableArray(xFilter(arr, text)));
      });
    });
    var indices = [[], []];
    var extraOptions = {};
    filteredData[0].forEach(function (d) {
      indices[0] = [].concat(_toConsumableArray(indices[0]), _toConsumableArray(data.x[0].map(function (d, i) {
        return {
          d: d,
          i: i
        };
      }).filter(function (x) {
        return x.d === d;
      }).map(function (x) {
        return x.i;
      })));
    });
    filteredData[1].forEach(function (d) {
      indices[1] = [].concat(_toConsumableArray(indices[1]), _toConsumableArray(data.x[1].map(function (d, i) {
        return {
          d: d,
          i: i
        };
      }).filter(function (x) {
        return x.d === d;
      }).map(function (x) {
        return x.i;
      })));
    });
    var finalIndices = _get__("intersection")(indices[0], indices[1]);
    if (filteredData[0].length > 0 && filteredData[1].length === 0) {
      extraOptions = {
        combine: true,
        combineIndex: 0,
        combineCommand: 'average'
      };
      finalIndices = indices[0];
    }
    if (filteredData[1].length > 0 && filteredData[0].length === 0) {
      extraOptions = {
        combine: true,
        combineIndex: 1,
        combineCommand: 'average'
      };
      finalIndices = indices[1];
    }
    return {
      extraOptions: extraOptions,
      indices: finalIndices
    };
  } else {
    voiceText.forEach(function (text) {
      filteredData = [].concat(_toConsumableArray(filteredData), _toConsumableArray(xFilter(data.x, text)));
    });
    var _indices = [];
    filteredData.forEach(function (d) {
      _indices = [].concat(_toConsumableArray(_indices), _toConsumableArray(data.x.map(function (d, i) {
        return {
          d: d,
          i: i
        };
      }).filter(function (x) {
        return x.d === d;
      }).map(function (x) {
        return x.i;
      })));
    });
    return {
      indices: _indices
    };
  }
};
var getMatchingDataPoints = function getMatchingDataPoints(data, voiceText, options, activatedCommands) {
  var getKey = function getKey(k) {
    return options.chartType === 'multiseries' ? data.x[1][k] + ' ' + data.x[0][k] : data.x[k];
  };
  var _get__2 = _get__("getPossibleDataPoints")(data, voiceText, options.chartType),
    _get__2$extraOptions = _get__2.extraOptions,
    extraOptions = _get__2$extraOptions === void 0 ? {} : _get__2$extraOptions,
    indices = _get__2.indices;
  indices = _get__("uniq")(indices);
  if (extraOptions.combine) {
    var possibleCommands = [];
    var datapoints = [];
    if (activatedCommands && activatedCommands.length > 0) {
      activatedCommands.forEach(function (ac) {
        possibleCommands.push(ac.name);
      });
    }
    if (possibleCommands.length === 0) possibleCommands.push('average');
    var series = _get__("uniq")(indices.map(function (i) {
      return data.x[extraOptions.combineIndex][i];
    }));
    var combinedOn = options.x.filter(function (x, i) {
      return i !== extraOptions.combineIndex;
    })[0];
    series.forEach(function (key) {
      var keyIndices = indices.filter(function (i) {
        return data.x[extraOptions.combineIndex][i] === key;
      });
      var keys = keyIndices.map(function (i) {
        return data.x[extraOptions.combineIndex][i];
      });
      var values = data.y.filter(function (y, i) {
        return keyIndices.includes(i);
      });
      var allFilteredData = {
        x: [data.x[0].filter(function (x, i) {
          return keyIndices.includes(i);
        }), data.x[1].filter(function (x, i) {
          return keyIndices.includes(i);
        })],
        y: values
      };
      possibleCommands.forEach(function (command) {
        if (options.chartType === 'multiseries' && command === 'value') command = 'average';
        datapoints.push({
          type: 'all',
          key: key,
          command: command,
          data: {
            x: keys,
            y: values
          },
          opts: {
            allFilteredData: allFilteredData,
            combinedOn: combinedOn
          }
        });
      });
    });
    return datapoints;
  } else {
    return indices.map(function (i) {
      var key = getKey(i);
      return {
        type: 'datapoint',
        key: key,
        command: 'value',
        data: {
          x: [key],
          y: [data.y[i]]
        }
      };
    });
  }
};
var getMatchingFactors = function getMatchingFactors(options, voiceText) {
  voiceText = _get__("sanitizeVoiceText")(voiceText);
  if (!voiceText || voiceText.replaceAll(' ', '') === '') return null;
  var xs = Array.isArray(options.x) ? options.x : [options.x];
  var matches = xs.filter(function (x) {
    var words = voiceText.split(' ');
    return words.some(function (v) {
      return v.toLowerCase() === x.toLowerCase() || v.toLowerCase() === _get__("pluralize")(x.toLowerCase());
    }) || words.includes('data') && (words.includes('point') || words.includes('points'));
  });
  return {
    factors: matches.length > 0 ? matches : [],
    opts: {
      listAll: voiceText.split(' ').includes('levels') || voiceText.split(' ').includes('level')
    }
  };
};
var processCommand = function processCommand(voiceText, data, options) {
  var isVoiceCommand = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var lastIssuedCommand = arguments.length > 4 ? arguments[4] : undefined;
  var chartType = options.chartType,
    dataModule = options.dataModule;
  var allData = [];
  var regions = [];
  var mod = dataModule ? _get__("dataModules")[dataModule] : null;
  var factors = _get__("getMatchingFactors")(options, voiceText);
  if (factors && factors.factors && factors.factors.length > 0) {
    factors.factors.forEach(function (factor) {
      allData.push({
        type: 'metadata',
        key: factor,
        data: data,
        command: 'factor',
        opts: factors.opts
      });
    });
  }
  var activatedCommands = _get__("uniqBy")(_get__("commands").filter(function (c) {
    var voiceCommandCheck = true;
    if (isVoiceCommand) {
      voiceCommandCheck = !(_get__("nonVACommands").includes(c.name) || _get__("nonVACommands").includes(c.alias));
    }
    return voiceText && voiceText.includes(c.name) && voiceCommandCheck;
  }).map(function (ac) {
    return ac.alias ? _get__("commands").find(function (c) {
      return c.name === ac.alias;
    }) : ac;
  }), function (ac) {
    return ac.name;
  });
  activatedCommands.forEach(function (ac) {
    if (ac.kind && ac.kind === 'stats') {
      allData.push({
        type: 'all',
        key: null,
        data: data,
        command: ac.name
      });
    }
  });
  if (chartType === 'map' && mod) {
    var moduleHelper = require('../modules/helpers/' + mod.category);
    regions = moduleHelper.getMatchingRegions(voiceText, dataModule);
    if (regions.length > 0) {
      regions.forEach(function (r) {
        var filteredData = moduleHelper.filterDataByRegion(data, r, mod);
        if (filteredData.x.length > 0) {
          if (activatedCommands.length > 0) {
            activatedCommands.forEach(function (ac) {
              allData.push({
                type: 'region',
                key: _get__("capitalize")(r.name) + ' region',
                data: filteredData,
                command: ac.kind === 'stats' ? ac.name : 'average'
              });
            });
          } else {
            allData.push({
              type: 'region',
              key: _get__("capitalize")(r.name) + ' region',
              data: filteredData,
              command: 'average'
            });
          }
        }
      });
    }
  }
  var dataPoints = _get__("getMatchingDataPoints")(data, voiceText, options, activatedCommands);
  if (dataPoints && dataPoints.length > 0) {
    dataPoints.forEach(function (d) {
      allData.push(d);
    });
  }
  var rankings = _get__("getMatchingRanking")(voiceText, dataPoints, factors, data);
  rankings.forEach(function (ranking) {
    allData.push({
      type: 'metadata',
      key: null,
      data: data,
      command: ranking.command,
      opts: ranking.opts
    });
  });
  if (allData.length === 0) {
    allData = [{
      key: null,
      type: 'all',
      data: data
    }];
  }
  if (lastIssuedCommand && _get__("isCommandDuplicate")(lastIssuedCommand, activatedCommands)) return;
  lastIssuedCommand = {
    command: activatedCommands.map(function (a) {
      return a.name;
    }).join(','),
    time: Date.now()
  };
  var response = 'Found the following possible results in the data. ';
  var commandsStaged = [];
  var dataValues = [];
  allData.forEach(function (_ref) {
    var command = _ref.command,
      data = _ref.data,
      key = _ref.key,
      type = _ref.type,
      _ref$opts = _ref.opts,
      opts = _ref$opts === void 0 ? {} : _ref$opts;
    var acs = activatedCommands;
    if (type === 'datapoint' || type === 'metadata' || type === 'all' && command) {
      acs = [_get__("commands").find(function (c) {
        return c.name === command;
      })];
    } else if (acs.length === 0 && type !== 'all') {
      acs = [_get__("commands").find(function (c) {
        return c.name === 'value';
      })];
    }
    acs.forEach(function (ac) {
      if (type === 'region' && ac.name === 'value') {
        ac = _get__("commands").find(function (c) {
          return c.name === 'average';
        });
      }
      var _ac = ac,
        kind = _ac.kind,
        name = _ac.name,
        func = _ac.func;
      if (command && name !== command || type === 'all' && key == null && name === 'value') return;
      var functionResponse = func(data, _objectSpread(_objectSpread(_objectSpread({}, options), opts), {}, {
        key: key,
        type: type
      }), voiceText);
      dataValues.push({
        command: name,
        kind: kind,
        type: type,
        key: functionResponse.key,
        value: functionResponse.value
      });
      response += functionResponse.sentence + ' ';
      _get__("logCommand")(name, response);
      commandsStaged.push(name);
    });
  });
  if (dataValues.length === 0) {
    response = 'Unable to get data. Please try again.';
    if (voiceText && voiceText.trim() !== '') response = "I heard you say ".concat(voiceText.trim(), ". ") + response;
    _get__("logCommand")(voiceText, response);
  }
  response = _get__("addFeedbackToResponse")(response, _get__("uniq")(commandsStaged));
  dataValues = dataValues.filter(function (d) {
    return d.type === 'region' && d.command === 'average' || d.type !== 'region' && (d.kind === 'stats' || d.command === 'value');
  });
  if (dataValues.length > 1) {
    response = response.trim() + ' ' + _get__("getComparisonText")(dataValues, options);
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
  func: require('./average')["default"],
  kind: 'stats'
}, {
  name: 'mean',
  alias: 'average'
}, {
  name: 'median',
  func: require('./median')["default"],
  kind: 'stats'
}, {
  name: 'mode',
  func: require('./mode')["default"],
  kind: 'stats'
}, {
  name: 'maximum',
  func: require('./maximum')["default"],
  kind: 'stats'
}, {
  name: 'highest',
  alias: 'maximum'
}, {
  name: 'minimum',
  func: require('./minimum')["default"],
  kind: 'stats'
}, {
  name: 'lowest',
  alias: 'minimum'
}, {
  name: 'variance',
  func: require('./variance')["default"],
  kind: 'stats'
}, {
  name: 'standard deviation',
  func: require('./standardDeviation')["default"],
  kind: 'stats'
}, {
  name: 'total',
  func: require('./total')["default"],
  kind: 'stats'
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
  name: 'range',
  func: require('./range')["default"]
}, {
  name: 'factor',
  func: require('./factor')["default"]
}, {
  name: 'ranking',
  func: require('./ranking')["default"]
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
    case "orderBy":
      return _orderBy["default"];
    case "sanitizeVoiceText":
      return _utils.sanitizeVoiceText;
    case "wordsToNumbers":
      return _wordsToNumbers["default"];
    case "uniq":
      return _uniq["default"];
    case "intersection":
      return _intersection["default"];
    case "getPossibleDataPoints":
      return getPossibleDataPoints;
    case "pluralize":
      return _pluralize["default"];
    case "dataModules":
      return _modules["default"];
    case "getMatchingFactors":
      return getMatchingFactors;
    case "uniqBy":
      return _uniqBy["default"];
    case "commands":
      return commands;
    case "nonVACommands":
      return nonVACommands;
    case "capitalize":
      return _capitalize["default"];
    case "getMatchingDataPoints":
      return getMatchingDataPoints;
    case "getMatchingRanking":
      return getMatchingRanking;
    case "isCommandDuplicate":
      return _utils.isCommandDuplicate;
    case "logCommand":
      return _utils.logCommand;
    case "addFeedbackToResponse":
      return _utils.addFeedbackToResponse;
    case "getComparisonText":
      return getComparisonText;
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
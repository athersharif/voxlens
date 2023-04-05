"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__ResetDependency__ = _reset__;
exports.__RewireAPI__ = void 0;
exports.__set__ = exports.__Rewire__ = _set__;
exports.__GetDependency__ = exports.__get__ = _get__;
exports["default"] = void 0;
var abbreviations = [{
  name: 'Alabama',
  abbreviation: 'AL'
}, {
  name: 'Alaska',
  abbreviation: 'AK'
}, {
  name: 'American Samoa',
  abbreviation: 'AS'
}, {
  name: 'Arizona',
  abbreviation: 'AZ'
}, {
  name: 'Arkansas',
  abbreviation: 'AR'
}, {
  name: 'California',
  abbreviation: 'CA'
}, {
  name: 'Colorado',
  abbreviation: 'CO'
}, {
  name: 'Connecticut',
  abbreviation: 'CT'
}, {
  name: 'Delaware',
  abbreviation: 'DE'
}, {
  name: 'District Of Columbia',
  abbreviation: 'DC'
}, {
  name: 'Federated States Of Micronesia',
  abbreviation: 'FM'
}, {
  name: 'Florida',
  abbreviation: 'FL'
}, {
  name: 'Georgia',
  abbreviation: 'GA'
}, {
  name: 'Guam Gu',
  abbreviation: 'GU'
}, {
  name: 'Hawaii',
  abbreviation: 'HI'
}, {
  name: 'Idaho',
  abbreviation: 'ID'
}, {
  name: 'Illinois',
  abbreviation: 'IL'
}, {
  name: 'Indiana',
  abbreviation: 'IN'
}, {
  name: 'Iowa',
  abbreviation: 'IA'
}, {
  name: 'Kansas',
  abbreviation: 'KS'
}, {
  name: 'Kentucky',
  abbreviation: 'KY'
}, {
  name: 'Louisiana',
  abbreviation: 'LA'
}, {
  name: 'Maine',
  abbreviation: 'ME'
}, {
  name: 'Marshall Islands',
  abbreviation: 'MH'
}, {
  name: 'Maryland',
  abbreviation: 'MD'
}, {
  name: 'Massachusetts',
  abbreviation: 'MA'
}, {
  name: 'Michigan',
  abbreviation: 'MI'
}, {
  name: 'Minnesota',
  abbreviation: 'MN'
}, {
  name: 'Mississippi',
  abbreviation: 'MS'
}, {
  name: 'Missouri',
  abbreviation: 'MO'
}, {
  name: 'Montana',
  abbreviation: 'MT'
}, {
  name: 'Nebraska',
  abbreviation: 'NE'
}, {
  name: 'Nevada',
  abbreviation: 'NV'
}, {
  name: 'New Hampshire',
  abbreviation: 'NH'
}, {
  name: 'New Jersey',
  abbreviation: 'NJ'
}, {
  name: 'New Mexico',
  abbreviation: 'NM'
}, {
  name: 'New York',
  abbreviation: 'NY'
}, {
  name: 'North Carolina',
  abbreviation: 'NC'
}, {
  name: 'North Dakota',
  abbreviation: 'ND'
}, {
  name: 'Northern Mariana Islands',
  abbreviation: 'MP'
}, {
  name: 'Ohio',
  abbreviation: 'OH'
}, {
  name: 'Oklahoma',
  abbreviation: 'OK'
}, {
  name: 'Oregon',
  abbreviation: 'OR'
}, {
  name: 'Palau',
  abbreviation: 'PW'
}, {
  name: 'Pennsylvania',
  abbreviation: 'PA'
}, {
  name: 'Puerto Rico',
  abbreviation: 'PR'
}, {
  name: 'Rhode Island',
  abbreviation: 'RI'
}, {
  name: 'South Carolina',
  abbreviation: 'SC'
}, {
  name: 'South Dakota',
  abbreviation: 'SD'
}, {
  name: 'Tennessee',
  abbreviation: 'TN'
}, {
  name: 'Texas',
  abbreviation: 'TX'
}, {
  name: 'Utah',
  abbreviation: 'UT'
}, {
  name: 'Vermont',
  abbreviation: 'VT'
}, {
  name: 'Virgin Islands',
  abbreviation: 'VI'
}, {
  name: 'Virginia',
  abbreviation: 'VA'
}, {
  name: 'Washington',
  abbreviation: 'WA'
}, {
  name: 'West Virginia',
  abbreviation: 'WV'
}, {
  name: 'Wisconsin',
  abbreviation: 'WI'
}, {
  name: 'Wyoming',
  abbreviation: 'WY'
}];
var allRegions = {
  west: {
    aliases: ['western'],
    "default": 'coast',
    coast: ['WA', 'OR', 'CA', 'AK', 'HI'],
    mountain: ['AZ', 'CO', 'ID', 'MT', 'NM', 'UT', 'WY'],
    mid: ['IA', 'KS', 'MS', 'NE', 'ND', 'SD'],
    far: ['CA', 'HI', 'NV'],
    north: ['OR', 'WA']
  },
  east: {
    aliases: ['eastern'],
    "default": 'coast',
    coast: ['ME', 'NH', 'VT', 'MA', 'RI', 'CT', 'NY', 'NJ', 'PA', 'MD', 'DE', 'VA', 'NC', 'SC', 'GA', 'FL', 'DC'],
    north: ['NJ', 'NY', 'PA'],
    south: ['AL', 'FL', 'GA', 'MS', 'SC', 'PR']
  },
  north: {
    aliases: ['northern'],
    "default": ['CT', 'IL', 'IN', 'IA', 'ME', 'MA', 'MI', 'MN', 'NH', 'NJ', 'NY', 'OH', 'PA', 'RI', 'VT', 'WI']
  },
  south: {
    aliases: ['southern'],
    "default": ['TX', 'OK', 'AR', 'LA', 'MS', 'TN', 'KY', 'AL', 'GA', 'FL', 'SC', 'NC', 'WV', 'VA'],
    mid: ['DE', 'DC', 'KY', 'MD', 'NC', 'TN', 'VA', 'WV']
  },
  new_england: ['CT', 'ME', 'MA', 'NH', 'RI', 'VT'],
  central: {
    "default": ['WV', 'VA', 'NC', 'TN', 'KY'],
    south: ['AR', 'LA', 'OK', 'TX']
  },
  great_lakes: ['IL', 'IN', 'MI', 'MN', 'OH', 'WI']
};
var _DefaultExportValue = {
  abbreviations: _get__("abbreviations"),
  allRegions: _get__("allRegions"),
  category: 'regions'
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
    case "abbreviations":
      return abbreviations;
    case "allRegions":
      return allRegions;
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
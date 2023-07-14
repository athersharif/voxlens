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
var _range = _interopRequireDefault(require("lodash/range"));
var _browser = _interopRequireDefault(require("@emailjs/browser"));
var _utils = require("../utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var validateEmail = function validateEmail(email) {
  return email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};
var submitFeedback = function submitFeedback(options) {
  var buttonLoaded = document.getElementsByName('voxlens-feedback-collector-radio-button').length > 0;
  if (buttonLoaded) {
    var _radioButtons$find;
    var radioButtons = Array.from(document.getElementsByName('voxlens-feedback-collector-radio-button'));
    var score = (_radioButtons$find = radioButtons.find(function (e) {
      return e.checked;
    })) === null || _radioButtons$find === void 0 ? void 0 : _radioButtons$find.value;
    var feedbackTextbox = document.getElementsByName('voxlens-feedback-collector-textbox')[0];
    var feedback = feedbackTextbox.value;
    if (!score) {
      _get__("createTemporaryElement")('Please select a score before submitting the feedback.', options);
    } else {
      var text = 'Overall accessibility rating: ' + score + '. ';
      if (feedback) text += 'Message from user: ' + feedback;else text += 'User did not provide any additional feedback.';
      var emailParams = {
        to_email: options.feedbackCollector.email,
        viz_url: window.location.href,
        feedback: text
      };
      _get__("emailjs").send('4zc8v1fv9gzn0lw3bc9vg0ya', '0rxen88bhfvu6kd3bxxj5u25', emailParams, 'qpJQfTWeKD-iEUEZ-').then(function () {
        _get__("createTemporaryElement")('Your feedback was successfully sent to the visualization creator.', options);
        radioButtons.forEach(function (r) {
          r.checked = false;
        });
        feedbackTextbox.value = '';
      }, function (error) {
        _get__("createTemporaryElement")('An error occurred while sending your feedback. Please try again later.', options);
        console.error(error);
      });
    }
  }
};
var addFeedbackCollectorElements = function addFeedbackCollectorElements(options, isEmailValid) {
  var className = options.debug && options.debug.hideFeedbackCollector !== true ? '' : 'hidden';
  var html = '<div name="voxlens-feedback-collector" class="' + className + '">';
  if (isEmailValid) {
    var scales = options.feedbackCollector.scales && Number.isInteger(options.feedbackCollector.scales) ? options.feedbackCollector.scales : 5;
    var ids = Array.apply(null, Array(scales)).map(function () {
      return Math.random().toString(36).slice(2);
    });
    var radioButtons = "\n      <div>\n        <span>How accessible is the visualization? (1 being not accessible)</span>\n        <span>\n    ";
    _get__("range")(scales).forEach(function (i) {
      radioButtons += "\n        <input type=\"radio\" name=\"voxlens-feedback-collector-radio-button\" value=\"".concat(i + 1, "\" id=\"").concat(ids[i], "\" />\n        <label for=\"").concat(ids[i], "\">").concat(i + 1, "</label>\n      ");
    });
    radioButtons += "\n        </span>\n      </div>\n    ";
    var textBox = "\n      <div>\n        <textarea name=\"voxlens-feedback-collector-textbox\" cols=\"70\" placeholder=\"Any additional anonymous feedback for the developers? (optional)\"></textarea>\n      </div>\n    ";
    var submitButton = "\n      <div>\n        <button name=\"voxlens-feedback-collector-submit-button\" onclick=\"submitVoxLensFeedback()\">Submit Feedback</button>\n      </div>\n    ";
    html += radioButtons;
    html += textBox;
    html += submitButton;
  } else {
    var errorHtml = "\n      <p>\n        No or invalid email address provided for feedback collector.\n      </p>\n    ";
    html += errorHtml;
  }
  html += '</div>';
  options.element.insertAdjacentHTML('afterend', html);
};
var _DefaultExportValue = function _DefaultExportValue(options) {
  var _options$feedbackColl;
  var email = (_options$feedbackColl = options.feedbackCollector) === null || _options$feedbackColl === void 0 ? void 0 : _options$feedbackColl.email;
  var isEmailValid = !!email && _get__("validateEmail")(email);
  if (isEmailValid) {
    window.submitVoxLensFeedback = function () {
      return _get__("submitFeedback")(options);
    };
  }
  _get__("addFeedbackCollectorElements")(options, isEmailValid);
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
    case "createTemporaryElement":
      return _utils.createTemporaryElement;
    case "emailjs":
      return _browser["default"];
    case "range":
      return _range["default"];
    case "validateEmail":
      return validateEmail;
    case "submitFeedback":
      return submitFeedback;
    case "addFeedbackCollectorElements":
      return addFeedbackCollectorElements;
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
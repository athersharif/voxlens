"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMatchingRegions = exports.filterDataByRegion = void 0;
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var getMatchingRegions = function getMatchingRegions(text, dataModule) {
  var allRegions = require('../' + dataModule)["default"].allRegions;
  text = text.toLowerCase().replaceAll(' ', '').replaceAll('-', '');
  var result = [];
  Object.keys(allRegions).forEach(function (r) {
    var name = r.split('_').join('');
    if (Array.isArray(allRegions[r])) {
      if (text.includes(name)) {
        result.push({
          name: name,
          values: allRegions[r]
        });
      }
    } else {
      var found = false;
      var allValues = [];
      Object.keys(allRegions[r]).forEach(function (s) {
        var aliases = allRegions[r][s]['aliases'] || [];
        if (text.includes(s + name) || text.includes(name + s) || aliases.includes(text)) {
          result.push({
            name: name + '.' + s,
            values: allRegions[r][s]
          });
          found = true;
          allValues.push.apply(allValues, _toConsumableArray(allRegions[r][s]));
        }
      });
      if (!found && text.includes(name)) {
        var def = allRegions[r]["default"];
        var values = Array.isArray(def) ? def : allRegions[r][def];
        result.push({
          name: name,
          values: values
        });
      }
    }
  });
  return result;
};
exports.getMatchingRegions = getMatchingRegions;
var filterDataByRegion = function filterDataByRegion(data, region, mod) {
  var abbreviations = mod.abbreviations || [];
  var filteredData = {
    x: [],
    y: []
  };
  data.x.forEach(function (x, i) {
    x = x.toLowerCase();
    var values = region.values.map(function (r) {
      var _abbreviations$find;
      return (_abbreviations$find = abbreviations.find(function (a) {
        return r.toLowerCase() === a.abbreviation.toLowerCase();
      })) === null || _abbreviations$find === void 0 ? void 0 : _abbreviations$find.name;
    }).filter(function (r) {
      return r;
    });
    if (region.values.some(function (r) {
      return r.toLowerCase() === x;
    }) || values.find(function (s) {
      return s.toLowerCase() === x;
    })) {
      filteredData.x.push(data.x[i]);
      filteredData.y.push(data.y[i]);
    }
  });
  return filteredData;
};
exports.filterDataByRegion = filterDataByRegion;
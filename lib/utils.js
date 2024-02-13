"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
exports.uniq = uniq;
function uniq(array) {
  var seen = {};
  return array.filter(function (item) {
    if (seen[item]) {
      return false;
    }
    seen[item] = true;
    return true;
  });
}
var _default = exports["default"] = {};
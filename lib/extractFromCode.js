"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TYPESCRIPT_PARSER_OPTIONS = exports.FLOW_PARSER_OPTIONS = exports.BASE_PARSER_OPTIONS = void 0;
exports["default"] = extractFromCode;
var _core = require("@babel/core");
var _traverse = _interopRequireDefault(require("@babel/traverse"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var noInformationTypes = ['CallExpression', 'Identifier', 'MemberExpression'];
function getKeys(node) {
  if (node.type === 'StringLiteral') {
    return [node.value];
  }
  if (node.type === 'BinaryExpression' && node.operator === '+') {
    var left = getKeys(node.left);
    var right = getKeys(node.right);
    if (left.length > 1 || right.length > 1) {
      console.warn('Unsupported multiple keys for binary expression, keys skipped.'); // TODO
    }
    return [left[0] + right[0]];
  }
  if (node.type === 'TemplateLiteral') {
    return [node.quasis.map(function (quasi) {
      return quasi.value.cooked;
    }).join('*')];
  }
  if (node.type === 'ConditionalExpression') {
    return [].concat(_toConsumableArray(getKeys(node.consequent)), _toConsumableArray(getKeys(node.alternate)));
  }
  if (node.type === 'LogicalExpression') {
    switch (node.operator) {
      case '&&':
        return _toConsumableArray(getKeys(node.right));
      case '||':
        return [].concat(_toConsumableArray(getKeys(node.left)), _toConsumableArray(getKeys(node.right)));
      default:
        console.warn("unsupported logicalExpression's operator: ".concat(node.operator));
        return [null];
    }
  }
  if (noInformationTypes.includes(node.type)) {
    return ['*']; // We can't extract anything.
  }
  console.warn("Unsupported node: ".concat(node.type));
  return [null];
}
var commentRegExp = /i18n-extract (.+)/;
var commentIgnoreRegExp = /i18n-extract-disable-line/;
var BASE_PARSER_OPTIONS = exports.BASE_PARSER_OPTIONS = {
  sourceType: 'module',
  // Enable all the plugins
  plugins: ['jsx', 'asyncFunctions', 'classConstructorCall', 'doExpressions', 'trailingFunctionCommas', 'objectRestSpread', 'decoratorsLegacy', 'classProperties', 'exportExtensions', 'exponentiationOperator', 'asyncGenerators', 'functionBind', 'functionSent', 'dynamicImport', 'optionalChaining']
};
var FLOW_PARSER_OPTIONS = exports.FLOW_PARSER_OPTIONS = _objectSpread(_objectSpread({}, BASE_PARSER_OPTIONS), {}, {
  plugins: BASE_PARSER_OPTIONS.plugins.concat(['flow'])
});
var TYPESCRIPT_PARSER_OPTIONS = exports.TYPESCRIPT_PARSER_OPTIONS = _objectSpread(_objectSpread({}, BASE_PARSER_OPTIONS), {}, {
  plugins: BASE_PARSER_OPTIONS.plugins.concat(['typescript'])
});
function getBabelOptions(parser, babelOptions) {
  if (babelOptions && parser) {
    throw new Error("Can't specify both parser and Babel options!");
  }
  if (babelOptions) {
    return babelOptions;
  }
  var parserOpts = FLOW_PARSER_OPTIONS;
  if (parser) {
    var availableParsers = ['flow', 'typescript'];
    if (!availableParsers.includes(parser)) {
      throw new Error('Parser must be either flow or typescript');
    } else if (parser === 'flow') {
      parserOpts = FLOW_PARSER_OPTIONS;
    } else {
      parserOpts = TYPESCRIPT_PARSER_OPTIONS;
    }
  }
  return {
    ast: true,
    parserOpts: parserOpts
  };
}
function extractFromCode(code) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$marker = options.marker,
    marker = _options$marker === void 0 ? 'i18n' : _options$marker,
    _options$keyLoc = options.keyLoc,
    keyLoc = _options$keyLoc === void 0 ? 0 : _options$keyLoc,
    _options$parser = options.parser,
    parser = _options$parser === void 0 ? null : _options$parser,
    _options$babelOptions = options.babelOptions,
    babelOptions = _options$babelOptions === void 0 ? null : _options$babelOptions;
  var _transformSync = (0, _core.transformSync)(code, getBabelOptions(parser, babelOptions)),
    ast = _transformSync.ast;
  var keys = [];
  var ignoredLines = [];

  // Look for keys in the comments.
  ast.comments.forEach(function (comment) {
    var match = commentRegExp.exec(comment.value);
    if (match) {
      keys.push({
        key: match[1].trim(),
        loc: comment.loc
      });
    }

    // Check for ignored lines
    match = commentIgnoreRegExp.exec(comment.value);
    if (match) {
      ignoredLines.push(comment.loc.start.line);
    }
  });

  // Look for keys in the source code.
  (0, _traverse["default"])(ast, {
    CallExpression: function CallExpression(path) {
      var node = path.node;
      if (node.loc) {
        if (ignoredLines.includes(node.loc.end.line)) {
          // Skip ignored lines
          return;
        }
      }
      var _node$callee = node.callee,
        name = _node$callee.name,
        type = _node$callee.type;
      if (type === 'Identifier' && name === marker || path.get('callee').matchesPattern(marker)) {
        var foundKeys = getKeys(keyLoc < 0 ? node.arguments[node.arguments.length + keyLoc] : node.arguments[keyLoc]);
        foundKeys.forEach(function (key) {
          if (key) {
            keys.push({
              key: key,
              loc: node.loc
            });
          }
        });
      }
    }
  });
  return keys;
}
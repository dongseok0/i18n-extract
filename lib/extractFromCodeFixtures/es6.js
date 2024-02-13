"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _LogMonitorEntry = _interopRequireDefault(require("./LogMonitorEntry"));
var _LogMonitorButton = _interopRequireDefault(require("./LogMonitorButton"));
var _i18n = _interopRequireDefault(require("i18n"));
var themes = _interopRequireWildcard(require("./themes"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable */ // fixture from https://github.com/gaearon/redux-devtools.
var styles = {
  container: {
    fontFamily: 'monaco, Consolas, Lucida Console, monospace',
    position: 'relative',
    overflowY: 'hidden',
    width: '100%',
    height: '100%',
    minWidth: 300
  },
  buttonBar: {
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderColor: 'transparent',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'row'
  },
  elements: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 38,
    bottom: 0,
    overflowX: 'hidden',
    overflowY: 'auto'
  }
};
var LogMonitor = exports["default"] = /*#__PURE__*/function () {
  function LogMonitor() {
    _classCallCheck(this, LogMonitor);
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', this.handleKeyPress);
    }
  }
  _createClass(LogMonitor, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var node = (0, _react.findDOMNode)(this.refs.elements);
      if (!node) {
        this.scrollDown = true;
      } else if (this.props.stagedActions.length < nextProps.stagedActions.length) {
        var scrollTop = node.scrollTop,
          offsetHeight = node.offsetHeight,
          scrollHeight = node.scrollHeight;
        this.scrollDown = Math.abs(scrollHeight - (scrollTop + offsetHeight)) < 20;
      } else {
        this.scrollDown = false;
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var node = (0, _react.findDOMNode)(this.refs.elements);
      if (!node) {
        return;
      }
      if (this.scrollDown) {
        var offsetHeight = node.offsetHeight,
          scrollHeight = node.scrollHeight;
        node.scrollTop = scrollHeight - offsetHeight;
        this.scrollDown = false;
      }
    }
  }, {
    key: "handleRollback",
    value: function handleRollback() {
      this.props.rollback();
    }
  }, {
    key: "handleSweep",
    value: function handleSweep() {
      this.props.sweep();
    }
  }, {
    key: "handleCommit",
    value: function handleCommit() {
      this.props.commit();
    }
  }, {
    key: "handleToggleAction",
    value: function handleToggleAction(index) {
      this.props.toggleAction(index);
    }
  }, {
    key: "handleReset",
    value: function handleReset() {
      this.props.reset();
    }
  }, {
    key: "handleKeyPress",
    value: function handleKeyPress(event) {
      var monitorState = this.props.monitorState;
      if (event.ctrlKey && event.keyCode === 72) {
        // Ctrl+H
        event.preventDefault();
        this.props.setMonitorState(_objectSpread(_objectSpread({}, monitorState), {}, {
          isVisible: !monitorState.isVisible
        }));
      }
    }
  }, {
    key: "render",
    value: function render() {
      var elements = [];
      var _this$props = this.props,
        monitorState = _this$props.monitorState,
        skippedActions = _this$props.skippedActions,
        stagedActions = _this$props.stagedActions,
        computedStates = _this$props.computedStates,
        select = _this$props.select;
      var theme;
      if (typeof this.props.theme === 'string') {
        if (typeof themes[this.props.theme] !== 'undefined') {
          theme = themes[this.props.theme];
        } else {
          console.warn("DevTools theme ".concat(this.props.theme, " not found, defaulting to nicinabox"));
          theme = themes.nicinabox;
        }
      } else {
        theme = this.props.theme;
      }
      if (!monitorState.isVisible) {
        return null;
      }
      for (var i = 0; i < stagedActions.length; i++) {
        var action = stagedActions[i];
        var _computedStates$i = computedStates[i],
          state = _computedStates$i.state,
          error = _computedStates$i.error;
        var previousState = void 0;
        if (i > 0) {
          previousState = computedStates[i - 1].state;
        }
        elements.push( /*#__PURE__*/_react["default"].createElement(_LogMonitorEntry["default"], {
          key: i,
          index: i,
          theme: theme,
          select: select,
          action: action,
          state: state,
          previousState: previousState,
          collapsed: skippedActions[i],
          error: error,
          onActionClick: this.handleToggleAction
        }));
      }
      return /*#__PURE__*/_react["default"].createElement("div", {
        style: _objectSpread(_objectSpread({}, styles.container), {}, {
          backgroundColor: theme.base00
        })
      }, /*#__PURE__*/_react["default"].createElement("div", {
        style: _objectSpread(_objectSpread({}, styles.buttonBar), {}, {
          borderColor: theme.base02
        })
      }, /*#__PURE__*/_react["default"].createElement(_LogMonitorButton["default"], {
        theme: theme,
        onClick: this.handleReset
      }, (0, _i18n["default"])('reset')), /*#__PURE__*/_react["default"].createElement(_LogMonitorButton["default"], {
        theme: theme,
        onClick: this.handleRollback,
        enabled: computedStates.length
      }, (0, _i18n["default"])('revert')), /*#__PURE__*/_react["default"].createElement(_LogMonitorButton["default"], {
        theme: theme,
        onClick: this.handleSweep,
        enabled: Object.keys(skippedActions).some(function (key) {
          return skippedActions[key];
        })
      }, (0, _i18n["default"])('sweep')), /*#__PURE__*/_react["default"].createElement(_LogMonitorButton["default"], {
        theme: theme,
        onClick: this.handleCommit,
        enabled: computedStates.length > 1
      }, (0, _i18n["default"])('commit'))), /*#__PURE__*/_react["default"].createElement("div", {
        style: styles.elements,
        ref: "elements"
      }, elements), /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", null, "kek"), /*#__PURE__*/_react["default"].createElement("span", null, "bur")));
    }
  }]);
  return LogMonitor;
}();
_defineProperty(LogMonitor, "propTypes", {
  computedStates: _react.PropTypes.array.isRequired,
  currentStateIndex: _react.PropTypes.number.isRequired,
  monitorState: _react.PropTypes.object.isRequired,
  stagedActions: _react.PropTypes.array.isRequired,
  sweep: _react.PropTypes.func.isRequired,
  toggleAction: _react.PropTypes.func.isRequired
});
_defineProperty(LogMonitor, "defaultProps", {
  select: function select(state) {
    return state;
  },
  monitorState: {
    isVisible: true
  },
  theme: 'nicinabox'
});
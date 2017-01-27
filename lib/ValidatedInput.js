'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FormControl = require('react-bootstrap/lib/FormControl');

var _FormControl2 = _interopRequireDefault(_FormControl);

var _FormGroup = require('react-bootstrap/lib/FormGroup');

var _FormGroup2 = _interopRequireDefault(_FormGroup);

var _ControlLabel = require('react-bootstrap/lib/ControlLabel');

var _ControlLabel2 = _interopRequireDefault(_ControlLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ValidatedInput = function (_React$Component) {
    _inherits(ValidatedInput, _React$Component);

    function ValidatedInput(props) {
        _classCallCheck(this, ValidatedInput);

        var _this = _possibleConstructorReturn(this, (ValidatedInput.__proto__ || Object.getPrototypeOf(ValidatedInput)).call(this, props));

        var validationEvent = props.validationEvent,
            validate = props.validate,
            errorHelp = props.errorHelp,
            _registerInput = props._registerInput,
            _unregisterInput = props._unregisterInput,
            inputProps = _objectWithoutProperties(props, ['validationEvent', 'validate', 'errorHelp', '_registerInput', '_unregisterInput']);

        _this._registerInput = _registerInput;
        _this._unregisterInput = _unregisterInput;
        _this._renderElement = _this._renderElement.bind(_this);
        _this.inputProps = inputProps;
        if (!_this._registerInput || !_this._unregisterInput) {
            throw new Error('Input must be placed inside the Form component');
        }
        return _this;
    }

    _createClass(ValidatedInput, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this._registerInput(this);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this._unregisterInput(this);
        }
    }, {
        key: '_renderElement',
        value: function _renderElement() {
            if (this.props == 'textarea') {
                return _react2.default.createElement(
                    _FormControl2.default,
                    _extends({ ref: 'control' }, this.inputProps, {
                        componentClass: this.props.type }),
                    this.props.children
                );
            } else {
                return _react2.default.createElement(
                    _FormControl2.default,
                    _extends({ ref: 'control' }, this.inputProps),
                    this.props.children
                );
            }
        }
    }, {
        key: 'render',
        value: function render() {
            console.log(this.props);
            var bsStyle = this.props.bsStyle;

            var error = bsStyle == 'error';
            return _react2.default.createElement(
                _FormGroup2.default,
                { controlId: this.props.name, validationState: this.props.bsStyle },
                _react2.default.createElement(
                    _ControlLabel2.default,
                    null,
                    this.props.label
                ),
                this._renderElement(),
                _react2.default.createElement(_FormControl2.default.Feedback, null),
                _react2.default.createElement(
                    'div',
                    { className: bsStyle },
                    this.props.help
                )
            );
        }
    }]);

    return ValidatedInput;
}(_react2.default.Component);

exports.default = ValidatedInput;


ValidatedInput.propTypes = {
    name: _react2.default.PropTypes.string.isRequired,
    validationEvent: _react2.default.PropTypes.oneOf(['', 'onChange', 'onBlur', 'onFocus']),
    validate: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.func, _react2.default.PropTypes.string]),
    errorHelp: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.object])
};

ValidatedInput.defaultProps = {
    validationEvent: ''
};
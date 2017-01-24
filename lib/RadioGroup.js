'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Radio = require('./Radio');

var _Radio2 = _interopRequireDefault(_Radio);

var _InputContainer2 = require('./InputContainer');

var _InputContainer3 = _interopRequireDefault(_InputContainer2);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RadioGroup = function (_InputContainer) {
    _inherits(RadioGroup, _InputContainer);

    function RadioGroup(props) {
        _classCallCheck(this, RadioGroup);

        var _this = _possibleConstructorReturn(this, (RadioGroup.__proto__ || Object.getPrototypeOf(RadioGroup)).call(this, props));

        _this.state = {
            value: props.defaultValue || props.value
        };
        return _this;
    }

    _createClass(RadioGroup, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            _get(RadioGroup.prototype.__proto__ || Object.getPrototypeOf(RadioGroup.prototype), 'componentWillMount', this).call(this);

            this.props._registerInput(this);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            _get(RadioGroup.prototype.__proto__ || Object.getPrototypeOf(RadioGroup.prototype), 'componentWillUnmount', this).call(this);

            this.props._unregisterInput(this);
        }
    }, {
        key: 'getValue',
        value: function getValue() {
            var input = this._inputs[this.props.name];

            var value = void 0;

            input.forEach(function (ipt) {
                if (ipt.getChecked()) {
                    value = ipt.getValue();
                }
            });

            return value;
        }
    }, {
        key: 'render',
        value: function render() {
            var label = void 0;

            if (this.props.label) {
                label = _react2.default.createElement(
                    'label',
                    { className: (0, _classnames2.default)('control-label', this.props.labelClassName) },
                    this.props.label
                );
            }

            var groupClassName = {
                'form-group': !this.props.standalone,
                'form-group-lg': !this.props.standalone && this.props.bsSize === 'large',
                'form-group-sm': !this.props.standalone && this.props.bsSize === 'small',
                'has-feedback': this.props.hasFeedback,
                'has-success': this.props.bsStyle === 'success',
                'has-warning': this.props.bsStyle === 'warning',
                'has-error': this.props.bsStyle === 'error'
            };

            return _react2.default.createElement(
                'div',
                { className: (0, _classnames2.default)(groupClassName, this.props.groupClassName) },
                label,
                _react2.default.createElement(
                    'div',
                    { className: this.props.wrapperClassName },
                    this._renderChildren(),
                    this._renderHelp()
                )
            );
        }
    }, {
        key: '_renderChildren',
        value: function _renderChildren() {
            var _this2 = this;

            return _react2.default.Children.map(this.props.children, function (child) {
                if (child.type !== _Radio2.default) {
                    throw new Error('Only Radio component is allowed inside RadioGroup');
                }

                return _react2.default.cloneElement(child, {
                    type: 'radio',
                    standalone: true,
                    checked: _this2.state.value === child.props.value,
                    name: _this2.props.name,
                    onChange: _this2._onChange.bind(_this2),
                    _registerInput: _this2.registerInput.bind(_this2),
                    _unregisterInput: _this2.unregisterInput.bind(_this2)
                });
            });
        }
    }, {
        key: '_renderHelp',
        value: function _renderHelp() {
            return this.props.help ? _react2.default.createElement(
                'span',
                { className: 'help-block', key: 'help' },
                this.props.help
            ) : null;
        }
    }, {
        key: '_onChange',
        value: function _onChange(e) {
            if (!e.target) {
                return;
            }

            this.setState({
                value: e.target.value
            });

            this.props.onChange(e);
        }
    }]);

    return RadioGroup;
}(_InputContainer3.default);

exports.default = RadioGroup;


RadioGroup.propTypes = {
    standalone: _react2.default.PropTypes.bool,
    hasFeedback: _react2.default.PropTypes.bool,
    bsSize: function bsSize(props) {
        if (props.standalone && props.bsSize !== undefined) {
            return new Error('bsSize will not be used when `standalone` is set.');
        }

        return _react2.default.PropTypes.oneOf(['small', 'medium', 'large']).apply(null, arguments);
    },

    bsStyle: _react2.default.PropTypes.oneOf(['success', 'warning', 'error']),
    groupClassName: _react2.default.PropTypes.string,
    wrapperClassName: _react2.default.PropTypes.string,
    labelClassName: _react2.default.PropTypes.string,
    validationEvent: _react2.default.PropTypes.oneOf(['onChange']),
    validate: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.func, _react2.default.PropTypes.string]),
    errorHelp: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.object])
};

RadioGroup.defaultProps = {
    standalone: false,
    validationEvent: 'onChange',
    onChange: function onChange() {}
};
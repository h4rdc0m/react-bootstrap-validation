'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _InputContainer2 = require('./InputContainer');

var _InputContainer3 = _interopRequireDefault(_InputContainer2);

var _ValidatedInput = require('./ValidatedInput');

var _ValidatedInput2 = _interopRequireDefault(_ValidatedInput);

var _RadioGroup = require('./RadioGroup');

var _RadioGroup2 = _interopRequireDefault(_RadioGroup);

var _Validator = require('./Validator');

var _Validator2 = _interopRequireDefault(_Validator);

var _FileValidator = require('./FileValidator');

var _FileValidator2 = _interopRequireDefault(_FileValidator);

var _reactAddonsCreateFragment = require('react-addons-create-fragment');

var _reactAddonsCreateFragment2 = _interopRequireDefault(_reactAddonsCreateFragment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getInputErrorMessage(input, ruleName) {
    var errorHelp = input.props.errorHelp;

    if ((typeof errorHelp === 'undefined' ? 'undefined' : _typeof(errorHelp)) === 'object') {
        return errorHelp[ruleName];
    } else {
        return errorHelp;
    }
}

var Form = function (_InputContainer) {
    _inherits(Form, _InputContainer);

    function Form(props) {
        _classCallCheck(this, Form);

        var _this = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

        _this.state = {
            isValid: true,
            invalidInputs: {}
        };
        return _this;
    }

    _createClass(Form, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            _get(Form.prototype.__proto__ || Object.getPrototypeOf(Form.prototype), 'componentWillMount', this).call(this);

            this._validators = {};
        }
    }, {
        key: 'registerInput',
        value: function registerInput(input) {
            _get(Form.prototype.__proto__ || Object.getPrototypeOf(Form.prototype), 'registerInput', this).call(this, input);

            if (typeof input.props.validate === 'string') {
                this._validators[input.props.name] = this._compileValidationRules(input, input.props.validate);
            }
        }
    }, {
        key: 'unregisterInput',
        value: function unregisterInput(input) {
            _get(Form.prototype.__proto__ || Object.getPrototypeOf(Form.prototype), 'unregisterInput', this).call(this, input);

            delete this._validators[input.props.name];
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'form',
                { ref: 'form',
                    onSubmit: this._handleSubmit.bind(this),
                    method: this.props.method,
                    action: '#',
                    className: this.props.className },
                this._renderChildren(this.props.children)
            );
        }
    }, {
        key: 'getValues',
        value: function getValues() {
            var _this2 = this;

            return Object.keys(this._inputs).reduce(function (values, name) {
                values[name] = _this2._getValue(name);

                return values;
            }, {});
        }
    }, {
        key: 'submit',
        value: function submit() {
            this._handleSubmit();
        }
    }, {
        key: '_renderChildren',
        value: function _renderChildren(children) {
            var _this3 = this;

            if ((typeof children === 'undefined' ? 'undefined' : _typeof(children)) !== 'object' || children === null) {
                return children;
            }

            var childrenCount = _react2.default.Children.count(children);

            if (childrenCount > 1) {
                return _react2.default.Children.map(children, function (child) {
                    return _this3._renderChild(child);
                });
            } else if (childrenCount === 1) {
                return this._renderChild(Array.isArray(children) ? children[0] : children);
            }
        }
    }, {
        key: '_renderChild',
        value: function _renderChild(child) {
            var _this4 = this;

            if ((typeof child === 'undefined' ? 'undefined' : _typeof(child)) !== 'object' || child === null) {
                return child;
            }

            var model = this.props.model || {};

            if (child.type === _ValidatedInput2.default || child.type === _RadioGroup2.default || child.type && child.type.prototype !== null && (child.type.prototype instanceof _ValidatedInput2.default || child.type.prototype instanceof _RadioGroup2.default)) {
                var _ret = function () {
                    var name = child.props && child.props.name;

                    if (!name) {
                        throw new Error('Can not add input without "name" attribute');
                    }

                    var newProps = {
                        _registerInput: _this4.registerInput.bind(_this4),
                        _unregisterInput: _this4.unregisterInput.bind(_this4)
                    };

                    var evtName = child.props.validationEvent ? child.props.validationEvent : _this4.props.validationEvent;

                    var origCallback = child.props[evtName];

                    newProps[evtName] = function (e) {
                        _this4._validateInput(name);
                        if (!_this4._hasError(name)) {
                            newProps.bsStyle = 'success';
                        }
                        return origCallback && origCallback(e);
                    };

                    if (name in model) {
                        if (child.props.type === 'checkbox') {
                            newProps.defaultChecked = model[name];
                        } else {
                            newProps.defaultValue = model[name];
                        }
                    }

                    var error = _this4._hasError(name);

                    if (error) {
                        newProps.bsStyle = 'error';

                        if (typeof error === 'string') {
                            newProps.help = error;
                        } else if (child.props.errorHelp) {
                            newProps.help = (0, _reactAddonsCreateFragment2.default)(child.props.errorHelp);
                        }
                    }

                    return {
                        v: _react2.default.cloneElement(child, newProps)
                    };
                }();

                if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
            } else {
                return _react2.default.cloneElement(child, {}, this._renderChildren(child.props && child.props.children));
            }
        }
    }, {
        key: '_validateInput',
        value: function _validateInput(name) {
            this._validateOne(name, this.getValues());
        }
    }, {
        key: '_hasError',
        value: function _hasError(iptName) {
            return this.state.invalidInputs[iptName];
        }
    }, {
        key: '_setError',
        value: function _setError(iptName, isError, errText) {
            if (isError && errText && typeof errText !== 'string' && typeof errText !== 'boolean') {
                errText = errText + '';
            }

            // set value to either bool or error description string
            this.setState({
                invalidInputs: Object.assign(this.state.invalidInputs, _defineProperty({}, iptName, isError ? errText || true : false))
            });
        }
    }, {
        key: '_validateOne',
        value: function _validateOne(iptName, context) {
            var input = this._inputs[iptName];

            if (Array.isArray(input)) {
                console.warn('Multiple inputs use the same name "' + iptName + '"');

                return false;
            }

            var value = context[iptName];
            var isValid = true;
            var validate = input.props.validate;
            var result = void 0,
                error = void 0;

            if (typeof validate === 'function') {
                result = validate(value, context);
            } else if (typeof validate === 'string') {
                result = this._validators[iptName](value);
            } else {
                result = true;
            }

            if (typeof this.props.validateOne === 'function') {
                result = this.props.validateOne(iptName, value, context, result);
            }
            // if result is !== true, it is considered an error
            // it can be either bool or string error
            if (result !== true) {
                isValid = false;

                if (typeof result === 'string') {
                    error = result;
                }
            }

            this._setError(iptName, !isValid, error);

            return isValid;
        }
    }, {
        key: '_validateAll',
        value: function _validateAll(context) {
            var _this5 = this;

            var isValid = true;
            var errors = [];

            if (typeof this.props.validateAll === 'function') {
                (function () {
                    var result = _this5.props.validateAll(context);

                    if (result !== true) {
                        isValid = false;

                        Object.keys(result).forEach(function (iptName) {
                            errors.push(iptName);

                            _this5._setError(iptName, true, result[iptName]);
                        });
                    }
                })();
            } else {
                Object.keys(this._inputs).forEach(function (iptName) {
                    if (!_this5._validateOne(iptName, context)) {
                        isValid = false;
                        errors.push(iptName);
                    }
                });
            }

            return {
                isValid: isValid,
                errors: errors
            };
        }
    }, {
        key: '_compileValidationRules',
        value: function _compileValidationRules(input, ruleProp) {
            var _this6 = this;

            var rules = ruleProp.split(',').map(function (rule) {
                var params = rule.split(':');
                var name = params.shift();
                var inverse = name[0] === '!';

                if (inverse) {
                    name = name.substr(1);
                }

                return { name: name, inverse: inverse, params: params };
            });

            var validator = (input.props && input.props.type) === 'file' ? _FileValidator2.default : _Validator2.default;

            return function (val) {
                var result = true;

                rules.forEach(function (rule) {
                    if (typeof validator[rule.name] !== 'function') {
                        throw new Error('Invalid input validation rule "' + rule.name + '"');
                    }

                    var ruleResult = validator[rule.name].apply(validator, [val].concat(_toConsumableArray(rule.params)));

                    if (rule.inverse) {
                        ruleResult = !ruleResult;
                    }

                    if (result === true && ruleResult !== true) {
                        result = getInputErrorMessage(input, rule.name) || getInputErrorMessage(_this6, rule.name) || false;
                    }
                });

                return result;
            };
        }
    }, {
        key: '_getValue',
        value: function _getValue(iptName) {
            var input = this._inputs[iptName];

            if (Array.isArray(input)) {
                console.warn('Multiple inputs use the same name "' + iptName + '"');

                return false;
            }

            var value = void 0;
            var dom = _reactDom2.default.findDOMNode(input.refs.control);
            if (input.props.type === 'checkbox') {
                value = dom.checked;
            } else if (input.props.type === 'file') {
                value = dom.files;
            } else {
                value = dom.value;
            }

            return value;
        }
    }, {
        key: '_handleSubmit',
        value: function _handleSubmit(e) {
            if (e) {
                e.preventDefault();
            }

            var values = this.getValues();

            var _validateAll2 = this._validateAll(values),
                isValid = _validateAll2.isValid,
                errors = _validateAll2.errors;

            if (isValid) {
                this.props.onValidSubmit(values);
            } else {
                this.props.onInvalidSubmit(errors, values);
            }
        }
    }]);

    return Form;
}(_InputContainer3.default);

exports.default = Form;


Form.propTypes = {
    className: _react2.default.PropTypes.string,
    model: _react2.default.PropTypes.object,
    method: _react2.default.PropTypes.oneOf(['get', 'post']),
    onValidSubmit: _react2.default.PropTypes.func.isRequired,
    onInvalidSubmit: _react2.default.PropTypes.func,
    validateOne: _react2.default.PropTypes.func,
    validateAll: _react2.default.PropTypes.func,
    validationEvent: _react2.default.PropTypes.oneOf(['onChange', 'onBlur', 'onFocus']),
    errorHelp: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.object])
};

Form.defaultProps = {
    model: {},
    validationEvent: 'onChange',
    method: 'get',
    onInvalidSubmit: function onInvalidSubmit() {}
};
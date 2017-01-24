'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InputContainer = function (_React$Component) {
    _inherits(InputContainer, _React$Component);

    function InputContainer() {
        _classCallCheck(this, InputContainer);

        return _possibleConstructorReturn(this, (InputContainer.__proto__ || Object.getPrototypeOf(InputContainer)).apply(this, arguments));
    }

    _createClass(InputContainer, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this._inputs = {};
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {}
    }, {
        key: 'registerInput',
        value: function registerInput(input) {
            var type = input.props.type;
            var name = input.props.name;

            if (!name) {
                throw new Error('Input ' + input + ' has no "name" prop');
            }

            if (type === 'radio') {
                this._inputs[name] = this._inputs[name] || [];
                this._inputs[name].push(input);
            } else {
                this._inputs[name] = input;
            }
        }
    }, {
        key: 'unregisterInput',
        value: function unregisterInput(input) {
            var type = input.props.type;
            var name = input.props.name;

            if (!name) {
                throw new Error('Input ' + input + ' has no "name" prop');
            }

            if (type === 'radio') {
                this._inputs[name] = this._inputs[name].filter(function (ipt) {
                    return ipt !== input;
                });
            } else {
                delete this._inputs[input.props.name];
            }
        }
    }]);

    return InputContainer;
}(_react2.default.Component);

exports.default = InputContainer;
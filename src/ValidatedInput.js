import React from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

export default class ValidatedInput extends React.Component {
    constructor(props) {
        super(props);

        const {validationEvent, validate, errorHelp, _registerInput, _unregisterInput, ...inputProps} = props;
        this._registerInput = _registerInput;
        this._unregisterInput = _unregisterInput;
        this.inputProps = inputProps;
        if (!this._registerInput || !this._unregisterInput) {
            throw new Error('Input must be placed inside the Form component');
        }
    }

    componentWillMount() {
        this._registerInput(this);
    }

    componentWillUnmount() {
        this._unregisterInput(this);
    }

    render() {
        console.log(this.props);
        const { bsStyle } = this.props;
        const error = (bsStyle == 'error' )
        return (
            <FormGroup controlId={this.props.name} validationState={this.props.bsStyle}>
                <ControlLabel>{this.props.label}</ControlLabel>
                <FormControl ref="control" {...this.inputProps} componentClass={this.props.type}>{this.props.children}</FormControl>
                <FormControl.Feedback/>
                <div className={bsStyle}>{this.props.help}</div>
            </FormGroup>
        )
    }
}

ValidatedInput.propTypes = {
    name           : React.PropTypes.string.isRequired,
    validationEvent: React.PropTypes.oneOf([
        '', 'onChange', 'onBlur', 'onFocus'
    ]),
    validate       : React.PropTypes.oneOfType([
        React.PropTypes.func,
        React.PropTypes.string
    ]),
    errorHelp      : React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.object
    ])
};

ValidatedInput.defaultProps = {
    validationEvent: ''
};

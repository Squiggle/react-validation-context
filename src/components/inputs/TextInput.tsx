import React from 'react';
import { ValidationContext, IValidationContext } from '../ValidationContext';
import classnames from 'classnames';
import styles from './TextInput.module.scss';

interface IInputProps {
    id: string;
    onChange: (value: string) => void;
    required?: boolean;
}

interface ITextInputState {
    touched: boolean;
}

/**
 * 
 */
class TextInputComponent extends React.PureComponent<IInputProps & IValidationContext, ITextInputState> {

    constructor(props: IInputProps & IValidationContext) {
        super(props);

        this.state = {
            touched: false
        };

        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnBlur = this.handleOnBlur.bind(this);
    }

    public componentWillMount() {
        if (this.props.required) {
            this.props.fieldValidityChanged(this.props.id, false);
        }
    }
    
    public render() {
        return <input
            type="text"
            id={this.props.id}
            className={classnames(styles.globalValidation, this.state.touched ? styles.touched : null)}
            required={this.props.required}
            onChange={this.handleOnChange}
            onBlur={this.handleOnBlur} />
    }

    private handleOnChange(evt: React.ChangeEvent<HTMLInputElement>) {
        // our validation logic: just use the native HTML5 input validation
        const isValid = evt.target.validity.valid;
        this.props.onChange(evt.target.value);
        this.props.fieldValidityChanged(this.props.id, isValid);
    }

    private handleOnBlur() {
        this.setState({ touched: true });
    }
}

// Higher-order component
// Easier than putting the ValidationContext.Consumer inside our TextInputComponent
export const TextInput = (props: IInputProps) => 
    <ValidationContext.Consumer>{vctx => <TextInputComponent {...vctx} {...props} />}</ValidationContext.Consumer>

import React from 'react';
import { ValidationContext, IValidationContext } from '../ValidationContext';
import classnames from 'classnames';
import styles from './NumberInput.module.scss';

interface IInputProps {
    id: string;
    onChange: (value: number) => void;
    required?: boolean;
}

interface INumberInputState {
    touched: boolean;
}

class NumberInputComponent extends React.Component<IInputProps & IValidationContext, INumberInputState> {

    constructor(props: IInputProps & IValidationContext) {
        super(props);

        this.state = {
            touched: false
        };

        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnBlur = this.handleOnBlur.bind(this);
    }

    public render() {
        return <input
            type="text"
            className={classnames(styles.globalValidation, this.state.touched ? styles.touched : null)}
            id={this.props.id}
            required={this.props.required}
            onChange={this.handleOnChange}
            onBlur={this.handleOnBlur} />
    }

    public componentWillMount() {
        if (this.props.required) {
            this.props.fieldValidityChanged(this.props.id, false);
        }
    }

    private handleOnChange(evt: React.ChangeEvent<HTMLInputElement>) {
        const value = parseInt(evt.target.value);
        const valid = !isNaN(value);
        if (valid) {
            this.props.onChange(value);
        }
        this.props.fieldValidityChanged(this.props.id, valid);
    }

    private handleOnBlur() {
        this.setState({ touched: true });
    }
}

export const NumberInput = (props: IInputProps) => 
    <ValidationContext.Consumer>{vctx => <NumberInputComponent {...vctx} {...props} />}</ValidationContext.Consumer>
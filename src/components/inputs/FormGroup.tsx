import React from 'react';
import { ValidationContext, IValidationContext, ValidationHandler } from '../ValidationContext';
import { Subscription } from 'rxjs/internal/Subscription';
import classnames from 'classnames';
import styles from './FormGroup.module.scss';

interface IFormGroupProps {
    id: string;
    label: string;
    required?: boolean;
    children?: any;
}

interface IFormGroupState {
    isValid: boolean;
}

/**
 * How do we have multiple levels in the component hierarchy
 * reacting to the validation state of their children without tightly coupling them?
 * 
 * This FormGroup implements another "level" of ValidationContext:
 * Instead of:
 * FORM       INPUT
 * Provider - Consumer
 * 
 * We now have:
 * 
 * FORM       FORMGROUP           INPUT
 * Provider - Consumer/Provider - Consumer
 * 
 * This FormGroup component just applies a red border around all its children when:
 * - One or more of its children is invalid
 * - AND the submit button has been clicked (i.e. the global 'showInvalid' class is applied)
 */
class FormGroupComponent extends React.PureComponent<IFormGroupProps & IValidationContext, IFormGroupState> {

    private readonly validationHandler = new ValidationHandler();
    private readonly subscriptions: Subscription[] = [];

    constructor(props: IFormGroupProps & IValidationContext) {
        super(props);

        this.state = {
            isValid: true
        };

        this.handleValidationChanged = this.handleValidationChanged.bind(this);

        this.subscriptions.push(this.validationHandler.onChange.subscribe(this.handleValidationChanged));
    }

    public componentDidMount() {
        this.setState({isValid: this.validationHandler.isValid});
    }

    public componentWillUnmount() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
    
    public render() {
        return (
           
            <div className={classnames(styles.container, this.state.isValid ? '' : styles.invalid)}>
                <h2>{this.props.label}</h2>
                <ValidationContext.Provider value={this.validationHandler}>
                    {/* this component is decoupled from its parent and from its children :) */}
                    {this.props.children}
                </ValidationContext.Provider>
            </div>
        );
    }

    private handleValidationChanged(isValid: boolean) {
        this.setState({isValid});
        this.props.fieldValidityChanged(this.props.id, isValid);
    }
}

export const FormGroup = (props: IFormGroupProps) => 
    <ValidationContext.Consumer>{vctx => <FormGroupComponent {...vctx} {...props} />}</ValidationContext.Consumer>

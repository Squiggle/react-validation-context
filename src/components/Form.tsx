import React from 'react';
import { TextInput } from './inputs/TextInput';
import { NumberInput } from './inputs/NumberInput';
import { FormGroup } from './inputs/FormGroup';

interface IFormState {
    firstName?: string;
    lastName?: string;
    age?: number;
}

interface IFormProps {
    onChange: (person: { firstName?: string, lastName?: string, age?: number }) => void;
}

/**
 * Form.
 * Clean, semantic form elements.
 */
export class Form extends React.Component<IFormProps, IFormState> {

    constructor(props: IFormProps) {
        super(props);
        this.state = {};
        this.handleFirstNameChanged = this.handleFirstNameChanged.bind(this);
        this.handleLastNameChanged = this.handleLastNameChanged.bind(this);
        this.handleAgeChanged = this.handleAgeChanged.bind(this);
        this.afterChange = this.afterChange.bind(this);
    }

    public render() {
        return <div>
            <h1>Form</h1>
            <FormGroup id="nameGroup" label="Name">
                First name<br/>
                <TextInput required={true} id="firstName" onChange={this.handleFirstNameChanged} /><br />
                Last name<br/>
                <TextInput required={true} id="lastName" onChange={this.handleLastNameChanged} />
            </FormGroup>
            <FormGroup id="ageGroup" label="Personal Details">
                Age<br/>
                <NumberInput required={true} id="age" onChange={this.handleAgeChanged} />
            </FormGroup>
        </div>
    }

    /**
     * After a state change,
     * bubble the new form content as a complete view model
     */
    private afterChange() {
        this.props.onChange({ firstName: this.state.firstName, lastName: this.state.lastName, age: this.state.age });
    }

    private handleFirstNameChanged(name: string) {
        this.setState({firstName: name}, this.afterChange);
    }

    private handleLastNameChanged(name: string) {
        this.setState({lastName: name}, this.afterChange);
    }

    private handleAgeChanged(age: number) {
        this.setState({age}, this.afterChange);
    }
}
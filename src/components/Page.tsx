import React from 'react';
import { Form } from './Form';
import { ValidationContext, ValidationHandler } from './ValidationContext';
import { Subscription } from 'rxjs/internal/Subscription';

interface IPersonViewModel {
    firstName?: string;
    lastName?: string;
    age?: number;
}

interface IPageState {
    attempedSubmit: boolean;
    isValid: boolean;
    person?: IPersonViewModel;
}

/**
 * Page.
 * Responsible for the submit button logic.
 * Contains the parent ValidationContext provider, tracking the validation state
 * of any ValidationContext.Consumers within.
 */
export class Page extends React.Component<{}, IPageState> {

    private readonly validationHandler = new ValidationHandler();
    private subscriptions: Subscription[] = [];

    constructor(props: {}) {
        super(props);
        
        this.state = {
            attempedSubmit: false,
            isValid: false
        };

        this.handlePersonChanged = this.handlePersonChanged.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleValidationChanged = this.handleValidationChanged.bind(this);
        this.getPersonText = this.getPersonText.bind(this);

        // the validation handler emits validation changes
        this.validationHandler.onChange.subscribe(this.handleValidationChanged);
    }

    public componentWillUnmount() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    public render() {
        return (
            <ValidationContext.Provider value={this.validationHandler}>
                { /*
                the "showInvalid" global CSS class is used by child components
                to show validation warnings only after the 'submit' button
                has been clicked
                */}
                <div className={this.state.attempedSubmit ? 'showInvalid' : ''}>
                    <Form onChange={this.handlePersonChanged} />
                    <pre>{ this.state.person ? this.getPersonText() : '...'}</pre>
                    <div>
                        { this.state.attempedSubmit && !this.state.isValid && <span>Please correct validation errors before continuing</span>}
                        <button onClick={this.handleSubmit}>Submit</button>
                    </div>
                </div>
            </ValidationContext.Provider>
        );
    }

    private handleSubmit(evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        if (!this.state.isValid) {
            this.setState({attempedSubmit: true});
        }
        else if (this.state.person) {
            alert(`Sending "${this.getPersonText()}"...`);
        }
    }

    private handlePersonChanged(person: IPersonViewModel) {
        this.setState({person});
    }

    private handleValidationChanged(isValid: boolean) {
        this.setState({ isValid });
    }

    private getPersonText(): string | null {
        return this.state.person
            ? `${this.state.person.firstName} ${this.state.person.lastName}, age ${this.state.person.age}`
            : null;
    }
}
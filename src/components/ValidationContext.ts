import * as React from 'react';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs/internal/Observable';

/**
 * ValidationContext is intended to track the validation of all child fields.
 * The default implementation should use the ValidationHandler which tracks validation of fields
 * and exposes an Observable that will emit changes to the validation state.
 */
export interface IValidationContext {
  addField: (fieldName: string, isValid: boolean) => void;
  removeField: (fieldName: string) => void;
  fieldValidityChanged: (fieldName: string, isValid: boolean) => void;
}

export const ValidationContext = React.createContext({
  addField: (fieldName: string, isValid: boolean) => {
    /* */
  },
  removeField: (fieldName: string) => {
    /* */
  },
  fieldValidityChanged: (fieldName: string, isValid: boolean) => {
    /* */
  }
});

/**
 * Default implementation of a Validation Handler that can be used to track
 * field validation within a ValidationContext.
 * Subscribe to the onChange observable to be notified of validation changes.
 */
export class ValidationHandler implements IValidationContext {
  private readonly fields: string[] = [];
  private readonly validationContextChanged: Subject<boolean>;

  constructor() {
    this.validationContextChanged = new Subject<boolean>();
    this.addField = this.addField.bind(this);
    this.removeField = this.removeField.bind(this);
    this.fieldValidityChanged = this.fieldValidityChanged.bind(this);
  }

  public addField(fieldName: string, isValid: boolean) {
    if (!isValid && this.fields.indexOf(fieldName) < 0) {
      this.fields.push(fieldName);
      this.validationContextChanged.next(this.isValid);
    }
  }

  public removeField(fieldName: string) {
    const index = this.fields.indexOf(fieldName);
    if (index >= 0) {
      this.fields.splice(index, 1);
      this.validationContextChanged.next(this.isValid);
    }
  }

  public fieldValidityChanged(fieldName: string, isValid: boolean) {
    if (isValid) {
      this.removeField(fieldName);
    } else {
      this.addField(fieldName, false);
    }
  }

  public get isValid(): boolean {
    return this.fields.length === 0;
  }

  public get onChange(): Observable<boolean> {
    return this.validationContextChanged.asObservable();
  }
}

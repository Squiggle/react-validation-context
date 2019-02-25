# Complex Form Validation with React.Context

## Get it running

```
yarn install
yarn start
```

## History

Some other examples of validation in React have [large switch statements](https://learnetto.com/blog/how-to-do-simple-form-validation-in-reactjs) or [long validation methods](https://stackoverflow.com/a/41297611/1034004) which can be difficult to maintain at scale.

__Disclaimer: This is a Proof Of Concept. I want to share this code to solicit feedback. It is not production-ready. Use it if you want, but it comes with no guarantees.__

## Implementation

The goal in this project is to leverage components to create a form that has user-friendly validation alerts, and mimicks the pattern seen in native HTML5 forms where:
- The `<input>`s themselves are responsible for their own validation logic
- The parent `<form>` can be interrogated for its validation state

To complement this, we add in additional validation features that you don't get out-of-the-box...

### Invalidate-on-blur

In vanilla HTML forms, required fields without content are immediately marked as 'invalid', which can be intimidating for the user. We instead want to mark mandatory fields as invalid only on blur.

### Validate-on-save

Disabling the 'submit' button to prevent form submission is a common pattern, but provides no visual feedback to the user. We instead want to allow the user to click the submit button which then highlights the input fields that they must correct in order to continue.

# Technical

The separation of concerns breaks down in the following way:

```
Page - responsible for saving
  Form - defines the inputs and input groups
    FormGroup - Highlights a group of inputs with invalid item(s)
      Input - responsible for their own validation
```

## Q & A

Q: _What if I want to have different validation for my text inputs?_

A: One option is to declare a new component which implements that specific validation logic. For example, `<FutureDateInput>` or `<PostCodeInput>`. You can then be guaranteed that the data supplied from that component is valid without the need for further processing.

Q: _Can't I declare my validation logic elsewhere?_

A: here's nothing stopping you injecting validation methods into your components, e.g. 
```tsx
<TextInput
    id="country"
    onValidate={(value: string) => this.countryList.contains(value)}
    onChange={this.handleCountryChanged} />
```

# Further Questions

Hit me up on [twitter](https://twitter.com/squiggle) if you have any comments.
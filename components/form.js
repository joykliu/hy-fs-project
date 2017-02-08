import React from 'react';
import firebase from 'firebase';
import './database.js';

class Form extends React.Component {
    constructor() {
        super();

        this.updateFormObject = this.updateFormObject.bind(this);
        this.updateOptionsValues = this.updateOptionsValues.bind(this);
        this.addAnOption = this.addAnOption.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    render() {
        return <form>

            <fieldset>
                <label>Title</label>
                <input type="textarea"
                        name="title"
                        onChange={ (evt) => this.updateFormObject(evt) }
                        value={ this.props.formObject.title }/>
            </fieldset>

            <fieldset>
                <label>Description</label>
                <input type="textarea"
                        name="description"
                        onChange={ (evt) => this.updateFormObject(evt) }
                        value={ this.props.formObject.description }/>
            </fieldset>

            {this.props.formObject.options.map((option, i) => (
                <fieldset key={ i }>
                    <label>Option { i + 1 }</label>
                    <input type="textarea"
                            name={ i }
                            onChange={ (evt) => this.updateOptionsValues(evt) }
                            value={ option.description }/>
                </fieldset>
            ))}

            <fieldset>
                <input type="textarea"
                        name="newOption"
                        onChange={ (evt) => this.updateFormObject(evt) }
                        value={ this.props.formObject.newOption }/>
                <button onClick={(evt) => this.addAnOption(evt)}>Add an option</button>
            </fieldset>

            <button onClick={ (evt) => this.onSubmit(evt)}>Submit</button>

        </form>
    }

    updateFormObject(evt) {
        let input = evt.target;

        let formValues = Object.assign( this.props.formObject );

        formValues[input.name] = input.value;

        this.props.updateForm(formValues)
    }

    updateOptionsValues(evt) {
        let input = evt.target;
        let formValues = Object.assign(this.props.formObject);
        formValues.options[input.name].description = input.value;

        this.props.updateForm(formValues)
    }

    addAnOption(evt) {
        evt.preventDefault();
        let inputValue = evt.target.value;
        let formValues = Object.assign(this.props.formObject);
        formValues.options.push({'description': formValues.newOption});
        formValues.newOption = '';
        this.props.updateForm(formValues)
    }

    onSubmit(evt) {
        evt.preventDefault();
        let formValues = Object.assign(this.props.formObject);
        this.props.updateForm(formValues)
    }
};

export default Form;

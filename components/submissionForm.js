import React from 'react'

import Form from './form';
import FormHeading from './formHeading';
import Preview from './preview';
import Footer from './footer'

export default class SubmissionForm extends React.Component {
  constructor() {
        super();
        this.state = {
            formObject: {
                title: '',
                desc: '',
                options: [
                    {
                        'desc': '',
                        'users': [0]
                    }, {
                        'desc': '',
                        'users': [0]
                    }
                ],
                newOption: ''
            }
        };
        this.updateForm = this.updateForm.bind(this);
        this.addOption = this.addOption.bind(this);
    }

    render() {
      return <div className="wrapper">
          <div className="submissionFormWrapper">
            <div className="side-menu">
                <Form formObject={ this.state.formObject } updateForm = { this.updateForm } />
            </div>
            <div className="formRenderWrapper">
                <FormHeading title={ this.state.formObject.title} desc={ this.state.formObject.desc } />
                { this.state.formObject.options.map((option, i) => (
                    <Preview option={ option.desc }
                    key={ i }/>
                ))}
            </div>
          </div>
          <Footer />
        </div>
    }


    addOption(options) {
        this.setState({
            formObject: [{
                options: options
            }]
        })
    }

    updateForm(formValues) {
        this.setState({
            formObject: formValues
        })
    }
}

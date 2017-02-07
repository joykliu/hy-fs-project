import React from 'react';
import firebase from 'firebase';

import './database.js';

import Header from './header';
import Form from './form';
import Result from './results.js';
import AddOption from './addOption.js';
import Footer from './footer.js';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            issues: [
                {
                    title: 'Let\'s go out!',
                    description: 'We are going out like crazyyy people this Monday night, in Oshawa.',
                    options: [
                        {
                            title: 'Option1 is this',
                            votes: 0
                        }, {
                            title: 'Option2 is this',
                            votes: 3
                        }, {
                            title: 'Option3 is this',
                            votes: 2
                        }
                    ]
                }
            ]
        };
        this.calculateVotes = this.calculateVotes.bind(this);
    }

    addOption(options) {
		this.setState({
			issues: [{
				options: options
			}]
		})
	}

    render() {
        return (
            <div>
                <Header/>
                <Form/>
                { this.state.issues[0].options.map((option, i) => (
                    <Result option={ option.title }
                            votes={ option.votes }
                            key={ i }
                            calculateVotes= { () => this.calculateVotes(i) }/>
                ))}
                <AddOption newOption={ (options) => this.addOption(options) }
                            options={ this.state.issues[0].options } />
                <Footer/>
            </div>
        )
    }

    calculateVotes(i) {
        const options = this.state.issues[0].options;
        options[i].votes = options[i].votes + 1;
        this.setState({
            issues: [
                {
                    options: options
                }
            ]
        })

        const firebaseRef = firebase.database().ref();
        firebaseRef.set({
            issues: this.state.issues
        })
    }
}

export default App;

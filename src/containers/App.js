import React, { Component } from 'react';
import classes from './App.module.css';
import Persons from '../components/Persons/Persons'
import Cockpit from '../components/Cockpit/Cockpit'
import WithClass from '../hoc/WithClass'
import AuthContext from '../context/auth-context'

class App extends Component {
  constructor (props) {
    super(props);
    console.log('[App.js] constructor')
  }
  state = {
    persons: [
      { id: 'adf', name: 'Max', age: 28 },
      { id: 'efef', name: 'Manue', age: 29 },
      { id: 'fgfg', name: 'Stephanie', age: 26 }
    ],
    showPersons: false,
    changeCounter: 0,
    authenticated: false
  }

  static getDerivedStateFromProps (props, state) {
    console.log('[App.js] getDerivedStateFromProps', props)
    return state;
  }

  componentDidMount () {
    console.log('[App.js] componentDidMount')
  }

  switchNameHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id
    })

    const person = {
      ...this.state.persons[personIndex],
      name: event.target.value
    };

    const personsCopy = [...this.state.persons]
    personsCopy[personIndex] = person

    this.setState((prevState, props) => {
      return {
        persons: personsCopy, 
        changeCounter: prevState.changeCounter + 1
      }
    });
  }

  togglePersonsHandler = () => {
    this.setState((prevState, props) => {
      return {
        showPersons: !prevState.showPersons
      }
    });
  }

  deletePersonHandler = (personIndex) => {
    const personsCopy = [...this.state.persons];
    personsCopy.splice(personIndex, 1);
    this.setState({persons: personsCopy})
  }

  loginHandler = () => {
    this.setState({authenticated: true})
  }

  render () {
    console.log('[App.js] render')
    let persons = null    
    if (this.state.showPersons) {
      persons = <Persons 
                persons={this.state.persons}
                clicked={this.deletePersonHandler}
                changed={this.switchNameHandler}
                isAuthenticated={this.state.authenticated}/>;
    }

    return (
      <WithClass classes={classes.App}>
        <AuthContext.Provider value={{authenticated: this.state.authenticated, login: this.loginHandler}}>
          <Cockpit
            title={this.props.appTitle}
            showPersons={this.state.showPersons} 
            persons={this.state.persons}
            toggle={this.togglePersonsHandler}
            />
          {persons}
        </AuthContext.Provider>
      </WithClass>
    );
  }
}

export default App;

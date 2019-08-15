import React, { Component } from 'react'
import PropTypes from 'prop-types'
import WithClass from '../../../hoc/WithClass'
import classes from './Person.module.css'
import AuthContext from '../../../context/auth-context'

class Person extends Component {
  constructor (props) {
    super(props);
    this.inputElementRef = React.createRef();
  }

  static contextType = AuthContext;

  componentDidMount () {
    this.inputElementRef.current.focus();
  }

  render () {
    console.log('[Person.] rendering...')
    return (
      <WithClass classes={classes.Person}>
        {this.context.authenticated ? <p>Authenticated!</p> : <p>Please log in</p>}
        <p onClick={this.props.click}>I'm a {this.props.name} and I'm {this.props.age}</p>
        {this.props.children &&
            <p>{this.props.children}</p>
        }
        <input 
          type="text" 
          ref={this.inputElementRef} 
          onChange={this.props.changed} 
          value={this.props.name} />
      </WithClass>
    );
  }
}

Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func
}

export default Person;
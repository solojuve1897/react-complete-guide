import React, { useEffect, useRef, useContext } from 'react';

import classes from './Cockpit.module.css'
import AuthContext from '../../context/auth-context'

const Cockpit = (props) => {
    const toggleBtnRef = useRef(null);
    const authContext = useContext(AuthContext);

    useEffect(() => {
        toggleBtnRef.current.click()
    }, [])

    const assignedClasses = []
    let btnClass = props.showPersons ? classes.Red : '';
    
    if (props.persons.length <= 2) {
        assignedClasses.push(classes.red);
    }
    if (props.persons.length <= 1) {
        assignedClasses.push(classes.bold);
    }
    
    return (
        <div className={classes.Cockpit}>
            <h1>{props.title}</h1>
            <p className={assignedClasses.join(' ')}>This is really working!</p>
            <button ref={toggleBtnRef} className={btnClass} onClick={props.toggle}>
                Toggle Persons
            </button>
            <button onClick={authContext.login}>Log in</button>
        </div>
    );
}

export default Cockpit;
import React from 'react';
import { HashRouter as Router, Route, NavLink } from 'react-router-dom';

import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';

import './RegistrationPage.css';

class RegistrationPage extends React.Component {

    render() {
        return (
            <Router basename="/react-auth-ui/">
                <div className="FormRegistration">
                    <div className="FormRegistration_Aside"></div>
                    <div className="FormRegistration_Form">
                        <div className="PageSwitcher">
                        </div>
                        <div className="FormTitle">
                            <NavLink to="/sign-in" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign In</NavLink>
                            or
                            <NavLink exact to="/" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign Up</NavLink>
                        </div>

                        <Route exact path="/" component={SignUpForm}>
                        </Route>
                        <Route path="/sign-in" component={SignInForm}>
                        </Route>
                    </div>
                </div>
            </Router>
        );
    }
}

export default RegistrationPage;

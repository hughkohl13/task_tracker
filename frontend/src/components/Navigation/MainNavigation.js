import React from 'react';
import { NavLink } from 'react-router-dom';

import AuthContext from '../../context/auth-context';
import './MainNavigation.css';

const mainNavigation = props => (
    <AuthContext.Consumer>
        {context=> {
            return (
                <header className="main-navigation">
                    <div className="main-navigation__logo">
                        <h1>Task Tracker</h1>
                    </div>
                    <nav className="main-navigation__item">
                        <ul>
                            {!context.token && (
                                <li>
                                    <NavLink to="/auth"> Authenticate </NavLink>
                                </li>
                            )}
                            <li>
                                <NavLink to="/jobs"> Jobs </NavLink>
                            </li>
                            {context.token && (
                            <React.Fragment>
                                <li>
                                    <NavLink to="/applications"> Applications </NavLink>
                                </li>
                                <li>
                                    <button onClick={context.logout}> Logout </button>
                                </li>
                            </React.Fragment>
                            )}
                        </ul>
                    </nav>
            </header>
            )
        }}
    </AuthContext.Consumer>
);

export default mainNavigation;
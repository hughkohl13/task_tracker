import React from 'react';
import { NavLink } from 'react-router-dom';

import './MainNavigation.css';

const mainNavigation = props => (
    <header className="main-navigation">
        <div className="main-navigation__logo">
            <h1>Task Tracker</h1>
        </div>
        <nav className="main-navigation__item">
            <ul>
                <li>
                    <NavLink to="/auth"> Authenticate </NavLink>
                </li>
                <li>
                    <NavLink to="/jobs"> Jobs </NavLink>
                </li>
                <li>
                    <NavLink to="/applications"> Applications </NavLink>
                </li>
            </ul>
        </nav>
    </header>
);

export default mainNavigation;
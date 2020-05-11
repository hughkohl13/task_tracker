import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import AuthPage from './pages/Auth';
import ApplicationsPage from './pages/Applications';
import JobsPage from './pages/Jobs';
import MainNavigation from './components/Navigation/MainNavigation'

import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
        <MainNavigation/>
        <main className="main-content">
          <Switch>
            <Redirect from="/" to="/auth" />
            <Route path="/auth" component={AuthPage} />
            <Route path="/jobs" component={JobsPage} />
            <Route path="/applications" component={ApplicationsPage } />
          </Switch>
        </main>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;

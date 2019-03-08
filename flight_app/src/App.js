import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import HomePage from './components/HomePage';
import NotFoundPage from './components/common/NotFound/NotFoundPage';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <main>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route component={NotFoundPage} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;

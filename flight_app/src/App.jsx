import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import NavBar from './components/common/NavBar/NavBarLayout';
import HomePage from './components/HomePage/HomePage';
import NotFoundPage from './components/common/NotFound/NotFoundPage';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <header>
          <link rel="stylesheet" 
                href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
                integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" 
                crossOrigin="anonymous"
          />
          <NavBar />
        </header>
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

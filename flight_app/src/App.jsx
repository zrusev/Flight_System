import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import NavBar from './components/common/NavBar/NavBarLayout';
import HomePage from './components/HomePage/HomePage';
import NotFoundPage from './components/common/NotFound/NotFoundPage';

const serverBaseURL = 'http://localhost:9999';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flights: [],
      pagination: []
    }
  }

  componentDidMount() {
    fetch(`${serverBaseURL}/feed/flights`)
    .then((res) => res.json())
    .then((data) => {
      this.setState({        
        flights: data.flights.flights,
        pagination: data.links
      })
    })
    .catch((error) => console.dir(error));
  }

  render() {
    const { flights } = this.state;

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
            <Route exact path='/' render={() => <HomePage flights={flights} />} />
            <Route component={NotFoundPage} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;

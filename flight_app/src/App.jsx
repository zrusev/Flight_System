import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import NavBarLayout from './components/common/NavBar/NavBarLayout';
import FooterLayout from './components/common/Footer/FooterLayout';
import HomePage from './components/HomePage/HomePage';
import DetailsPage from './components/DetailsPage/DetailsPage';
import NotFoundPage from './components/common/NotFound/NotFoundPage';

const serverBaseURL = 'http://localhost:9999';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      arrivals: {
        arrivals: [],
        page: 0,
        pagination: []
      },
      departures: {
        departures: [],
        page: 0,
        pagination: []
      }
    }
  }

  loadPage(page, direction) {
    const directions = {
      arrivals: 'A',
      departures: 'D'
    }

    fetch(`${serverBaseURL}/feed/flights/page/${encodeURIComponent(page)}/direction/${encodeURIComponent(directions[direction])}`)
    .then((res) => res.json())
    .then((data) => {
      this.setState({
        [direction]: {
          flights: data.flights.flights,
          pagination: data.link
        }
      })
    })
  }

  componentDidMount() {
    Promise.all([
      fetch(`${serverBaseURL}/feed/flights/page/${encodeURIComponent(this.state.arrivals.page)}/direction/A`),
      fetch(`${serverBaseURL}/feed/flights/page/${encodeURIComponent(this.state.departures.page)}/direction/D`)
    ])
    .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
    .then(([res1, res2]) => {
        this.setState({
          arrivals: {
            flights: res1.flights.flights,
            pagination: res1.link
          },
          departures: {
            flights: res2.flights.flights,
            pagination: res2.link
          }
        })
    })
  }
  
  render() {
    const { arrivals, departures } = this.state;

    return (
      <div className='App'>
        <NavBarLayout />
        <main>
            <Switch>
              <Route exact path='/' render={() => 
                <HomePage 
                arrivals={arrivals} 
                  departures={departures} 
                  pageLoader={this.loadPage.bind(this)} 
                />}
                />
              <Route exact path='/details' render={() => <DetailsPage />} />
              <Route component={NotFoundPage} />
            </Switch>
          </main>
        <FooterLayout />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import FlightService from './services/FlightService';
import HomePage from './views/HomePage/HomePage';
import Login from './views/Login/LoginPage';
import NavBarLayout from './components/common/NavBar/NavBarLayout';
import FooterLayout from './components/common/Footer/FooterLayout';
import NotFoundPage from './components/common/NotFound/NotFoundPage';
import BoardingPass from './components/BoardingPass/BoardingPass';
import Ticket from './components/Ticket/Ticket';

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

  static service = new FlightService();
  
  loadPage(page, direction) {
    const directions = {
      arrivals: 'A',
      departures: 'D'
    }

    try {
      App.service.getAllFlights(page, directions[direction])
      .then((data) => {
        this.setState({
          [direction]: {
            flights: data.flights.flights,
            pagination: data.link
          }
        })
      })      
    } catch (error) {
      console.dir(error);
    }
  }

  componentDidMount() {
    try {
      Promise.all([
        App.service.getAllFlights(this.state.arrivals.page, 'A'),
        App.service.getAllFlights(this.state.departures.page, 'D')
      ])
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
      });      
    } catch (error) {
      console.dir(error);
    }
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
                  pageLoader={this.loadPage.bind(this)} />}
              />
              <Route exact path='/login' render={() => <Login />} />
              <Route exact path='/boardingpass' render={() => <BoardingPass />} />
              <Route exact path='/ticket' render={() => <Ticket />} />
              <Route component={NotFoundPage} />
            </Switch>
          </main>
        <FooterLayout />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import FlightService from './services/FlightService';
import { UserProvider, defaultUserState } from './components/contexts/UserContext';
import AuthorizedRoute from './components/AuthorizedRoute/AuthorizedRoute';
import HomePage from './views/HomePage/HomePage';
import Login from './views/Login/LoginPage';
import Logout from './views/Logout/LogoutPage';
import SignUp from './views/SignUp/SignUp';
import Users from './views/Admin/Users';
import About from './views/About/About';
import NavBarLayout from './components/common/NavBar/NavBarLayout';
import FooterLayout from './components/common/Footer/FooterLayout';
import NotFoundPage from './components/common/NotFound/NotFoundPage';
import Reservation from './components/Reservation/Reservation';
import CheckOut from './components/Checkout/Checkout';

class App extends Component {
  constructor(props) {
    super(props);
    
    const parsedUser = window.localStorage.getItem('user') 
      ? JSON.parse(window.localStorage.getItem('user')) 
      : {}

    this.state = {
      user: {
        ...defaultUserState,
        ...parsedUser,
        updateUser: this.updateUser
      },
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
  
  updateUser = (user) => {
    this.setState({ user });
  }

  render() {
    const { arrivals, departures } = this.state;
    const { user } = this.state;

    return (
      <div className='App'>
        <UserProvider value={user}>
          <NavBarLayout />
            <main>
              <Switch>
                <Route exact path='/' render={() => 
                  <HomePage 
                    arrivals={arrivals} 
                    departures={departures} 
                    pageLoader={this.loadPage.bind(this)} />}
                  />
                <Route exact path='/login' component={Login} />
                <Route exact path='/signup' component={SignUp} />
                <Route exact path='/about' component={About} />
                <AuthorizedRoute exact path='/logout' component={Logout} />
                <AuthorizedRoute exact path='/reservation' component={Reservation} allowedRoles={['admin', 'user']} />
                <AuthorizedRoute exact path='/checkout' component={CheckOut} />
                <AuthorizedRoute exact path='/users' component={Users} allowedRoles={['admin']} />                
                <Route component={NotFoundPage} />
              </Switch>
            </main>
          <FooterLayout />
        </UserProvider>
      </div>
    );
  }
}

export default App;

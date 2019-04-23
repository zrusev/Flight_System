![license](https://img.shields.io/github/license/zrusev/Flight_System.svg) ![size](https://img.shields.io/github/repo-size/zrusev/Flight_System.svg) ![last commit](https://img.shields.io/github/last-commit/zrusev/Flight_System.svg)


# Flight System
Sample flight system for tickets and reservations management which consumes the [Schiphol's public airport API](https://www.schiphol.nl/en/developer-center/) in order to obtain all flights information.

Using [ReactJS](https://reactjs.org/) on client's side and [ExpressJS](https://expressjs.com/) on server's, the application offers a public section for the arrival/departure flights and restricted one for the logged in users for tickets buying.

The administrative part of the system allows the administrator to modify or remove already bought tickets.

#### Structure:
- public part (accessible without authentication)
- private part (available for registered users) and
- administrative part (available for administrators only)

#### Implementation:
- Google Maps API
- Authentication and user roles
- Cient-side routing
- Stateless and state full components, bound forms, synthetic events, etc.
- Error handling and data validation

Server included in repository.
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {} from './Reservation.css';
import DrawGrid from './DrawGrid';
import FlightService from '../../services/FlightService';

class Reservation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checkout: false,
            error: '',
            seat: [
                'Front1', 'Front2', 'Front3',
                'Front4', 'Front5', 'Front6',
                'Middle1', 'Middle2', 'Middle3',
                'Middle4', 'Middle5', 'Middle6',
                'Back1', 'Back2', 'Back3'
            ],
            seatAvailable: [],
            seatReserved: [],
            seatBought: [],
            seatSelected: []
        }
    }

    static service = new FlightService();

    async componentWillMount() {
        if (this.props.location.flight) {
            const { id: flightId } = this.props.location.flight;

            try {
                const result = await Reservation.service.getSeats(flightId);                
                const reservedSeats = result.seats;
                const seatAvailable = reservedSeats.length !== 0 
                    ? this.state.seat.filter((s) => !reservedSeats.includes(s))
                    : []

                this.setState({
                    seatReserved: reservedSeats,
                    seatBought: reservedSeats,
                    seatAvailable 
                })
                
            } catch (error) {
                console.log(error);                
            }
        }
    }

    onClickData(seat) {
        if(this.state.seatBought.indexOf(seat) > -1) {
            return;
        }

        if (this.state.seatReserved.indexOf(seat) > -1) {            
            this.setState({
                seatAvailable: this.state.seatAvailable.concat(seat),
                seatReserved: this.state.seatReserved.filter(res => res !== seat),
                seatSelected: this.state.seatSelected.filter(res => res !== seat)
            })
        } else {
            this.setState({
                seatReserved: this.state.seatReserved.concat(seat),
                seatSelected: this.state.seatSelected.concat(seat),
                seatAvailable: this.state.seatAvailable.filter(res => res !== seat)
            })
        }
    }

    proceedToCheckout = (event) => {
        event.preventDefault();

        if (this.state.seatSelected.length) {
            this.setState({
                checkout: true
            })            
        } else {
            this.setState({
                error: 'Select at least one seat'
            })    
        }
    }

    render() {
        if (!this.props.location.flight) {
            return <Redirect to='/' />
        }

        if(this.state.checkout) {
            return <Redirect to={{ pathname: '/checkout', flight: {...this.props.location.flight}, seats: { ...this.state.seatSelected } }} />
        }

        return (
            <div>
                {
                    this.state.error ? <span><b>{this.state.error}</b></span> : null
                }
                <h1>Seat Reservation System</h1>
                <DrawGrid
                    seat={this.state.seat}
                    available={this.state.seatAvailable}
                    reserved={this.state.seatReserved}
                    selected={this.state.seatSelected}
                    onClickData={this.onClickData.bind(this)}
                    flight = {this.props.location.flight}
                    handleClick = {this.proceedToCheckout.bind(this)}
                />
            </div>
        )
    }
}

export default Reservation;
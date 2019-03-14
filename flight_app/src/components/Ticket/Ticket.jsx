import React, { Component } from 'react';
import {} from './Ticket.css';
import DrawGrid from './DrawGrid';

class Ticket extends Component {
    constructor() {
        super();
        this.state = {
            seat: [
                'Front1', 'Front2', 'Front3',
                'Front4', 'Front5', 'Front6',
                'Middle1', 'Middle2', 'Middle3',
                'Middle4', 'Middle5', 'Middle6',
                'Back1', 'Back2', 'Back3'
            ],
            seatAvailable: [
                'Front2', 'Front3',
                'Front4', 'Front5', 'Front6',
                'Middle1', 'Middle2', 
                'Middle3', 'Middle4', 
                'Back1', 'Back2', 'Back3'
            ],
            seatReserved: ['Front1', 'Middle3'],
            seatBought: ['Front1', 'Middle3'],
            seatSelected: []
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

    render() {
        return (
            <div>
                <h1>Seat Reservation System</h1>
                <DrawGrid
                    seat={this.state.seat}
                    available={this.state.seatAvailable}
                    reserved={this.state.seatReserved}
                    selected={this.state.seatSelected}
                    onClickData={this.onClickData.bind(this)}
                />
            </div>
        )
    }
}

export default Ticket;
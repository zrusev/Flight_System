import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

class AvailableList extends Component {
    render() {
        const seatCount = this.props.available.length;

        return (
            <Table>
                <thead>
                    <tr>
                        <th>
                            Available Seats: ({seatCount === 0 ? 'No seats available' : seatCount})
                            </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>
                            <ul>
                                {this.props.available.map(res => <li key={`available-list-${res}`} >{res}</li>)}
                            </ul>
                        </th>
                    </tr>
                </tbody>
            </Table>
        )
    }
}

export default AvailableList;
import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

class SelectedList extends Component {
    render() {
        const seatCount = this.props.selected.length;
        
        return (
                <Table>
                    <thead>
                        <tr>
                            <th>
                                Selected Seats: ({seatCount === 0 ? 'No seats selected' : seatCount})
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>
                                <ul>
                                    {this.props.selected.map(res => <li key={`selected-list-${res}`} >{res}</li>)}
                                </ul>
                            </th>
                        </tr>
                    </tbody>                
                </Table>
        )
    }
}

export default SelectedList;
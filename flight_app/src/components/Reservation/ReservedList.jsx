import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

class ReservedList extends Component {
    render() {
        return (
            <Table>
                <thead>
                    <tr>
                        <th>
                            Reserved Seats: ({this.props.reserved.length})
                            </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>
                            <ul>
                                {this.props.reserved.map(res => <li key={`reserved-list-${res}`} >{res}</li>)}
                            </ul>
                        </th>
                    </tr>
                </tbody>
            </Table>
        )
    }
}

export default ReservedList;
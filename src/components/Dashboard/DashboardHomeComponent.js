import React, { Component } from "react";
import { Button } from "reactstrap";
import Navbar from './DashNavbar';

class DashboardHome extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Navbar />
                <div className="container">
                    <div className="py-4">
                        <h1>Users</h1>
                        <table class
                            ="table border shadow">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">Role</th>
                                    <th scope="col">Firstname</th>
                                    <th scope="col">Lastname</th>
                                    <th scope="col">Phone Number</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.users.users.map((user, index) => (
                                    <tr>
                                        <td>{user.role}</td>
                                        <td>{user.firstname}</td>
                                        <td>{user.lastname}</td>
                                        <td>{user.phonenumber}</td>
                                        <td><Button>DESACTIVATE</Button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>


        );
    }
}
export default DashboardHome
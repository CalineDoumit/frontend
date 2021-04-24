import React, { Component } from "react";
import { Button } from "reactstrap";
import Navbar from './DashNavbar';

class DashboardHome extends Component {
    constructor(props) {
        super(props);
        this.deactivatePatient=this.deactivatePatient.bind(this);
        
    }
    
    deactivatePatient(patientId){
        console.log("patient ID: "+patientId)
        this.props.postDeactivatePatient(patientId);
        alert("patient id: "+patientId)
    }
          
    


    render() {
        return (
            <div>
                <Navbar postPatient={this.props.postPatient} users={this.props.users} robots={this.props.robots} postNurse={this.props.postNurse} logoutUser={this.props.logoutUser}  postAssign={this.props.postAssign}/>
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
                                        {
                                          user.role==='patient'?
                                          
                                              user.isActive===true ?  
                                              <td><Button 
                                              onClick={()=>this.deactivatePatient(user.patient)} 
                                              >DESACTIVATE</Button></td>
                                              :
                                              <td><Button color='primary'>not active</Button></td>
                                          
                                          :
                                          <td></td>
                                            

                                        }
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
export default DashboardHome;


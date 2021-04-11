import React, { Component } from "react";
import { Button } from "reactstrap";
import Navbar from './DashNavbar';

class DashboardHome extends Component {
    constructor(props) {
        super(props);
        this.desactivatePatient=this.desactivatePatient.bind(this);
        
    }
    
    /*desactivatePatient(patientId){
        //this.props.postDeactivatePatient(patientId);
        //alert("fetna bl desact"+patientId)
    }*/
    
        desactivatePatient(){
        // POST request using fetch with error handling
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin': '*'  },


            body: JSON.stringify({ "patientId":"6070f6c4119f3e1b9c3935ec",
            "robotnumber":1 })
        };
        fetch('https://localhost:3443/patients/6070f6c4119f3e1b9c3935ec/deassignRobot', requestOptions)
            .then(async response => {
                const data = await response.json();
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                this.setState({ postId: data.err })
            })
            .catch(error => {
                this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
            });
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
                                        {
                                          user.role==='patient'?
                                          
                                              user.isActive===true ?  
                                              <td><Button onClick={this.desactivatePatient} >DESACTIVATE</Button></td>
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
export default DashboardHome
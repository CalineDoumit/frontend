import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Button, Navbar, NavbarBrand, Nav, NavbarToggler,
  Collapse, NavItem, Modal, ModalBody, ModalHeader, Form,
  FormGroup, Input, Label
} from 'reactstrap';
import { DropdownMultiple, Dropdown } from 'reactjs-dropdown-component';
import { InsertEmoticon, ThreeSixtyOutlined } from "@material-ui/icons";
import { connect } from 'react-redux';
import {logoutUser,postNurse} from '../../redux/ActionCreators';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'

const mapStateToProps = state => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = (dispatch) => ({
  logoutUser: (creds) => dispatch(logoutUser(creds)), 
  postNurse: (values) => dispatch(postNurse(values)),  

})

class DashNavbar extends Component {


  constructor(props) {
    super(props);
    this.image = "https://www.google.com/imgres?imgurl=https%3A%2F%2Fpng.pngtree.com%2Fpng-vector%2F20190301%2Fourlarge%2Fpngtree-vector-administration-icon-png-image_747092.jpg&imgrefurl=https%3A%2F%2Fpngtree.com%2Ffreepng%2Fvector-administration-icon_4090499.html&tbnid=_-PfS-qdsdd64M&vet=12ahUKEwj_4r-3vu_vAhVVt6QKHWInBxkQMygFegUIARDeAQ..i&docid=SVrhkK6EHI8bwM&w=640&h=640&q=admin%20logo&hl=en-GB&ved=2ahUKEwj_4r-3vu_vAhVVt6QKHWInBxkQMygFegUIARDeAQ"
    this.state = {
      isNavOpen: false,
      isPatientModalOpen: false,
      isNurseModalOpen: false,
      isAssignModalOpen: false,
      username: '',
      password: '',
      firstname: '',
      lastname: '',
      phonenumber: '',
      description: '',
      allergies: '',
      bloodType: '',
      dateofBirth: '',
      emergencyContact: '',
      listOfInactivePatients:[],
      listOfInactiveRooms:[],
      chosenRobotid:0,
      chosenPatientid:0,
    };
    this.toggleNav = this.toggleNav.bind(this);
    this.togglePatientModal = this.togglePatientModal.bind(this);
    this.toggleNurseModal = this.toggleNurseModal.bind(this);
    this.toggleAssignModal = this.toggleAssignModal.bind(this);
    this.handlePatientSubmit = this.handlePatientSubmit.bind(this);
    this.handleNurseSubmit = this.handleNurseSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.makeListPatients = this.makeListPatients.bind(this);
    this.makeListRooms = this.makeListRooms.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleAssign = this.handleAssign.bind(this);
    this.activatePatientRobot=this.activatePatientRobot.bind(this);

    
  }

  activatePatientRobot(patientId,robotNumber){
   // this.props.postAssign({patientId:patientId,robotnumber:robotNumber});
}
      

  handleLogout() {
    this.props.logoutUser();
    this.props.history.push("/login");
    return;
  }

  handlePatientSubmit=e=> {
    e.preventDefault();
    this.togglePatientModal();
    this.props.postPatient({
      username: this.state.username,
      password: this.state.password,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      phonenumber: this.state.phonenumber,
      description: this.state.description,
      allergies: this.state.allergies,
      bloodType: this.state.bloodType,
      dateofBirth: this.state.dateofBirth,
      emergencyContact: this.state.emergencyContact,
    });
  }

  handleNurseSubmit=  e =>{
    e.preventDefault();
    this.toggleNurseModal();
    this.props.postNurse({
      username: this.state.username,
      password: this.state.password,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      phonenumber: this.state.phonenumber,
      description: this.state.description,
    });
  }
  
  handleAssign=e=>{
    e.preventDefault();
    console.log("patient id "+ this.state.chosenPatientid)
    console.log("robot id "+ this.state.chosenRobotid)
    //this.activatePatientRobot(this.state.chosenPatientid,this.state.chosenRobotid)
   this.props.postAssign({patientId:this.state.chosenPatientid,robotnumber:this.state.chosenRobotid});


  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen
    });
  }

  togglePatientModal() {
    this.setState({
      isPatientModalOpen: !this.state.isPatientModalOpen
    });
  }

  toggleNurseModal() {
    this.setState({
      isNurseModalOpen: !this.state.isNurseModalOpen
    });
  }

  toggleAssignModal() {
    this.makeListPatients();
    this.makeListRooms();
    this.setState({
      isAssignModalOpen: !this.state.isAssignModalOpen
    });
  }

  onChange(item, name) {
    if(name==="robot"){
      this.setState({chosenRobotid : item.value})
    }
    else{
      this.setState({chosenPatientid : item.value})
     
    }
  }
  

  makeListPatients(){
    this.props.users.users.map((user,index)=>{
      if(user.isActive==false){
        this.state.listOfInactiveRooms.length=0
        this.state.listOfInactivePatients.push({label:user.firstname,value:user.patient})
      }
    })
  }

  makeListRooms(){
    this.props.robots.robots.map((robot)=>{
      if(robot.isOccupied==false){
        this.state.listOfInactiveRooms.length=0
        this.state.listOfInactiveRooms.push({label:robot.roomNumber,value:robot.number})
      }
    })
  }
  

  render() {
    return (
      <div>
        <Navbar className="navbar navbar-expand-lg navbar-dark ">
          <NavbarBrand className="mr-auto" >
            <img src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIHERISERMWEBUSDxIVEBMSFhYVFhYTFRIXGBUWExcYICkgGBomIRYTIjMtMSkrLi4uFx8zODMtNygtLisBCgoKDg0OFRAPFislHR83NzAvKzcyNysuMC8xNystNy03NDcrNy01Mi0tLS0rNy8tNC01LTItKzctNzUxKystK//AABEIANgA6gMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABgcDBAUCCAH/xAA/EAACAQMBBQYDBAcHBQAAAAABAgADBBEFBhIhMUEHE1FhcYEiMpEUI6GxQlJicpLC0RUWM4KywfAXQ1Oi4f/EABkBAQADAQEAAAAAAAAAAAAAAAABAgMFBP/EACURAQACAQIFBAMAAAAAAAAAAAABAhEDMQQSIXHwMkFRgRMjwf/aAAwDAQACEQMRAD8AvGIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiBEa20zkVaqsiinUZVpMOLBSR8R6E49vOSm1rC5RHHAOisAeeGGeP1kO1mytzqtrSNMHv6dV6q8cMyqSpIzj9Fs+PXMmwGICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICJ5qVBSBLEADmTOLea90pDP7TcvYQO5MVS5Sn8zqPUgSjto9r7+8vmtXqtZUhUKggAM6DOHDHhhuGMcs8cmTDQKaUAMZY/ruxdj6sxJgam0WqoNobHDDdWiik54Zfvx/MsstLunU5Op9GEj721tWdaz0KT1UxuVmpoai45brkZGPWcnXNy4B3h7jII9GHEQJ5E+f621N9s9dLTtaz3atjFBz3jZz8ocfFnzOcdQZb9nrzLgVVz5jmPUcjAkMTFb3C3I3kIYf8AOfhMsBERAREQEREBERAREQEREBERAREQEREBMV1cLaqWY4A/E+A85zdq9eTZq0rXVQbwpr8KA4LuxwiA9Mkj0lObN9p1ztFdCldhFVj92tMYVc8OpJJ5czyJ5YgWXfXr37ZPAD5VHIf1MxIk/UWZ0SBr3FjTvF3aiLUHg6hh+M1qGz1vQ/w0NPyRnUfQHE7CpMgSBzPsgVguWwVY/MehXH5mYLjQqNx84Z/JnfH0zOs6feJ+5U/NJkKQOTaaXRsBilSSnnnuKAT6nmZkZJvMkwukDXt67WbbyHHiOhHgRJTp96t8uRwI+ZfA/wBJF3WQPbjbytsrVRLUr3hHx7w3gRwOGHhgr4Hjz4QLuiRPs32w/vlad6yinWpvuV0XO6GxlWTPHdYH2II44zJZAREQEREBERAREQEREBERAREQERECsO3msfsttSHJ7hnbz3EIH4uPpKKtGNrcUXHAiqo/iO7/ALy8e3hcUrRuneVV9yqkf6TKN+etSA/8qf6hIS+lbc94AfEA/UTbRZpUXW0ohqjBFp0gXZjgKqrxJPQcJXl12gX20FU0tIoAJvFVrVVLM5HVE5AdeROOeJetZtOIhW1orGZla6JMypKjr3O02gjvapSsg+ZalNMeQygGPqJNdgNuaW1gemyG3uaQzVoMenLfpk81yRnqMjyJm2navWYVrettpSN0+8T9yp+aTKyT3UT7xP3Kn8s5W120dDZS3Ne4Jxndpovz1HxwVR+Z5ASi7cdJgdZV1HaHX9rSzWlNLSnwwAodgDy3nqAjPsvpMdbajWtk2H9oUVuaeMsQoRwvVlZRg49CPSa/hvjOPO27P81M4z532WZUWfPu3VX7XqVcn9Ft0egJx+BEvbRdYo6/QSvQbeRvHgysOasOhEoba5e51G5B61Sf9v8AYzJqsXsFrGhc3FPpUt1bHnTcAfhUMu2Ud2GL3l7UI/RtGz71KePyl4wgiIgIiICIiAiIgIiICIiAiIgIiIEO7V9BfX9OqLRXfq0WWtSUc2KghlHmVZseeJQGwukvrF9TBUhab/HkEYx8wPoM++PGfWE52oaWlfLqqrU6sAAWHgx6wKp7Ybx0tKNuh3ftd0tNz+wOOPrufSZdm9N+xKi0fg3MbjLwYYGOfPjxz45M9drWlVLuzWrTBNSzrisVxx3AMPw8vhb0Uzd2I1elqdJKqEEEDeHVW6q3nPfwdoit/lzePraZp16f10dUW4uk3alRmXqp4A48QOcrfWCdnb+xvafwsLlKdX9qm3Bgf8u+PceEuXU7lGTh4SpdRp/3r1W0sqPxLRrCtdMOIVUIJBPjjh6uJpfUidC0WjHx3ZaWnMcRWa2z89l51B94n7lT+WUp2gVDr2vdw/GnY26bqHl3jqrlv/dP4BLmqP8Aep+5U/llP9pFD+7us075hiheUlp1X44WqgC/F4cFpn03vCeHQmsalZts6PERadK0V3wk2i061vxpOaeQAd3kcciRyJmHXrardHeqs1QgYG90HkOQne2fuae6DwIIBBHIjymHaa8p00ZiQqqCWYnAAHUmdSNWY1dvtxp0v0+r6V52csdI1O6s14UqtEVkXorqV5DpwZh/lE4na7pLWd19oUfDUX4iP+eO9/EskPZrQbV7271HBFLd7i3yMb3FSxHoFH8WOkt/T9KVsPVQMc5QMAd3z48mnK1eWb25dsu3o80adebfCC9hGg1LG2q3VZCjXJUUlYEHuUzhsHlvFm9QoPWWjETNoREQEREBERAREQEREBERAREQEREBERA1byxW68jjn4+RHWVXrfZa1nVavp1drB2+ZAN6ix8gPlHkQR4AS3pjr1lt1Z3YIqglmYgKAOZJPACTE46wiYiYxKll2J1rUfgudSp06ZGCaCkuR1/QT85Otj9lbbZKkUt1O8+DVqvxqVCOW8egHHAHDj4kmfup7WWdSm7WlSncMmS/dnIUAE5IHPODj38JW1j20s9QrUtVCkkKwqFTz4bwKmJtM7yitK19MYXDUf71P3H/ADWYNa02jrdF6FwgqU3HxKfHoVI4gjoZAv8AqYrMrfZ24Kw4VB1I648pyNZ7ZDbHdpWys3XeqkgeoCjj7yFm0/Z3qGikjTdQxTz8NK5Gd0eG8FYH2VZ6tezS91xl/tK9NdFOTRtxuoTnPFiFA/hz4ESSbIbb0NRoC4uwtuhGd5iQobIG755zwk50vUaGqUxUt6iVkzjepkEAjmDjkfKW57YxnoryVznEZa2jaHS0lERFVVprhEUfCo8vE+c6sRKrEREBERAREQEREBERAREQEREBERAREQERPFSoKfvyHjA9yme33anu0p2VIP8A4oeu5Uimd1Tu0wx4O2SGOOA3R15WXrWsCyB48ZCqep0to7mja10WvTeqC1NxlSaeXGR1GVHkeIPAmBDtgabJplxcEbrO5VD6AIpHuxkr1Dsgs9Www36D4G81MggnHElT1na1nTqNr3NvQprSSpqFJRTpgKoCsajkAfuE+8mGo0KlShVWi25UamwpsejkcDAp89g5Xgt+4Xw7v+j4m3Y9itpYHeq1Klxj9E4RfcDifrJFQ0O/WkVf7Q1To4vqgH8O9O1omm39GgqVrhN4FvnptWYAk4Bqd4u99Pcy1qRHvE+dlK3mfaY87q71nTAtrfUFGBQYtTUdECrVUD6GRHsk2wfQb4rUR3pV03KqUlZ2QhgVqFFyWC8QeuG9pale0ahe3FOqVqGta034JuKQrMhG6WPQjrPO0iWuylSg9rQp2/f0mDGkoTeWmVKg45n7w8eZ9hKNFiKwcAjiCMj0n7IroG0IugATJLTrbxweeMjzHlJQyxEQEREBERAREQEREBERAREQEREBERASCa52i2GjO/fVsuMhadNS5UftY4KevE5k2uUNRHVTukowDeBI4GU5oXZxbaWge9UXdw3F94k00J6KP0j4k8z4QOTre39vq5Ipsy5/XGPyJnV7LaX2vUBU5ijQqVM+ZG4PwdvpOXrOzela4XpWrUqFwgO73LjGR0emDgjPPHEfhJ/2QbLVNn7RnuABVuCCVBB3aa53FyOGTlm/zAdIGyH+039kv6ouKzeu6EX8XMmshVG1ey1GozAhVtUSkx5MGqMxwfEYAP8A9kut7gVBAzxPzMwXFwEECJ7Tnur21f8AXp3FI/RXX/SZx+0qka9haVh/2qpQ+SsCufqi/WdLadXvGt+6Uu63VMgDnunKt6DBz7SQatoC6lYvaE43qWA/PFTO8r48mwYFH6btXS0ZvvGPDovE/wBJOtL7VdOvlVGqvRcH4WqJ8OfNlJx74Egel7HW2ib1XV2QP3jItJ6gFMbpxxIPxk4JxyxzHhLm2O0vX6Q3KKU94Zp1rYhSPBgV+FvfMC1tPu1vqaVFIIYZyDkex6ibEi/ZxolXZ6xW3q1BVK1apVlzjcLnd58sjjjpvY6SUQEREBERAREQEREBERAREQEREBERA8uN4EeIMg20lu9enURTusyOqt+qxUgH2k7nI1/QE1tCjO9IMR3hpEKXTqhJGQD1IwfOB8wbKbP3bXdErTZVp1gWq4+DdRsNuvyYHBHDnmfVek0jQo01bmEGfLympp+z1Gx3cDO4AEXACqBywo8J1oGOvQW4GGGR+Xp4Sp9c7RW2Xvq9pcWzlaZDUalNhl6TDKtuvgHwODzBltk7vE8JEO0HSaG09pUojd74LmhU3flcHIG9zCnGDjoYEbXtcsiOPfA45d3/AEOJzLjtUGoVadC0tqtWpWqCnT7wqoyTjOFLHA5nlylV3VhWtavcvSdavEd3uksTw+UD5vbOZeXZPs+mzdA1LhQLmsxYkqCaSYwtMMOR5k+Zx0kCwLOxS0HAZYj4mPM/0E2Z5RxUGQcjxE9SR869sWz91Xuw6U3qoAy4QZKsXJzjnhgV4+UkPZLY1LSzXfOd+q7qv6gyFKHwOVYkdCSJbl/plO+4sOI5MOfp5zm6dspS0+s9VHfFQZqUvh7tqnD7zGMh8DBwQD1BPGB1dNUqgz1M2oAxEBERAREQEREBERAREQEREBERAREQEREBERAx16QrqVPI+E5dTR2HysD68J2IgcP+y6nl9Z7TSGPNgPTJnZiBhtbcWy7o48cknxmaIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgf/2Q==' height="30" width="41"
              alt="Admin" />
          </NavbarBrand>
          <NavItem>
            <Button onClick={this.togglePatientModal} >
              <span className="fa fa-heart fa-lg"></span> Add Patient
          </Button>
          </NavItem>
          <NavItem>
            <Button onClick={this.toggleNurseModal} >
              <span className="fa fa-heartbeat fa-lg"></span> Add Nurse
          </Button>
          </NavItem>
          <NavItem>
            <Button onClick={this.toggleAssignModal} >
              <span className="fa fa-heartbeat fa-lg"></span> Assign Robot
          </Button>
          </NavItem>
          <NavItem>
            <Button outline onClick={this.handleLogout}>
              <span className="fa fa-sign-out fa-lg"></span> Logout
                                        </Button>
          </NavItem>
        </Navbar>

        <Modal isOpen={this.state.isPatientModalOpen} toggle={this.togglePatientModal}>
          <ModalHeader toggle={this.togglePatientModal}>Add Patient</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handlePatientSubmit}>
              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input type="text" id="username" name="username"
                  onChange={(event) => this.state.username = event.target.value} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" name="password"
                  onChange={(event) => this.state.password = event.target.value} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="firstname">Firstname</Label>
                <Input type="text" id="firstname" name="firstname"
                  onChange={(event) => this.state.firstname = event.target.value} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="lastname">Lastname</Label>
                <Input type="text" id="lastname" name="lastname"
                  onChange={(event) => this.state.lastname = event.target.value} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="phonenumber">Phone Number</Label>
                <Input type="text" id="phonenumber" name="phonenumber"
                  onChange={(event) => this.state.phonenumber = event.target.value} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="description">Description</Label>
                <Input type="text" id="description" name="description"
                  onChange={(event) => this.state.description = event.target.value} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="dateofBirth">Date Of Birth</Label>
                <Input type="text" id="dateofBirth" name="dateofBirth"
                  onChange={(event) => this.state.dateofBirth = event.target.value} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="allergies">Allergies</Label>
                <Input type="text" id="allergies" name="allergies"
                  onChange={(event) => this.state.allergies = event.target.value} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                <Input type="text" id="emergencyContact" name="emergencyContact"
                  onChange={(event) => this.state.emergencyContact = event.target.value} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="bloodType">Blood Type</Label>
                <Input type="text" id="bloodType" name="bloodType"
                  onChange={(event) => this.state.bloodType = event.target.value} />
              </FormGroup>
              <Button type="submit" color="primary">Add</Button>
            </Form>
          </ModalBody>
        </Modal>


        <Modal isOpen={this.state.isNurseModalOpen} toggle={this.toggleNurseModal}>
          <ModalHeader toggle={this.toggleNurseModal}>Add Nurse</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleNurseSubmit}>
              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input type="text" id="username" name="username"
                  onChange={(event) => this.state.username = event.target.value} 
                  
                  />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" name="password"
                  onChange={(event) => this.state.password = event.target.value} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="firstname">Firstname</Label>
                <Input type="text" id="firstname" name="firstname"
                  onChange={(event) => this.state.firstname = event.target.value} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="lastname">Lastname</Label>
                <Input type="text" id="lastname" name="lastname"
                  onChange={(event) => this.state.lastname = event.target.value} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="phonenumber">Phone Number</Label>
                <Input type="text" id="phonenumber" name="phonenumber"
                  onChange={(event) => this.state.phonenumber = event.target.value} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="description">Description</Label>
                <Input type="text" id="description" name="description"
                  onChange={(event) => this.state.description = event.target.value} />
              </FormGroup>
              <Button type="submit" color="primary">Add</Button>
            </Form>
          </ModalBody>
        </Modal>


        <Modal isOpen={this.state.isAssignModalOpen} toggle={this.toggleAssignModal}>
          <ModalHeader toggle={this.toggleAssignModal}>Assign Robot</ModalHeader>
          
          <ModalBody>
          <Form onSubmit={this.handleAssign}>
            <Dropdown
              name="patient"
              title="Select Patient"
              list={this.state.listOfInactivePatients}
              onChange={this.onChange}
            />
            <Dropdown
              name="robot"
              title="Select Room Number"
              list={this.state.listOfInactiveRooms}
              onChange={this.onChange}

            />
            <Button type="submit">ASSIGN</Button>
            </Form>
          </ModalBody>
        </Modal>




      </div>
    );
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DashNavbar));


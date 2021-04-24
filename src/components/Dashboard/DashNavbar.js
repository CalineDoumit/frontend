import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Button, Navbar, NavbarBrand, Nav, NavbarToggler,
  Collapse, NavItem, Modal, ModalBody, ModalHeader, Form,
  FormGroup, Input, Label
} from 'reactstrap';
import { DropdownMultiple, Dropdown } from 'reactjs-dropdown-component';
import { InsertEmoticon, ThreeSixtyOutlined } from "@material-ui/icons";

const mapStateToProps = state => {
  return {
    users: state.users
  }
}

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
    alert("patient ID: "+patientId)
    alert("robot number "+robotNumber)
    this.props.postAssign({patientId:patientId,robotnumber:robotNumber});
}
      

  handleLogout() {
    this.props.logoutUser();
  }

  handlePatientSubmit() {
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

  handleNurseSubmit() {
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

  handleAssign(){
    console.log("patient id "+ this.state.chosenPatientid)
    console.log("robot id "+ this.state.chosenRobotid)
    this.activatePatientRobot(this.state.chosenPatientid,this.state.chosenRobotid)

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
        this.state.listOfInactivePatients.push({label:user.firstname,value:user.patient})
      }
    })
  }

  makeListRooms(){
    console.log("all the robots : "+ JSON.stringify(this.props.robots.robots))
    this.props.robots.robots.map((robot)=>{
      if(robot.isOccupied==false){
        this.state.listOfInactiveRooms.push({label:robot.roomNumber,value:robot.number})
      }
    })
  }

  render() {
    return (
      <div>
        <Navbar className="navbar navbar-expand-lg navbar-dark ">
          <NavbarBrand className="mr-auto" >
            <img src='' height="30" width="41"
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
              styles={{
                headerTitle: { size: 10 }
              }}
            />
            <Button type="submit">ASSIGN</Button>
            </Form>
          </ModalBody>
        </Modal>




      </div>
    );
  }
};

export default DashNavbar;


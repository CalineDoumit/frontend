import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Button, Navbar, NavbarBrand, Nav, NavbarToggler,
  Collapse, NavItem, Modal, ModalBody, ModalHeader, Form,
  FormGroup, Input, Label
} from 'reactstrap';
import { DropdownMultiple, Dropdown } from 'reactjs-dropdown-component';

const locations = [
  {
    label: 'New York',
    value: 'newYork',
  },
  {
    label: 'Oslo',
    value: 'oslo',
  },
  {
    label: 'Istanbul',
    value: 'istanbul',
  }
];
const mapStateToProps = state => {
  return {
    users:state.users
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
      username:'',
      password:'',
      firstname:'',
      lastname:'',
      phonenumber:'',
      description:'',
      allergies:'',
      bloodType:'',
      dateofBirth:'',
      emergencyContact:'',



    };
    this.toggleNav = this.toggleNav.bind(this);
    this.togglePatientModal = this.togglePatientModal.bind(this);
    this.toggleNurseModal = this.toggleNurseModal.bind(this);
    this.toggleAssignModal = this.toggleAssignModal.bind(this);
    this.handlePatientSubmit = this.handlePatientSubmit.bind(this);

  }

  handlePatientSubmit() {
    this.togglePatientModal();
    this.props.postPatient({
      username:this.state.username,
      password:this.state.password,
      firstname:this.state.firstname,
      lastname:this.state.lastname,
      phonenumber:this.state.phonenumber,
      description:this.state.description,
      allergies:this.state.allergies,
      bloodType:this.state.bloodType,
      dateofBirth:this.state.dateofBirth,
      emergencyContact:this.state.emergencyContact,
    });
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
    this.setState({
      isAssignModalOpen: !this.state.isAssignModalOpen
    });
  }

  onChange(item, name) {
    console.log("changed")
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
            <Form>
              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input type="text" id="username" name="username"
                  innerRef={(input) => this.username = input} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" name="password"
                  innerRef={(input) => this.password = input} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="firstname">Firstname</Label>
                <Input type="text" id="firstname" name="firstname"
                  innerRef={(input) => this.firstname = input} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="lastname">Lastname</Label>
                <Input type="text" id="lastname" name="lastname"
                  innerRef={(input) => this.lastname = input} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="phonenumber">Phone Number</Label>
                <Input type="text" id="phonenumber" name="phonenumber"
                  innerRef={(input) => this.phonenumber = input} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="description">Description</Label>
                <Input type="text" id="description" name="description"
                  innerRef={(input) => this.description = input} />
              </FormGroup>
              <Button type="submit" color="primary">Add</Button>
            </Form>
          </ModalBody>
        </Modal>


        <Modal isOpen={this.state.isAssignModalOpen} toggle={this.toggleAssignModal}>
          <ModalHeader toggle={this.toggleAssignModal}>Assign Robot</ModalHeader>
          <ModalBody>
            <Dropdown
              name="location"
              title="Select location"
              list={this.props.users.inactiveusers.map((user, index) => (user.firstname))}
              onChange={this.onChange}
            />
            <Dropdown
              name="location"
              title="Select location"
              list={locations}
              onChange={this.onChange}
              styles={{
                headerTitle: { size: 10 }
              }}
            />
            <Button>ASSIGN</Button>
          </ModalBody>
        </Modal>




      </div>
    );
  }
};

export default DashNavbar;


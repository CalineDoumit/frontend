import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Button, Navbar, NavbarBrand, Nav, NavbarToggler,
  Collapse, NavItem, Modal, ModalBody, ModalHeader, Form,
  FormGroup, Input, Label
} from 'reactstrap';
class DashNavbar extends Component {

  constructor(props) {
    super(props);
    this.image = "https://www.google.com/imgres?imgurl=https%3A%2F%2Fpng.pngtree.com%2Fpng-vector%2F20190301%2Fourlarge%2Fpngtree-vector-administration-icon-png-image_747092.jpg&imgrefurl=https%3A%2F%2Fpngtree.com%2Ffreepng%2Fvector-administration-icon_4090499.html&tbnid=_-PfS-qdsdd64M&vet=12ahUKEwj_4r-3vu_vAhVVt6QKHWInBxkQMygFegUIARDeAQ..i&docid=SVrhkK6EHI8bwM&w=640&h=640&q=admin%20logo&hl=en-GB&ved=2ahUKEwj_4r-3vu_vAhVVt6QKHWInBxkQMygFegUIARDeAQ"
    this.state = {
      isNavOpen: false,
      isModalOpen: false
    };
    this.toggleNav = this.toggleNav.bind(this);
    this.toggleModal = this.toggleModal.bind(this);

  }
  handleSubmit(values) {
    this.toggleModal();
    ///////////////////////////////////////////////////////////////
    //add the user in DB 
    //////////////////////////////////////////////////////////////
}

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen
    });
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  renderAddPatient(){
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
          <Button onClick={this.toggleModal} >
            <span className="fa fa-heart fa-lg"></span> Add Patient
          </Button>
        </NavItem>
        <NavItem>
          <Button>
            <span className="fa fa-heartbeat fa-lg"></span> Add Nurse
          </Button>
        </NavItem>
        <NavItem>
          <Button>
            <span className="fa fa-heartbeat fa-lg"></span> Assign Robot
          </Button>
        </NavItem>
      </Navbar>

<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
<ModalHeader toggle={this.toggleModal}>Add Patient</ModalHeader>
<ModalBody>
  <Form onSubmit={this.handleSubmit}>
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
    <FormGroup>
      <Label htmlFor="dateofBirth">Date Of Birth</Label>
      <Input type="text" id="dateofBirth" name="dateofBirth"
        innerRef={(input) => this.dateofBirth = input} />
    </FormGroup>
    <FormGroup>
      <Label htmlFor="allergies">Allergies</Label>
      <Input type="text" id="allergies" name="allergies"
        innerRef={(input) => this.allergies = input} />
    </FormGroup>
    <FormGroup>
      <Label htmlFor="emergencyContact">Emergency Contact</Label>
      <Input type="text" id="emergencyContact" name="emergencyContact"
        innerRef={(input) => this.emergencyContact = input} />
    </FormGroup>
    <FormGroup>
      <Label htmlFor="bloodType">Blood Type</Label>
      <Input type="text" id="bloodType" name="bloodType"
        innerRef={(input) => this.phonenumber = input} />
    </FormGroup>
    <Button type="submit" color="primary">Add</Button>
  </Form>
</ModalBody>
</Modal>
</div>
    );
  }
};

export default DashNavbar;

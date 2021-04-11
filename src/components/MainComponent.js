import React, { Component } from 'react';
import NurseMenu from './NurseMenuComponent';
import PatientDetail from './PatientDetailComponent';
import Signupp from './signup';
import Login from './Login/LoginComponent';
import Header from './HeaderComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchRobots, fetchPatients, loginUser,fetchUsers,postDeactivatePatient } from '../redux/ActionCreators';
import DashboardHome from './Dashboard/DashboardHomeComponent';


const mapStateToProps = state => {
  return {
    robots: state.robots,
    patients: state.patients,
    auth: state.auth,
    users:state.users
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchRobots: () => { dispatch(fetchRobots()) },
  fetchPatients: () => { dispatch(fetchPatients()) },
  fetchUsers: () => { dispatch(fetchUsers()) },
  loginUser: (creds) => dispatch(loginUser(creds)),
  postDeactivatePatient : (patientId) => dispatch(postDeactivatePatient(patientId))


})


class Main extends Component {
  componentDidMount() {
    this.props.fetchRobots();
    this.props.fetchPatients();
    this.props.fetchUsers();

  }

  render() {
    const NursePage = () => {
      return (
        <div>
          <div>
            <Header />
          </div>
          <div>

            <NurseMenu
              robots={this.props.robots}
              isLoading={this.props.robots.isLoading}
              robotsErrMess={this.props.robots.errMess}
            //patient={this.props.patients.patients.filter((patient) => patient.featured)[0]}

            />
          </div>
        </div>
      );
    }



    const RobotWithId = ({ match }) => {
      return (
        <div>
          <div>
            <Header />
          </div>
          <div>

            <PatientDetail
              robots={this.props.robots.robots.filter((robot) => robot._id === match.params.robotId)[0]}
              isLoading={this.props.robots.isLoading}
              errMess={this.props.robots.errMess}
              //patients={this.props.patients.patients.filter((patient) =>patient._id === parseInt(this.robots.patient, 10))[0]}  
              patients={this.props.robots.robots.filter((patient) => patient._id === parseInt("6068f08b8893c11b8cbbb276", 10))[0]}
            />
          </div>
        </div>
      );
    };

    const SignUp = ({ match }) => {
      return (
        <signup />
      );
    };

    return (
      <div>
        <Switch>
          <Route exact path='/nursemenu' component={NursePage} />
          <Route exact path='/nursemenu/:robotId' component={RobotWithId} />
          <Route exact path='/signup' component={() => <Signupp />} />
          <Route exact path='/dashboard' component={() => <DashboardHome users={this.props.users} />} />
          <Route exact path='/login' component={() => <Login auth={this.props.auth} loginUser={this.props.loginUser}
          postDeactivatePatient={this.props.postDeactivatePatient}/>} />
          <Redirect to="/login" />
        </Switch>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

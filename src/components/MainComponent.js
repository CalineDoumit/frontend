import React, { Component } from 'react';
import NurseMenu from './NurseMenuComponent';
import PatientDetail from './PatientDetailComponent';
import Signupp from './signup';
import Header from './HeaderComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchRobots,fetchPatients } from '../redux/ActionCreators';


const mapStateToProps = state => {
  return {
    robots: state.robots,
    patients: state.patients,
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchRobots: () =>  {dispatch(fetchRobots())} ,
  fetchPatients: () =>  {dispatch(fetchPatients()) }

})


class Main extends Component {
  componentDidMount() {
    this.props.fetchRobots();
    this.props.fetchPatients();    

  }

  render() {
    const NursePage = () => {
      return (
        <NurseMenu
          robots={this.props.robots}
          isLoading={this.props.robots.isLoading}
          robotsErrMess={this.props.robots.errMess}
          //patient={this.props.patients.patients.filter((patient) => patient.featured)[0]}

        />
      );
    }



    const RobotWithId = ({ match }) => {
      return (
        <PatientDetail
          robots={this.props.robots.robots.filter((robot) => robot._id === match.params.robotId)[0]}
          isLoading={this.props.robots.isLoading}
          errMess={this.props.robots.errMess}
          //patients={this.props.patients.patients.filter((patient) =>patient._id === parseInt(this.robots.patient, 10))[0]}  
          patients={this.props.robots.robots.filter((patient) =>patient._id === parseInt("6068f08b8893c11b8cbbb276", 10))[0]}  
          />
      );
    };

    const SignUp = ({ match }) => {
      return (
        <signup />
      );
    };

    return (
      <div>
        <Header />
        <div>
          <Switch>
            <Route exact path='/nursemenu' component={NursePage} />
            <Route exact path='/nursemenu/:robotId' component={RobotWithId} />
            <Route exact path='/signup' component={() => <Signupp />} />
            <Redirect to="/nursemenu" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

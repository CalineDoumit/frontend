import React, { Component } from 'react';
import NurseMenu from './NurseMenuComponent';
import PatientDetail from './PatientDetailComponent';
import Signupp from './signup';
import { ROBOTS } from '../shared/robots';
import { PATIENTS } from '../shared/patients';
import Header from './HeaderComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';


const mapStateToProps = state => {
  return {
    robots:state.robots,
    patients:state.patients
  }
}

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      robot:ROBOTS,
      patient:PATIENTS
    };
  }

  render() {
    const NursePage = () => {
      return(
          <NurseMenu 
              robot={this.props.robots.filter((robot) => robot.featured)[0]}
              patient={this.props.patients.filter((patient) => patient.featured)[0]}

          />
      );
    }

    const RobotWithId = ({match}) => {
      return(
          <PatientDetail robot={this.props.robots.filter((robot) => robot.id === parseInt(match.params.robotId,10))[0]} 
            patients={this.props.patients.filter((patient) => patient.robotId === parseInt(match.params.robotId,10))}/>
      );
    };

    const SignUp = ({match}) => {
      return(
          <signup/>
      );
    };

    return (
      <div>
        <Header />
        <div>
          <Switch>
              <Route exact path='/nursemenu' component={() => <NurseMenu robots={this.props.robots} />} />
              <Route path='/nursemenu/:robotId' component={RobotWithId} />
              <Route path='/signup' component={() => <Signupp  />} />
              <Redirect to="/nursemenu"   />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Main));

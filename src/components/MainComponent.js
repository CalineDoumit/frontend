import React, { Component } from 'react';
import NurseMenu from './NurseMenuComponent';
import PatientDetail from './PatientDetailComponent';
import Signupp from './signup';
import Header from './HeaderComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchRobots } from '../redux/ActionCreators';


const mapStateToProps = state => {
  return {
    robots: state.robots,
    patients: state.patients
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchRobots: () => { dispatch(fetchRobots()) }
})


class Main extends Component {
  componentDidMount() {
    this.props.fetchRobots();
  }

  render() {
    const NursePage = () => {
      return (
        <NurseMenu
          robot={this.props.robots.robots.filter((robot) => robot.featured)[0]}
          robotsLoading={this.props.robots.isLoading}
          robotsErrMess={this.props.robots.errMess}
          patient={this.props.patients.filter((patient) => patient.featured)[0]}

        />
      );
    }

    const RobotWithId = ({ match }) => {
      return (
        <PatientDetail
          robot={this.props.robots.robots.filter((robot) => robot.id === parseInt(match.params.robotId, 10))[0]}
          isLoading={this.props.robots.isLoading}
          errMess={this.props.robots.errMess}
          patients={this.props.patients.filter((patient) => patient.robotId === parseInt(match.params.robotId, 10))} />
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
            <Route exact path='/nursemenu' component={() => <NurseMenu robots={this.props.robots} />} />
            <Route path='/nursemenu/:robotId' component={RobotWithId} />
            <Route path='/signup' component={() => <Signupp />} />
            <Redirect to="/nursemenu" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

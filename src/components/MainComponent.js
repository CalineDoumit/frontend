import React, { Component } from 'react';
import NurseMenu from './NurseMenuComponent';
import PatientDetail from './PatientDetailComponent';
import PatientMenu from './PatientMenuComponent';
import Login from './Login/LoginComponent';
import Header from './HeaderComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchRobots, fetchPatients, loginUser,logoutUser,fetchUsers,
        postDeactivatePatient,postPatient , postNurse,postAssign,
        fetchRobotGo,fetchRobotCome,fetchRobotStop} from '../redux/ActionCreators';
import DashboardHome from './Dashboard/DashboardHomeComponent';


const mapStateToProps = state => {
  return {
    robots: state.robots,
    patients: state.patients,
    auth: state.auth,
    users:state.users,
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchRobots: () => { dispatch(fetchRobots()) },
  fetchPatients: () => { dispatch(fetchPatients()) },
  fetchUsers: () => { dispatch(fetchUsers()) },
  loginUser: (creds) => dispatch(loginUser(creds)),
  postDeactivatePatient : (patientId) => dispatch(postDeactivatePatient(patientId)),
  postPatient: (values) => dispatch(postPatient(values)),
  postNurse: (values) => dispatch(postNurse(values)),
  fetchRobotGo: (robotId) => { dispatch(fetchRobotGo(robotId)) },
  fetchRobotCome: (robotId) => { dispatch(fetchRobotCome(robotId)) },
  fetchRobotStop: (robotId) => { dispatch(fetchRobotStop(robotId)) },
  logoutUser: () => dispatch(logoutUser()),
  postAssign : (values) => dispatch(postAssign(values)),

  
})



class Main extends Component {
  componentDidMount() {
    this.props.fetchRobots();
    this.props.fetchPatients();
    this.props.fetchUsers();

  }
  

  render() {
    const PatientMenuWithId=({match})=>{
     return( <PatientMenu 
      myuser={this.props.users.users.filter((user)=>user.patient===match.params.patientId)}
      mypatient={this.props.patients.patients.filter((patient)=>patient._id===match.params.patientId)}
      />)
    }


    const NursePage = () => {
      return (
        <div>
          <div>
              
            <Header logoutUser={this.props.logoutUser}   />
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
              patients={this.props.patients.patients}
              //.filter((patient) =>patient._id === match.params.patientId)}
              //patients={this.props.robots.robots.filter((patient) => patient._id === parseInt("6068f08b8893c11b8cbbb276", 10))[0]}
              fetchRobotGo={this.props.fetchRobotGo}
              fetchRobotCome={this.props.fetchRobotCome}
              fetchRobotStop={this.props.fetchRobotStop}
            />
          </div>
        </div>
      );
    };


    return (
      <div>
        <Switch>
          <Route exact path='/nursemenu' component={NursePage} />
          <Route exact path='/nursemenu/:robotId' component={RobotWithId} />
          <Route exact path='/dashboard' component={() => <DashboardHome users={this.props.users} robots={this.props.robots} postDeactivatePatient={this.props.postDeactivatePatient} postAssign={this.props.postAssign} 
          postPatient={this.props.postPatient}  logoutUser={this.props.logoutUser}  />} />
          <Route exact path='/login' component={() => <Login auth={this.props.auth} loginUser={this.props.loginUser}
          />} />
          <Route exact path='/patientmenu/:patientId' component={PatientMenuWithId }/>
          <Redirect to="/login" />
        </Switch>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));


import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Button
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { Component } from 'react';
import { fetchCorrespondingPatient } from '../redux/ActionCreators';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Patients } from '../redux/patients';
import { ThreeSixty } from '@material-ui/icons';

/*
const mapStateToProps = state => {
    return {
      patients: state.patients, 
       }
  }

  
const mapDispatchToProps = (dispatch) => ({
    fetchCorrespondingPatient: (robotId) => { dispatch(fetchCorrespondingPatient(robotId)) },
  })
  */

function RenderRobot({ robot }) {
    return (
        <Card>
            <CardImg top src='' alt={robot.roomNumber} />
            <CardBody>
                <CardTitle>{robot.name}</CardTitle>
                {/*<CardText>{robot.description}</CardText>*/}
            </CardBody>
        </Card>
    )
}


function RenderPatientInfos({patients,robots}){
    return(
    patients.map((patient)=>{
        if(patient._id===robots.patient){
            return(<p> {patient.description}</p> )
        }          
        
    })
    )
    
}


class PatientDetail extends Component {
    constructor(props) {
        super(props);
        this.RobotGo = this.RobotGo.bind(this);
        this.RobotCome = this.RobotCome.bind(this);
        this.RobotStop = this.RobotStop.bind(this);
    }
    /* componentDidMount() {
         alert("hi")
         this.props.fetchCorrespondingPatient(this.props.robots._id);
       }*/


    RobotGo(robotId) {
        console.log("patient ID: " + robotId)
        this.props.fetchRobotGo(robotId);
        alert("patient id: " + robotId)
    }

    RobotCome(robotId) {
        console.log("patient ID: " + robotId)
        this.props.fetchRobotCome(robotId);
        alert("patient id: " + robotId)
    }

    RobotStop(robotId) {
        console.log("patient ID: " + robotId)
        this.props.fetchRobotStop(robotId);
        alert("patient id: " + robotId)
    }



    render() {
        /*if (this.props.robots.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (this.props.robots.errMess) {
            return (
                <div className="container">
                    <div className="row">
                        <h4>{this.props.robots.errMess}</h4>
                    </div>
                </div>
            );
        }*/
        if (this.props.robots != null) {
            console.log('NAME:' + this.props.robots.roomNumber)
            console.log('ocupee?:' + this.props.robots.isOccupied)
            if (this.props.robots.isOccupied) {
                return (
                    <div className="Jumbotron">
                        <div className="container">
                            <div className="row">
                                <Breadcrumb>
                                    <BreadcrumbItem><Link to='/nursemenu'>Robot List </Link></BreadcrumbItem>
                                    <BreadcrumbItem active>{this.props.robots.roomNumber}</BreadcrumbItem>
                                </Breadcrumb>
                                <div className="col-12">
                                    <h3>{this.props.robots.roomNumber}</h3>
                                    <hr />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-md-5 m-1">
                                    <RenderRobot robot={this.props.robots} />
                                </div>
                                <div className="col-12 col-md-5 m-1">
                                    {/*this.props.patients.map((patient)=>{
                                        return(
                                            <p>HELLOO 1 </p>,
                                            <p> {patient}</p>
                                    )
                                    }),*/
                                        alert("props: " + JSON.stringify(this.props.patients))}
                                   {<RenderPatientInfos patients={this.props.patients} robots={this.props.robots}/>}
                                    {/*<p>{this.props.patients.description}</p>*/}
                                    {/*<RenderPatients patients={props.patients} />*/}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-md-5 m-1">
                                    <div>
                                        <div>
                                            <Button variant="contained" color="secondary" onClick={() => this.RobotGo(this.props.robots.number)} >
                                                <span class="fa fa-car"></span> GO
                </Button>
                                            <Button variant="contained" class="fa fa-camera-retro fa-lg" onClick={() => this.RobotCome(this.props.robots.number)}>
                                                <span class="fa fa-car fa-lg"></span> COME
                </Button>
                                            <Button variant="contained" color="secondary" onClick={() => this.RobotStop(this.props.robots.number)}>
                                                <span class="fa fa-car"></span> STOP
                </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>


                );
            }
            else {
                return (
                    <div>EMPTYYYYYYYYYYYYYYYYYYYYYYYYYYYY</div>
                )
            }
        }
        else
            return (
                <div></div>
            );
    }

}


//export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PatientDetail));
export default PatientDetail;


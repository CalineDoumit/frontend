import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Button
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';


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

function RenderPatients({ patients }) {
    const pat = patients.map(patient => {
        return (
            <li key={patient.id}>
                <p>{patient.name}</p>
                <p>{patient.description}</p>
                <p>Nurse name: {patient.nurse}</p>
                <p>temperatures: {patient.temperature}</p>
            </li>
        )
    });
    if (patients == null) {
        return <div></div>
    }
    return (
        <div>
            <h3>Patient:</h3>
            <ul className="list-unstyled">
                {pat}
            </ul>
        </div>
    );
}

function ButtonsForNurse() {
    return (
        <div>
            <Button variant="contained" color="secondary">
                <span class="fa fa-trash-o"></span> Delete
            </Button>
            <Button variant="contained" class="fa fa-camera-retro fa-lg">
                <span class="fa fa-camera-retro fa-lg"></span> Open Camera of Patient
            </Button>

        </div>

    )
}


const PatientDetail = (props) => {
    const robot = props.robot
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.robot != null) {

        return (
            <div className="Jumbotron">
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/nursemenu">Robot List </Link></BreadcrumbItem>
                            <BreadcrumbItem active>{robot.roomNumber}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{robot.roomNumber}</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderRobot robot={props.robot} />
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <RenderPatients patients={props.patients} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <ButtonsForNurse />
                        </div>
                    </div>
                </div>

            </div>


        );
    }
}

export default PatientDetail;




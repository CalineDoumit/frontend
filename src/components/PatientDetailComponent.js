import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Button
} from 'reactstrap';
import { Link } from 'react-router-dom';


function RenderRobot({ robot }) {
    return (
        <Card>
            <CardImg top src={robot.image} alt={robot.name} />
            <CardBody>
                <CardTitle>{robot.name}</CardTitle>
                <CardText>{robot.description}</CardText>
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



const PatientDetail = (props) => {
    const robot = props.robot

    return (
        <div className="Jumbotron">
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/nursemenu">Robot List </Link></BreadcrumbItem>
                        <BreadcrumbItem active>{robot.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{robot.name}</h3>
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
                        <Button >
                            <span>test</span> 
                    </Button>
                    </div>
                </div>
            </div>

        </div>


    );
}

export default PatientDetail;


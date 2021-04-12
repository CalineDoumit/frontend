import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Button
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { Component } from 'react';



function ButtonsForNurse() {
    return (
        <div>
            <div>
                <Button variant="contained" color="secondary">
                    <span class="fa fa-car"></span> GO
            </Button>
                <Button variant="contained" class="fa fa-camera-retro fa-lg">
                    <span class="fa fa-car fa-lg"></span> COME
            </Button>
            <Button variant="contained" color="secondary">
                    <span class="fa fa-car"></span> STOP
            </Button>
            </div>
        </div>

    )
}


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

const PatientDetail = (props) => {

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
    else if (props.robots != null) {
        console.log('NAME:' + props.robots.roomNumber)
        console.log('ocupee?:' + props.robots.isOccupied)
        if (props.robots.isOccupied) {
            return (
                <div className="Jumbotron">
                    <div className="container">
                        <div className="row">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to='/nursemenu'>Robot List </Link></BreadcrumbItem>
                                <BreadcrumbItem active>{props.robots.roomNumber}</BreadcrumbItem>
                            </Breadcrumb>
                            <div className="col-12">
                                <h3>{props.robots.roomNumber}</h3>
                                <hr />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-5 m-1">
                                <RenderRobot robot={props.robots} />
                            </div>
                            <div className="col-12 col-md-5 m-1">
                                <p>hello</p>
                                {/*<RenderPatients patients={props.patients} />*/}
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

export default PatientDetail;
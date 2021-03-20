import React from 'react';
import {
    Card, CardImg, CardImgOverlay,
    CardTitle, Breadcrumb, BreadcrumbItem
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';

function RenderNurseMenuItem({ robot }) {
    return (
        <Card>
            <Link to={`/nursemenu/${robot.id}`} >
                <CardImg width="100%" src={robot.image} alt={robot.name} />
                <CardImgOverlay>
                    <CardTitle>{robot.name}</CardTitle>
                </CardImgOverlay>
            </Link>
        </Card>
    );
}

const NurseMenu = (props) => {
    const nursemenu = props.robots.robots.map((robot) => {
        return (
            <div className="col-12 col-md-5 m-1" key={robot.id}>
                <RenderNurseMenuItem robot={robot} />
            </div>
        );
    });
    if (props.robots.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.robots.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h4>{props.robots.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
    else {

        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem active>Robots in the hospital</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Robots</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    {nursemenu}
                </div>
            </div>
        );
    }
}

export default NurseMenu;
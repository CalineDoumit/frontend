import React from 'react';
import { Card, CardImg, CardImgOverlay,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

    function RenderNurseMenuItem ({robot}) {
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

        const nursemenu = props.robots.map((robot) => {
            return (
                <div className="col-12 col-md-5 m-1"  key={robot.id}>
                    <RenderNurseMenuItem robot={robot} />
                </div>
            );
        });

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

export default NurseMenu;
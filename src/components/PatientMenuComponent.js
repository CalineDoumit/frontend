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



class PatientMenu extends Component {
    constructor(props) {
        super(props);
       
    }
 
    render() {
        return(
            <p>PATIENT INFORMATION</p>
        )
    }
}


export default PatientMenu;


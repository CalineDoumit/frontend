import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';


export const fetchRobots = () => (dispatch) => {
  dispatch(robotsLoading());

  return fetch(baseUrl + 'robots')
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
      error => {
        var errmess = new Error(error.message);
        console.log("erreur 2: errmess");

        throw errmess;
      })
    .then(response => response.json())
    .then(robots => dispatch(addRobots(robots)))
    .catch(error => dispatch(robotsFailed(error.message)));
}

export const robotsLoading = () => ({
  type: ActionTypes.ROBOTS_LOADING
});

export const robotsFailed = (errmess) => ({
  type: ActionTypes.ROBOTS_FAILED,
  payload: errmess
});

export const addRobots = (robots) => ({
  type: ActionTypes.ADD_ROBOTS,
  payload: robots
});

export const fetchPatients = () => (dispatch) => {
  dispatch(patientsLoading());

  return fetch(baseUrl + 'patients')
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
      error => {
        var errmess = new Error(error.message);
        throw errmess;
      })
    .then(response => response.json())
    .then(patients => dispatch(addPatients(patients)))
    .catch(error => dispatch(patientsFailed(error.message)));
}

export const patientsLoading = () => ({
  type: ActionTypes.PATIENTS_LOADING
});

export const patientsFailed = (errmess) => ({
  type: ActionTypes.PATIENTS_FAILED,
  payload: errmess
});

export const addPatients = (patients) => ({
  type: ActionTypes.ADD_PATIENTS,
  payload: patients
});


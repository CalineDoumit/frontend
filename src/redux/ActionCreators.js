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

export const loginUser = (creds) => (dispatch) => {
  // We dispatch requestLogin to kickoff the call to the API
  dispatch(requestLogin(creds))

  return fetch(baseUrl + 'users/login', {
      method: 'POST',
      headers: { 
          'Content-Type':'application/json' ,
      },
      body: JSON.stringify(creds)
  })
  .then(response => {
          if (response.ok) {
            console.log("ERRORRRRR 00000000000000000")
            
              return response;
          } else {
              var error = new Error('Error ' + response.status + ': ' + response.statusText);
              error.response = response;
              console.log("ERRORRRRR 1111111111111111111111111111")
              throw error;
          }
      },
      error => {
        console.log("ERRORRRRR 2222222222222222222222222")

          throw error;
      })
  .then(response => response.json())
  .then(response => {
      if (response.success) {
          // If login was successful, set the token in local storage
          localStorage.setItem('token', response.token);
          localStorage.setItem('creds', JSON.stringify(creds));
          // Dispatch the success action
          dispatch(receiveLogin(response));
          console.log("----------------------------");
          console.log("Login Successful");
          console.log("----------------------------");

      }
      else {
          var error = new Error('Error ' + response.status);
          error.response = response;
          throw error;
      }
  })
  .catch(error => dispatch(loginError(error.message)))
};
export const requestLogin = (creds) => {
  return {
      type: ActionTypes.LOGIN_REQUEST,
      creds
  }
}

export const receiveLogin = (response) => {
  return {
      type: ActionTypes.LOGIN_SUCCESS,
      token: response.token
  }
}

export const loginError = (message) => {
  return {
      type: ActionTypes.LOGIN_FAILURE,
      message
  }
}
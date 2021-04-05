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
          console.log("erreur 1: error");
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
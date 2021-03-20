import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const fetchRobots = () => (dispatch) => {

    dispatch(robotsLoading(true));

    return fetch(baseUrl + 'robots')
    .then(response => response.json())
    .then(robots => dispatch(addRobots(robots)));
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
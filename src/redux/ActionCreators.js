import * as ActionTypes from './ActionTypes';
import { ROBOTS } from '../shared/robots';

export const fetchRobots = () => (dispatch) => {

    dispatch(robotsLoading(true));

    setTimeout(() => {
        dispatch(addRobots(ROBOTS));
    }, 2000);
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
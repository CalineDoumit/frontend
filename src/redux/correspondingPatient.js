import * as ActionTypes from './ActionTypes';

export const CorrespondingPatient = (state = { 
    isLoading: true,
    errMess: null,
    correspondingPatient:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_CORRESPONDINGPATIENT :
            return {...state, isLoading: false, errMess: null, correspondingPatient: action.payload};

        case ActionTypes.ROBOTS_LOADING:
            return {...state, isLoading: true, errMess: null, correspondingPatient: []};

        case ActionTypes.ROBOTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, correspondingPatient: []};

        default:
          return state;
      }
}; 
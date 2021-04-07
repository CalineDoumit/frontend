import * as ActionTypes from './ActionTypes';

export const Patients = (state = { 
    isLoading: true,
    errMess: null,
    patients:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_PATIENTS:
            return {...state, isLoading: false, errMess: null, patients: action.payload};

        case ActionTypes.PATIENTS_LOADING:
            return {...state, isLoading: true, errMess: null, patients: []};

        case ActionTypes.PATIENTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, patients: []};

        default:
          return state;
      }
}; 
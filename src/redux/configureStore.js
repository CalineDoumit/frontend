import {createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Patients } from './patients';
import { Robots } from './robots';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            patients: Patients,
            robots: Robots,
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Patients } from './patients';
import { Robots } from './robots';
import { Auth } from './auth';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            patients: Patients,
            robots: Robots,
            auth:Auth,
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}
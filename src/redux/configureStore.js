import { createStore, combineReducers } from 'redux';
import { Patients } from './patients';
import { Robots } from './robots';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            patients: Patients,
            robots: Robots,
        })
    );

    return store;
}
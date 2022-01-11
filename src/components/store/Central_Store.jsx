// ======================================
//  Second File  created as Store
// ======================================
import {createStore} from 'redux';
import { counter_reducer} from '../reducers/Counter_Reducer'
export const store = createStore(counter_reducer);
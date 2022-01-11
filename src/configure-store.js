import { createStore } from 'redux';
import { countReducer } from './components/editable-story/reducer';

export const store = createStore(countReducer);
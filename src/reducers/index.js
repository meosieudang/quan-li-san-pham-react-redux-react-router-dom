import {combineReducers} from 'redux';
import products from './products';
import edit from './edit';
const appReducers = combineReducers({
    products,
    edit

});

export default appReducers;
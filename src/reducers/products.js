import * as types from './../constants/ActionTypes';
import {findIndex} from 'lodash';
let initialState = [];

const products = (state = initialState, action) => {
    switch (action.type) {

        case types.ALL_PRODUCT:
            state = action.products;
            return [...state];

        case types.DELETE_PRODUCT:
        let index = findIndex(state, function(product) { return product.id === action.id; });
        if(index !== -1){
            state.splice(index, 1);
        }
        return [...state];

        case types.ADD_PRODUCT:
        state.push(action.product);
        return [...state];

        case types.UPDATE_PRODUCT:
        let indexUpdate = findIndex(state, function(product) { return product.id === action.product.id; });
        state[indexUpdate] = action.product;
        return [...state];
        default:
            return [...state];
    }
};
export default products;
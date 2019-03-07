import * as types from './../constants/ActionTypes';

let initialState = {};
const editProduct = (state = initialState, action) => {
    switch (action.type) {
        case types.EDIT_PRODUCT:
            return action.product;
        default:
            return state;
    }
};

export default editProduct;
import * as types from './../constants/ActionTypes';
import callApi from './../utils/apiCaller';

export const listAllProductRequest = () => {
    return (dispatch) => {
        return callApi('products', 'GET', null).then(res => {
            dispatch(listAllProduct(res.data));
        });
    }
}

export const listAllProduct = (products) => {
    return{
        type: types.ALL_PRODUCT,
        products
    }
}

export const deleteProductRequest = (id) => {
    return (dispatch) => {
        return callApi(`products/${id}`, "DELETE", null).then(res => {
            dispatch(deleteProduct(id))
        })
    }
}

export const deleteProduct = (id) => {
    return {
        type: types.DELETE_PRODUCT,
        id
    }
}

export const addProductRequest = (product) => {
    return dispatch => {
        return callApi('products', 'POST', product).then(res => {
            dispatch(addProduct(res.data))
        })
    }
}

export const addProduct = (product) => {
    return {
        type: types.ADD_PRODUCT,
        product
    }
}

export const editProductRequest = (id) => {
    return dispatch => {
        return callApi(`products/${id}`, 'GET', null).then(res => {
            dispatch(editProduct(res.data))
        })
    }
}

export const editProduct = (product) => {
    return {
        type: types.EDIT_PRODUCT,
        product
    }
}

export const updateProductRequest = (product) => {
    return dispatch => {
        callApi(`products/${product.id}`, 'PUT', product).then(res => {
            dispatch(updateProduct(res.data))
        })
    }
}

export const updateProduct = (product) => {
    return {
        type: types.UPDATE_PRODUCT,
        product
    }
}
import { 
    ADDRESS_REQUEST,
    ADDRESS_SUCCESS,
    ADDRESS_FAIL,

    ADDRESS_CREATE_REQUEST,
    ADDRESS_CREATE_SUCCESS,
    ADDRESS_CREATE_FAIL,

    ADDRESS_UPDATE_REQUEST,
    ADDRESS_UPDATE_SUCCESS,
    ADDRESS_UPDATE_FAIL,

    ADDRESS_CLEAR,
} from "../constants/shippingConstants";

import api from "../../utils/api";

export const getAddress = () => async (dispatch) => {
    try {

        dispatch({
            type: ADDRESS_REQUEST
        })

        const data = await api.getAddress()

        dispatch({
            type: ADDRESS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type:ADDRESS_FAIL,
            payload: error.response
        })
    }
}

export const createAddress = (street, city, postalCode, state, country) => async (dispatch) => {
    try {
        dispatch({
        type: ADDRESS_CREATE_REQUEST
    })

    const data = await api.createAddress(street, city, postalCode, state, country)

    console.log(data)
        dispatch({
            type: ADDRESS_CREATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        console.log(error)
        dispatch({
            type: ADDRESS_CREATE_FAIL,
            payload: error.response.data
        })
    }
    
}

export const updateAddress = (address, city, postalCode, state, country) => async (dispatch) => {
    try {
        dispatch({
            type: ADDRESS_UPDATE_REQUEST
        })

        const data = await api.updateShipping(address, city, postalCode, state, country)

        dispatch({
            type: ADDRESS_UPDATE_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        console.log(error)
    }
}
import { 
    ADDRESS_REQUEST,
    ADDRESS_SUCCESS,
    ADDRESS_FAIL,

    ADDRESS_SAVE_REQUEST,
    ADDRESS_SAVE_SUCCESS,
    ADDRESS_SAVE_FAIL,

    ADDRESS_UPDATE_REQUEST,
    ADDRESS_UPDATE_SUCCESS,
    ADDRESS_UPDATE_FAIL
} from "../constants/shippingConstants";

import axios from 'axios'

export const getAddress = () => async (dispatch, getState) => {
    try {

        dispatch({
            type: ADDRESS_REQUEST
        })

        const { auth: { userInfo }} = getState()

        const configs = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get('http://127.0.0.1:8000/api/v1/shipping/get-address/', configs)

        console.log(data)

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

export const saveAddress = (address) => async (dispatch, getState) => {
    try {
        dispatch({
        type: ADDRESS_SAVE_REQUEST
    })

        const { auth: { userInfo }} = getState()

        const configs = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post('http://127.0.0.1:8000/api/v1/shipping/create-address/', address, configs)

        console.log(data)

        dispatch({
            type: ADDRESS_SAVE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ADDRESS_SAVE_FAIL,
            payload: error.response.data
        })
    }
    
}
import {

    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS ,
    USER_LOGIN_FAIL,

    USER_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    USER_PROFILE_REQUEST, 
    USER_PROFILE_SUCCESS, 
    USER_PROFILE_FAIL,

    USER_PROFILE_CLEAR,

    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,

} from '../constants/authConstants'

import { ADDRESS_SUCCESS, ADDRESS_CLEAR, ADDRESS_REQUEST } from "../constants/shippingConstants";

import { CLEAR_CART } from '../constants/cartConstants'

import api from '../../utils/api'

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })
        
        const auth = await api.login(email, password)
        
        let customer
        if(auth.token){
            customer = await api.getUser()

            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: customer.customer
            })
        }
        if(customer.shipping !== null){
            dispatch({
                type: ADDRESS_REQUEST
            })

            dispatch({
                type: ADDRESS_SUCCESS,
                payload: customer.shipping
            })
        }


    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
                
        }) 
    }
}

export const register = (first_name, last_name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type:  USER_REGISTER_REQUEST
        })
        await api.register(first_name, last_name, email, password)
        dispatch({
            type: USER_REGISTER_SUCCESS 
        })

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
        
    }  
}


export const logout = () => dispatch => {

    sessionStorage.removeItem('token')

    dispatch({
        type: CLEAR_CART
    })

    dispatch({
        type: USER_PROFILE_CLEAR 
    })

    dispatch({
        type: ADDRESS_CLEAR
    })

    dispatch({
        type: USER_LOGOUT
    })
    
}

export const updateUser = (first_name, last_name, email) => async (dispatch) => {
    try {
        dispatch({
            type: USER_UPDATE_REQUEST
        })

        const { data } = await api.updateUser(first_name, last_name, email)

        dispatch({
            type: USER_UPDATE_SUCCESS,
            paylaod: data
        })

    } catch (error) {
        // console.log(error.response)
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response
        })
    }
}
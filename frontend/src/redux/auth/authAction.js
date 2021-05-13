import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS ,
    USER_LOGIN_FAIL,

    USER_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL
} from '../constants/authConstants'

import axios from 'axios'

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const configs = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post(
            'http://127.0.0.1:8000/api/v1/auth/login/',
            { 'username': email, 'password': password },
            configs
        )

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        //Set Session storage so that when inproper log out or when the browser is closed it will dump all data 
        sessionStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response.data.detail 
        })
        
    }
}

export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type:  USER_REGISTER_REQUEST
        })

        const configs = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post(
            'http://127.0.0.1:8000/api/v1/auth/register/',
            { 'name': name, 'email': email, 'password': password },
            configs
        )
        
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
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

    sessionStorage.removeItem('userInfo')

    dispatch({
        type: USER_LOGOUT
    })
}
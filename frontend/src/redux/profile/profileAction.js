import {
    USER_PROFILE_REQUEST, 
    USER_PROFILE_SUCCESS, 
    USER_PROFILE_FAIL, 
    USER_PROFILE_RESET,

    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_RESET,
} from '../constants/profileConstants' 

import axios from 'axios'

export const profile = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_PROFILE_REQUEST
        })
        const { auth: { userInfo }} = getState()

        const configs = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`http://127.0.0.1:8000/api/v1/auth/profile/`, configs)

        dispatch({
            type: USER_PROFILE_SUCCESS,
            payload: data
        })

    } catch (error) {
        console.log(error)
        dispatch({
            type: USER_PROFILE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}
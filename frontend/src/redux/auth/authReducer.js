import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS ,
    USER_LOGIN_FAIL,

    USER_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,

} from '../constants/authConstants'

export const authReducer = (state={}, action) => {
    const { payload, type } = action

    switch(type){

        case USER_LOGIN_REQUEST:
        case USER_REGISTER_REQUEST:
            return{
                loading: true,
                isLoggedIn: false
            }

        case USER_LOGIN_SUCCESS:
        case USER_REGISTER_SUCCESS:
            return {
                loading: false,
                isLoggedIn: true,
                userInfo: payload
            }

        case USER_LOGIN_FAIL:
        case USER_REGISTER_FAIL:
        case USER_UPDATE_FAIL:
            return {
                loading: false,
                isLoggedIn: false,
                error: payload
            }

        case USER_LOGOUT:
            return {
                isLoggedIn: false,
            }
            
        default:
            return state
    }
}

export const userUpdateReducer = (state={ userInfo: {} }, action) => {
    const { payload, type } = action
    switch(type){
        case USER_UPDATE_REQUEST:
            return {
                loading: true
            }
        case USER_UPDATE_SUCCESS:
            return{
                loading: false,
                userInfo: payload
            }
        default: 
            return state
    }
}
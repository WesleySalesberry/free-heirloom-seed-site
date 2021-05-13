import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS ,
    USER_LOGIN_FAIL,

    USER_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL
} from '../constants/authConstants'

export const authReducer = (state={}, action) => {
    const { payload, type } = action

    switch(type){

        case USER_LOGIN_REQUEST:
        case USER_REGISTER_REQUEST:
            return{
                loading: true
            }

        case USER_LOGIN_SUCCESS:
        case USER_REGISTER_SUCCESS:
            return {
                loading: false,
                userInfo: payload
            }

        case USER_LOGIN_FAIL:
        case USER_REGISTER_FAIL:
            return {
                loading: false,
                error: payload
            }

        case USER_LOGOUT:
            return {}
            
        default:
            return state
    }
}
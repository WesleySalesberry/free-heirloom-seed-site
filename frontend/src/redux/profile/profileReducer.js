import {
    USER_PROFILE_REQUEST, 
    USER_PROFILE_SUCCESS, 
    USER_PROFILE_FAIL,
    
    USER_PROFILE_CLEAR,

    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    
} from '../constants/profileConstants' 

export const userProfileReducer = (state={user: {}}, action) => {
    const { payload, type } = action

    switch(type){
        case USER_PROFILE_REQUEST:
            return {
                loading: true
            }

        case USER_PROFILE_SUCCESS:
            return {
                loading: false,
                user: payload
            }

        case USER_PROFILE_FAIL:
            return {
                loading: false,
                error: payload
            }
        case USER_PROFILE_CLEAR:
            return {}

        default:
            return state
    }
}

export const userUpdateReducer = (state={}, action) => {
    const { payload, type } = action

    switch(type){
        case USER_UPDATE_REQUEST:
            return {
                loading: true
            }

        case USER_UPDATE_SUCCESS:
            return {
                loading: false,
                success: true,
                userInfo: payload
            }

        case USER_UPDATE_FAIL:
            return {
                loading: false,
                error: payload
            }
        
        default:
            return state
    }
}


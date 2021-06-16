import { 
    ADDRESS_REQUEST,
    ADDRESS_SUCCESS,
    ADDRESS_FAIL,

    ADDRESS_CREATE_REQUEST,
    ADDRESS_CREATE_SUCCESS,
    ADDRESS_CREATE_FAIL,
    ADDRESS_CLEAR,

    ADDRESS_UPDATE_REQUEST,
    ADDRESS_UPDATE_SUCCESS,
    ADDRESS_UPDATE_FAIL
} from "../constants/shippingConstants";

export const addressReducer = (state={address: {}}, action) => {
    const { payload, type} = action
    switch(type){
        
        case ADDRESS_UPDATE_REQUEST:
        case ADDRESS_REQUEST:
        case ADDRESS_CREATE_REQUEST:
            return {
                loading: true,
            }

        case ADDRESS_SUCCESS:
        case ADDRESS_UPDATE_SUCCESS:
        case ADDRESS_CREATE_SUCCESS:
            return {
                loading: false,
                address: payload
            }
        case ADDRESS_FAIL:
        case ADDRESS_CREATE_FAIL:
        case ADDRESS_UPDATE_FAIL:
            return {
                loading: false,
                error: payload
            }
        case ADDRESS_CLEAR:
            return {
                ...state,
                address: []
            }
        default:
            return state
    }
}
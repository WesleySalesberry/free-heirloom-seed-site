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

export const addressReducer = (state={address: {}}, action) => {
    const { payload, type} = action
    switch(type){
        case ADDRESS_REQUEST:
        case ADDRESS_SAVE_REQUEST:
            return {
                loading: true,
            }

        case ADDRESS_SUCCESS:
        case ADDRESS_SAVE_SUCCESS:
            return {
                loading: false,
                address: payload
            }
        case ADDRESS_FAIL:
        case ADDRESS_SAVE_FAIL:
            return {
                loading: false,
                error: payload
            }
        default:
            return state
    }
}
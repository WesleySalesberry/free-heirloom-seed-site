import { 
    SEED_LIST_SUCCESS, 
    SEED_LIST_REQUEST, 
    SEED_LIST_FAIL,

    SEED_DETAIL_REQUEST,
    SEED_DETAIL_SUCCESS,
    SEED_DETAIL_FAIL
} from '../constants/seedConstants'

export const seedListReducer = (state={seeds: []}, action) => {
    const { type, payload } = action

    switch(type){
        case SEED_LIST_REQUEST:
            return {
                loading: true,
                seeds: []
            }
        case SEED_LIST_SUCCESS:
            return {
                loading: false,
                seeds: payload
            }
        case SEED_LIST_FAIL:
            return {
                loading: false,
                error: payload
            }
        default:
            return state
    }
}

export const seedDetailReducer = (state={seed: {}}, action) => {
    const { type, payload } = action

    switch(type){
        case SEED_DETAIL_REQUEST:
            return {
                loading: true,
                ...state
            }
        case SEED_DETAIL_SUCCESS:
            return {
                loading: false,
                seed: payload
            }
        case SEED_DETAIL_FAIL:
            return {
                loading: false,
                error: payload
            }
        default:
            return state
    }
}
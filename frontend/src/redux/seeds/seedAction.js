import { 
    SEED_LIST_SUCCESS, 
    SEED_LIST_REQUEST, 
    SEED_LIST_FAIL,

    SEED_DETAIL_REQUEST,
    SEED_DETAIL_SUCCESS,
    SEED_DETAIL_FAIL
} from '../constants/seedConstants'

import axios from 'axios'

export const seedLists = () => async (dispatch) => {
    try {
        dispatch({ type: SEED_LIST_REQUEST })

        const { data } = await axios.get('http://127.0.0.1:8000/api/v1/seeds/all-seeds/')

        dispatch({
            type: SEED_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: SEED_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const seedDetails = (slug) => async (dispatch) => {
    try {
        dispatch({ type: SEED_DETAIL_REQUEST })

        const { data } = await axios.get(`http://127.0.0.1:8000/api/v1/seeds/${slug}/`)

        dispatch({
            type: SEED_DETAIL_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: SEED_DETAIL_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}
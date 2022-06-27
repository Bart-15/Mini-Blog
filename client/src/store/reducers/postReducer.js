import { FETCH_ALL_POST, POST_LOADING, GET_ERRORS, GET_POST } from "../actions/types";

const initialState = {
    posts: [],
    post: {},
    errors:{},
    loading: false
};

const postReducer = (state = initialState, action) => {
    switch(action.type) {
       case POST_LOADING :
            return {
                ...state,
                loading: true
            }

        case FETCH_ALL_POST :
            return {
                ...state,
                posts: action.payload,
                loading: false
            }
        
        case GET_POST :
            return {
                ...state,
                post:action.payload,
                loading:false
            }

        case GET_ERRORS :
            return {
                ...state,
                errors: action.payload
            }

        default:
        return state;
    }
}

export default postReducer
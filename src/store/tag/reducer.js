import { GET_TAGS_DATA } from './actions';

const initialState = {
    data: [],
    fetching: true,
};

const tag = (state = initialState, action) => {
    switch (action.type) {
        case GET_TAGS_DATA: {
            return {
                ...state,
                data: action.data,
                fetching: false,

            };  
        }
        default:
        return state
    }
};

export default tag;
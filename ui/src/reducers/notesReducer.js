import {
    NOTES_LOADED
} from '../actions/actionTypes'


const initialState = {
    items: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case NOTES_LOADED:
            return {
                ...state,
                items: action.notes
            }        

        default:
            return state;
    }
}
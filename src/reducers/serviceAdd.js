import {CHANGE_SERVICE_FIELD, EDIT_SERVICE, SAVE_SERVICE, REMOVE_SERVICE} from '../actions/actionTypes'

const initialState = {
    id: null,
    name: '',
    price: '',
};

export default function serviceAddReducer(state = initialState, action) {
    switch (action.type) {

        case CHANGE_SERVICE_FIELD:
            const {name, value} = action.payload;
            return {...state, [name]: value};

        case EDIT_SERVICE:
            return {...action.payload, price: action.payload.price.toString()};

        case SAVE_SERVICE:
            return initialState;

        case REMOVE_SERVICE:
            const {id} = action.payload;
            if (id && id === state.id) {
                return initialState;
            } else {
                return state;
            }

        default:
            return state;
    }
}

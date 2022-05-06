import nextId from "react-id-generator";
import {SAVE_SERVICE, REMOVE_SERVICE, FILTER_SERVICE} from '../actions/actionTypes'

const initialState = {
    items: [
        {id: nextId(), name: 'Замена стекла', price: 21000},
        {id: nextId(), name: 'Замена дисплея', price: 25000},
        {id: nextId(), name: 'Замена аккумулятора', price: 4000},
        {id: nextId(), name: 'Замена микрофона', price: 2500},
    ],
    filterText: ''
};

export default function serviceListReducer(state = initialState, action) {
    let newList = state.items;
    switch (action.type) {

        case SAVE_SERVICE:
            const {id, name, price} = action.payload;
            if (!id) {
                newList = [...newList, {id: nextId(), name, price: Number(price)}]
            } else {
                newList = newList.map(obj => obj.id !== id ? obj : {id: id, name: name, price: Number(price)});
            }
            return {...state, items: newList}

        case REMOVE_SERVICE:
            const {id: idToRemove} = action.payload;
            newList = state.items.filter(service => service.id !== idToRemove);
            return {...state, items: newList}

        case FILTER_SERVICE:
            const {filterText} = action.payload;
            return {...state, filterText: filterText}

        default:
            return state;
    }
}
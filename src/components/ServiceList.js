import React from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {removeService, editService, filterService} from '../actions/actionCreators';

function ServiceList() {
    const {filterText, items} = useSelector(state => state.serviceList);
    const dispatch = useDispatch();

    const handleRemove = id => {
        dispatch(removeService(id));
    }

    const handleEdit = obj => {
        const {id, name, price} = obj;
        dispatch(editService(id, name, price));
    }

    const handleFilterChange = evt => {
        const {value} = evt.target;
        dispatch(filterService(value));
    }

    return (
        <>
            <hr/>
            <div>
                <label htmlFor="filterText">Search: </label>
                <input name='filterText' onChange={handleFilterChange} value={filterText}/>
            </div>
            <ul>
                {items.filter(o => !filterText || o.name.toString().includes(filterText)).map(o => (
                    <li key={o.id}>
                        {o.name} {o.price}
                        <button onClick={() => handleEdit(o)}>Edit</button>
                        <button onClick={() => handleRemove(o.id)}>✕</button>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default ServiceList;
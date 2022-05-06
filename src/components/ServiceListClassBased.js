import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {removeService, editService, filterService} from '../actions/actionCreators';
import {connect} from 'react-redux';

class ServiceListClassBased extends Component {
    handleRemove = id => {
        this.props.removeService(id);
    }

    handleEdit = obj => {
        const {id, name, price} = obj;
        this.props.editService(id, name, price);
    }

    handleFilterChange = evt => {
        const {value} = evt.target;
        this.props.filterService(value);
    }

    render() {
        const {filterText, items} = this.props.items;

        return (
            <>
                <hr/>
                <div>
                    <label htmlFor="filterText">Search: </label>
                    <input name='filterText' onChange={this.handleFilterChange} value={filterText}/>
                </div>
                <ul>
                    {items.filter(o => !filterText || o.name.toString().includes(filterText)).map(o => (
                        <li key={o.id}>
                            {o.name} {o.price}
                            <button onClick={() => this.handleEdit(o)}>Edit</button>
                            <button onClick={() => this.handleRemove(o.id)}>✕</button>
                        </li>
                    ))}
                </ul>
            </>
        )
    }
}

ServiceListClassBased.propTypes = {
    items: PropTypes.shape({
        items: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            price: PropTypes.number,
        })).isRequired,
        filterText: PropTypes.string
    }).isRequired
}

const mapStateToProps = (state) => ({
    items: state.serviceList,
});

const mapDispatchToProps = ({
    editService,
    removeService,
    filterService
});

export default connect(mapStateToProps, mapDispatchToProps)(ServiceListClassBased);
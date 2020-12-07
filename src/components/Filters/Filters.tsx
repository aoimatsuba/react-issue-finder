import * as React from 'react'
import { Dropdown } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { setSearchText } from '../../filters/searchTextSlice';
import './Filters.scss'

function Filters() {
    const dispatch = useDispatch();
    return (
        <div className="card filter__container">
            <form className="form-inline">
                <input className="form-control mr-sm-2 navigation__search" type="search" onChange={e => dispatch(setSearchText(e.target.value))} placeholder="Search by text" aria-label="Search"/>
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
            <Dropdown className="filter__dropdown">
                <Dropdown.Toggle id="dropdown-custom-components">
                    Custom toggle
                </Dropdown.Toggle>
                <Dropdown.Menu >
                    <Dropdown.Item eventKey="1">OPEN</Dropdown.Item>
                    <Dropdown.Item eventKey="2">CLOSED</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}



export default Filters

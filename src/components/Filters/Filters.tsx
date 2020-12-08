import * as React from 'react'
import SearchBar from '../searchBar/SearchBar';
import StatusFilter from '../statusFilter/StatusFilter';
import './Filters.scss'

function Filters() {
    return (
        <div className="card filter__container">
            <SearchBar/>
            <StatusFilter/>
        </div>
    )
}



export default Filters

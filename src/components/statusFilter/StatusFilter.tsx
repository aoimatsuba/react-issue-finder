import * as React from 'react'
import { Dropdown } from 'react-bootstrap'
import './StatusFilter.scss'

function StatusFilter() {
    return (
        <Dropdown className="filter__dropdown">
            <Dropdown.Toggle id="dropdown-custom-components">
                Custom toggle
            </Dropdown.Toggle>
            <Dropdown.Menu >
                <Dropdown.Item eventKey="1">OPEN</Dropdown.Item>
                <Dropdown.Item eventKey="2">CLOSED</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}



export default StatusFilter

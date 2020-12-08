import * as React from 'react'
import { Dropdown } from 'react-bootstrap'
import './StatusFilter.scss'
import { ReactComponent as SelectedIconSvg } from '../../assets/selected_icon.svg'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setIssueStatus } from '../../filters/issueStatusSlice'

const StatusFilter =() => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(true)
    const [closed, setClosed] = useState(false)

    React.useEffect(() => {
        dispatch(setIssueStatus({open, closed}))
    })

    return (
        <Dropdown className="dropdown__container">
            <Dropdown.Toggle id="dropdown-custom-components">Custom toggle</Dropdown.Toggle>
            <Dropdown.Menu >
                <Dropdown.Item eventKey="1" onClick={() => setOpen(!open)}>
                    OPEN
                    {open && <SelectedIconSvg className="dropdown__selected"/>}
                 </Dropdown.Item>
                <Dropdown.Item eventKey="2" onClick={() => setClosed(!closed)}>
                    CLOSED
                    {closed && <SelectedIconSvg className="dropdown__selected"/>}
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}



export default StatusFilter

import * as React from 'react'
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux'
import { setSearchText } from '../../filters/searchTextSlice';
import { ReactComponent as CloseIconSvg } from '../../assets/close_icon.svg'
import './SearchBar.scss'

const SearchBar = () => {
    const dispatch = useDispatch()
    const [inputText, setInputText] = useState('')
    const [showClose, setShowClose] = useState(false)
    const handleInputChange = (text: string) => {
        setShowClose(text !== '')
        setInputText(text)
    }
    const handleSearchButtonClick = () => {
        dispatch(setSearchText(inputText))
    }

    const handleEnter = (e: React.KeyboardEvent<HTMLElement>) => {
        if(e.key === 'Enter') {
            e.preventDefault()
            handleSearchButtonClick()
        }
    }

    return (
        <form className="form-inline">
            <div className="searchBar__container">
                <input value={inputText} className="form-control mr-sm-2 searchBar__box" type="text" onChange={e => handleInputChange(e.target.value)} onKeyDown={e => handleEnter(e)} placeholder="Search by text"/>
                {showClose && <CloseIconSvg className="searchBar__close" onClick={() => handleInputChange('') }/> }
            </div>
            <Button variant="outline-success" onClick={() => handleSearchButtonClick() }>Search</Button>
        </form>
    )
}


export default SearchBar
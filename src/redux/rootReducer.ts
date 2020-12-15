import { combineReducers } from '@reduxjs/toolkit'
import searchText from '../filters/searchTextSlice'
import issueStatus from '../filters/issueStatusSlice'

const rootReducer = combineReducers({
    searchText,
    issueStatus,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer

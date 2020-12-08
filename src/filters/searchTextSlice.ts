import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = ''
const searchTextSlice = createSlice({
    name: 'searchTextFilter',
    initialState,
    reducers: {
        setSearchText(state, action: PayloadAction<string>) {
            return action.payload
        }
    }
})

export const {setSearchText} = searchTextSlice.actions

export default searchTextSlice.reducer
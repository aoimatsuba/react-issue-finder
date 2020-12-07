import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = 'OPEN'
type IssueType = 'OPEN' | 'CLOSED'

const issueStatusSlice = createSlice({
    name: 'issueStatusFilter',
    initialState,
    reducers: {
        setIssueStatus(state, action: PayloadAction<IssueType>) {
            return action.payload
        }
    }
})

export const {setIssueStatus } = issueStatusSlice.actions
export default issueStatusSlice.reducer
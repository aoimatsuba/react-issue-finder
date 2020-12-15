import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = { open: true, closed: false }
type IssueType = { open: boolean; closed: boolean }

const issueStatusSlice = createSlice({
    name: 'issueStatusFilter',
    initialState,
    reducers: {
        setIssueStatus(state, action: PayloadAction<IssueType>) {
            return action.payload
        },
    },
})

export const { setIssueStatus } = issueStatusSlice.actions
export default issueStatusSlice.reducer

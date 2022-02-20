import { createSlice } from '@reduxjs/toolkit'

export const itemsSlice = createSlice({
    name: 'items',
    initialState: {
        items: [],
    },
    reducers: {
        setReduxItems: (state, action) => {
            state.items = action.payload
        },
        appendReduxItems: (state, action) => {
            state.items = [...state.items, ...action.payload]
        }
    }
})

export const { setReduxItems, appendReduxItems } = itemsSlice.actions

export default itemsSlice.reducer
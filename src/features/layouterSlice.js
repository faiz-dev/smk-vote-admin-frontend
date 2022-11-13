import { createSlice } from '@reduxjs/toolkit'

const layoutData = {
    drawerOpen: false,
    pageTitle: '',
    apiUrl: 'https://localhost:7153/api'
}

export const layoutDataSlice = createSlice({
    name: 'layoutdata',
    initialState: layoutData,
    reducers: {
        // toggledrawer
        toggleDrawer(state, {payload}) {
            state.drawerOpen = payload
        },
        setPageTitle(state, {payload}) {
            state.pageTitle = payload
        }
        // 
    }
})

export const { toggleDrawer, setPageTitle } = layoutDataSlice.actions

export default layoutDataSlice.reducer


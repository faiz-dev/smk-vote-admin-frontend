import { createSlice } from '@reduxjs/toolkit'

const layoutData = {
    drawerOpen: false,
    pageTitle: '',
    apiUrl: 'https://vote-backend.greenfield-26de5c7e.eastasia.azurecontainerapps.io/api'
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


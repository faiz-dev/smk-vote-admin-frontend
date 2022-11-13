import { createSlice } from '@reduxjs/toolkit'

const authData = {
    token: '',
    refreshToken: '',
    status: '',
    displayName: '',
    role: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: {...authData},
    reducers: {
        // toggledrawer
        setToken(state, {payload}) {
            state.token = payload
        },
        setRefreshToken(state, {payload}) {
            state.refreshToken = payload
        },
        setDisplayName(state, {payload}) {
            state.displayName = payload
        },
        setRole(state, {payload}) {
            state.role = payload
        },
        clearAuth: () => authData
    }
})

export const { setToken, setRefreshToken, clearAuth, setRole } = authSlice.actions

export default authSlice.reducer


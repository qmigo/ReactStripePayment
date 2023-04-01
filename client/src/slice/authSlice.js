import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: null,
    id: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginUser: (state, action)=>{
            state.username = action.payload.username
            state.id = action.payload.id
        },
        logoutUser: (state)=>{
            state.username = null,
            state.id = null
        }
    }
})

export const {loginUser, logoutUser} = authSlice.actions
export default authSlice.reducer
import { createSlice } from "@reduxjs/toolkit";



// Intial state for authentication
const initialState = {
    isAuthenticated: false,
    token: localStorage.getItem('access_token'), // store token
    loading: false,  // Loading state for valiation
    error: null, // Error state for validation
};



// Create the authSlice
export const authSlice = createSlice({
    name: 'auth', 
    initialState,
    reducers: {
        login: (state, action) => {
            state.token = action.payload; // Set token in the state
            state.isAuthenticated = true; // Set authentication state to true
            localStorage.setItem('access_token', action.payload);
        },
        logout: (state) => {
            state.token = null; // Remove the token
            state.isAuthenticated = false; // Set authentication state to false
            localStorage.removeItem('access_token'); // remove token from localStorage
        },
        setAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;   // Set loading state
        },
        setError: (state, action) => {
            state.error = action.payload;  // Set error state
        },
    },
});

export const { login, logout, setAuthenticated, setLoading, setError } = authSlice.actions;

export default authSlice.reducer;

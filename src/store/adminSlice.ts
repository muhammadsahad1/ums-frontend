import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    _id: '',
    email: '',
    role: ''
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setAdminDetails: (state, action) => {
            const { _id, email, role } = action.payload
            state._id = _id
            state.email = email
            state.role = role
        },
        setEmpty: (state) => {
            state._id = ""
            state.email = ""
            state.role = ""
        }

    }
})

export const { setAdminDetails, setEmpty } = adminSlice.actions
export default adminSlice.reducer
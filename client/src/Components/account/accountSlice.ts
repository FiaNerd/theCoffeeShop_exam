import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";
import { currentUser, login } from "../../services/CoffeeAPI";
import { User } from "../../types/user";



interface AccountState {
    user: User | null
}

const initialState : AccountState = {
    user: null
}

export const signInUser = createAsyncThunk<User,  FieldValues>(
    'account/signInUser',
    async (data, thunkApi) => {
        try {
            const user = await login(data)
            localStorage.setItem('user', JSON.stringify(user))
            console.log("Return user", user)
            return user
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error:any) {
            return thunkApi.rejectWithValue({error: error.data})
        }
    } 
)

export const fetchCurrentUser = createAsyncThunk<User | null>(
    'account/signInUser',
    async (_, thunkApi) => {
        try {
            const user = await currentUser();

            if (user !== undefined && user !== null) {
                localStorage.setItem('user', JSON.stringify(user));
                console.log("Return user", user);
                return user;
            } else {
                return null;
            }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Error when fetching currentUser", error);
            return thunkApi.rejectWithValue({ error: error.data });
        }
    }
);


export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        signOut: (state) => {
            state.user = null
            localStorage.removeItem('user')
        }
    },
    extraReducers: (builder => {
        builder.addMatcher(isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled), (state, action) => {
            state.user = action.payload
        })
        builder.addMatcher(isAnyOf(signInUser.rejected, fetchCurrentUser.rejected), (state, action) => {
            console.log("Action login",action.payload )
        })
    })
    
}) 

export const { signOut } = accountSlice.actions
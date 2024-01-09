import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
        console.log('Fetching current user');
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
    'account/fetchCurrentUser',
    async (_, thunkApi) => {
      try {
        const userInStorage = localStorage.getItem('user')

        if (userInStorage) {
          thunkApi.dispatch(setUser(JSON.parse(userInStorage)))
          return JSON.parse(userInStorage);
        }

        console.log("USER in storage", userInStorage)
  
        const user = await currentUser();

        console.log("user", user)
  
        if (user !== undefined && user !== null) {
          localStorage.setItem('user', JSON.stringify(user))
          console.log("Return user", user);
          return user;
        } else {
          // Remove the user from local storage if currentUser API call fails
          localStorage.removeItem('user');
          return null;
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        // Handle the error and remove the user from local storage
        console.error("Error when fetching currentUser", error)
        localStorage.removeItem('user');
        return thunkApi.rejectWithValue({ error: error.data })
      }
    }, 
    {
        condition: () => {
            if (!localStorage.getItem('user')) {
                return false
            }
        }
    }
)


export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        signOut: (state) => {
            state.user = null
            localStorage.removeItem('user')
        },
        setUser: (state, action) => {
            state.user = action.payload
        }
    },
    extraReducers: (builder => {
        builder.addCase(fetchCurrentUser.rejected, (state) => {
            state.user = null
            console.log('session expired')
            const navigate = useNavigate()
            navigate('/')
        })
        builder.addMatcher(isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled), (state, action) => {
            console.log("Fulfilled action", action);
            state.user = action.payload;
          })
          builder.addMatcher(isAnyOf(signInUser.rejected, fetchCurrentUser.rejected), (state, action) => {
            console.log("Rejected action", action);
          })
    })
    
}) 

export const { signOut, setUser } = accountSlice.actions
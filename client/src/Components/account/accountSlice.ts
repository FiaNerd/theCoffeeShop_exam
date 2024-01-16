import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { FieldValues } from 'react-hook-form'
import { currentUser, login } from '../../services/CoffeeAPI'
import { User } from '../../types/user'
import { setBasket } from '../basket/basketSlice'

interface AccountState {
  user: User | null
}

const initialState: AccountState = {
  user: null,
}

export const signInUser = createAsyncThunk<User, FieldValues>(
  'account/signInUser',
  async (data, thunkAPI) => {
    try {
      // Call the login service to authenticate the user
      const userDto = await login(data)

      // Extract the basket and user information from the response
      const { basket, ...user } = userDto

      // If the user has a basket, dispatch the setBasket action to update the Redux state
      if (basket) {
        thunkAPI.dispatch(setBasket(basket))
      }

      // Store the user information in local storage
      localStorage.setItem('user', JSON.stringify(user))

      // Return the user information to be handled by the fulfilled action
      return user
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // Handle errors and reject the promise with an error value
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  }
)

export const fetchCurrentUser = createAsyncThunk<User>(
  'account/fetchCurrentUser',
  async (_, thunkAPI) => {
    // Dispatch setUser action with the user information retrieved from local storage
    thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem('user')!)))

    try {
      // Call the currentUser service to get the latest user information
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const userDto = await currentUser()

      // const userDto: User = response 
      // Extract the basket and user information from the response
      const { basket, ...user } = userDto

      // If the user has a basket, dispatch the setBasket action to update the Redux state
      if (basket) {
        thunkAPI.dispatch(setBasket(basket))
      }

      // Update the user information in local storage
      localStorage.setItem('user', JSON.stringify(user));

      // Return the user information to be handled by the fulfilled action
      return user
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // Handle errors and reject the promise with an error value
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  },
  {
    // Conditionally dispatch the action only if user information is present in local storage
    condition: () => {
      if (!localStorage.getItem('user')) {
        return false
      }
    },
  }
)

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    signOut: (state) => {
      (state.user = null), localStorage.removeItem('user')
    },
    setUser: (state, action) => {
      const claims = JSON.parse(atob(action.payload.token.split('.')[1]))
      const roles =
        claims['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
      state.user = {
        ...action.payload,
        roles: typeof roles === 'string' ? [roles] : roles,
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.rejected, (state) => {
      state.user = null
      localStorage.removeItem('user')
    })
    builder.addMatcher(
      isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled),
      (state, action) => {
        const claims = JSON.parse(atob(action.payload.token.split('.')[1]))
        const roles =
          claims['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
        state.user = {
          ...action.payload,
          roles: typeof roles === 'string' ? [roles] : roles,
        }
      }
    ),
      builder.addMatcher(
        isAnyOf(signInUser.rejected/* , fetchCurrentUser.rejected */),
        (state, action) => {
          throw action.payload
        }
      )
  },
})

export const { signOut, setUser } = accountSlice.actions

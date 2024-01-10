import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { FieldValues } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
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
          const userDto = await login(data)

          const {basket, ...user} = userDto

          if (basket) {
            thunkAPI.dispatch(setBasket(basket))
          }
          localStorage.setItem('user', JSON.stringify(user))

          return user;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
          return thunkAPI.rejectWithValue({error: error.data});
      }
  }
)

export const fetchCurrentUser = createAsyncThunk<User>(
  'account/fetchCurrentUser',
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem('user')!)))

    try {
      const userDto = await currentUser()

      const { basket, ...user } = userDto

      if (basket) {
        thunkAPI.dispatch(setBasket(basket))
      }

      localStorage.setItem('user', JSON.stringify(user));

      return user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message || 'An error occurred' })
    }
  },
  {
    condition: () => {
      if (!localStorage.getItem('user')) {
        return false
      }
    },
  }
)

// export const fetchCurrentUser = createAsyncThunk<User>(
//   'account/fetchCurrentUser',
//   async (_, thunkAPI) => {
//     try {
//       if (!localStorage.getItem('user')) {
//         return null
//       }

//       const userInStorage = localStorage.getItem('user')!

//       thunkAPI.dispatch(setUser(JSON.parse(userInStorage)))

//       if (userInStorage === null || typeof userInStorage !== 'string') {
//         console.error('ERROR in user in storage')
//       } else {
//         const user = JSON.parse(userInStorage)
//         const basket = localStorage.getItem('basket')

//         if (basket) {
//           console.log('Basket from localStorage:', basket)
//           thunkAPI.dispatch(setBasket(basket))
//         }

//         if (userInStorage) {
//           console.log('User from localStorage:', user)
//           thunkAPI.dispatch(setUser(user))
//         }

//         console.log('USER in storage', userInStorage)

//         const userCurrent = await currentUser()

//         console.log('user', userCurrent)

//         if (user !== undefined && user !== null) {
//           localStorage.setItem('user', JSON.stringify(user))
//           console.log('Return user', user)
//           return user
//         } else {
//           // Remove the user from local storage if currentUser API call fails
//           localStorage.removeItem('user')
//           return null
//         }
//       }

//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (error: any) {
//       // Handle the error and remove the user from local storage
//       console.error('Error when fetching currentUser', error)
//       localStorage.removeItem('user')
//       return thunkAPI.rejectWithValue({ error: error.data })
//     }
//   },
//   {
//     condition: () => {
//       if (!localStorage.getItem('user')) {
//         return false
//       }
//     },
//   }
// )

// export const fetchCurrentUser = createAsyncThunk<User>(
//   'account/fetchCurrentUser',
//   async (_, thunkAPI) => {
//     try {
//       const userInStorage = localStorage.getItem('user')

//       const { basket, ...user } = userInStorage

//       if (basket) {
//         thunkAPI.dispatch(setBasket(basket))
//       }

//       if (userInStorage) {
//         thunkApi.dispatch(setUser(JSON.parse(userInStorage)))
//         return JSON.parse(userInStorage)
//       }

//       console.log('USER in storage', userInStorage)

//       const userCurrent = await currentUser()

//       console.log('user', userCurrent)

//       if (user !== undefined && user !== null) {
//         localStorage.setItem('user', JSON.stringify(user))
//         console.log('Return user', user)
//         return user
//       } else {
//         // Remove the user from local storage if currentUser API call fails
//         localStorage.removeItem('user')
//         return null
//       }
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (error: any) {
//       // Handle the error and remove the user from local storage
//       console.error('Error when fetching currentUser', error)
//       localStorage.removeItem('user')
//       return thunkAPI.rejectWithValue({ error: error.data })
//     }
//   },
//   {
//     condition: () => {
//       if (!localStorage.getItem('user')) {
//         return false
//       }
//     },
//   }
// )

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = null
      localStorage.removeItem('user')
      console.log(localStorage.removeItem('user'))

      console.log('state', state.user)
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.rejected, (state) => {
      state.user = null
      console.log('session expired')
      const navigate = useNavigate()
      navigate('/')
    })
    builder.addMatcher(
      isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled),
      (state, action) => {
        console.log('Fulfilled action', action)
        state.user = action.payload
      }
    )
    builder.addMatcher(
      isAnyOf(signInUser.rejected, fetchCurrentUser.rejected),
      (state, action) => {
        console.log('Rejected action', action)
      }
    )
  },
})

export const { signOut, setUser } = accountSlice.actions

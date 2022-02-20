import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './reducers/loginReducer'
import itemsReducer from './reducers/itemsReducer'

export default configureStore({
  reducer: {
      login: loginReducer,
      items: itemsReducer
  },
})
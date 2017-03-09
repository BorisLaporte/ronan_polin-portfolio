import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import contentReducer from './content/reducers'
import colorReducer from './color/reducers'
import navigationReducer from './navigation/reducers'
import responsiveReducer from './responsive/reducers'

const theStore = combineReducers({
  contentReducer,
  responsiveReducer,
  colorReducer,
  navigationReducer
})

const loggerMiddleware = createLogger()

export default function configureStore() {
  return createStore(
    theStore,
    applyMiddleware(
      thunkMiddleware,
      // loggerMiddleware
    )
  )
}

import heroes from '../reducers/heroes';
import {configureStore} from "@reduxjs/toolkit";
import filters from "../reducers/filters";

const stringMiddleware = ()=> (next) => (action)=> {
  if (typeof action === "string"){
    return next ({
      type: action
    })
  }
  return next(action)

}

const store = configureStore({
  reducer: {
  heroes,
  filters,
 },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat( stringMiddleware),
})

// const store = createStore(combineReducers({
//   heroes,
//   filters,
// }),
//   compose(applyMiddleware(ReduxThunk, stringMiddleware),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
// );

export default store;
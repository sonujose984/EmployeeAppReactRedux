import { legacy_createStore,applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import EmployeeReducer from "./reducer"
const store= legacy_createStore(EmployeeReducer,applyMiddleware(thunk));

export default store;
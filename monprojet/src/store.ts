import { combineReducers, legacy_createStore as createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import { storageReducers } from "./redux/reducers/storageReducers";
const rootReducers = combineReducers(
    {
        Storage: storageReducers
    }
)
const store = createStore(rootReducers, devToolsEnhancer({}) as any)

export default store
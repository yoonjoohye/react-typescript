import * as React from 'react';
import Root from './Root';
// firebase
import './firebaseApp';
// redux
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
// redux devtool
import {composeWithDevTools} from "redux-devtools-extension";
// redux thunk
import ReduxThunk from 'redux-thunk';
// reducer
import rootReducer from './modules/index';
// 스토어 생성
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk)));


const App=()=> {
    return(
        <Provider store={store}>
            <Root/>
        </Provider>
    )
}

export default App;
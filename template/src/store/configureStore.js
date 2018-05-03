import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import promiseMiddleware from '../middlewares/promiseMiddleware';
import reducer from '../reducers';

export const history = createHistory();
const historyMiddleware = routerMiddleware(history);

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    promiseMiddleware({ promiseTypeSuffixes: ['PENDING', 'SUCCESS', 'ERROR'] }),
    historyMiddleware,
)(createStore);

/* eslint-disable global-require */

export default function configureStore(initialState) {
    let store;

    if (process.env.NODE_ENV === 'development') {
        const myPersistState = require('redux-devtools').persistState;
        const DevTools = require('../containers/DevTools').default;

        const enhancer = compose(
            DevTools.instrument(),
            myPersistState(window.location.href.match(/[?&]debug_session=([^&#]+)\b/)),
        );
        store = createStoreWithMiddleware(reducer, initialState, enhancer);

        if (module.hot) {
            module.hot.accept('../reducers', () => store.replaceReducer(require('../reducers').default));
        }
    } else {
        store = createStoreWithMiddleware(reducer, initialState);
    }

    return store;
}

/* eslint-enable global-require */


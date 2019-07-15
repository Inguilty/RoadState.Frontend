import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './rootReducer';
import ReduxThunk from 'redux-thunk';

export default function configureStore(initialState) {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(ReduxThunk))
  );
}

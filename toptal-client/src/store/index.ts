import { createStore, applyMiddleware } from 'redux';
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers";
import {rootSaga} from "./sagas";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, logger));

// run the saga
sagaMiddleware.run(rootSaga);

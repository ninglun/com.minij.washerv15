import Reducers from "./Reducers.js";
import { createStore, applyMiddleware } from "redux";
import { createReactNavigationReduxMiddleware } from "react-navigation-redux-helpers";

const middleware = createReactNavigationReduxMiddleware(
    "root",
    state => state.nav
);

const store = createStore(
    Reducers,
    applyMiddleware(middleware),
);

export default store;
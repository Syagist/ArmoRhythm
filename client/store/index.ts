import {rootReducer, RootState} from "@/store/reducers";
import {createStore, Store} from "redux";
import {Context, createWrapper} from "next-redux-wrapper";

const makeStore = (context: Context) => createStore(rootReducer<RootState>);

export const wrapper = createWrapper<Store<RootState>>(makeStore, {debug: true});
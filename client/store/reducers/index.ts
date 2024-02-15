import {combineReducers} from "redux";
import {playerReducer} from "@/store/reducers/playerReducer";

export const rootReducer = combineReducers({
    player: playerReducer
})

export const RootState = ReturnType<typeof rootReducer>
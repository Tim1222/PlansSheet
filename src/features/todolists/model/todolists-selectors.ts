import type {Todolist} from './todolists-reducer'
import {RootState} from "../../../app/store";

export const selectTodolists = (state: RootState): Todolist[] => state.todolists

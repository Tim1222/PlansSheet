
import type {TasksState} from './tasks-reducer'
import {RootState} from "../../../app/store";

export const selectTasks = (state: RootState): TasksState => state.tasks

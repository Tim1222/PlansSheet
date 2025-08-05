import {v1} from "uuid";
import {AddTodolistActionType, DeleteTodolistActionType} from "./todolist-Reducer";
import {TaskStateType} from "../App";

type DeleteTasksActionType = ReturnType<typeof deleteTaskAC>
type CreateTasksActionType = ReturnType<typeof createTaskAC>
type ChangeTasksActionType = ReturnType<typeof changeTaskStatusAC>
type ChangeTasksTitleActionType = ReturnType<typeof changeTasksTitleAC>
type ActionType = DeleteTodolistActionType
    | AddTodolistActionType
    | DeleteTasksActionType
    | CreateTasksActionType
    | ChangeTasksActionType
    | ChangeTasksTitleActionType

export const tasksReducer = (tasks: TaskStateType, action: ActionType) => {
    switch (action.type) {
        case 'remove_todolist' : {
            const {id} = action.payload
            const copyTaskState = {...tasks}
            delete copyTaskState[id]
            return copyTaskState
        }
        case 'add_todolist' : {
            const {id} = action.payload
            return {...tasks, [id]: []}
        }
        case 'delete_tasks' : {
            const {id, taskId} = action.payload
            return {...tasks, [id]: tasks[id].filter(t => t.id !== taskId)}
        }
        case 'create_tasks' : {
            const {title, todolistId} = action.payload
            return {...tasks, [todolistId]: [...tasks[todolistId], {id: v1().toString(), title, isDone: false}]}
        }
        case 'change_tasks_status' : {
            const {taskId, isDone, todolistId} = action.payload
            return {
                ...tasks, [todolistId]: [...tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: isDone} : t)]
            }
        }
        case 'change_tasks_title' : {
            const {todolistId, taskId, title} = action.payload
            return {
                ...tasks, [todolistId]: [...tasks[todolistId].map(t => t.id === taskId ? {...t, title} : t)]
            }
        }
        default:
            return tasks
    }
}

export const deleteTaskAC = ({id, taskId}: { id: string, taskId: string }) => ({
    type: 'delete_tasks', payload: {id, taskId}
} as const)

export const createTaskAC = ({title, todolistId}: { title: string, todolistId: string }) => ({
    type: 'create_tasks', payload: {title, todolistId}
} as const)

export const changeTaskStatusAC = ({taskId, isDone, todolistId}: {
    taskId: string, isDone: boolean, todolistId: string
}) => ({
    type: 'change_tasks_status', payload: {taskId, isDone, todolistId}
} as const)

export const changeTasksTitleAC = ({todolistId, taskId, title}: {
    todolistId: string,
    taskId: string,
    title: string
}) => ({
    type: 'change_tasks_title', payload: {todolistId, taskId, title}
} as const)
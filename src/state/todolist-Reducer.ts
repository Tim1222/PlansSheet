import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type DeleteTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>


type ActionType =
    DeleteTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType


export const todolistsReducer = (todolists: TodolistType[], action: ActionType): TodolistType[] => {
    switch (action.type) {
        case 'remove_todolist' : {
            const {id} = action.payload
            return todolists.filter(tl => tl.id !== id)
        }
        case 'add_todolist': {
            const {id, title} = action.payload
            return [{id, title, filter: 'all'}, ...todolists]
        }
        case 'change_todolist_title' : {
            const {id, title} = action.payload
            return todolists.map(tl => tl.id === id ? {...tl, title} : tl)
        }
        case 'change_todolist_filter' : {
            const {id, filter} = action.payload
            return todolists.map(tl => tl.id === id ? {...tl, filter} : tl)
        }

        default:
            return todolists
    }
}

export const removeTodolistAC = (id: string) => ({
    type: 'remove_todolist', payload: {id}
} as const)
export const addTodolistAC = (title: string) => ({
    type: 'add_todolist', payload: {title, id: v1()}
} as const)
export const changeTodolistTitleAC = ({id, title}: { id: string, title: string }) => ({
    type: 'change_todolist_title', payload: {id, title}
} as const)
export const changeTodolistFilterAC = ({id, filter}: { id: string, filter: FilterValuesType }) => ({
    type: 'change_todolist_filter', payload: {id, filter}
} as const)

import {Tasks} from './Tasks/Tasks'
import {TodolistTitle} from './TodolistTitle/TodolistTitle'
import {useAppDispatch} from "../../../../../common/hooks/useAppDispatch";
import {Todolist} from '../../../model/todolists-reducer';
import {createTaskAC} from "../../../model/tasks-reducer";
import {CreateItemForm} from "../../../../../common/components";
import {FilterButtons} from "./FilterButtons/FilterButtons";

type Props = {
    todolist: Todolist
}

export const TodolistItem = ({todolist}: Props) => {
    const dispatch = useAppDispatch()

    const createTask = (title: string) => {
        dispatch(createTaskAC({todolistId: todolist.id, title}))
    }

    return (
        <div>
            <TodolistTitle todolist={todolist}/>
            <CreateItemForm onCreateItem={createTask}/>
            <Tasks todolist={todolist}/>
            <FilterButtons todolist={todolist}/>
        </div>
    )
}

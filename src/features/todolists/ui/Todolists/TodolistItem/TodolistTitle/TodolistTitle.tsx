import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import {changeTodolistTitleAC, deleteTodolistAC, Todolist} from "../../../../model/todolists-reducer";
import {useAppDispatch} from '../../../../../../common/hooks/useAppDispatch';
import {EditableSpan} from "../../../../../../common/components";

type Props = {
    todolist: Todolist
}

export const TodolistTitle = ({todolist}: Props) => {
    const {id, title} = todolist

    const dispatch = useAppDispatch()

    const deleteTodolist = () => {
        dispatch(deleteTodolistAC({id}))
    }

    const changeTodolistTitle = (title: string) => {
        dispatch(changeTodolistTitleAC({id, title}))
    }

    return (
        <div style={{display: 'flex', alignItems: 'center'}}>
            <h3>
                <EditableSpan value={title} onChange={changeTodolistTitle}/>
            </h3>
            <IconButton onClick={deleteTodolist}>
                <DeleteIcon/>
            </IconButton>
        </div>
    )
}

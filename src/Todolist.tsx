import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";


type PropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export function Todolist(props: PropsType) {

    const [newTaskTitleset, setNewTaskTitle] = useState('')
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            props.addTask(newTaskTitleset)
            setNewTaskTitle('')
        }
    }
    const addTask = () => {
        if( newTaskTitleset.trim() === "") {
            return
        }
        props.addTask(newTaskTitleset)
        setNewTaskTitle('')
    }
    const onAllClickHandler = () => props.changeFilter('all')
    const onActiveClickHandler = () => props.changeFilter('active')
    const onCopmletedClickHandler = () => props.changeFilter('completed')


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={newTaskTitleset}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                />
                <button onClick={addTask}>+
                </button>
            </div>
            <ul>
                {
                    props.tasks.map(t => {

                            const onRemoveHandler = () => {
                                props.removeTask(t.id)
                            }
                            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                props.changeTaskStatus(t.id, e.currentTarget.checked)
                            }
                            return <li key={t.id}><input
                                onChange={onChangeHandler}
                                type="checkbox"
                                checked={t.isDone}/>
                                <span> {t.title} </span>
                                <button onClick={onRemoveHandler}>x</button>
                            </li>
                        }
                    )
                }
                {/*<li><input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[0].title}</span></li>*/}
                {/*<li><input type="checkbox" checked={props.tasks[1].isDone}/> <span>{props.tasks[1].title}</span></li>*/}
                {/*<li><input type="checkbox" checked={props.tasks[2].isDone}/> <span>{props.tasks[2].title}</span></li>*/}

            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCopmletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}
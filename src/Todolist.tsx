import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";


type PropsType = {
    id: string
    title: string
    tasks: Array<TasksType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
}

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export function Todolist(props: PropsType) {

    const [newTaskTitleset, setNewTaskTitle] = useState('')
    const [error, setError] = useState('')
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError('')
        if (e.charCode === 13) {
            props.addTask(newTaskTitleset, props.id)
            setNewTaskTitle('')
        }
    }
    const addTask = () => {
        if (newTaskTitleset.trim() !== "") {
            props.addTask(newTaskTitleset, props.id)
            setNewTaskTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCopmletedClickHandler = () => props.changeFilter('completed', props.id)
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    return (
        <div>
            <h3>{props.title}
                <button onClick={removeTodolist}>x</button>
            </h3>
            <div>
                <input
                    value={newTaskTitleset}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    className={error ? 'error' : ''}
                />
                <button onClick={addTask}>+</button>
                {error && <div className='error-message'>Field is required</div>}
            </div>
            <ul>
                {
                    props.tasks.map(t => {

                            const onRemoveHandler = () => {
                                props.removeTask(t.id, props.id)
                            }
                            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                            }
                            return <li key={t.id} className={t.isDone ? 'is-done' : ''}><input
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
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={onCopmletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}

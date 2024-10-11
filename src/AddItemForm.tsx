import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    const [newTaskTitleset, setNewTaskTitle] = useState('')
    const [error, setError] = useState('')
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError('')
        if (e.charCode === 13) {
            // props.addItem(newTaskTitleset)
            setNewTaskTitle('')
            addTask()
        }
    }
    const addTask = () => {
        if (newTaskTitleset.trim() !== "") {
            props.addItem(newTaskTitleset.trim())
            setNewTaskTitle('')
        } else {
            setError('Title is required')
        }
    }
    return <div>
        <input
            value={newTaskTitleset}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            className={error ? 'error' : ''}
        />
        <button onClick={addTask}>+</button>
        {error && <div className='error-message'>Field is required</div>}
    </div>
}
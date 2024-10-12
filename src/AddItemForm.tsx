import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";

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
        <TextField
            value={newTaskTitleset}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            error={!!error}
            variant={'outlined'}
            label={'Type value'}
            helperText={error}
        />
        <IconButton onClick={addTask} color={"primary"}>
            <ControlPoint/>
        </IconButton>
    </div>
}
import React, {useReducer, useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolist-Reducer";
import {changeTaskStatusAC, changeTasksTitleAC, createTaskAC, deleteTaskAC, tasksReducer} from "./state/tasks-Reducer";


export type FilterValuesType = 'all' | 'completed' | 'active'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [key: string]: Array<TasksType>
}

function App() {
    let todolist1 = v1()
    let todolist2 = v1()

    let [todolists, dispatchTodolists] = useReducer(todolistsReducer, [
        {id: todolist1, title: "What to learn", filter: "all"},
        {id: todolist2, title: "What to buy", filter: "all"}
    ])
    let [tasksObj, dispatchTasksObj] = useReducer(tasksReducer, {
        [todolist1]: [
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redax', isDone: false}
        ],
        [todolist2]: [
            {id: v1(), title: 'Book', isDone: true},
            {id: v1(), title: 'Milk', isDone: true}
        ]
    })

    //CRUD TASK
    const removeTask = (id: string, todolistId: string) => {

        dispatchTasksObj(deleteTaskAC({id: todolistId, taskId: id}))
    }

    const addTask = (title: string, todolistId: string) => {
        dispatchTasksObj(createTaskAC({title: title, todolistId: todolistId}))
    }

    const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        dispatchTasksObj(changeTaskStatusAC({taskId, isDone, todolistId}))
    }

    const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
  dispatchTasksObj(changeTasksTitleAC({todolistId, taskId, title: newTitle}))
    }

    //CRUD TODO
    const removeTodolist = (todolistId: string) => {

        dispatchTodolists(removeTodolistAC(todolistId))
        // delete tasksObj[todolistId]
    }

    const addTodolist = (title: string) => {
        dispatchTodolists(addTodolistAC(title))
    }

    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        dispatchTodolists(changeTodolistFilterAC({id: todolistId, filter: value}))
    }

    const changeTodolistTitle = (todolistId: string, newTitle: string) => {
        dispatchTodolists(changeTodolistTitleAC({id: todolistId, title: newTitle}))
    }

    return (

        <div className='App'>

            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" color="inherit" component="div">
                        Some information
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '10px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={5}>
                    {
                        todolists.map((tl) => {
                            let taskForTodolist = tasksObj[tl.id]

                            if (tl.filter === 'completed') {
                                taskForTodolist = taskForTodolist.filter(t => t.isDone === true)
                            }
                            if (tl.filter === 'active') {
                                taskForTodolist = taskForTodolist.filter(t => t.isDone === false)
                            }

                            return <Grid item key={tl.id}>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={taskForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
            {/*<Todolist title='Movies' tasks={tasks2}/>*/}
        </div>
    );
}

export default App;

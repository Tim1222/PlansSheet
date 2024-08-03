import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {v1} from "uuid";


export type FilterValuesType = 'all' | 'completed' | 'active'

function App() {


    // let tasks2: Array<TasksType> = [
    //     {id: 1, title: 'Terminator', isDone: true},
    //     {id: 2, title: 'Movie2', isDone: false},
    //     {id: 3, title: 'Fortuna', isDone: true}
    // ]

    let [tasks, setTasks] = useState<Array<TasksType>>([
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redax', isDone: false}
    ])


    let [filter, setFilter] = useState<FilterValuesType>('all')

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    function addTask(title: string) {
        let newTask = {id: v1(), title: title, isDone: false}
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        setTasks([...tasks])
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    let taskForTodolist = tasks
    if (filter === 'completed') {
        taskForTodolist = tasks.filter(t => t.isDone === true)
    }
    if (filter === 'active') {
        taskForTodolist = tasks.filter(t => t.isDone === false)
    }

    return (
        <div className='App'>
            <Todolist title='What to learn'
                      tasks={taskForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeStatus}
                      filter={filter}
            />
            {/*<Todolist title='Movies' tasks={tasks2}/>*/}
        </div>
    );
}

export default App;

import React from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";

function App() {

    let tasks: Array<TasksType> = [
        {id: 1, title: 'CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'Redax', isDone: false}
    ]
    // let tasks2: Array<TasksType> = [
    //     {id: 1, title: 'Terminator', isDone: true},
    //     {id: 2, title: 'Movie2', isDone: false},
    //     {id: 3, title: 'Fortuna', isDone: true}
    // ]


    function removeTask(id: number) {
        tasks = tasks.filter(t => t.id !== id)
    }

    return (
        <div className='App'>
            <Todolist title='What to learn'
                      tasks={tasks}
                      removeTask={removeTask}/>
            {/*<Todolist title='Movies' tasks={tasks2}/>*/}
        </div>
    );
}

export default App;

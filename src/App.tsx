import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed";

function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "ReactJS", isDone: false}
    ]);
    console.log(tasks);
    let [filter, setFilter] = useState<FilterValuesType>("all");

    let tasksForTodoList = tasks;
    if (filter === "active") {
        tasksForTodoList = tasks.filter((t) => !t.isDone)
    }
    if (filter === "completed") {
        tasksForTodoList = tasks.filter((t) => t.isDone)
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    function removeTask(id: string) {
        let newTasks = tasks.filter((t) => t.id !== id);
        setTasks(newTasks);
    }

    function addTask(newTitle: string) {
        let newTask = {id: v1(), title: newTitle, isDone: false};
        setTasks([newTask, ...tasks]);
    }

    function changeStatus(taskId: string) {
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = !task.isDone;
        }
        setTasks([... tasks]);
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeStatus={changeStatus}
                      filter={filter}/>
            {typeof useState}
        </div>
    );

}

export default App;

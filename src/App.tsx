import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed";

type TdListType = {
    id: string;
    title: string;
    filter: FilterValuesType;
}

function App() {

    let tdListId1 = v1();
    let tdListId2 = v1();
    let [tdLists, setTdLists] = useState<Array<TdListType>>([
        {id: tdListId1, title: "TdList-1", filter: "active"},
        {id: tdListId2, title: "TdList-2", filter: "completed"}
    ])

    let [tasks, setTasks] = useState({
        [tdListId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Java", isDone: false}
        ],
        [tdListId2]: [
            {id: v1(), title: "Sugar", isDone: true},
            {id: v1(), title: "Apples", isDone: false}
        ]
    })

    function changeFilter(value: FilterValuesType, tdListId: string) {
        let tdList = tdLists.find((tl) => tl.id === tdListId)
        if (tdList) {
            tdList.filter = value;
            setTdLists([...tdLists]);
        }
    }

    function removeTask(id: string, tlId: string) {
        tasks[tlId] = tasks[tlId].filter((t) => t.id !== id) // удаляем фильтром таску из тудулиста с id = tdListId, сохраняем этот измененный тл в старый тл.
        setTasks({...tasks}); // сетим копию измененных тудулистов
    }

    function addTask(newTitle: string, tlId: string) {
        let newTask = {id: v1(), title: newTitle, isDone: false};
        tasks[tlId] = [newTask, ...tasks[tlId]];
        setTasks({...tasks});
    }

    function changeStatus(taskId: string, tlId: string) {
        let task = tasks[tlId].find(t => t.id === taskId);
        if (task) {
            task.isDone = !task.isDone;
        }
        setTasks({...tasks});
    }

    function removeTdList(tlId: string) {
        let newTlLists = tdLists.filter((tl) => tl.id !== tlId);
        setTdLists(newTlLists);
        delete tasks[tlId];
        setTasks({...tasks});
    }

    return (
        <div className="App">
            {
                tdLists.map((tl) => {
                    let tasksForTodoList = tasks[tl.id];
                    if (tl.filter === "active") {
                        tasksForTodoList = tasksForTodoList.filter((t) => !t.isDone)
                    }
                    if (tl.filter === "completed") {
                        tasksForTodoList = tasksForTodoList.filter((t) => t.isDone)
                    }

                    return <Todolist title={tl.title}
                                     key={tl.id}
                                     id={tl.id}
                                     tasks={tasksForTodoList}
                                     removeTask={removeTask}
                                     changeFilter={changeFilter}
                                     addTask={addTask}
                                     changeStatus={changeStatus}
                                     removeTdList={removeTdList}
                                     filter={tl.filter}/>
                })
            }
        </div>
    );

}

export default App;

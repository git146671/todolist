import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./components/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";

type TdListType = {
    id: string;
    title: string;
    filter: FilterValuesType;
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    let tdListId1 = v1();
    let tdListId2 = v1();
    let [tdLists, setTdLists] = useState<Array<TdListType>>([
        {id: tdListId1, title: "TdList-1", filter: "all"},
        {id: tdListId2, title: "TdList-2", filter: "all"}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
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

    function changeTaskTitle(taskId: string, tlId: string, newTitle: string) {
        let task = tasks[tlId].find(t => t.id === taskId);
        if (task) {
            task.title = newTitle;
        }
        setTasks({...tasks});
    }

    function removeTdList(tlId: string) {
        let newTlLists = tdLists.filter((tl) => tl.id !== tlId);
        setTdLists(newTlLists);
        delete tasks[tlId];
        setTasks({...tasks});
    }

    function addTdList(title: string) {
        let tdList: TdListType = {
            id: v1(),
            title: title,
            filter: "all"
        }
        setTdLists([tdList, ...tdLists]);
        setTasks({...tasks, [tdList.id]: []})
    }

    function changeTdListTitle(tdListId: string, newTitle: string) {
        let tdList = tdLists.find(t => t.id === tdListId);
        if (tdList) {
            tdList.title = newTitle;
            setTdLists([...tdLists]);
        }
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTdList}/>
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
                                     changeTaskTitle={changeTaskTitle}
                                     changeTdListTitle={changeTdListTitle}
                                     removeTdList={removeTdList}
                                     filter={tl.filter}/>
                })
            }
        </div>
    );

}

export default App;

import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from "./components/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {
    addTdListAC,
    changeTdListFilterAC,
    changeTdListTitleAC,
    removeTdListAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type FilterValuesType = "all" | "active" | "completed";

export type TdListType = {
    id: string;
    title: string;
    filter: FilterValuesType;
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {

    let tdListId1 = v1();
    let tdListId2 = v1();
    let [tdLists, dispatchToTodolist] = useReducer(todolistsReducer,
        [
            {id: tdListId1, title: "TdList-1", filter: "all"},
            {id: tdListId2, title: "TdList-2", filter: "all"}
        ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer,
        {
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
        dispatchToTodolist(changeTdListFilterAC(tdListId, value));
    }

    function removeTask(id: string, tlId: string) {
        dispatchToTasks(removeTaskAC(id, tlId));
    }

    function addTask(newTitle: string, tlId: string) {
        dispatchToTasks(addTaskAC(newTitle, tlId));
    }

    function changeStatus(taskId: string, isDone: boolean, tlId: string) {
        dispatchToTasks(changeTaskStatusAC(taskId, isDone, tlId));
    }

    function changeTaskTitle(taskId: string, tlId: string, newTitle: string) {
        dispatchToTasks(changeTaskTitleAC(taskId, tlId, newTitle));
    }

    function removeTdList(tlId: string) {
        const action = removeTdListAC(tlId);
        dispatchToTasks(action);
        dispatchToTodolist(action);
    }

    function addTdList(title: string) {
        const action = addTdListAC(title);
        dispatchToTodolist(action);
        dispatchToTasks(action);
    }

    function changeTdListTitle(tdListId: string, newTitle: string) {
        dispatchToTodolist(changeTdListTitleAC(tdListId, newTitle));
    }

    return (
        <div className="App">
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Container fixed>
                <Grid container style={{padding: "20px 0"}}>
                    <AddItemForm addItem={addTdList}/>
                </Grid>
                <Grid container spacing={10}>
                    {
                        tdLists.map((tl) => {
                            debugger
                            let tasksForTodoList = tasks[tl.id];
                            if (tl.filter === "active") {
                                tasksForTodoList = tasksForTodoList.filter((t) => !t.isDone)
                            }
                            if (tl.filter === "completed") {
                                tasksForTodoList = tasksForTodoList.filter((t) => t.isDone)
                            }

                            return <Grid item>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist title={tl.title}
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
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducers;

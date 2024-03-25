import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from "./components/Todolist";
import {AppRootStateType} from "./state/store";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {
    addTdListAC,
    changeTdListFilterAC,
    changeTdListTitleAC,
    removeTdListAC
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed";

export type TdListType = {
    id: string;
    title: string;
    filter: FilterValuesType;
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const dispatch = useDispatch();
    const tdLists = useSelector<AppRootStateType, TdListType[]>
    (state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>
    (state => state.tasks)

    function changeFilter(value: FilterValuesType, tdListId: string) {
        dispatch(changeTdListFilterAC(tdListId, value));
    }

    function removeTask(id: string, tlId: string) {
        dispatch(removeTaskAC(id, tlId));
    }

    function addTask(newTitle: string, tlId: string) {
        dispatch(addTaskAC(newTitle, tlId));
    }

    function changeStatus(taskId: string, isDone: boolean, tlId: string) {
        dispatch(changeTaskStatusAC(taskId, isDone, tlId));
    }

    function changeTaskTitle(taskId: string, tlId: string, newTitle: string) {
        dispatch(changeTaskTitleAC(taskId, tlId, newTitle));
    }

    function removeTdList(tlId: string) {
        dispatch(removeTdListAC(tlId));
    }

    function addTdList(title: string) {
        dispatch(addTdListAC(title));
    }

    function changeTdListTitle(tdListId: string, newTitle: string) {
        dispatch(changeTdListTitleAC(tdListId, newTitle));
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
                            let tasksForTodoList = tasks[tl.id];
                            if (tl.filter === "active") {
                                tasksForTodoList = tasksForTodoList.filter((t) => !t.isDone)
                            }
                            if (tl.filter === "completed") {
                                tasksForTodoList = tasksForTodoList.filter((t) => t.isDone)
                            }

                            return <Grid item key={tl.id}>
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

export default AppWithRedux;

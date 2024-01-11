import React from "react";
import {FilterValuesType} from "../App";
import styled from "styled-components";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

//************* COMPONENTS TYPES ***************//
export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}
type TodolistPropsType = {
    id: string
    title: string;
    tasks: Array<TaskType>;
    removeTask: (id: string, tlId: string) => void; // эта функция является колбэком и пробрасывается от родителя чтобы вызвать ее отсюда и там изменить состояние
    changeFilter: (value: FilterValuesType, tdListId: string) => void; // эта функция является колбэком и пробрасывается от родителя чтобы вызвать ее отсюда и там изменить состояние
    addTask: (newTitle: string, tlId: string) => void;
    changeStatus: (id: string, tlId: string) => void;
    changeTaskTitle: (id: string, tlId: string, newTitle: string) => void;
    changeTdListTitle: (tlId: string, newTitle: string) => void;
    removeTdList: (tlId: string) => void;
    filter: FilterValuesType;
}

//************* COMPONENT ***************//
export let Todolist = (props: TodolistPropsType) => {

    //*** FUNCTIONS ***

    const onClickChangeFilterAll = () => props.changeFilter("all", props.id);
    const onClickChangeFilterActive = () => props.changeFilter("active", props.id);
    const onClickChangeFilterCompleted = () => props.changeFilter("completed", props.id);
    const removeTdList = () => props.removeTdList(props.id);

    const addTask = (newTitle: string) => {
        props.addTask(newTitle, props.id);
    }

    const onChangeTdListTitle = (newTitle: string) => {
        props.changeTdListTitle(props.id, newTitle);
    }
    //*** JSX ***
    return <div>
        <h3>
            <EditableSpan title={props.title} onChange={onChangeTdListTitle}/>
            <IconButton aria-label="delete" onClick={removeTdList} size={"small"}>
                <DeleteIcon />
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {
                props.tasks.length !== 0 ?
                    props.tasks.map((t) => {
                        const onRemoveTaskClickBtn = () => props.removeTask(t.id, props.id);
                        const onClickCheckBox = () => props.changeStatus(t.id, props.id);
                        const onChangeTitleHandler = (newTaskTitle: string) => props.changeTaskTitle(t.id, props.id, newTaskTitle)
                        return <StyledTaskLi opacity={t.isDone ? "0.5" : ""}>
                            <Checkbox checked={t.isDone} onChange={onClickCheckBox}/>
                            <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                            <IconButton aria-label="delete" onClick={onRemoveTaskClickBtn} size={"small"}>
                                <DeleteIcon />
                            </IconButton>
                        </StyledTaskLi>
                    }) :
                    <span>Tasks list is empty</span>
            }
        </ul>
        <div>
            <Button onClick={onClickChangeFilterAll} color={"inherit"} variant={props.filter === "all" ? "contained" : "text"}>
                All
            </Button>
            <Button onClick={onClickChangeFilterActive} color={"primary"} variant={props.filter === "active" ? "contained" : "text"}>
                Active
            </Button>
            <Button onClick={onClickChangeFilterCompleted} color={"secondary"} variant={props.filter === "completed" ? "contained" : "text"}>
                Completed
            </Button>
        </div>
    </div>
}

//************* STYLED COMPONENTS TYPES ***************//
type StyledTaskLiType = {
    opacity: string;
}


//**************** STYLED COMPONENTS ******************//

const StyledTaskLi = styled.li<StyledTaskLiType>`
    opacity: ${props => props.opacity};
    list-style-type: none;
`

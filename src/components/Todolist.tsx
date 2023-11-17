import React from "react";
import {FilterValuesType} from "../App";
import styled from "styled-components";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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
            <button onClick={removeTdList}>x</button>
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
                            <input type="checkbox" checked={t.isDone} onChange={onClickCheckBox}/>
                            <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                            <button onClick={onRemoveTaskClickBtn}>x</button>
                        </StyledTaskLi>
                    }) :
                    <span>Tasks list is empty</span>
            }
        </ul>
        <div>
            <StyledFilterBtn bgc={props.filter === "all" ? "aquamarine" : ""}
                             onClick={onClickChangeFilterAll}>All</StyledFilterBtn>
            <StyledFilterBtn bgc={props.filter === "active" ? "aquamarine" : ""}
                             onClick={onClickChangeFilterActive}>Active</StyledFilterBtn>
            <StyledFilterBtn bgc={props.filter === "completed" ? "aquamarine" : ""}
                             onClick={onClickChangeFilterCompleted}>Completed</StyledFilterBtn>
        </div>
    </div>
}

//************* STYLED COMPONENTS TYPES ***************//
type StyledTaskLiType = {
    opacity: string;
}
type StyledFilterBtnType = {
    bgc: string;
}

//**************** STYLED COMPONENTS ******************//

const StyledTaskLi = styled.li<StyledTaskLiType>`
  opacity: ${props => props.opacity};
`

const StyledFilterBtn = styled.button<StyledFilterBtnType>`
  background-color: ${props => props.bgc};
`
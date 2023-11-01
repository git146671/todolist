import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";
import styled from "styled-components";

//************* COMPONENTS TYPES ***************//
export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}
type TodolistPropsType = {
    title: string;
    tasks: Array<TaskType>;
    removeTask: (id: string) => void; // эта функция является колбэком и пробрасывается от родителя чтобы вызвать ее отсюда и там изменить состояние
    changeFilter: (value: FilterValuesType) => void; // эта функция является колбэком и пробрасывается от родителя чтобы вызвать ее отсюда и там изменить состояние
    addTask: (newTitle: string) => void;
    changeStatus: (id: string) => void;
    filter: FilterValuesType;
}

//************* COMPONENT ***************//
export let Todolist = (props: TodolistPropsType) => {

    //*** LOCAL USE STATES ***
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    //*** FUNCTIONS ***
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value);
    }

    const onKeyUpInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === "Enter") {
            if (newTaskTitle.trim() !== "") {
                props.addTask(newTaskTitle);
                setNewTaskTitle("");
            } else {
                setError("Field is required");
            }
        }
    }

    const onAddTaskClickBtn = () => {
        if (newTaskTitle.trim() !== "") {
            props.addTask(newTaskTitle);
            setNewTaskTitle("");
        } else {
            setError("Field is required");
        }
    }

    const onClickChangeFilterAll = () => props.changeFilter("all");
    const onClickChangeFilterActive = () => props.changeFilter("active");
    const onClickChangeFilterCompleted = () => props.changeFilter("completed");

    //*** JSX ***
    return <div>
        <h3>{props.title}</h3>
        <div>
            <StyledInput border={error ? "red 1px solid" : ""}
                   value={newTaskTitle}
                   onChange={onNewTitleChangeHandler}
                   onKeyUp={onKeyUpInputHandler}/>

            <button onClick={onAddTaskClickBtn}>+</button>
            {error && <StyledRequiredFieldMsgDiv className="error-message">{error}</StyledRequiredFieldMsgDiv>}
        </div>
        <ul>
            {
                props.tasks.map((t) => {
                    const onRemoveTaskClickBtn = () => {
                        props.removeTask(t.id)
                    }
                    const onClickCheckBox = () => props.changeStatus(t.id);
                    return <StyledTaskLi opacity={t.isDone ? "0.5" : ""}>
                        <input type="checkbox" checked={t.isDone} onChange={onClickCheckBox}/>
                        <span>{t.title}</span>
                        <button onClick={onRemoveTaskClickBtn}>x</button>
                    </StyledTaskLi>
                })
            }
        </ul>
        <div>
            <StyledFilterBtn bgc={props.filter === "all" ? "aquamarine" : ""} onClick={onClickChangeFilterAll}>All</StyledFilterBtn>
            <StyledFilterBtn bgc={props.filter === "active" ? "aquamarine" : ""} onClick={onClickChangeFilterActive}>Active</StyledFilterBtn>
            <StyledFilterBtn bgc={props.filter === "completed" ? "aquamarine" : ""} onClick={onClickChangeFilterCompleted}>Completed</StyledFilterBtn>
        </div>
    </div>
}

//************* STYLED COMPONENTS TYPES ***************//
type StyledInputType = {
    border: string;
}
type StyledTaskLiType = {
    opacity: string;
}
type StyledFilterBtnType = {
    bgc: string;
}

//**************** STYLED COMPONENTS ******************//
const StyledInput = styled.input<StyledInputType>`
      border: ${props => props.border};
`

const StyledRequiredFieldMsgDiv = styled.div`
  color: red;
`

const StyledTaskLi = styled.li<StyledTaskLiType>`
  opacity: ${props => props.opacity};
`

const StyledFilterBtn = styled.button<StyledFilterBtnType>`
  background-color: ${props => props.bgc};
`
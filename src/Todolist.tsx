import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";

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
export let Todolist = (props: TodolistPropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

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


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input className={error ? "error" : ""}
                   value={newTaskTitle}
                   onChange={onNewTitleChangeHandler}
                   onKeyUp={onKeyUpInputHandler}/>
            <button onClick={onAddTaskClickBtn}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map((t) => {
                    const onRemoveTaskClickBtn = () => {
                        props.removeTask(t.id)
                    }
                    const onClickCheckBox = () => props.changeStatus(t.id);
                    return <li className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox" checked={t.isDone} onChange={onClickCheckBox}/>
                        <span>{t.title}</span>
                        <button onClick={onRemoveTaskClickBtn}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === "all" ? "active-filter" : ""} onClick={onClickChangeFilterAll}>All</button>
            <button className={props.filter === "active" ? "active-filter" : ""} onClick={onClickChangeFilterActive}>Active</button>
            <button className={props.filter === "completed" ? "active-filter" : ""} onClick={onClickChangeFilterCompleted}>Completed</button>
        </div>
    </div>
}
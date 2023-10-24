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
}
export let Todolist = (props: TodolistPropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState("");

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value);
    }

    const onKeyUpInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            props.addTask(newTaskTitle);
            setNewTaskTitle("");
        }
    }

    const onAddTaskClickBtn = () => {
        props.addTask(newTaskTitle);
        setNewTaskTitle("");
    }

    const onClickChangeFilterAll = () => props.changeFilter("all");
    const onClickChangeFilterActive = () => props.changeFilter("active");
    const onClickChangeFilterCompleted = () => props.changeFilter("completed");


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={newTaskTitle}
                   onChange={onNewTitleChangeHandler}
                   onKeyUp={onKeyUpInputHandler}/>
            <button onClick={onAddTaskClickBtn}>+</button>
        </div>
        <ul>
            {
                props.tasks.map( (t) => {
                    const onRemoveTaskClickBtn = () => {
                        props.removeTask(t.id)
                    }
                    return <li>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onRemoveTaskClickBtn}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button onClick={onClickChangeFilterAll}>All</button>
            <button onClick={onClickChangeFilterActive}>Active</button>
            <button onClick={onClickChangeFilterCompleted}>Completed</button>
        </div>
    </div>
}
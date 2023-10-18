import React from "react";
import {FilterValuesType} from "./App";

export type TaskType = {
    id: number;
    title: string;
    isDone: boolean;
}

type TodolistPropsType = {
    title: string;
    tasks: Array<TaskType>;
    removeTask: (id: number) => void; // эта функция является колбэком и пробрасывается от родителя чтобы вызвать ее отсюда и там изменить состояние
    changeFilter: (value: FilterValuesType) => void; // эта функция является колбэком и пробрасывается от родителя чтобы вызвать ее отсюда и там изменить состояние
}
export let Todolist = (props: TodolistPropsType) => {
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {
                props.tasks.map( (t) => {
                    return <li>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={() => {props.removeTask(t.id)}}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button onClick={() => {props.changeFilter("all")}}>All</button>
            <button onClick={() => {props.changeFilter("active")}}>Active</button>
            <button onClick={() => {props.changeFilter("completed")}}>Completed</button>
        </div>
    </div>
}
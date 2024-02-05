import {v1} from "uuid";
import {FilterValuesType, TasksStateType, TdListType} from "../App";
import {
    addTdListAC, changeTdListFilterAC,
    changeTdListTitleAC,
    removeTdListAC,
    todolistsReducer
} from "./todolists-reducer";
import {useState} from "react";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";

let tdListId1 = v1();
let tdListId2 = v1();
const startState = {
    [tdListId1]: [
        {id: "1", title: "HTML&CSS", isDone: true},
        {id: "2", title: "JS", isDone: true},
        {id: "3", title: "ReactJS", isDone: false},
        {id: "4", title: "Java", isDone: false}
    ],
    [tdListId2]: [
        {id: "1", title: "Sugar", isDone: true},
        {id: "2", title: "Apples", isDone: false}
    ]
};

test('correct task should be removed', () => {
    const endState =tasksReducer(startState, removeTaskAC("3", tdListId1));

    expect(endState[tdListId1].length).toBe(3);
    expect(endState[tdListId2].length).toBe(2);
    expect(endState[tdListId1].every(t => t.id != "3")).toBeTruthy();
})

test('correct task should be added', () => {
    const endState =tasksReducer(startState, addTaskAC("newTitle", tdListId2));

    expect(endState[tdListId1].length).toBe(4);
    expect(endState[tdListId2].length).toBe(3);
    expect(endState[tdListId2].find(t => t.title === "newTitle")?.title).toBe("newTitle");
})

test('correct task should changed its status', () => {
    const endState =tasksReducer(startState, changeTaskStatusAC("2", tdListId2));

    expect(endState[tdListId1].length).toBe(4);
    expect(endState[tdListId2].length).toBe(2);
    expect(endState[tdListId2].find(t => t.id === "2")?.isDone).toBe(true);
    expect(endState[tdListId2].find(t => t.id === "1")?.isDone).toBe(true);
})

test('correct task should changed its status', () => {
    const endState =tasksReducer(startState, changeTaskTitleAC("newTitle", "1", tdListId2));

    expect(endState[tdListId1].length).toBe(4);
    expect(endState[tdListId2].length).toBe(2);
    expect(endState[tdListId2].find(t => t.id === "1")?.title).toBe("newTitle");
    expect(endState[tdListId2].find(t => t.id === "2")?.title).toBe("Apples");
})

test('create new tdList', () => {
    const endState =tasksReducer(startState, addTdListAC(v1()));

    const  keys = Object.keys(endState);
    const newKey = keys.find(k => k != tdListId1 && k != tdListId2);
    if (!newKey) {
        throw Error("new tdList should be added");
    }
    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
})

test('tasks should be deleted when tdlist deleted', () => {
    const action = removeTdListAC(tdListId2);
    const endState = tasksReducer(startState, action);
    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState[tdListId2]).not.toBeDefined();
})
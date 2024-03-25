import {v1} from "uuid";
import {FilterValuesType, TdListType} from "../AppWithReducers";
import {
    addTdListAC, changeTdListFilterAC,
    changeTdListTitleAC,
    removeTdListAC,
    todolistsReducer
} from "./todolists-reducer";

let tdListId1: string;
let tdListId2: string;
let startState: TdListType[];
beforeEach(() => {
    tdListId1 = v1();
    tdListId2 = v1();
    startState = [
        {id: tdListId1, title: "TdList-1", filter: "all"},
        {id: tdListId2, title: "TdList-2", filter: "all"}
    ]
})

test('correct todolist should be removed', () => {
    const endState =todolistsReducer(startState, removeTdListAC(tdListId1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(tdListId2);
})

test('correct todolist should be added', () => {
    let newTdListTitle = "new todolist";
    const endState =todolistsReducer(startState, addTdListAC(newTdListTitle));

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTdListTitle);
    expect(endState[2].filter).toBe('all');
})

test('correct todolist should changed its name', () => {
    let newTdListTitle = "new todolist";
    const endState =todolistsReducer(startState, changeTdListTitleAC(tdListId2, newTdListTitle));

    expect(endState[0].title).toBe("TdList-1");
    expect(endState[1].title).toBe(newTdListTitle);
})

test('correct filter of todolist should be changed', () => {
    let newFilter:FilterValuesType = "completed";
    const endState =todolistsReducer(startState, changeTdListFilterAC(tdListId2, newFilter));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe("completed");
})
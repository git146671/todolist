import {FilterValuesType, TdListType} from "../AppWithReducers";
import {v1} from "uuid";

export type RemoveTdListActionType = {
    type: 'REMOVE_TODOLIST',
    id: string
}
export type AddTdListActionType = {
    type: 'ADD_TODOLIST',
    title: string,
    id: string
}
export type ChangeTdListTitleActionType = {
    type: 'CHANGE_TODOLIST_TITLE',
    id: string,
    title: string
}
export type ChangeTdListFilterActionType = {
    type: 'CHANGE_TODOLIST_FILTER',
    id: string,
    filter: FilterValuesType
}

type ActionTypes = RemoveTdListActionType | AddTdListActionType | ChangeTdListTitleActionType | ChangeTdListFilterActionType;

export let tdListId1 = v1();
export let tdListId2 = v1();
const initState: Array<TdListType> = [
    {id: tdListId1, title: "TdList-1", filter: "all"},
    {id: tdListId2, title: "TdList-2", filter: "all"}
];
export const todolistsReducer = (state: TdListType[] = initState, action: ActionTypes): TdListType[] => {
    switch (action.type) {
        case 'REMOVE_TODOLIST': {
            return state.filter((tl) => tl.id !== action.id);
        }
        case 'ADD_TODOLIST': {
            return [...state, {
                id: action.id,
                title: action.title,
                filter: "all"
            }]
        }
        case 'CHANGE_TODOLIST_TITLE': {
            let tdList = state.find(t => t.id === action.id);
            if (tdList) {
                tdList.title = action.title;
                return [...state];
            }
            return [];
        }
        case 'CHANGE_TODOLIST_FILTER': {
            let tdList = state.find(t => t.id === action.id);
            if (tdList) {
                tdList.filter = action.filter;
                return [...state];
            }
            return [];
        }
        default:
            return state;
    }
}

export const removeTdListAC = (tdListId: string): RemoveTdListActionType => {
    return {
        type: "REMOVE_TODOLIST",
        id: tdListId
    }
}

export const addTdListAC = (tdListTitle: string): AddTdListActionType => {
    return {
        type: "ADD_TODOLIST",
        title: tdListTitle,
        id: v1()
    }
}
export const changeTdListTitleAC = (tdListId: string, newTitle: string): ChangeTdListTitleActionType => {
    return {
        type: "CHANGE_TODOLIST_TITLE",
        id: tdListId,
        title: newTitle
    }
}

export const changeTdListFilterAC = (tdListId: string, newFilter: FilterValuesType): ChangeTdListFilterActionType => {
    return {
        type: "CHANGE_TODOLIST_FILTER",
        id: tdListId,
        filter: newFilter
    }
}
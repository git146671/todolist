import {FilterValuesType, TdListType} from "../App";
import {v1} from "uuid";

export type RemoveTdListActionType = {
    type: 'REMOVE_TODOLIST',
    id: string
}
export type AddTdListActionType = {
    type: 'ADD_TODOLIST',
    title: string
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

export const todolistsReducer = (state: TdListType[], action: ActionTypes): TdListType[] => {
    switch (action.type) {
        case 'REMOVE_TODOLIST': {
            return state.filter((tl) => tl.id !== action.id);
        }
        case 'ADD_TODOLIST': {
            return [...state, {
                id: v1(),
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
            throw new Error("")
    }
}

export const RemoveTdListAC = (tdListId: string): RemoveTdListActionType => {
    return {
        type: "REMOVE_TODOLIST",
        id: tdListId
    }
}

export const AddTdListAC = (tdListTitle: string): AddTdListActionType => {
    return {
        type: "ADD_TODOLIST",
        title: tdListTitle
    }
}
export const ChangeTdListTitleAC = (tdListId: string, newTitle: string): ChangeTdListTitleActionType => {
    return {
        type: "CHANGE_TODOLIST_TITLE",
        id: tdListId,
        title: newTitle
    }
}

export const ChangeTdListFilterAC = (tdListId: string, newFilter: FilterValuesType): ChangeTdListFilterActionType => {
    return {
        type: "CHANGE_TODOLIST_FILTER",
        id: tdListId,
        filter: newFilter
    }
}
import {FilterValuesType, TasksStateType, TdListType} from "../AppWithReducers";
import {v1} from "uuid";
import {AddTdListActionType, RemoveTdListActionType, tdListId1, tdListId2} from "./todolists-reducer";

export type RemoveTaskActionType = {
    type: 'REMOVE_TASK',
    taskId: string,
    tdListId: string
}
export type AddTaskActionType = {
    type: 'ADD_TASK',
    title: string,
    tdListId: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE_TASK_STATUS',
    taskId: string,
    isDone: boolean,
    tdListId: string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE_TASK_TITLE',
    title: string,
    taskId: string,
    tdListId: string
}

type ActionTypes = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType |
    AddTdListActionType | RemoveTdListActionType;

const initState: TasksStateType = {
    [tdListId1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Java", isDone: false}
    ],
    [tdListId2]: [
        {id: v1(), title: "Sugar", isDone: true},
        {id: v1(), title: "Apples", isDone: false}
    ]
};
export const tasksReducer = (state: TasksStateType = initState, action: ActionTypes): TasksStateType => {
    const copyState = {...state};
    switch (action.type) {
        case 'REMOVE_TASK': {
            copyState[action.tdListId] = copyState[action.tdListId].filter((t) => t.id !== action.taskId)
            return {...copyState};
        }
        case 'ADD_TASK': {
            let newTask = {id: v1(), title: action.title, isDone: false};
            copyState[action.tdListId] = [newTask, ...copyState[action.tdListId]];
            return {...copyState};
        }
        case 'CHANGE_TASK_STATUS': {
            let task = copyState[action.tdListId].find(t => t.id === action.taskId);
            if (task) {
                task.isDone = !action.isDone;
            }
            return {...copyState};
        }
        case 'CHANGE_TASK_TITLE': {
            let task = copyState[action.tdListId].find(t => t.id === action.taskId);
            if (task) {
                task.title = action.title;
            }
            return {...copyState};
        }
        case 'ADD_TODOLIST': {
            copyState[action.id] = [];
            return {...copyState};
        }
        case 'REMOVE_TODOLIST': {
            delete copyState[action.id];
            return copyState;
        }
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, tdListId: string): RemoveTaskActionType => {
    return {
        type: "REMOVE_TASK",
        taskId,
        tdListId
    }
}

export const addTaskAC = (title: string, tdListId: string): AddTaskActionType => {
    return {
        type: "ADD_TASK",
        title,
        tdListId
    }
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, tdListId: string): ChangeTaskStatusActionType => {
    return {
        type: "CHANGE_TASK_STATUS",
        taskId,
        isDone,
        tdListId
    }
}

export const changeTaskTitleAC = (title: string, taskId: string, tdListId: string): ChangeTaskTitleActionType => {
    return {
        type: "CHANGE_TASK_TITLE",
        title,
        taskId,
        tdListId
    }
}
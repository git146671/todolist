import {addTdListAC, todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import {TasksStateType, TdListType} from "../App";

test("ids should be equals", () => {
    const startTasksState: TasksStateType = {};
    const startTodoListsState: TdListType[] = [];
    const action = addTdListAC("newTitle");
    const endTasksState = tasksReducer(startTasksState, action);
    const endTodoListsState = todolistsReducer(startTodoListsState, action);
    const keys = Object.keys(endTasksState);
    const taskId = keys[0];
    const tdListId = endTodoListsState[0].id;

    expect(taskId).toBe(action.id);
    expect(tdListId).toBe(action.id);
})
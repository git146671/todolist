import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import styled from "styled-components";
import {IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";

type AddTaskFormType = {
    addItem: (newTitle: string) => void;
}
export function AddItemForm(props: AddTaskFormType) {

    //*** LOCAL USE STATES ***
    const [newTitle, setNewTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    //*** FUNCTIONS ***
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value);
    }

    const onKeyUpInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === "Enter") {
            if (newTitle.trim() !== "") {
                props.addItem(newTitle);
                setNewTitle("");
            } else {
                setError("Field is required");
            }
        }
    }

    const onAddTaskClickBtn = () => {
        if (newTitle.trim() !== "") {
            props.addItem(newTitle);
            setNewTitle("");
        } else {
            setError("Field is required");
        }
    }

    //*** JSX ***

    return <div>
        <TextField
            variant={"outlined"}
            label="Type value"
            error={!!error}
            value={newTitle}
            helperText={error}
            onChange={onNewTitleChangeHandler}
            onKeyUp={onKeyUpInputHandler}/>

        <IconButton color={"primary"} onClick={onAddTaskClickBtn}>
            <ControlPoint/>
        </IconButton>
    </div>
}

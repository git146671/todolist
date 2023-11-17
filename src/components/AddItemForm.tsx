import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import styled from "styled-components";

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
        <StyledInput border={error ? "red 1px solid" : ""}
                     value={newTitle}
                     onChange={onNewTitleChangeHandler}
                     onKeyUp={onKeyUpInputHandler}/>

        <button onClick={onAddTaskClickBtn}>+</button>
        {error && <StyledRequiredFieldMsgDiv className="error-message">{error}</StyledRequiredFieldMsgDiv>}
    </div>
}

//************* STYLED COMPONENTS TYPES ***************//
type StyledInputType = {
    border: string;
}

//**************** STYLED COMPONENTS ******************//
const StyledInput = styled.input<StyledInputType>`
  border: ${props => props.border};
`

const StyledRequiredFieldMsgDiv = styled.div`
  color: red;
`
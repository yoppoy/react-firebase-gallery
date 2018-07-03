import { todosRef } from "../config/firebase";
import { FETCH_TODOS } from "./types";

export const addToDo = newToDo => async dispatch => {
    todosRef.push().set(newToDo);
};

export const completeToDo = completeToDoId => async dispatch => {
    todosRef.child(completeToDoId).remove();
};

export const fetchToDos = () => async dispatch => {
    todosRef.on("value", snapshot => {
        console.log(snapshot.val());
        dispatch({
            type: FETCH_TODOS,
            payload: snapshot.val()
        });
    });
};
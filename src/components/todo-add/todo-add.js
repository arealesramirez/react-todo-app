import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function TodoAdd(props) {
  return (
    <form noValidate autoComplete="off" onSubmit={props.onSubmit}>
      <TextField
        required
        id="add-todo"
        label="Add Todo"
        value={props.todoText}
        onChange={props.onTodoTextChanged}
      />
      <Button type="submit" variant="contained">
        Add
      </Button>
    </form>
  );
}

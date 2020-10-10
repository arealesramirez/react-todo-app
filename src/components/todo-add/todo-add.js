import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default class TodoAdd extends React.Component {
  get isSubmitEnabled() {
    return !!this.props.todoText;
  }

  render() {
    const buttonText = !this.props.isEditMode ? "Add" : "Edit";

    return  (
      <form noValidate autoComplete="off" onSubmit={this.props.onSubmit}>
        <TextField
          required
          id="add-todo"
          label="Todo"
          value={this.props.todoText}
          onChange={this.props.onTodoTextChanged}
        />
        <Button
          type="submit"
          disabled={!this.isSubmitEnabled}
          variant="contained"
        >
          {buttonText}
        </Button>
      </form>
    );
  }
}

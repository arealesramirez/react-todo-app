import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import TodoAdd from "./../todo-add/todo-add";
// import "./todo-list.scss";

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      formData: {
        id: "",
        text: "",
      },
      lastId: 0,
      isEditMode: false,
    };
  }

  getListItems() {
    return this.state.todos.map((todo) => {
      return (
        <ListItem key={todo.id}>
          <ListItemText primary={todo.text} />
          <ListItemSecondaryAction>
            <IconButton
              onClick={this.onEditMode.bind(this, todo)}
              edge="end"
              aria-label="edit"
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={this.deleteTodo.bind(this, todo.id)}
              edge="end"
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      );
    });
  }

  onSubmit(event) {
    event.preventDefault();

    if (this.state.isEditMode) this.editTodo();
    else this.addTodo();
  }

  addTodo() {
    const todos = this.state.todos.slice();
    const formData = Object.assign({}, this.state.formData);
    const lastId = this.state.lastId + 1;

    this.setState({
      todos: todos.concat([
        {
          id: lastId,
          text: formData.text,
        },
      ]),
      lastId,
      formData: {
        text: "",
      },
    });
  }

  onEditMode(todo) {
    this.setState({
      isEditMode: true,
      formData: {
        id: todo.id,
        text: todo.text,
      },
    });
  }

  editTodo() {
    const formData = Object.assign({}, this.state.formData);
    const todos = this.state.todos.slice();
    const editedTodoIndex = todos.findIndex((t) => t.id === formData.id);
    todos[editedTodoIndex].text = formData.text;

    this.setState({
      todos,
      isEditMode: false,
      formData: { id: "", text: "" },
    });
  }

  deleteTodo(todoId) {
    const todos = this.state.todos.slice();

    this.setState({
      todos: todos.filter((todo) => todo.id !== todoId),
    });
  }

  onTodoTextChanged(e) {
    this.setState({
      formData: {
        id: this.state.formData.id,
        text: e.target.value,
      },
    });
  }

  render() {
    const items = this.getListItems();

    return (
      <div>
        <TodoAdd
          todoId={this.state.formData.id}
          todoText={this.state.formData.text}
          onTodoTextChanged={this.onTodoTextChanged.bind(this)}
          onSubmit={this.onSubmit.bind(this)}
          isEditMode={this.state.isEditMode}
        />

        <div hidden={this.state.isEditMode}>
          <List>{items}</List>
        </div>
      </div>
    );
  }
}

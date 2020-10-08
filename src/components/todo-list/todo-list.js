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
      addForm: {
        text: "",
      },
      lastId: 0,
    };
  }

  getListItems() {
    return this.state.todos.map((todo) => {
      return (
        <ListItem key={todo.id}>
          <ListItemText primary={todo.text} />
          <ListItemSecondaryAction>
          <IconButton
              onClick={this.onEditTodo.bind(this, todo.id)}
              edge="end"
              aria-label="edit"
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={this.onDeleteTodo.bind(this, todo.id)}
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

  onAddTodo(event) {
    event.preventDefault();

    const todos = this.state.todos.slice();
    const addFormData = Object.assign({}, this.state.addForm);
    const lastId = this.state.lastId + 1;

    this.setState({
      todos: todos.concat([
        {
          id: lastId,
          text: addFormData.text,
        },
      ]),
      lastId,
      addForm: {
        text: "",
      },
    });
  }

  onEditTodo(todoId) {

  }

  onDeleteTodo(todoId) {
    const todos = this.state.todos.slice();

    this.setState({
      todos: todos.filter((todo) => todo.id !== todoId),
    });
  }

  onTodoTextChanged(e) {
    this.setState({
      addForm: {
        text: e.target.value,
      },
    });
  }

  render() {
    const items = this.getListItems();

    return (
      <div>
        <TodoAdd
          todoText={this.state.addForm.text}
          onTodoTextChanged={this.onTodoTextChanged.bind(this)}
          onSubmit={this.onAddTodo.bind(this)}
        />
        <List>{items}</List>
      </div>
    );
  }
}

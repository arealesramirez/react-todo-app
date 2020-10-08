import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
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

import { initializeIcons } from '@uifabric/icons';
import * as React from "react";
import "./App.css";
import AddTodo from "./components/addtodo/addtodo";
import Todo, { ITodoItem } from './components/Todo/todo';

initializeIcons();

interface ITodoState {
  Todos: ITodoItem[];
}

class App extends React.Component<{}, ITodoState> {
  constructor(props: any) {
    super(props);

    this.state = { Todos: [] };

    this.addTodo = this.addTodo.bind(this);
    this.handleTodoClick = this.handleTodoClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  public componentDidMount() {
    if ((localStorage.getItem("todos") as string) !== null) {
      const todos: ITodoItem[] = JSON.parse(localStorage.getItem(
        "todos"
      ) as string);

      this.setState({ Todos: todos });
    }
  }

  public handleDeleteClick(i: number) {
    const todos = this.state.Todos;
    todos.splice(i, 1);

    this.setState({ Todos: [...todos] });

    localStorage.setItem("todos", JSON.stringify([...todos]));
  }

  public addTodo(todo: ITodoItem) {
    const todos = this.state.Todos;

    this.setState({ Todos: [...todos, todo] });

    localStorage.setItem("todos", JSON.stringify([...todos, todo]));
  }

  public handleTodoClick(i: number) {
    const todos = this.state.Todos;
    todos[i].Done = !todos[i].Done;

    this.setState({ Todos: [...todos] });

    localStorage.setItem("todos", JSON.stringify([...todos]));
  }

  public render() {
    return (
      <div className="App">
        <AddTodo addTodo={this.addTodo} />
        <Todo Todos={this.state.Todos} handleTodoClick={this.handleTodoClick}
          handleDeleteClick={this.handleDeleteClick} />
      </div>
    );
  }
}

export default App;

import * as React from "react";
import { ITodoItem } from '../Todo/todo';
import "./addtodo.css";

import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

interface IAddState {
  todo: string;
}

interface IAddProps {
  addTodo(todo: ITodoItem): void;
}

class AddTodo extends React.Component<IAddProps, IAddState> {
  constructor(props: any) {
    super(props);

    this.state = {
      todo: ""
    };

    this.addItem = this.addItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  public render() {
    return (
      <form onSubmit={this.addItem}>
        <div className="ms-Grid" dir="ltr">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg10">
              <TextField name='todo' label='' placeholder='Todo item here' value={this.state.todo} onChange={this.handleChange} />
            </div>
            <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">
              <PrimaryButton type='submit'>Save</PrimaryButton>
            </div>
          </div>
        </div>        
      </form>
    );
  }

  public addItem(e: any) {
    e.preventDefault();
    this.props.addTodo({ Item: this.state.todo, Done: false });

    this.setState({ todo: ''});
  }

  public handleChange(event: any) {
    this.setState({ todo: event.target.value });
  }
}

export default AddTodo;

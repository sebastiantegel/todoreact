// import * as ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import * as React from 'react';
import App from './App';
import { ITodoItem } from './components/Todo/todo';

describe('App ', () => {
  const key = 'todos';

  beforeEach(() => {    
    localStorage.clear();
    localStorage.__STORE__[key] = JSON.stringify([]);
  });

  it('renders without crashing', () => {
    // const div = document.createElement('div');
    // ReactDOM.render(<App />, div);
    // ReactDOM.unmountComponentAtNode(div);

    shallow(<App />);
  });

  it('should add an item', () => {
    const app = shallow<App>(<App />);

    const mockItem: ITodoItem = { Item: 'Test', Done: false }

    expect(app.instance().state.Todos.length).toBe(0);

    let listFromStorage: ITodoItem[] = JSON.parse(localStorage.getItem(key) as string);
    expect(listFromStorage.length).toBe(0);

    app.instance().addTodo(mockItem);

    expect(app.instance().state.Todos.length).toBe(1);
    expect(app.instance().state.Todos[0]).toBe(mockItem);

    listFromStorage = JSON.parse(localStorage.getItem(key) as string);
    expect(listFromStorage.length).toBe(1);
  });

  it('should remove an item', () => {
    const app = shallow<App>(<App />);

    const mockItem: ITodoItem = { Item: 'Test', Done: false }
    const mockItem2: ITodoItem = { Item: 'Test2', Done: false }

    expect(app.instance().state.Todos.length).toBe(0);

    let listFromStorage: ITodoItem[] = JSON.parse(localStorage.getItem(key) as string);
    expect(listFromStorage.length).toBe(0);

    app.instance().addTodo(mockItem);
    app.instance().addTodo(mockItem2);

    expect(app.instance().state.Todos.length).toBe(2);
    expect(app.instance().state.Todos[1]).toBe(mockItem2);
    listFromStorage = JSON.parse(localStorage.getItem(key) as string);
    expect(listFromStorage.length).toBe(2);

    app.instance().handleDeleteClick(0);

    expect(app.instance().state.Todos.length).toBe(1);
    expect(app.instance().state.Todos[0]).toBe(mockItem2);

    listFromStorage = JSON.parse(localStorage.getItem(key) as string);
    expect(listFromStorage.length).toBe(1);
  });

  it('should mark an item as done', () => {
    const app = shallow<App>(<App />);

    const mockItem: ITodoItem = { Item: 'Test', Done: false }

    app.instance().addTodo(mockItem);
    app.instance().handleTodoClick(0);

    expect(app.instance().state.Todos[0].Done).toBeTruthy();
  });

  it('should toggle done value of item', () => {
    const app = shallow<App>(<App />);

    const mockItem: ITodoItem = { Item: 'Test', Done: false }

    app.instance().addTodo(mockItem);
    app.instance().handleTodoClick(0);

    expect(app.instance().state.Todos[0].Done).toBeTruthy();

    app.instance().handleTodoClick(0);

    expect(app.instance().state.Todos[0].Done).toBeFalsy();
  });
}) 
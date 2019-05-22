import { mount, shallow } from 'enzyme';
import * as React from 'react';
// import App from './App';
// import { ITodoItem } from './components/Todo/todo';
import AddTodo from './addtodo';

describe('AddTodo ', () => {
    const props = {
        addTodo: jest.fn()
    }
  
    it('renders without crashing', () => {
      // const div = document.createElement('div');
      // ReactDOM.render(<App />, div);
      // ReactDOM.unmountComponentAtNode(div);
  
      shallow(<AddTodo {...props} />);
    });

    it('should empty state after saving item', () => {
        const component = mount<AddTodo>(<AddTodo {...props} />);

        component.instance().addItem(new Event('test'));

        expect(component.instance().props.addTodo).toHaveBeenCalled();
        expect(component.instance().state.todo).toBe('');
    });

    it('should update state when typing', () => {
        const component = mount<AddTodo>(<AddTodo {...props} />);

        const objectWithValue = { target: { value: 'a' } };
        component.instance().handleChange(objectWithValue);

        expect(component.instance().state.todo).toBe('a');
    });
});
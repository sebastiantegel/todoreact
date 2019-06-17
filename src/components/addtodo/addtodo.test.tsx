import { mount, shallow } from 'enzyme';
import * as React from 'react';
import AddTodo, { IAddProps } from './addtodo';

describe('AddTodo ', () => {
    const props: IAddProps = {
        addTodo: jest.fn(),
    }
  
    it('renders without crashing', () => {
      // const div = document.createElement('div');
      // ReactDOM.render(<App />, div);
      // ReactDOM.unmountComponentAtNode(div);
  
      shallow(<AddTodo {...props} />);
    });

    it('should call addItem when submit', () => {
        const form = mount<AddTodo>(<AddTodo {...props} />).find('form');

        const event = {
            preventdefault: jest.fn()
        }

        form.simulate('submit', event);

        expect(props.addTodo).toHaveBeenCalled();
    });

    it('should empty state after saving item', () => {
        const component = shallow<AddTodo>(<AddTodo {...props} />);

        component.instance().addItem(new Event('test'));

        expect(props.addTodo).toHaveBeenCalled();
        expect(component.instance().state.todo).toBe('');
    });

    it('should update state when typing', () => {
        const component = shallow<AddTodo>(<AddTodo {...props} />);

        const objectWithValue = { target: { value: 'a' } };
        component.instance().handleChange(objectWithValue);

        expect(component.instance().state.todo).toBe('a');
    });
});
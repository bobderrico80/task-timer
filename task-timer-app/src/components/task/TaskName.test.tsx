import React from 'react';
import { render, fireEvent, RenderResult } from '@testing-library/react';
import TaskName from './TaskName';

describe('The <TaskName /> component', () => {
  let component: RenderResult;
  let onChange: jest.Mock;

  beforeEach(() => {
    onChange = jest.fn();
  });

  describe('with default behavior', () => {
    beforeEach(() => {
      component = render(
        <TaskName taskId="test-id" name="Write tests" onChange={onChange} />
      );
    });

    describe('without first being clicked', () => {
      it('has expected name text', () => {
        const div = component.getByText('Write tests');
        expect(div).toBeTruthy();
      });
    });

    describe('when clicked', () => {
      let input: HTMLElement;

      beforeEach(() => {
        const button = component.getByLabelText('Edit task name');
        fireEvent.click(button);
        input = component.getByLabelText('Task Name');
      });

      it('has an input with the expected ID attribute', () => {
        expect(input).toHaveAttribute('id', 'task-name-test-id');
      });

      it('has an input with expected value', () => {
        expect(input).toHaveAttribute('value', 'Write tests');
      });

      it('calls onChange with the new text value when changed', () => {
        fireEvent.change(input, { target: { value: 'a' } });
        expect(onChange).toHaveBeenCalledWith('a');
      });

      it('transforms back to a div when blurred', () => {
        fireEvent.blur(input);
        const div = component.getByText('Write tests');
        expect(div).toBeTruthy();
      });
    });
  });
});

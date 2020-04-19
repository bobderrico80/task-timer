import React from 'react';
import { RenderResult, render, fireEvent } from '@testing-library/react';
import TaskEdit from './TaskEdit';
import { TaskState } from '../../App';

describe('The <TaskEdit /> component', () => {
  let component: RenderResult;
  let onSubmit: jest.Mock;
  let onCancelClick: jest.Mock;

  beforeEach(() => {
    onSubmit = jest.fn();
    onCancelClick = jest.fn();
  });

  describe('common behavior', () => {
    let input: HTMLElement;
    let checkbox: HTMLElement;
    let submitButton: HTMLElement;
    let cancelButton: HTMLElement;

    beforeEach(() => {
      component = render(
        <TaskEdit
          initialTask={{
            id: 'test-id',
            name: 'foo',
            state: TaskState.COMPLETE,
            children: [],
          }}
          onSubmit={onSubmit}
          onTaskAction={onCancelClick}
        />
      );
      input = component.getByLabelText('Task name');
      checkbox = component.getByLabelText('Ongoing task?');
      submitButton = component.getByText('Save');
      cancelButton = component.getByText('Cancel');
    });

    it('renders a text input with a value equal to initialName', () => {
      expect(input).toHaveValue('foo');
    });

    it('updates the input text field as the value change', () => {
      fireEvent.change(input, { target: { value: 'bar' } });
      expect(input).toHaveValue('bar');
    });

    it('submits the form with the updated name when the submit button is clicked', () => {
      fireEvent.change(input, { target: { value: 'bar' } });
      fireEvent.click(submitButton);
      expect(onSubmit).toHaveBeenCalledWith({
        id: 'test-id',
        name: 'bar',
        state: TaskState.COMPLETE,
        children: [],
      });
    });

    it('submits the form with a task state of ONGOING if the ongoing checkbox input is checked', () => {
      fireEvent.click(checkbox);
      fireEvent.click(submitButton);
      expect(onSubmit).toHaveBeenCalledWith({
        id: 'test-id',
        name: 'foo',
        state: TaskState.ONGOING,
        children: [],
      });
    });

    it('submits the form with initial task state if the ongoing checkbox input is not checked', () => {
      fireEvent.click(checkbox);
      fireEvent.click(checkbox);
      fireEvent.click(submitButton);
      expect(onSubmit).toHaveBeenCalledWith({
        id: 'test-id',
        name: 'foo',
        state: TaskState.COMPLETE,
        children: [],
      });
    });

    it('calls onCancelClick when the cancel button is clicked', () => {
      fireEvent.click(cancelButton);
      expect(onCancelClick).toHaveBeenCalled();
    });
  });

  describe('with an initialState of ONGOING', () => {
    let checkbox: HTMLElement;

    beforeEach(() => {
      component = render(
        <TaskEdit
          initialTask={{
            id: 'test-id',
            name: 'foo',
            state: TaskState.ONGOING,
            children: [],
          }}
          onSubmit={onSubmit}
          onTaskAction={onCancelClick}
        />
      );
      checkbox = component.getByLabelText('Ongoing task?');
    });

    it('has the Ongoing Task checkbox input initially set to checked', () => {
      expect(checkbox).toBeChecked();
    });
  });

  describe('with an initialState of INCOMPLETE', () => {
    let checkbox: HTMLElement;

    beforeEach(() => {
      component = render(
        <TaskEdit
          initialTask={{
            id: 'test-id',
            name: 'foo',
            state: TaskState.INCOMPLETE,
            children: [],
          }}
          onSubmit={onSubmit}
          onTaskAction={onCancelClick}
        />
      );
      checkbox = component.getByLabelText('Ongoing task?');
    });

    it('has the Ongoing Task checkbox input initially set to unchecked', () => {
      expect(checkbox).not.toBeChecked();
    });
  });

  describe('with an initialState of COMPLETE', () => {
    let checkbox: HTMLElement;

    beforeEach(() => {
      component = render(
        <TaskEdit
          initialTask={{
            id: 'test-id',
            name: 'foo',
            state: TaskState.COMPLETE,
            children: [],
          }}
          onSubmit={onSubmit}
          onTaskAction={onCancelClick}
        />
      );
      checkbox = component.getByLabelText('Ongoing task?');
    });

    it('has the Ongoing Task checkbox input initially set to unchecked', () => {
      expect(checkbox).not.toBeChecked();
    });
  });
});

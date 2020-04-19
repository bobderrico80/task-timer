import React from 'react';
import { RenderResult, render, fireEvent } from '@testing-library/react';
import TaskItem from './TaskItem';
import { TaskState, TaskAction } from '../../App';

describe('The <TaskItem /> component', () => {
  let component: RenderResult;
  let onTaskChange: jest.Mock;
  let onTaskAction: jest.Mock;

  beforeEach(() => {
    onTaskChange = jest.fn();
    onTaskAction = jest.fn();
  });

  describe('in view mode', () => {
    beforeEach(() => {
      component = render(
        <TaskItem
          task={{
            id: 'test-id',
            name: 'foo',
            state: TaskState.INCOMPLETE,
            children: [],
          }}
          editingTaskId={null}
          playingTaskId="test-id"
          onTaskChange={onTaskChange}
          onTaskAction={onTaskAction}
        />
      );
    });

    it('updates the task state when the checkbox is checked', () => {
      fireEvent.click(component.getByLabelText('foo'));
      expect(onTaskChange).toHaveBeenCalledWith({
        id: 'test-id',
        name: 'foo',
        state: TaskState.COMPLETE,
        children: [],
      });
    });

    it('dispatches actions as expected', () => {
      fireEvent.click(component.getByText('Edit'));
      expect(onTaskAction).toHaveBeenCalledWith({
        action: TaskAction.EDIT,
        taskId: 'test-id',
      });
    });

    it('renders the correct play or stop button as expected', () => {
      expect(component.getByText('Stop')).toBeTruthy();
    });
  });

  describe('in edit mode', () => {
    beforeEach(() => {
      component = render(
        <TaskItem
          task={{
            id: 'test-id',
            name: 'foo',
            state: TaskState.INCOMPLETE,
            children: [],
          }}
          editingTaskId="test-id"
          playingTaskId={null}
          onTaskChange={onTaskChange}
          onTaskAction={onTaskAction}
        />
      );
    });

    it('updates the task state when form is submitted', () => {
      fireEvent.change(component.getByLabelText('Task name'), {
        target: { value: 'bar' },
      });
      fireEvent.click(component.getByLabelText('Ongoing task?'));
      fireEvent.click(component.getByText('Save'));
      expect(onTaskChange).toHaveBeenCalledWith({
        id: 'test-id',
        name: 'bar',
        state: TaskState.ONGOING,
        children: [],
      });
    });

    it('dispatches actions as expected', () => {
      fireEvent.click(component.getByText('Cancel'));
      expect(onTaskAction).toHaveBeenCalledWith({
        action: TaskAction.CANCEL_EDIT,
        taskId: 'test-id',
      });
    });

    it('dispatches the CANCEL_EDIT button when submitting the form', () => {
      fireEvent.click(component.getByText('Save'));
      expect(onTaskAction).toHaveBeenCalledWith({
        action: TaskAction.CANCEL_EDIT,
        taskId: 'test-id',
      });
    });
  });
});

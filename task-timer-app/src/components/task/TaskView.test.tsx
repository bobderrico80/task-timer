import React from 'react';
import {
  RenderResult,
  render,
  fireEvent,
  cleanup,
} from '@testing-library/react';
import TaskView from './TaskView';
import { TaskState, TaskAction } from '../../App';

describe('The <TaskView /> component', () => {
  let component: RenderResult;
  let onTaskChange: jest.Mock;
  let onTaskAction: jest.Mock;

  beforeEach(() => {
    onTaskChange = jest.fn();
    onTaskAction = jest.fn();
  });

  describe('with an ONGOING task state', () => {
    beforeEach(() => {
      component = render(
        <TaskView
          task={{
            id: 'test-id',
            name: 'Foo',
            state: TaskState.ONGOING,
            children: [],
          }}
          playingTaskId={null}
          onTaskChange={onTaskChange}
          onTaskAction={onTaskAction}
        />
      );
    });

    it('renders the task name', () => {
      expect(component.getByText('Foo')).toBeTruthy();
    });

    it('dispatches actions from the toolbar buttons as expected', () => {
      fireEvent.click(component.getByText('Edit'));
      expect(onTaskAction).toHaveBeenCalledWith({
        action: TaskAction.EDIT,
        taskId: 'test-id',
      });
    });

    it('passes down the playingTaskId state as expected', () => {
      expect(component.getByText('Play')).toBeTruthy();
    });
  });

  describe('with COMPLETE task state', () => {
    let checkbox: HTMLElement;

    beforeEach(() => {
      component = render(
        <TaskView
          task={{
            id: 'test-id',
            name: 'Foo',
            state: TaskState.COMPLETE,
            children: [],
          }}
          playingTaskId={null}
          onTaskChange={onTaskChange}
          onTaskAction={onTaskAction}
        />
      );
      checkbox = component.getByLabelText('Foo');
    });

    it('renders a checkbox input that is checked', () => {
      expect(checkbox).toBeChecked();
    });

    it('updates the task state to INCOMPLETE when the checkbox is clicked', () => {
      fireEvent.click(checkbox);
      expect(onTaskChange).toHaveBeenCalledWith({
        id: 'test-id',
        name: 'Foo',
        state: TaskState.INCOMPLETE,
        children: [],
      });
    });

    it('dispatches actions from the toolbar buttons as expected', () => {
      fireEvent.click(component.getByText('Edit'));
      expect(onTaskAction).toHaveBeenCalledWith({
        action: TaskAction.EDIT,
        taskId: 'test-id',
      });
    });

    it('passes down the playingTaskId state as expected', () => {
      expect(component.getByText('Play')).toBeTruthy();
    });
  });

  describe('with INCOMPLETE task state', () => {
    let checkbox: HTMLElement;

    beforeEach(() => {
      cleanup();
      component = render(
        <TaskView
          task={{
            id: 'test-id',
            name: 'Foo',
            state: TaskState.INCOMPLETE,
            children: [],
          }}
          playingTaskId={null}
          onTaskChange={onTaskChange}
          onTaskAction={onTaskAction}
        />
      );
      checkbox = component.getByLabelText('Foo');
    });

    it('renders a checkbox input that is not checked', () => {
      expect(checkbox).not.toBeChecked();
    });

    it('updates the task state to COMPLETE when the checkbox is clicked', () => {
      fireEvent.click(checkbox);
      expect(onTaskChange).toHaveBeenCalledWith({
        id: 'test-id',
        name: 'Foo',
        state: TaskState.COMPLETE,
        children: [],
      });
    });

    it('dispatches actions from the toolbar buttons as expected', () => {
      fireEvent.click(component.getByText('Edit'));
      expect(onTaskAction).toHaveBeenCalledWith({
        action: TaskAction.EDIT,
        taskId: 'test-id',
      });
    });

    it('passes down the playingTaskId state as expected', () => {
      expect(component.getByText('Play')).toBeTruthy();
    });
  });
});

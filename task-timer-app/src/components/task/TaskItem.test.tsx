import React from 'react';
import {
  RenderResult,
  render,
  fireEvent,
  cleanup,
} from '@testing-library/react';
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

  describe('child task behavior', () => {
    beforeEach(() => {
      component = render(
        <TaskItem
          task={{
            id: 'test-id',
            name: 'foo',
            state: TaskState.INCOMPLETE,
            children: [
              {
                id: 'test-bar',
                name: 'bar',
                state: TaskState.INCOMPLETE,
                children: [
                  {
                    id: 'test-baz',
                    name: 'baz',
                    state: TaskState.INCOMPLETE,
                    children: [],
                  },
                ],
              },
              {
                id: 'test-qux',
                name: 'qux',
                state: TaskState.INCOMPLETE,
                children: [],
              },
            ],
          }}
          editingTaskId="test-bar"
          playingTaskId="test-qux"
          onTaskChange={onTaskChange}
          onTaskAction={onTaskAction}
        />
      );
    });

    it('renders child items in a list', () => {
      expect(component.getAllByRole('list')[0].children.length).toEqual(2);
    });

    it('passes editingTaskId to children as expected', () => {
      const childListItems = [...component.getAllByRole('list')[0].children];
      expect(childListItems[0]).toHaveTextContent('Save');
    });

    it('passes playingTaskId to children as expected', () => {
      const childListItems = [...component.getAllByRole('list')[0].children];
      expect(childListItems[1]).toHaveTextContent('Stop');
    });

    it('updates the state of child tasks as expected', () => {
      fireEvent.click(component.getByLabelText('baz'));
      expect(onTaskChange).toHaveBeenCalledWith({
        id: 'test-id',
        name: 'foo',
        state: TaskState.INCOMPLETE,
        children: [
          {
            id: 'test-bar',
            name: 'bar',
            state: TaskState.INCOMPLETE,
            children: [
              {
                id: 'test-baz',
                name: 'baz',
                state: TaskState.COMPLETE,
                children: [],
              },
            ],
          },
          {
            id: 'test-qux',
            name: 'qux',
            state: TaskState.INCOMPLETE,
            children: [],
          },
        ],
      });
    });

    it('updates the state of child tasks to match that of the parent task when changed', () => {
      fireEvent.click(component.getByLabelText('foo'));
      expect(onTaskChange).toHaveBeenCalledWith({
        id: 'test-id',
        name: 'foo',
        state: TaskState.COMPLETE,
        children: [
          {
            id: 'test-bar',
            name: 'bar',
            state: TaskState.COMPLETE,
            children: [
              {
                id: 'test-baz',
                name: 'baz',
                state: TaskState.COMPLETE,
                children: [],
              },
            ],
          },
          {
            id: 'test-qux',
            name: 'qux',
            state: TaskState.COMPLETE,
            children: [],
          },
        ],
      });
    });

    it('does not update state of child tasks if parent task state is switched to ONGOING', () => {
      // Make the first task ongoing
      cleanup();
      component = render(
        <TaskItem
          task={{
            id: 'test-id',
            name: 'foo',
            state: TaskState.INCOMPLETE,
            children: [
              {
                id: 'test-bar',
                name: 'bar',
                state: TaskState.INCOMPLETE,
                children: [
                  {
                    id: 'test-baz',
                    name: 'baz',
                    state: TaskState.INCOMPLETE,
                    children: [],
                  },
                ],
              },
              {
                id: 'test-qux',
                name: 'qux',
                state: TaskState.INCOMPLETE,
                children: [],
              },
            ],
          }}
          editingTaskId="test-id"
          playingTaskId="test-qux"
          onTaskChange={onTaskChange}
          onTaskAction={onTaskAction}
        />
      );
      fireEvent.click(component.getByLabelText('Ongoing task?'));
      fireEvent.click(component.getByText('Save'));

      expect(onTaskChange).toHaveBeenCalledWith({
        id: 'test-id',
        name: 'foo',
        state: TaskState.ONGOING,
        children: [
          {
            id: 'test-bar',
            name: 'bar',
            state: TaskState.INCOMPLETE,
            children: [
              {
                id: 'test-baz',
                name: 'baz',
                state: TaskState.INCOMPLETE,
                children: [],
              },
            ],
          },
          {
            id: 'test-qux',
            name: 'qux',
            state: TaskState.INCOMPLETE,
            children: [],
          },
        ],
      });
    });
  });
});

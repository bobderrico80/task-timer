import React from 'react';
import { RenderResult, render, fireEvent } from '@testing-library/react';
import TaskList from './TaskList';
import { TaskState, TaskAction } from '../../App';

describe('The <TaskList /> component', () => {
  let component: RenderResult;
  let onTaskChange: jest.Mock;
  let onTaskAction: jest.Mock;

  beforeEach(() => {
    onTaskChange = jest.fn();
    onTaskAction = jest.fn();
    component = render(
      <TaskList
        tasks={[
          { id: 'foo', name: 'Foo', state: TaskState.INCOMPLETE, children: [] },
          { id: 'bar', name: 'Bar', state: TaskState.COMPLETE, children: [] },
        ]}
        playingTaskId="foo"
        editingTaskId="bar"
        onTaskChange={onTaskChange}
        onTaskAction={onTaskAction}
      />
    );
  });

  it('renders a list item for each task in the provided array', () => {
    const list = component.getAllByRole('listitem');
    expect(list.length).toEqual(2);
  });

  it('passes playingTaskId as expected', () => {
    expect(component.getAllByRole('listitem')[0]).toHaveTextContent('Stop');
  });

  it('passes editingTaskId as expected', () => {
    expect(component.getAllByRole('listitem')[1]).toHaveTextContent('Save');
  });

  it('calls onTaskChange with updated tasks as expected', () => {
    fireEvent.click(component.getByLabelText('Foo'));
    expect(onTaskChange).toHaveBeenCalledWith({
      id: 'foo',
      name: 'Foo',
      state: TaskState.COMPLETE,
      children: [],
    });
  });

  it('calls onTaskAction with expected actions', () => {
    fireEvent.click(component.getByText('Cancel'));
    expect(onTaskAction).toHaveBeenCalledWith({
      action: TaskAction.CANCEL_EDIT,
      taskId: 'bar',
    });
  });
});

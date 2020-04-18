import React from 'react';
import {
  RenderResult,
  render,
  fireEvent,
  cleanup,
} from '@testing-library/react';
import TaskToolBar from './TaskToolBar';
import { TaskAction } from '../../App';

describe('The <TaskToolBar /> component', () => {
  let component: RenderResult;
  let onTaskAction: jest.Mock;
  let button: HTMLElement;

  beforeEach(() => {
    onTaskAction = jest.fn();
    component = render(
      <TaskToolBar
        id="test-id"
        playingTaskId={null}
        onTaskAction={onTaskAction}
      />
    );
  });

  describe('play/stop button behavior', () => {
    describe('when task is playing (playing task matches the current task)', () => {
      beforeEach(() => {
        cleanup();
        component = render(
          <TaskToolBar
            id="test-id"
            playingTaskId="test-id"
            onTaskAction={onTaskAction}
          />
        );
        button = component.getByText('Stop');
      });

      it('renders a stop button', () => {
        expect(button).toBeTruthy();
      });

      it('does not render a play button', () => {
        expect(component.queryByText('Play')).toBeNull();
      });

      it('clicking stop button calls onTaskAction with appropriate task action dispatch', () => {
        fireEvent.click(button);
        expect(onTaskAction).toHaveBeenCalledWith({
          action: TaskAction.STOP,
          taskId: 'test-id',
        });
      });
    });

    describe('when task is not playing (playing task does not match the current task)', () => {
      beforeEach(() => {
        button = component.getByText('Play');
      });

      it('renders a play button', () => {
        expect(button).toBeTruthy();
      });

      it('does not render a stop button', () => {
        expect(component.queryByText('Stop')).toBeNull();
      });

      it('clicking play button calls onTaskAction with appropriate task action dispatch', () => {
        fireEvent.click(button);
        expect(onTaskAction).toHaveBeenCalledWith({
          action: TaskAction.PLAY,
          taskId: 'test-id',
        });
      });
    });
  });

  describe('edit button behavior', () => {
    beforeEach(() => {
      button = component.getByText('Edit');
    });

    it('clicking edit button calls onTaskAction with appropriate task action dispatch', () => {
      fireEvent.click(button);
      expect(onTaskAction).toHaveBeenCalledWith({
        action: TaskAction.EDIT,
        taskId: 'test-id',
      });
    });
  });

  describe('delete button behavior', () => {
    beforeEach(() => {
      button = component.getByText('Delete');
    });

    it('clicking delete button calls onTaskAction with appropriate task action dispatch', () => {
      fireEvent.click(button);
      expect(onTaskAction).toHaveBeenCalledWith({
        action: TaskAction.DELETE,
        taskId: 'test-id',
      });
    });
  });

  describe('new subtask button behavior', () => {
    beforeEach(() => {
      button = component.getByText('New Subtask');
    });

    it('clicking new subtask button calls onTaskAction with appropriate task action dispatch', () => {
      fireEvent.click(button);
      expect(onTaskAction).toHaveBeenCalledWith({
        action: TaskAction.NEW_SUBTASK,
        taskId: 'test-id',
      });
    });
  });
});

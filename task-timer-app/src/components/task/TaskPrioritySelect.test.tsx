import React from 'react';
import { RenderResult, render, fireEvent } from '@testing-library/react';
import TaskPrioritySelect, {
  TaskPriority,
  priorityTextMap,
} from './TaskPrioritySelect';

describe('The <TaskPrioritySelect /> component', () => {
  let component: RenderResult;
  let onChange: jest.Mock;
  let select: HTMLSelectElement;

  beforeEach(() => {
    onChange = jest.fn();
  });

  describe('with default behavior', () => {
    beforeEach(() => {
      component = render(
        <TaskPrioritySelect
          taskId="test-id"
          taskPriority={TaskPriority.HIGH}
          onChange={onChange}
        />
      );
      select = component.getByLabelText('Task Priority') as HTMLSelectElement;
    });

    it('has the expected ID attribute', () => {
      expect(select).toHaveAttribute('id', 'task-priority-test-id');
    });

    it('has expected value', () => {
      expect(select).toHaveValue(TaskPriority.HIGH);
    });

    it('calls onChange with expected value on select', () => {
      fireEvent.change(select, { target: { value: TaskPriority.MEDIUM } });
      expect(onChange).toHaveBeenCalledWith(TaskPriority.MEDIUM);
    });
  });

  describe('behavior with different options', () => {
    [
      TaskPriority.NONE,
      TaskPriority.LOW,
      TaskPriority.MEDIUM,
      TaskPriority.HIGH,
    ].forEach((priority) => {
      describe(`with ${priority} priority`, () => {
        beforeEach(() => {
          component = render(
            <TaskPrioritySelect
              taskId="test-id"
              taskPriority={priority}
              onChange={onChange}
            />
          );
          select = component.getByLabelText(
            'Task Priority'
          ) as HTMLSelectElement;
        });

        it('label has expected class name', () => {
          expect(select.parentElement).toHaveClass(
            `priority-${priority.toLowerCase()}`
          );
        });

        it('selected option has expected text', () => {
          expect(select.options[select.selectedIndex]).toHaveTextContent(
            priorityTextMap[priority]
          );
        });
      });
    });
  });
});

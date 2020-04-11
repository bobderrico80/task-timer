import React from 'react';
import { render, RenderResult, fireEvent } from '@testing-library/react';
import TaskCheckbox, { TaskStatus } from './TaskCheckbox';

describe('The <TaskCheckbox /> component', () => {
  let component: RenderResult;
  let checkbox: HTMLElement;
  let onChange: jest.Mock;

  beforeEach(() => {
    onChange = jest.fn();
  });

  describe('with default behavior', () => {
    beforeEach(() => {
      component = render(
        <TaskCheckbox
          taskId="test-id"
          taskStatus={TaskStatus.NOT_STARTED}
          onChange={onChange}
        />
      );
      checkbox = component.getByLabelText('Task Complete');
    });

    it('has the expected ID attribute', () => {
      expect(checkbox).toHaveAttribute('id', 'task-checkbox-test-id');
    });

    it('is not checked', () => {
      expect(checkbox).not.toBeChecked();
    });

    it('calls onChange when checked', () => {
      fireEvent.click(checkbox);
      expect(onChange).toHaveBeenCalled();
    });
  });

  describe('with COMPLETE state', () => {
    beforeEach(() => {
      component = render(
        <TaskCheckbox
          taskId="test-id"
          taskStatus={TaskStatus.COMPLETE}
          onChange={onChange}
        />
      );
      checkbox = component.getByLabelText('Task Complete');
    });

    it('is checked', () => {
      expect(checkbox).toBeChecked();
    });
  });

  describe('with ONGOING state', () => {
    let nullCheckbox: HTMLElement | null;

    beforeEach(() => {
      component = render(
        <TaskCheckbox
          taskId="test-id"
          taskStatus={TaskStatus.ONGOING}
          onChange={onChange}
        />
      );
      nullCheckbox = component.queryByLabelText('Task Complete');
    });

    it('is not rendered', () => {
      expect(nullCheckbox).toBeNull();
    });
  });
});

import React from 'react';
import { RenderResult, render, fireEvent } from '@testing-library/react';
import TaskTags from './TaskTags';

describe('The <TaskTags /> component', () => {
  const taskTags = [
    { id: 't1', name: 'Tag 1' },
    { id: 't2', name: 'Tag 2' },
    { id: 't3', name: 'Tag 3' },
  ];

  const allTags = [
    { id: 't1', name: 'Tag 1' },
    { id: 't2', name: 'Tag 2' },
    { id: 't3', name: 'Tag 3' },
    { id: 't4', name: 'Tag 4' },
    { id: 't5', name: 'Tag 5' },
    { id: 't6', name: 'Tag 6' },
  ];
  let component: RenderResult;
  let onAddTag: jest.Mock;
  let onNewTag: jest.Mock;

  describe('initial state', () => {
    let addTagButton: HTMLElement;

    beforeEach(() => {
      onAddTag = jest.fn();
      onNewTag = jest.fn();
      component = render(
        <TaskTags
          taskId="test-id"
          taskTags={taskTags}
          allTags={allTags}
          onAddTag={onAddTag}
          onNewTag={onNewTag}
        />
      );
      addTagButton = component.getByText('Add Tag');
    });

    it('contains expected title text', () => {
      expect(component.getByText('Tags')).toBeTruthy();
    });

    it('renders each task tag in a list', () => {
      ['Tag 1', 'Tag 2', 'Tag 3'].forEach((tag) => {
        const li = component.getByText(tag);
        expect(li).toBeTruthy();
      });
    });

    it('renders an Add Tag button', () => {
      expect(addTagButton).toBeTruthy();
    });

    describe('after clicking Add Tag button', () => {
      let cancelAddTagButton: HTMLElement;
      let select: HTMLSelectElement;

      beforeEach(() => {
        fireEvent.click(addTagButton);
        select = component.getByLabelText('Select Tag') as HTMLSelectElement;
        cancelAddTagButton = component.getByText('Cancel Add Tag');
      });

      it('renders a Cancel Add Tag button', () => {
        expect(cancelAddTagButton).toBeTruthy();
      });

      it('calls onAddTag with the tag ID when a selection is made from the rendered dropdown', () => {
        fireEvent.change(select, { target: { value: 't4' } });
        expect(onAddTag).toBeCalledWith('t4');
      });

      describe('renders a dropdown with list contents that', () => {
        let options: string[];

        beforeEach(() => {
          options = [...select.options].map((option) => option.text);
        });

        it('contains the unused tags', () => {
          expect(options).toEqual(
            expect.arrayContaining(['Tag 4', 'Tag 5', 'Tag 6'])
          );
        });

        it('does not contain the task tags', () => {
          expect(options).not.toEqual(
            expect.arrayContaining(['Tag 1', 'Tag 2', 'Tag 3'])
          );
        });

        it('contains a New Tag... option as the first tag', () => {
          expect(options[0]).toEqual('New Tag...');
        });
      });

      describe('after clicking Cancel Add Tag button', () => {
        beforeEach(() => {
          fireEvent.click(cancelAddTagButton);
        });

        it('removes the dropdown', () => {
          expect(component.queryByText('Select Tag')).toBeNull();
        });

        it('removes the Cancel Add Tag button', () => {
          expect(component.queryByText('Cancel Add Tag')).toBeNull();
        });

        it('adds the Add Tag button back', () => {
          expect(component.getByText('Add Tag')).toBeTruthy();
        });
      });

      describe('after selecting New Tag... select option', () => {
        let newTagField: HTMLElement;
        let addNewTagButton: HTMLElement;
        let cancelNewTagButton: HTMLElement;

        beforeEach(() => {
          fireEvent.change(select, { target: { value: 'NEW_TAG' } });
          newTagField = component.getByLabelText('New Tag Name');
          addNewTagButton = component.getByText('Add New Tag');
          cancelNewTagButton = component.getByText('Cancel New Tag');
        });

        it('renders a New Tag input field', () => {
          expect(newTagField).toBeTruthy();
        });

        it('renders an Add New Tag button', () => {
          expect(addNewTagButton).toBeTruthy();
        });

        it('renders a Cancel New Tag button', () => {
          expect(cancelNewTagButton).toBeTruthy();
        });

        it('stores text entered into the New Tag input field', () => {
          fireEvent.change(newTagField, { target: { value: 'foo' } });
          expect(newTagField).toHaveValue('foo');
        });

        describe('after clicking Add New Tag button', () => {
          beforeEach(() => {
            fireEvent.change(newTagField, { target: { value: 'foo' } });
            fireEvent.click(addNewTagButton);
          });

          it('calls onNewTag with the new tag name', () => {
            expect(onNewTag).toHaveBeenCalledWith('foo');
          });
        });

        describe('after clicking Cancel New Tag button', () => {
          beforeEach(() => {
            fireEvent.click(cancelNewTagButton);
          });

          it('removes the Cancel New Tag button', () => {
            expect(component.queryByText('Cancel New Tag')).toBeNull();
          });

          it('removes the New Tag input field', () => {
            expect(component.queryByText('New Tag Name')).toBeNull();
          });

          it('adds back the tags dropdown', () => {
            expect(component.getByLabelText('Select Tag')).toBeTruthy();
          });
        });

        describe('after clicking Cancel Add Tag button', () => {
          beforeEach(() => {
            fireEvent.click(cancelAddTagButton);
          });

          it('removes the Cancel New Tag button', () => {
            expect(component.queryByText('Cancel New Tag')).toBeNull();
          });

          it('removes the New Tag input field', () => {
            expect(component.queryByText('New Tag Name')).toBeNull();
          });

          it('removes the Cancel Add Tag button', () => {
            expect(component.queryByText('Cancel Add Tag')).toBeNull();
          });

          it('adds the Add Tag button back', () => {
            expect(component.getByText('Add Tag')).toBeTruthy();
          });
        });
      });
    });
  });
});

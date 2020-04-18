import { deleteTasksRecursively } from './taskUtils';
import { Task, TaskState } from '../App';

describe('The `deleteTasksRecursively` function', () => {
  it('deletes a task from a flat array', () => {
    const input: Task[] = [
      { id: 'foo', name: 'Foo', state: TaskState.INCOMPLETE, children: [] },
      { id: 'bar', name: 'Bar', state: TaskState.INCOMPLETE, children: [] },
    ];

    const output: Task[] = [
      { id: 'bar', name: 'Bar', state: TaskState.INCOMPLETE, children: [] },
    ];

    expect(deleteTasksRecursively(input, 'foo')).toEqual(output);
  });

  it('deletes a task from a nested array', () => {
    const input: Task[] = [
      {
        id: 'foo',
        name: 'Foo',
        state: TaskState.INCOMPLETE,
        children: [
          { id: 'baz', name: 'Baz', state: TaskState.INCOMPLETE, children: [] },
          { id: 'qux', name: 'Qux', state: TaskState.INCOMPLETE, children: [] },
        ],
      },
      { id: 'bar', name: 'Bar', state: TaskState.INCOMPLETE, children: [] },
    ];

    const output: Task[] = [
      {
        id: 'foo',
        name: 'Foo',
        state: TaskState.INCOMPLETE,
        children: [
          { id: 'qux', name: 'Qux', state: TaskState.INCOMPLETE, children: [] },
        ],
      },
      { id: 'bar', name: 'Bar', state: TaskState.INCOMPLETE, children: [] },
    ];

    expect(deleteTasksRecursively(input, 'baz')).toEqual(output);
  });
});

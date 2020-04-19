import React, { FormEvent, useState } from 'react';
import { TaskState, Task, TaskActionDispatch, TaskAction } from '../../App';

export interface TaskEditProps {
  initialTask: Task;
  onSubmit: (updatedTask: Task) => void;
  onTaskAction: (taskActionDispatch: TaskActionDispatch) => void;
}

const TaskEdit = (props: TaskEditProps) => {
  const [currentName, setCurrentName] = useState(props.initialTask.name);
  const [ongoingTask, setOngoingTask] = useState(
    props.initialTask.state === TaskState.ONGOING
  );

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const newTaskState = ongoingTask
      ? TaskState.ONGOING
      : props.initialTask.state;
    props.onSubmit({
      ...props.initialTask,
      name: currentName,
      state: newTaskState,
    });
  };

  const handleCancelClick = (event: FormEvent) => {
    event.preventDefault();

    props.onTaskAction({
      action: TaskAction.CANCEL_EDIT,
      taskId: props.initialTask.id,
    });
  };

  const handleNameChange = (event: FormEvent<HTMLInputElement>) => {
    setCurrentName(event.currentTarget.value);
  };

  const handleOngoingTaskChange = () => {
    setOngoingTask((previousValue) => !previousValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="task-name">
        Task name
        <input
          type="text"
          value={currentName}
          onChange={handleNameChange}
          id="task-name"
        />
      </label>
      <label htmlFor="ongoing-task">
        Ongoing task?
        <input
          type="checkbox"
          id="ongoing-task"
          checked={ongoingTask}
          onChange={handleOngoingTaskChange}
        />
      </label>
      <button type="submit">Save</button>
      <button onClick={handleCancelClick}>Cancel</button>
    </form>
  );
};

export default TaskEdit;

import React, { FormEvent } from 'react';
import { Task, TaskActionDispatch, TaskState } from '../../App';
import TaskToolBar from './TaskToolBar';

export interface TaskViewProps {
  task: Task;
  playingTaskId: string | null;
  onTaskChange: (newTask: Task) => void;
  onTaskAction: (taskActionDispatch: TaskActionDispatch) => void;
}

const TaskView = (props: TaskViewProps) => {
  const renderToolBar = () => {
    return (
      <TaskToolBar
        id={props.task.id}
        playingTaskId={props.playingTaskId}
        onTaskAction={props.onTaskAction}
      />
    );
  };

  if (props.task.state === TaskState.ONGOING) {
    return (
      <>
        <span>{props.task.name}</span>
        {renderToolBar()}
      </>
    );
  }

  const id = `task-state-${props.task.id}`;

  const handleCheckboxChange = (event: FormEvent<HTMLInputElement>) => {
    const nextState = event.currentTarget.checked
      ? TaskState.COMPLETE
      : TaskState.INCOMPLETE;

    props.onTaskChange({
      ...props.task,
      state: nextState,
    });
  };

  return (
    <>
      <label htmlFor={id}>
        <input
          id={id}
          type="checkbox"
          checked={props.task.state === TaskState.COMPLETE}
          onChange={handleCheckboxChange}
        />
        {props.task.name}
      </label>
      {renderToolBar()}
    </>
  );
};

export default TaskView;

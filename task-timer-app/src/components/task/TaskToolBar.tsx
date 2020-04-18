import React from 'react';
import { TaskActionDispatch, TaskAction } from '../../App';

export interface TaskToolbarProps {
  id: string;
  playingTaskId: string | null;
  onTaskAction: (taskActionDispatch: TaskActionDispatch) => void;
}

const TaskToolBar = (props: TaskToolbarProps) => {
  const playing = props.playingTaskId === props.id;

  const actionButtonLabelMap = new Map<TaskAction, string>([
    [TaskAction.PLAY, 'Play'],
    [TaskAction.STOP, 'Stop'],
    [TaskAction.EDIT, 'Edit'],
    [TaskAction.DELETE, 'Delete'],
    [TaskAction.NEW_SUBTASK, 'New Subtask'],
  ]);

  const renderButton = (taskAction: TaskAction) => {
    return (
      <button
        onClick={() =>
          props.onTaskAction({ action: taskAction, taskId: props.id })
        }
      >
        {actionButtonLabelMap.get(taskAction)}
      </button>
    );
  };

  return (
    <div>
      {playing ? renderButton(TaskAction.STOP) : renderButton(TaskAction.PLAY)}
      {renderButton(TaskAction.EDIT)}
      {renderButton(TaskAction.DELETE)}
      {renderButton(TaskAction.NEW_SUBTASK)}
    </div>
  );
};

export default TaskToolBar;

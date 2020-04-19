import React from 'react';
import { Task, TaskActionDispatch, TaskAction } from '../../App';
import TaskEdit from './TaskEdit';
import TaskView from './TaskView';

interface TaskItemProps {
  task: Task;
  editingTaskId: string | null;
  playingTaskId: string | null;
  onTaskChange: (newTask: Task) => void;
  onTaskAction: (taskActionDispatch: TaskActionDispatch) => void;
}

const TaskItem = (props: TaskItemProps) => {
  const editing = props.task.id === props.editingTaskId;

  const handleTaskSave = (newTask: Task) => {
    props.onTaskChange(newTask);
    props.onTaskAction({
      action: TaskAction.CANCEL_EDIT,
      taskId: props.task.id,
    });
  };

  return (
    <li>
      {editing ? (
        <TaskEdit
          initialTask={props.task}
          onSubmit={handleTaskSave}
          onTaskAction={props.onTaskAction}
        />
      ) : (
        <TaskView
          task={props.task}
          playingTaskId={props.playingTaskId}
          onTaskAction={props.onTaskAction}
          onTaskChange={props.onTaskChange}
        />
      )}
    </li>
  );
};

export default TaskItem;

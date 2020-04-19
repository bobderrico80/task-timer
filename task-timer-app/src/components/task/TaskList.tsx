import React from 'react';
import { Task, TaskActionDispatch } from '../../App';
import TaskItem from './TaskItem';

export interface TaskListProps {
  tasks: Task[];
  playingTaskId: string | null;
  editingTaskId: string | null;
  onTaskChange: (newTask: Task) => void;
  onTaskAction: (taskActionDispatch: TaskActionDispatch) => void;
}

const TaskList = (props: TaskListProps) => {
  return (
    <ul>
      {props.tasks.map((task) => {
        return (
          <TaskItem
            key={task.id}
            task={task}
            playingTaskId={props.playingTaskId}
            editingTaskId={props.editingTaskId}
            onTaskChange={props.onTaskChange}
            onTaskAction={props.onTaskAction}
          />
        );
      })}
    </ul>
  );
};

export default TaskList;

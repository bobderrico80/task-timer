import React, { useState } from 'react';
import './App.css';
import { deleteTasksRecursively } from './lib/taskUtils';

export enum TaskState {
  INCOMPLETE,
  COMPLETE,
  ONGOING,
}

export enum TaskAction {
  PLAY,
  STOP,
  EDIT,
  CANCEL_EDIT,
  DELETE,
}

export interface Task {
  id: string;
  name: string;
  state: TaskState;
  children: Task[];
}

export interface TaskActionDispatch {
  action: TaskAction;
  taskId: string;
}

export const App = () => {
  const [tasks, setTasks] = useState([] as Task[]);
  const [playingTaskId, setPlayingTaskId] = useState(null as string | null);
  const [editingTaskId, setEditingTaskId] = useState(null as string | null);

  const deleteTask = (taskId: string) => {
    const nextTasks = deleteTasksRecursively(tasks, taskId);
    setTasks(nextTasks);
  };

  const handleTaskChange = (tasks: Task[]) => {
    setTasks(tasks);
  };

  const handleTaskAction = (taskActionDispatch: TaskActionDispatch) => {
    const { action, taskId } = taskActionDispatch;

    switch (action) {
      case TaskAction.PLAY:
        return setPlayingTaskId(taskId);
      case TaskAction.STOP:
        return setPlayingTaskId(null);
      case TaskAction.EDIT:
        return setEditingTaskId(taskId);
      case TaskAction.CANCEL_EDIT:
        return setEditingTaskId(null);
      case TaskAction.DELETE:
        return deleteTask(taskId);
    }
  };

  return <div className="App"></div>;
};

export default App;

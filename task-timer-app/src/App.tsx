import React, { useState } from 'react';
import uuid from 'uuid/v4';
import './App.css';
import { deleteTasksRecursively } from './lib/taskUtils';
import TaskToolBar from './components/task/TaskToolBar';
import TaskView from './components/task/TaskView';

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
  NEW_SUBTASK,
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

  // Temporary state for testing TaskView
  const [task, setTask] = useState({
    id: uuid(),
    name: 'Some task',
    state: TaskState.INCOMPLETE,
    children: [],
  } as Task);

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
      default:
    }
  };

  return (
    <div className="App">
      <TaskView
        task={task}
        playingTaskId={playingTaskId}
        onTaskAction={handleTaskAction}
        onTaskChange={setTask}
      />
    </div>
  );
};

export default App;

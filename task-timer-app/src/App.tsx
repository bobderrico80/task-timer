import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import './App.css';
import { deleteTasksRecursively } from './lib/taskUtils';
import TaskList from './components/task/TaskList';

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

const initialTasks: Task[] = [
  { id: uuid(), name: 'Buy milk', state: TaskState.INCOMPLETE, children: [] },
  {
    id: uuid(),
    name: 'Do laundry',
    state: TaskState.INCOMPLETE,
    children: [
      {
        id: uuid(),
        name: 'Wash clothes',
        state: TaskState.INCOMPLETE,
        children: [],
      },
      {
        id: uuid(),
        name: 'Put away laundry',
        state: TaskState.INCOMPLETE,
        children: [
          {
            id: uuid(),
            name: 'My laundry',
            state: TaskState.INCOMPLETE,
            children: [],
          },
          {
            id: uuid(),
            name: 'Kids laundry',
            state: TaskState.INCOMPLETE,
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: uuid(),
    name: 'Take out trash',
    state: TaskState.INCOMPLETE,
    children: [],
  },
];

export const App = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [playingTaskId, setPlayingTaskId] = useState(null as string | null);
  const [editingTaskId, setEditingTaskId] = useState(null as string | null);

  const deleteTask = (taskId: string) => {
    const nextTasks = deleteTasksRecursively(tasks, taskId);
    setTasks(nextTasks);
  };

  const handleTaskChange = (newTask: Task) => {
    const newTasks = tasks.map((task) => {
      if (task.id === newTask.id) {
        return newTask;
      }

      return task;
    });

    setTasks(newTasks);
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
      <TaskList
        tasks={tasks}
        editingTaskId={editingTaskId}
        playingTaskId={playingTaskId}
        onTaskAction={handleTaskAction}
        onTaskChange={handleTaskChange}
      />
    </div>
  );
};

export default App;

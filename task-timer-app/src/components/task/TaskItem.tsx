import React from 'react';
import { Task, TaskActionDispatch, TaskAction, TaskState } from '../../App';
import TaskEdit from './TaskEdit';
import TaskView from './TaskView';
import TaskList from './TaskList';
import { updateChildTaskStateRecursively } from '../../lib/taskUtils';

interface TaskItemProps {
  task: Task;
  editingTaskId: string | null;
  playingTaskId: string | null;
  onTaskChange: (newTask: Task) => void;
  onTaskAction: (taskActionDispatch: TaskActionDispatch) => void;
}

const TaskItem = (props: TaskItemProps) => {
  const editing = props.task.id === props.editingTaskId;

  const handleTaskChange = (newTask: Task) => {
    // If task state is changing to COMPLETE or INCOMPLETE, update all children recursively
    if (
      props.task.children.length > 0 &&
      newTask.state !== TaskState.ONGOING &&
      newTask.state !== props.task.state
    ) {
      const newChildren = updateChildTaskStateRecursively(
        props.task.children,
        newTask.state
      );

      props.onTaskChange({
        ...newTask,
        children: newChildren,
      });
    } else {
      props.onTaskChange(newTask);
    }

    if (editing) {
      props.onTaskAction({
        action: TaskAction.CANCEL_EDIT,
        taskId: props.task.id,
      });
    }
  };

  const handleChildTaskChange = (newTask: Task) => {
    const newChildren = props.task.children.map((task) => {
      if (task.id === newTask.id) {
        return newTask;
      }

      return task;
    });

    props.onTaskChange({
      ...props.task,
      children: newChildren,
    });
  };

  return (
    <li>
      {editing ? (
        <TaskEdit
          initialTask={props.task}
          onSubmit={handleTaskChange}
          onTaskAction={props.onTaskAction}
        />
      ) : (
        <TaskView
          task={props.task}
          playingTaskId={props.playingTaskId}
          onTaskAction={props.onTaskAction}
          onTaskChange={handleTaskChange}
        />
      )}
      {props.task.children.length > 0 && (
        <TaskList
          tasks={props.task.children}
          editingTaskId={props.editingTaskId}
          playingTaskId={props.playingTaskId}
          onTaskChange={handleChildTaskChange}
          onTaskAction={props.onTaskAction}
        />
      )}
    </li>
  );
};

export default TaskItem;

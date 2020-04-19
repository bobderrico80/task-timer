import { Task, TaskState } from '../App';

export const deleteTasksRecursively = (
  tasks: Task[],
  taskIdToDelete: string
): Task[] => {
  return tasks.reduce((previousTasks: Task[], currentTask: Task) => {
    if (currentTask.id === taskIdToDelete) {
      return previousTasks;
    }

    let nextTask;
    if (currentTask.children.length > 0) {
      nextTask = {
        ...currentTask,
        children: deleteTasksRecursively(currentTask.children, taskIdToDelete),
      };
    } else {
      nextTask = currentTask;
    }

    return [...previousTasks, nextTask];
  }, []);
};

export const updateChildTaskStateRecursively = (
  tasks: Task[],
  taskState: TaskState
): Task[] => {
  return tasks.map((task) => {
    if (task.children.length) {
      const newChildren = updateChildTaskStateRecursively(
        task.children,
        taskState
      );
      return {
        ...task,
        state: taskState,
        children: newChildren,
      };
    }

    return {
      ...task,
      state: taskState,
    };
  });
};

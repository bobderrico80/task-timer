import { Task } from '../App';

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

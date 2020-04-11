import React from "react";

export enum TaskStatus {
  NOT_STARTED,
  COMPLETE,
  ONGOING,
}

export interface TaskCheckboxProps {
  taskId: string;
  taskStatus: TaskStatus;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
}

const TaskCheckbox = ({ taskId, taskStatus, onChange }: TaskCheckboxProps) => {
  if (taskStatus === TaskStatus.ONGOING) {
    return null;
  }

  const idAttribute = `task-checkbox-${taskId}`;
  return (
    <label htmlFor={idAttribute}>
      Task Complete
      <input
        type="checkbox"
        id={idAttribute}
        checked={taskStatus === TaskStatus.COMPLETE}
        onChange={onChange}
      />
    </label>
  );
};

export default TaskCheckbox;

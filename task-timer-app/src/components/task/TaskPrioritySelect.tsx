import React, { FormEvent } from 'react';

export enum TaskPriority {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
  NONE = 'NONE',
}

export interface TaskPrioritySelectProps {
  taskId: string;
  taskPriority: TaskPriority;
  onChange: (newPriority: string) => void;
}

export const priorityTextMap: {
  [key in TaskPriority]: string;
} = {
  [TaskPriority.HIGH]: 'High',
  [TaskPriority.MEDIUM]: 'Medium',
  [TaskPriority.LOW]: 'Low',
  [TaskPriority.NONE]: 'None',
};

const TaskPrioritySelect = ({
  taskId,
  taskPriority,
  onChange,
}: TaskPrioritySelectProps) => {
  const idAttribute = `task-priority-${taskId}`;

  const handleChange = (event: FormEvent<HTMLSelectElement>) => {
    onChange(event.currentTarget.value);
  };

  return (
    <label
      htmlFor={idAttribute}
      className={`priority-${priorityTextMap[taskPriority].toLowerCase()}`}
    >
      Task Priority
      <select value={taskPriority} id={idAttribute} onChange={handleChange}>
        {Object.entries(priorityTextMap).map(([priority, text]) => {
          return (
            <option value={priority} key={priority}>
              {text}
            </option>
          );
        })}
      </select>
    </label>
  );
};

export default TaskPrioritySelect;

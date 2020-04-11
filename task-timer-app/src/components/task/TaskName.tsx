import React, { useState, FormEvent } from 'react';

export interface TaskNameProps {
  taskId: string;
  name: string;
  onChange: (value: string) => void;
}

const TaskName = ({ taskId, name, onChange }: TaskNameProps) => {
  const idAttribute = `task-name-${taskId}`;

  const [editing, setEditing] = useState(false);

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    onChange(event.currentTarget.value);
  };

  const handleBlur = () => {
    setEditing(false);
  };

  const handleClick = () => {
    setEditing(true);
  };

  if (editing) {
    return (
      <label htmlFor={idAttribute}>
        Task Name
        <input
          type="text"
          id={idAttribute}
          value={name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </label>
    );
  }

  return (
    <button onClick={handleClick} aria-label="Edit task name">
      <div>{name}</div>
    </button>
  );
};

export default TaskName;

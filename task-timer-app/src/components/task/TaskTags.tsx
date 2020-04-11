import React, { useState, FormEvent, SyntheticEvent } from 'react';

export interface Tag {
  id: string;
  name: string;
}

export interface TaskTagsProps {
  taskId: string;
  taskTags: Tag[];
  allTags: Tag[];
  onAddTag: (tagId: string) => void;
  onNewTag: (tagName: string) => void;
}

const NEW_TAG_INDICATOR = 'NEW_TAG';

const TaskTags = ({
  taskTags,
  taskId,
  allTags,
  onAddTag,
  onNewTag,
}: TaskTagsProps) => {
  const addTagIdAttribute = `task-add-tag-${taskId}`;
  const newTagIdAttribute = `task-new-tag-${taskId}`;
  const taskTagIds = taskTags.map((tag) => tag.id);
  const unusedTags = allTags.filter((tag) => !taskTagIds.includes(tag.id));

  const [addTagOpen, setAddTagOpen] = useState(false);
  const [newTagOpen, setNewTagOpen] = useState(false);
  const [newTagName, setNewTagName] = useState('');

  const onFormSubmit = (event: SyntheticEvent) => event.preventDefault();

  const handleTagSelect = (event: FormEvent<HTMLSelectElement>) => {
    const { value } = event.currentTarget;

    if (value === NEW_TAG_INDICATOR) {
      setNewTagOpen(true);
      return;
    }

    onAddTag(value);
  };

  const handleNewTagInputChange = (event: FormEvent<HTMLInputElement>) => {
    setNewTagName(event.currentTarget.value);
  };

  const handleAddTagClick = () => {
    setAddTagOpen(true);
  };

  const handleAddNewTagClick = () => {
    onNewTag(newTagName);
  };

  const handleCancelAddTagClick = () => {
    setAddTagOpen(false);
    setNewTagOpen(false);
  };

  const handleCancelNewTagClick = () => {
    setNewTagOpen(false);
  };

  return (
    <div>
      <p>Tags</p>
      <ul>
        {taskTags.map((tag) => {
          return <li key={tag.id}>{tag.name}</li>;
        })}
        <li>
          {addTagOpen ? (
            <form onSubmit={onFormSubmit}>
              {newTagOpen ? (
                <>
                  <label htmlFor={newTagIdAttribute}>
                    New Tag Name
                    <input
                      type="text"
                      id={newTagIdAttribute}
                      value={newTagName}
                      onChange={handleNewTagInputChange}
                    />
                  </label>
                  <button onClick={handleAddNewTagClick}>Add New Tag</button>
                  <button onClick={handleCancelNewTagClick}>
                    Cancel New Tag
                  </button>
                </>
              ) : (
                <label htmlFor={addTagIdAttribute}>
                  Select Tag
                  <select onChange={handleTagSelect}>
                    <option value={NEW_TAG_INDICATOR}>New Tag...</option>
                    {unusedTags.map((tag) => {
                      return (
                        <option key={tag.id} value={tag.id}>
                          {tag.name}
                        </option>
                      );
                    })}
                  </select>
                </label>
              )}
              <button onClick={handleCancelAddTagClick}>Cancel Add Tag</button>
            </form>
          ) : (
            <>
              <button onClick={handleAddTagClick}>Add Tag</button>
            </>
          )}
        </li>
      </ul>
    </div>
  );
};

export default TaskTags;

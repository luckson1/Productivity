import React from 'react'

function CreateTask() {
  return (
    <div class="create-new-task-block" id="create-new-task-block">
    <strong>New Task</strong>
    <span class="form-row">
        <label class="form-row-label" for="task-name">Task</label>
        <input class="form-row-input" type="text" name="task-name" id="task-name" placeholder='Tittle of the Task'/>
    </span>
    <span class="form-row">
        <label class="form-row-label" for="task-name">Description</label>
        <textarea class="form-row-input" name="task-description" id="task-description" cols="70" rows="10" placeholder='Describe the Task......'></textarea>
    </span>
    <span class="form-row">
        <label class="form-row-label" for="task-name">Status</label>
        <select class="form-row-input" name="task-status" id="task-status">
            <option value="todo">To Do</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
        </select>
    </span>
    <span class="form-row-buttons">
        <button id="edit-button" onclick="editTask()">Edit</button>
        <button id="save-button" onclick="saveTask()">Save</button>
        <button id="cancel-button" onclick="createTask()">Cancel</button>
    </span>
</div>
  )
}

export default CreateTask
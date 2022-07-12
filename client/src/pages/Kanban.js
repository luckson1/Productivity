import React from 'react'
import {MdDeleteForever,MdEdit,MdAdd} from "react-icons/md"

export default function Kanban() {
    return (
        <div class="container">
            <div class="kanban-heading">
                <strong class="kanban-heading-text">Kanban Board</strong>
            </div>
            <div class="kanban-board">
                <div class="kanban-block" id="todo" ondrop="drop(event)" ondragover="allowDrop(event)">
                    <strong>To Do</strong>
                    <div class="task-button-block">
                        <button id="task-button" onclick="createTask()"> <MdAdd size="15px"/> New task</button>
                    </div>
                    <div class="task" id="task1" draggable="true" ondragstart="drag(event)">
                        <span>Task 1</span>
                        <div className='handling-buttons'>
                            <button className= "details-button">Details</button>
                       <MdDeleteForever size="20px" color='red' />
                       <MdEdit size="20px" color='orange'/>

                        </div>
                    </div>
                    <div class="task" id="task2" draggable="true" ondragstart="drag(event)">
                        <span>Task 2</span>
                        <div className='handling-buttons'>
                            <button className= "details-button">Details</button>
                       <MdDeleteForever size="20px" color='red' />
                       <MdEdit size="20px" color='orange'/>

                        </div>
                    </div>
                    <div class="task" id="task3" draggable="true" ondragstart="drag(event)">
                        <span>Task 3</span>
                        <div className='handling-buttons'>
                            <button className= "details-button">Details</button>
                       <MdDeleteForever size="20px" color='red' />
                       <MdEdit size="20px" color='orange'/>

                        </div>
                    </div>
                    <div class="task" id="task4" draggable="true" ondragstart="drag(event)">
                        <span>Task 4</span>
                        <div className='handling-buttons'>
                            <button className= "details-button">Details</button>
                       <MdDeleteForever size="20px" color='red' />
                       <MdEdit size="20px" color='orange'/>

                        </div>
                    </div>
                    <div class="task" id="task5" draggable="true" ondragstart="drag(event)">
                        <span>Task 5</span>
                        <div className='handling-buttons'>
                            <button className= "details-button">Details</button>
                       <MdDeleteForever size="20px" color='red' />
                       <MdEdit size="20px" color='orange'/>

                        </div>
                    </div>
                    <div class="task" id="task6" draggable="true" ondragstart="drag(event)">
                        <span>Task 6</span>
                        <div className='handling-buttons'>
                            <button className= "details-button">Details</button>
                       <MdDeleteForever size="20px" color='red' />
                       <MdEdit size="20px" color='orange'/>

                        </div>
                    </div>
                </div>
                <div class="kanban-block" id="inprogress" ondrop="drop(event)" ondragover="allowDrop(event)">
                    <strong>In Progress</strong>
                </div>
                <div class="kanban-block" id="done" ondrop="drop(event)" ondragover="allowDrop(event)">
                    <strong>Done</strong>
                </div>
            </div>
        </div>
    )
}

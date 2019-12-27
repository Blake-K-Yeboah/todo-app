import React from 'react'

// Import Store
import appStore from '../../store';

// Import Observer
import { observer } from 'mobx-react';

let TodoControls = () => {

    // Open Modal Function
    const openTodoModal = () => {
        appStore.toggleTodoModalStatus();
    }

    const openConfirmModal = () => {
        if (!document.querySelector('.clear-btn').classList.contains('disabled')) {
            appStore.toggleConfirmModalStatus();
        } else {
            alert('Button is disabled')
        }
    }

    return (
        <div className="todo-controls">

            <button className="control-btn" onClick={openTodoModal.bind(this)}>Add To-Do</button>

            <button className={`control-btn clear-btn ${!appStore.todos || appStore.todos.length === 0 ? 'disabled' : ''}`} onClick={openConfirmModal.bind(this)}> Clear To-Dos </button>

        </div>
    )
}

// Set component to observer so it has access to mobx store
TodoControls = observer(TodoControls);

// Export The Component
export default TodoControls;

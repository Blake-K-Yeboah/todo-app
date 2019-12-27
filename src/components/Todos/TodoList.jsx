import React from 'react'

// Import store
import appStore from '../../store';

// Import Todo Item To display todos
import TodoItem from './TodoItem.jsx';

// Import Observer
import { observer } from 'mobx-react';

let TodoList = () => {

    // Store todos
    const todos = appStore.todos ? JSON.parse(JSON.stringify(appStore.todos)) : null;

    return (
        <ul className="todo-list">

            {
                todos && todos.length === 0 ? <p className="no-todos">You have no todos.</p> :
                    todos && todos.length > 0 ? todos.map(todo => {
                        return (
                            <TodoItem title={todo.title} completed={todo.completed} id={todo.id} key={todo.key} />
                        )
                    }) : <div key="loading" className="spinner"></div>
            }

        </ul>
    )
}

// Set component to observer so it has access to mobx store
TodoList = observer(TodoList);

// Export The Component
export default TodoList;

import React from 'react'

// Import Store
import appStore from '../../store';

// Import Observer
import { observer } from 'mobx-react';

// Import PropTypes 
import PropTypes from 'prop-types';

let TodoItem = props => {

    const delHandler = () => {
        appStore.delTodo(props.id);
    }

    const checkHandler = () => {
        let checkbox = document.querySelector(`#checkbox-${props.id}`);

        appStore.toggleCompleted(props.id, checkbox.checked);
    }

    return (
        <li className="todo">

            <h3 className="title" onClick={delHandler.bind(this)}>{props.title}</h3>

            <label className="checkbox-container">

                <input type="checkbox" defaultChecked={props.completed} id={`checkbox-${props.id}`} className="checkbox" onChange={checkHandler.bind(this)} />

                <span className="checkmark"></span>

            </label>

        </li>
    )
}

TodoItem.propTypes = {
    title: PropTypes.string,
    completed: PropTypes.bool,
    id: PropTypes.string
}
// Set component to observer so it has access to mobx store
TodoItem = observer(TodoItem);

// Export The Component
export default TodoItem;

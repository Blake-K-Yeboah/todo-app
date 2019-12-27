import React from 'react'

// Import Animation Stuff
import { useSpring, animated } from 'react-spring';

// Import Store
import appStore from '../../store';

// Import Observer
import { observer } from 'mobx-react';

let AddTodo = () => {

    // Define Props for Animation
    const props = useSpring({
        config: { duration: 250 },
        opacity: appStore.todoModalStatus ? 1 : 0,
        top: appStore.todoModalStatus ? '50%' : '-50%',
    });

    // Handle Form Submission
    const submitHandler = (e) => {

        // Prevent Form From Submitting Anywhere
        e.preventDefault();

        // Define The Todo Input
        let todo = document.querySelector('#todo-input');

        // Validation
        if (todo.value === '') {

            todo.classList.add('error');

            todo.setAttribute('placeholder', 'Please enter a to-do');

        } else if (!isNaN(todo.value.charAt(0))) {

            todo.classList.add('error');

            todo.value = '';

            todo.setAttribute('placeholder', 'To-do cannot start with a number');

        } else if (todo.value.length < 4) {

            todo.classList.add('error');

            todo.value = '';

            todo.setAttribute('placeholder', 'To-do Must be at least 4 letters long');

        } else {

            // Add Todo To Database
            appStore.addTodo(todo.value);

            // Remove Value From Input
            todo.value = '';
        }
    }

    // Close Modal Function
    const closeModal = () => {
        appStore.toggleTodoModalStatus();
    }

    return (
        <animated.div className="add-todo" style={props}>

            <span className="close-icon" onClick={closeModal.bind(this)}>&times;</span>

            <h1 className="title"> Add a To-Do </h1>

            <div className="divider"></div>

            <p className="sub-text">Fill out the following form</p>

            <form className="modal-form" onSubmit={(e) => submitHandler(e)}>

                <input type="text" placeholder="Name: " id="todo-input" className="todo-input" autoComplete="off" />

                <button type="submit" className="add-btn">Add <span>+</span></button>

            </form>

        </animated.div>
    )
}

// Set component to observer so it has access to mobx store
AddTodo = observer(AddTodo);

// Export The Component
export default AddTodo;

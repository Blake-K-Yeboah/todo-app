import React, { useEffect } from 'react';

// Import appStore
import appStore from '../../store';

// Import Page Components
import Account from '../Account';

import TodoList from '../Todos/TodoList';

import TodoControls from '../Todos/TodoControls';

import PaginationControls from '../Todos/PaginationControls';

import AddTodo from '../Forms/AddTodo';

import Overlay from '../Overlay';

import Confirmation from '../Confirmation';

// Import Animation Stuff
import { useSpring, animated } from 'react-spring';

// Import Observer
import { observer } from 'mobx-react';

let TodoPage = () => {

    // Define props for animation
    const props = useSpring({ config: { duration: 1000 }, opacity: 1, from: { opacity: 0 } });

    // Redirect people who arent logged in
    useEffect(() => {
        if (appStore.isLoggedIn === 'false') {
            window.location = '/login';
        }

        // Fetch Todos From database
        appStore.getTodos();
    }, []);

    return (

        <animated.div style={sessionStorage.getItem('todoAnimate') === 'true' ? props : {}} className="todoPage">

            <Confirmation />
            
            <AddTodo />

            <Overlay />

            <div className="container">

                <Account admin={true} todos={false} />

                <div className="todo-content">

                    <h1 className="header">To-dos</h1>

                    <div className="divider"></div>

                    <TodoList />

                    <PaginationControls />

                    <TodoControls />

                </div>

            </div>

        </animated.div>
    )
}

// Set component to observer so it has access to mobx store
TodoPage = observer(TodoPage);

// Export The Component
export default TodoPage;
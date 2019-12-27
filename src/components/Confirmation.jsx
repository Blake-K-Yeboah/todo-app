import React from 'react'

// Import Animation Stuff
import { useSpring, animated } from 'react-spring';

// Import Store
import appStore from '../store';

// Import Observer
import { observer } from 'mobx-react';

let Confirmation = () => {

    // Define Props for Animation
    const props = useSpring({
        config: { duration: 250 },
        opacity: appStore.confirmModalStatus ? 1 : 0,
        top: appStore.confirmModalStatus ? '50%' : '150%',
    });

    // Close Modal Function
    const closeModal = () => {
        appStore.toggleConfirmModalStatus();
    }

    const confirmHandler = () => {
        appStore.clearAllTodos();
    }
    return (
        <animated.div className="confirmation" style={props}>

            <span className="close-icon" onClick={closeModal.bind(this)}>&times;</span>

            <h1 className="title"> Clear All Your To-Dos </h1>

            <div className="divider"></div>

            <p className="sub-text">Are you sure you want to delete all of your todos?</p>

            <div className="btn-group">

                <button className="confirm-btn" onClick={confirmHandler.bind(this)}>Yes</button>

                <button className="cancel" onClick={closeModal.bind(this)}>No</button>

            </div>

        </animated.div>
    )
}

// Set component to observer so it has access to mobx store
Confirmation = observer(Confirmation);

// Export The Component
export default Confirmation;


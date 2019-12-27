import React from 'react'

// Import Store
import appStore from '../store';

// Import Observer from mobx
import { observer } from 'mobx-react';

// Import Authentication from firebase config
import { auth } from '../config/fire';

// Import NavLink from react-router
import { NavLink } from 'react-router-dom';

// Import PropTypes 
import PropTypes from 'prop-types';

let Account = props => {

    // Handle Sign Out
    const signOutHandler = () => {

        // Sign user out
        auth.signOut().then(() => {

            // Succesfully signs user out

            // Change Session Variables
            sessionStorage.clear();

            sessionStorage.setItem('isLoggedIn', 'false');

            sessionStorage.setItem('todoAnimate', 'true');

            // Redirect To Login Page
            window.location = '/login';

        }).catch((err) => {

            // Sign Out Failed
            alert('There was an error while signing you out. Try Again Later.')

        });

    }

    return (
        <div className="account-section">

            <div className="head">

                <h2>My Account</h2>

                <div className="user">

                    <img src="https://image.flaticon.com/icons/png/512/17/17797.png" alt="User Icon" className="user-img" />

                    <span className="user-email">{appStore.userEmail}</span>

                    <p className="user-id">ID: {appStore.userID}</p>

                </div>

            </div>

            {/* Only Show Admin Panel Link if its myself*/}

            {appStore.userID === 'dMPyiPbKLLYXybNm08Ft5zxzpVk2' && props.admin
                ? <p className="user-admin">

                    <NavLink to="/admin" className="admin-link">Admin Panel</NavLink>

                </p>
                : ''}


            {/* Only Show Todos Link if props.todos is true*/}

            {props.todos
                ? <p className="user-admin">

                    <NavLink to="/todos" className="admin-link">Todos</NavLink>

                </p>
                : ''}

            <ul className="user-actions">

                <li key="sign-out" className="user-action">

                    <button className="action-btn" onClick={signOutHandler}>Sign Out</button>

                </li>

            </ul>

        </div>
    )
}

// Set Prop Types
Account.propTypes = {
    todos: PropTypes.bool,
    account: PropTypes.bool
}

// Set component to observer so it has access to mobx store
Account = observer(Account);

// Export the component
export default Account;

import React from 'react'

// Import NavLink from react router 
import { NavLink } from 'react-router-dom';

// Import Authentication from firebase config
import { auth } from '../../config/fire';

// Import Animation Stuff from react-spring
import { useSpring, animated } from 'react-spring';

const Login = () => {

    // Login Handler
    const loginHandler = (e) => {

        // Prevent Form From Redirecting right away
        e.preventDefault();

        // Define input variables
        let email = document.querySelector('#email'),
            password = document.querySelector('#password');

        // Check Their values and show relevant errors
        if (email.value === '') {
            email.classList.add('error');
            email.setAttribute('placeholder', 'Please fill in this field');
        }

        if (password.value === '') {
            password.classList.add('error');
            password.setAttribute('placeholder', 'Please fill in this field');
        }

        if (password.value !== '' && email.value !== '') {

            // Sign User in
            auth.signInWithEmailAndPassword(email.value, password.value)
                .then((res) => {

                    // Sign in Successful

                    // Set User Session
                    sessionStorage.setItem('user-email', res.user.email);
                    sessionStorage.setItem('user-id', res.user.uid);

                    // Set Logged In Status
                    sessionStorage.setItem('isLoggedIn', 'true');

                    // Set Todo Animation status 
                    sessionStorage.setItem('todoAnimate', 'true')

                    // Redirect To /todos
                    window.location = './todos';

                })
                .catch((err) => {

                    // Sign In Failed

                    // Add error class to password input
                    password.classList.add('error');

                    // Get Rid Of Password Entered
                    password.value = '';

                    // Set Password Placeholder
                    password.setAttribute('placeholder', 'Wrong Password');

                    // Unfocus password input
                    password.blur();
                })
        }
    }

    // Animation Props For Inputs and Submit Button
    const props = useSpring({ config: { duration: 1000 }, opacity: 1, from: { opacity: 0 }, delay: 250 });
    const props2 = useSpring({ config: { duration: 1000 }, opacity: 1, from: { opacity: 0 }, delay: 1000 });
    const props3 = useSpring({ config: { duration: 1000 }, opacity: 1, from: { opacity: 0 }, delay: 2000 });

    return (
        <div className="login">

            <h1 className="title">Login</h1>

            <div className="divider"></div>

            <p className="sub-text">Fill out the following form to login.</p>

            <form className="form" autoComplete="off" onSubmit={(e) => { loginHandler(e) }}>

                <animated.div style={props} className="form-group">

                    <input type="email" name="email" className="input" id="email" placeholder="Email: " />

                </animated.div>

                <animated.div style={props2} className="form-group">

                    <input type="password" name="password" className="input" id="password" placeholder="Password: " />

                </animated.div>

                <animated.div style={props3} className="form-group">

                    <button type="submit" className="submit-btn">Login</button>

                </animated.div>

            </form>

            <NavLink to="/" className="link">Create an account</NavLink>

        </div>
    )
}

// Export The Component
export default Login;

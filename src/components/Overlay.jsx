import React from 'react';

// Import Animation Stuff
import { useSpring, animated } from 'react-spring';

// Import Store
import appStore from '../store';

// Import Observer
import { observer } from 'mobx-react';


let Overlay = () => {

    // Define props for animation
    const props = useSpring({
        config: { duration: 500 },
        opacity: appStore.todoModalStatus ||  appStore.confirmModalStatus ? 0.75 : 0,
        left: appStore.todoModalStatus || appStore.confirmModalStatus ? 0 : -3000
    });

    return (
        <animated.div style={props} className="overlay"></animated.div>
    )
}

// Set component to observer so it has access to mobx store
Overlay = observer(Overlay);

// Export The Component
export default Overlay;

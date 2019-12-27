import React from 'react';

// Import Store
import appStore from '../../store';

// Import Observer
import { observer } from 'mobx-react';

let PaginationControls = () => {

    // Define Total Amount of Pages
    let totalPages = appStore.pageArr ? appStore.pageArr.length : null;

    // Define Next Active Button
    let nextActiveBtn = appStore.activeBtn + 1;

    // Define Previous Active Button
    let prevActiveBtn = appStore.activeBtn - 1;

    // Handle Pagination Button Clicks
    const btnHandler = (variant, num) => {

        // Different Functions Based on the variant 
        switch (variant) {

            // Next Btn was clicked
            case 'next':

                // Set Todo Animate to false so it doesnt animate when you refresh page to render new todos
                sessionStorage.setItem('todoAnimate', 'false')

                // Change Active Pages store action
                appStore.changeActivePages(nextActiveBtn)

                break;

            // Prev Btn was clicked
            case 'prev':

                // Set Todo Animate to false so it doesnt animate when you refresh page to render new todos
                sessionStorage.setItem('todoAnimate', 'false')

                // Change Active Pages store action
                appStore.changeActivePages(prevActiveBtn)

                break;

            // A disabled btn was clicked
            case 'disabled':

                // Alert Button Is Disabled
                alert('Button is disabled');
                break;

            // An Active btn was clicked
            case 'active':

                // Alert That Page Is already active
                alert('That page is already active');
                break;

            // Default case A num btn thats not active was clicked)
            default:

                // Set Todo Animate to false so it doesnt animate when you refresh page to render new todos
                sessionStorage.setItem('todoAnimate', 'false')

                // Change Active Pages store action
                appStore.changeActivePages(num)

        }
    }

    return (
        <div className="pagination-controls" style={{ width: appStore.pageArr ? `${(appStore.pageArr[appStore.pageArr.length - 1] * 40) + 50}px` : `125px` }}>

            <span className={`arrow ${appStore.activeBtn === 1 ? 'disabled' : ''}`} onClick={appStore.activeBtn !== 1 ? btnHandler.bind(this, 'prev') : btnHandler.bind(this, 'disabled')}>&lt;</span>

            <ul className="p-btns">

                {appStore.pageArr ? appStore.pageArr.map(page => {
                    return <li className={`p-btn ${appStore.activeBtn === page ? 'active' : ''}`} key={page} onClick={appStore.activeBtn !== page ? btnHandler.bind(this, '', page) : btnHandler.bind(this, 'active')}>{page}</li>
                }) : ''}

            </ul>

            <span className={`arrow ${appStore.activeBtn === totalPages ? 'disabled' : ''}`} onClick={appStore.activeBtn !== totalPages ? btnHandler.bind(this, 'next') : btnHandler.bind(this, 'disabled')}>&gt;</span>

        </div>
    )
}

// Set component to observer so it has access to mobx store
PaginationControls = observer(PaginationControls);

// Export the component
export default PaginationControls;

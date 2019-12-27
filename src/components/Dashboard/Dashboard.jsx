import React, { useEffect } from 'react';

// Import Store
import appStore from '../../store';

// Import Observer
import { observer } from 'mobx-react';

// Import Animation Stuff
import { useSpring, animated } from 'react-spring';

// Import Page Components
import Stat from './Stat';
import Grid from './Grid';
import DataChart from './DataChart';

let Dashboard = () => {

    useEffect(() => {
        // Get User Count From Database
        appStore.getUserCount();

        // Fetch Todos From database
        appStore.getTodos();
    }, []);

    // Define props for animation
    const props = useSpring({ config: { duration: 1000 }, opacity: 1, from: { opacity: 0 } });

    // Define Options for chart
    const options = {
        chart: {
            id: "basic-bar"
        },
        xaxis: {
            categories: ["Total Todos", "Total Users", "Your Todos"]
        },
        fill: {
            colors: ['#E09909']
        },
        dataLabels: {
            style: {
                colors: ['#FFF']
            }
        },
        title: {
            text: 'Todo App Data',
            align: 'center',
            margin: 5,
            offsetX: 0,
            offsetY: 0,
            floating: false,
            style: {
                fontSize: '20px',
                color: '#242424'
            },
        }
    }

    // Define Series for chart
    const series = [{ name: 'Amount', data: [appStore.todosCount, appStore.userCount, appStore.allTodoKeys ? appStore.allTodoKeys.length : 0] }];

    return (
        <animated.div style={props} className="dashboard">

            <h1 className="title">Dashboard</h1>

            <div className="divider"></div>

            <Grid>

                <Stat name="Total Todos" value={appStore.todosCount ? appStore.todosCount.toString() : '...'} />

                <Stat name="Total Users" value={appStore.userCount ? appStore.userCount.toString() : '...'} />

                <Stat name="Your Todos" value={appStore.allTodoKeys ? appStore.allTodoKeys.length.toString() : '...'} />

            </Grid>

            <br /><br />

            <DataChart options={options} series={series} />

        </animated.div>
    )
}

// Set component to observer so it has access to mobx store
Dashboard = observer(Dashboard);

// Export The Component
export default Dashboard;

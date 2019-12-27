import React from 'react';

// Import Chart From React ApexCharts
import Chart from "react-apexcharts";

// Import PropTypes
import PropTypes from 'prop-types';

const DataChart = props => {
    return (
        <Chart
            options={props.options}
            series={props.series}
            type="bar"
            width="90%"
            height="400px"
            style={{ position: 'relative', left: '5%' }}
        />
    )
}

DataChart.propTypes = {
    options: PropTypes.object.isRequired,
    series: PropTypes.array.isRequired
}
export default DataChart;

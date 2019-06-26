import LineChart from 'react-linechart'
import React from 'react'
import '../node_modules/react-linechart/dist/styles.css';


const LineGraph = (props) => {

    var points = []

    props.filterchartdetails && props.filterchartdetails.map((item) => {
        let xyaxis = {x : item.x_axis, y: props.isdisplayfahrenvalue ? item.y_axis_f : item.y_axis_c}
        points.push(xyaxis)
    })

    if (points){
 
    const data = [
        {									
            color: "steelblue", 
            points: points
        }
    ];
    return (
        <div>
            <div className="App">
                <LineChart 
                    width={600}
                    height={400}
                    data={data}
                    tooltipClass = {"svg-line-chart-tooltip"}
                    pointClass = {"svg-line-chart-point"}
                    labelClass = {"svg-line-chart-label"}
                    xLabel = {"Time(24 Hrs Format)"}
                    yLabel = {props.isdisplayfahrenvalue ? "Fahrenheit" : "Celsius"}
                />
            </div>				
        </div>
    );
    } else {
        return (null)
    }

}

export default LineGraph
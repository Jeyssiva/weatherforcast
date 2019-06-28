import React from "react";
import { Chart } from "react-google-charts";

const Temperature_Chart = (props) => {

    var points = []

    points.push(['Time', props.isdisplayfahrenvalue ? 'Fahrenheit' : 'Celsius'])
    props.filterchartdetails && props.filterchartdetails.map((item) => {
        //let xyaxis = {x : new Date(item.x_axis), y: props.isdisplayfahrenvalue ? item.y_axis_f : item.y_axis_c}
        let xyaxis = [item.x_axis , props.isdisplayfahrenvalue ? item.y_axis_f : item.y_axis_c]
        points.push(xyaxis)
    })

    const options = {
                // title: 'Company Performance',
                // hAxis: { ticks : [5] },
                vAxis: undefined,
                chartArea: { width: '90%', height: '50%' },
                legend : "none",
                colors : ["#D4AF37"],
                width : '100%'
                //lineWidth: 25
    }

    if (points){
      return (
          <div id="temperature_chart">
                <Chart
                // width={'100%'}
                chartType="AreaChart"
                data={
                    points
                }
                options={options}
                legendToggle = {true} >
                </Chart>
        </div>
      )
    } else {
        return (null)
    }
}

export default Temperature_Chart
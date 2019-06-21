import React, { useState } from 'react'
import ForeCast from './forecast'

const ForeCastList = (props) => {

    let forecastdetails = props.filterweatherdata && props.filterweatherdata.map((item) => {

        return (<ForeCast key = {"key_" + item[0]} 
                uniquecode = {item[0]}
                dayofgivendate={item[1]} 
                iconpath = {item[4]}
                tempvalue = {item[2]}
                showforecastperday = {props.showforecastperday}></ForeCast>)
    })

    console.log(props.filterweatherdata)

    return (
        <div id ={"forecastlist"} className = {"divforecastlist"}>
            <div className = {"divforecastsublist"}>
                {forecastdetails}
            </div>
            </div>
    )
}

export default ForeCastList

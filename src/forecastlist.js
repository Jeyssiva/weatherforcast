import React, { useState } from 'react'
import ForeCast from './forecast'

const ForeCastList = (props) => {

    let forecastdetails = props.filterweatherdata && props.filterweatherdata.map((item) => {
        return (<ForeCast key = {"key_" + item.id} 
                uniquecode = {item.id}
                dayofgivendate={item.halfdays} 
                iconpath = {item.iconpath}
                fahrenvalue = {item.fahrenvalue}
                showforecastperday = {props.showforecastperday}
                celsiusvalue = {item.celsiusvalue}
                isshowfahren = {item.isshowfahren}></ForeCast>)
    })
    return (
        <div id ={"forecastlist"} className = {"divforecastlist"}>
            <div className = {"divforecastsublist"}>
                {forecastdetails}
            </div>
            </div>
    )
}

export default ForeCastList

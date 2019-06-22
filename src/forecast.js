import React, { useState } from 'react'
let classnames = require('classnames')

const ForeCast = (props) => {
    var wholevalue
    var digitvalue

    if(props.isshowfahren){
        wholevalue = props.fahrenvalue.toString().substr(0,2)
        digitvalue = props.fahrenvalue.toString().substr(3,2)
    } else {
        wholevalue = props.celsiusvalue.toString().substr(0,2)
        digitvalue = props.celsiusvalue.toString().substr(3,2)
    }

    let clswholedigitfvalue  =  classnames ({'divinline' : props.isshowfahren},
                            {'displaynone' : !props.isshowfahren})

    let clswholedigitcvalue = classnames ({'divinline' : !props.isshowfahren},
                            {'displaynone' : props.isshowfahren})

    
    const onWeatherClick = event => {
        let idvalue = event.target.id.split('_')[1]

        props.showforecastperday(idvalue)
        console.log(idvalue);       
	}

    return (
        <div className={"divsingleboxeather"} id = {"div_"+props.uniquecode} onClick = {onWeatherClick}>
            <div id = {"ddiv_"+props.uniquecode} >{props.dayofgivendate}
            </div>
            <div id = {"imgdiv_"+ props.uniquecode} className = {"divimg"}>
                <img className = {"imgicon"} id = {"img_"+props.uniquecode}
                alt={"Cloudy"} src={props.iconpath}></img>
            </div>
            <div className = {"divmainfandcreading"} id = {"minfcdiv_"+props.uniquecode}>
                <div className={"divm2firstdigit"} id = {"divm2ff_"+props.uniquecode}>
                    <span className={clswholedigitfvalue} id = {"sm2ff_"+props.uniquecode}>{wholevalue}</span>
                    <span className={clswholedigitcvalue} id = {"sm2ff_"+props.uniquecode}>{wholevalue}</span>°
                </div>
                <div className = {"divinlineblock"} id = {"divm2fd_"+props.uniquecode}>
                    <span className={clswholedigitfvalue} id = {"sm2fd_"+props.uniquecode}>{digitvalue}</span>
                    <span className={clswholedigitcvalue} id = {"sm2fd_"+props.uniquecode}>{digitvalue}</span>°
                </div>
            </div>  
        </div>
    )
}
export default ForeCast
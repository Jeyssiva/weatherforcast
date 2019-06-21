import React, { useState } from 'react'

const ForeCast = (props) => {

    var wholevalue = props.tempvalue.toString().substr(0,2)
    var digitvalue = props.tempvalue.toString().substr(3,2)
    const [forecastperday,setForeCastPerDay] = useState(undefined)

    const onWeatherClick = event => {
        let idvalue = event.target.id.split('_')[1]
        setForeCastPerDay({id : idvalue })

         props.showforecastperday({id:idvalue})
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
                    <span className={"divinline"} id = {"sm2ff_"+props.uniquecode}>{wholevalue}</span>°
                </div>
                <div className = {"divinlineblock"} id = {"divm2fd_"+props.uniquecode}>
                    <span className={"divinline"} id = {"sm2fd_"+props.uniquecode}>{digitvalue}</span>°
                </div>
            </div>  
        </div>
    )
}
export default ForeCast
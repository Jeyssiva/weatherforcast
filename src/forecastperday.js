import React from 'react'
let classnames = require('classnames')

const ForeCastPerDay = (props) => {

    if (props.forecastdetail){

        let isshowfahren = props.forecastdetail.isshowfahren

        let clsfvalue = classnames ({'divinline' : isshowfahren},
                                    {'displaynone' : !isshowfahren})

        let clsflinkvalue = classnames ({'divinline' : !isshowfahren},
                                        {'displaynone' : isshowfahren})

        let clscvalue = classnames ({'divinline' : !isshowfahren},
                                    {'displaynone' : isshowfahren})
        
        let clsclinkvalue = classnames ({'divinline' : isshowfahren},
                                        {'displaynone' : !isshowfahren})

        let clsfcontent = classnames ({'divinline' : isshowfahren},
                                    {'displaynone' : !isshowfahren})

        let clsccontent = classnames ({'divinline' : !isshowfahren},
                                 {'displaynone' : isshowfahren})

        var wholefvalue = props.forecastdetail.fahrenvalue.toString().substr(0,2)
        
        var wholecvalue = props.forecastdetail.celsiusvalue.toString().substr(0,2)

        let windfvalue = classnames ({'divinline' : isshowfahren},
                                    {'displaynone' : !isshowfahren})

        let windcvalue = classnames ({'divinline' : !isshowfahren},
                                        {'displaynone' : isshowfahren})

        const onLinkClicked = (isshowfahren) =>{
            props.onFCLinkClicked(isshowfahren)
        }

        return(
            <div id= {"divmaincontent"} className = {"displayflowroot"}>
                <span aria-level={"3"} role={"heading"}>
                    <div id={"wob_loc"}>{props.forecastdetail.cityname + "," + props.forecastdetail.statename}</div>
                    <div id={"wob_dts"}>{props.forecastdetail.fullday + "," + props.forecastdetail.ahour}</div>
                    <div id={"wob_dcp"}><span id={"wob_dc"}>{props.forecastdetail.weatherdescription}</span></div>
                </span>

                <div id={"wob_d"} className = {"divwob_d"}>
                    <div>
                        <img className = {"imgperday"} alt={props.forecastdetail.weatherdescription} 
                        src={props.forecastdetail.iconpath} id={"wob_tci"} data-atf={"1"}> 
                        </img>
                        <div aria-level={"3"} role={"heading"} className = {"divcontentmain"}>
                            <div>
                                <div className = {"divcontent"}>
                                    <span id={"wob_tm"} className={clsfcontent}>{wholefvalue}</span>
                                    <span id={"wob_ttm"} className={clsccontent}>{wholecvalue}</span>
                                </div>
                                <div className={"divfccontent"}>
                                    <span className={clsfvalue} aria-label={"°Fahrenheit"} 
                                        aria-disabled={"true"}>{"°F"}</span>
                                    <a onClick = {onLinkClicked.bind(this,true)} href={"#"} className={clsflinkvalue}  >
                                        <span aria-label={"°Fahrenheit"}>{"°F"}</span>
                                    </a>
                                    &nbsp;|&nbsp;
                                    <a onClick={onLinkClicked.bind(this,false)} href={"#"} className={clsclinkvalue} >
                                        <span aria-label={"°Celsius"}>{"°C"}</span>
                                    </a>    
                                    <span aria-label={"°Celsius"} aria-disabled={"true"} className={clscvalue}>{"°C"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"divothermeasures"}>
                    {/* <div>Precipitation: <span id={"wob_pp"}>{"20%"}</span></div> */}
                    <div>Humidity: <span id={"wob_hm"}>{props.forecastdetail.humidity + "%"}</span></div>
                    <div>Wind: <span>
                        <span className = {windfvalue} id={"wob_ws"}>{props.forecastdetail.windfmph + " mph"}</span>
                        <span className = {windcvalue} id={"wob_tws"}>{props.forecastdetail.windckmh + " km/h"}</span>
                    </span>
                    </div>
                </div>

            </div>
        )
    }
    else {
        return (null)
    }
} 

export default ForeCastPerDay
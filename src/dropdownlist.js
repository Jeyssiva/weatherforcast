import React, { useState } from 'react'

const DropDownList = (props) => {

    const initialFormState = { id: null, name: ''}
	const [ currentcity, setCurrentCity ] = useState(initialFormState)

	const onDropDownChanged = event => {
        const {value , selectedIndex}  = event.target
        
        const name = event.target.options[selectedIndex].text

        setCurrentCity({id : value,name : name })
        
        props.updateCity({id : value,name : name })
	}

    const valueList = (props.cities && props.cities.map((item) => {
        return (<option key={item.id +'_key'} value={item.id}>{item.name}</option>)
    }))

    const weatherlist = (props.weathertypes && props.weathertypes.map((item) => {
        return (<option key={item.id +'_key'} value={item.id}>{item.weathertype}</option>)
    }))

    const onWeatherChanged = event => {
        const {value , selectedIndex}  = event.target     
        props.weatherChanged(value)
	}

    return (
        <div>
           <span className={"searchheader"}> City: </span> <div>
                <select id = {"drpdowncity"} 
                        className = {"dropdownsize"}
                        onChange = {onDropDownChanged}>
                    {valueList}
                </select>
            </div>

            <span className={"searchheader"}>Weather Type: </span> <div>
                <select id = {"drpdownweatype"} 
                        className = {"dropdownsize"}
                        onChange = {onWeatherChanged}
                        value={props.currentweatherid}>
                        <option key = {"keyselectall"} id={"0"} value = {"0"}>{"All"}</option>
                        {weatherlist}
                </select>
            </div>
        </div>
    )
}
export default DropDownList
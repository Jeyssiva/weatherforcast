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

    return (
        // <form onSubmit={event => {
        //     event.preventDefault()
            
        //     props.updateCity(currentcity)
        //     setCurrentCity(initialFormState)
        // }}
        // >
        <div>
            <select id = {"drpdowncity"} 
                    className = {"dropdownsize"}
                    onChange = {onDropDownChanged}>
                {valueList}
            </select>
        </div>
    )
}
export default DropDownList
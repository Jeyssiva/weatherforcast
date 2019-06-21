import React, { useState, useEffect,  Fragment } from 'react'
import DropDownList from './dropdownlist'
import ForeCastList from './forecastlist'

const App = () => {

	useEffect (() => {
		const result = getWeather("Chennai")
	}, [])

	const getWeather = async (cityname) => {
	const api_call = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${cityname},IN&appid=cf3f9956c7e13de9cb12fb4b0b5f5205`);	
	const response = await api_call.json();

	setTimeout(() =>{
			setWeatherData(response.list)
			filterweathers(response.list)
	},0)
	}
	
	const filterweathers = (responsedata) =>{
	var filter_data = []
	var today  = new Date()
	var fulldays = new Array( "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun" );

	var t_hours = today.getHours()
	//var dateTime = date+' '+time;

	responsedata && responsedata.map((item) => {
		//var f_date = item.dt_txt
		var c_w_date = new Date(item.dt_txt)
		// var c_date = c_w_date.getFullYear()+'-'+(c_w_date.getMonth() + 1)+'-'+ c_w_date.getDate();
		// var c_time = c_w_date.getHours() + ":" + c_w_date.getMinutes() + ":" + c_w_date.getSeconds();

		var c_getDate = c_w_date.getDate()
		var c_hours = c_w_date.getHours()
		var c_day = c_w_date.getDay() != 0 ? c_w_date.getDay() - 1  : 6
		if(Math.abs(t_hours - c_hours) < 3)
		{
			var isdateexists = filter_data && filter_data.findIndex(x => x[0] == c_getDate)
			if(isdateexists == -1){		
				let converttofahrenheit = parseFloat(item.main.temp) * 9/5 - 459.67
				let iconpath = "http://openweathermap.org/img/w/" + item.weather[0].icon + ".png"
				
				filter_data.push([c_getDate,fulldays[c_day],converttofahrenheit,
				item.weather[0].icon,iconpath,item.weather[0].id,item.main.pressure,item.main.humidity])
			}
		}			
	})

	setfilterWeatherData(filter_data)
	console.log(filter_data)
	}

	// Data
	// const usersData = [
	// 	{ id: 1, name: 'Tania', username: 'floppydiskette' },
	// 	{ id: 2, name: 'Craig', username: 'siliconeidolon' },
	// 	{ id: 3, name: 'Ben', username: 'benisphere' },
	// ]

	// const initialFormState = { id: null, name: '', username: '' }

	// // Setting state
	// const [ users, setUsers ] = useState(usersData)
	// const [ currentUser, setCurrentUser ] = useState(initialFormState)
	// const [ editing, setEditing ] = useState(false)

	// // CRUD operations
	// const addUser = user => {
	// 	user.id = users.length + 1
	// 	setUsers([ ...users, user ])
	// }

	// const deleteUser = id => {
	// 	setEditing(false)

	// 	setUsers(users.filter(user => user.id !== id))
	// }

	// const updateUser = (id, updatedUser) => {
	// 	setEditing(false)

	// 	setUsers(users.map(user => (user.id === id ? updatedUser : user)))
	// }

	// const editRow = user => {
	// 	setEditing(true)

	// 	setCurrentUser({ id: user.id, name: user.name, username: user.username })
	// }

	const cities = [
		// { id : 0, name: 'Select City'},
		{ id: 1, name: 'Chennai' },
		{ id: 2, name: 'Kolkata' },
        { id: 3, name: 'Kochi'},
        { id: 4, name: 'Bangalore'},
        { id: 5, name: 'Hyderabad'}
	
	]
	const initialFormState = { id: 1, name: 'Chennai'}

	// Setting state
	const [ city, setCities ] = useState(cities)
	const [ currentcity, setCurrentCity ] = useState(initialFormState)
	const [ weatherdata, setWeatherData] = useState(undefined);
	const [ filterweatherdata, setfilterWeatherData] = useState(undefined);
	const [ forecastperday,setForeCastPerDay] = useState(undefined)
	
	const updateCity = city => {
		setCurrentCity({id : city.id,name : city.name})
		
		const result = getWeather(city.name)
	}

	const showforecastperday = forecastperday => {
		setForeCastPerDay({id:forecastperday.id})
	}

	return (
		<div id={"main"} className = {"divmain"}>
        	<h1>Weather Forecast</h1>
			<DropDownList cities = {cities} updateCity = {updateCity}/>
			<br></br>
			<ForeCastList filterweatherdata = {filterweatherdata} 
			showforecastperday = {showforecastperday} />
    	</div>
	)
}

export default App

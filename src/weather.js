import React, { useState, useEffect,  Fragment } from 'react'
import DropDownList from './dropdownlist'
import ForeCastList from './forecastlist'
import ForeCastPerDay from './forecastperday'

const Weather = () => {
	// Initialize the Cities
	const cities = [
		{ id: 1, name: 'Chennai',state:'Tamil Nadu' },
		{ id: 2, name: 'Kolkata',state:'West Bangal' },
        { id: 3, name: 'Kochi' ,state:'Kerala'},
        { id: 4, name: 'Bangalore' ,state:'Karnataka'},
        { id: 5, name: 'Hyderabad' ,state:'Andhra Pradesh'}
	
	]
	const initialFormState = { id: 1, name: 'Chennai',state:'Tamil Nadu'}

	// Setting state
	const [ city, setCities ] = useState(cities)
	const [ currentcity, setCurrentCity ] = useState(initialFormState)
	const [ weatherdata, setWeatherData] = useState(undefined);
	const [ filterweatherdata, setfilterWeatherData] = useState(undefined);
	const [ forecastid,setForeCastId] = useState(undefined)
	const [ forecastdetail,setForeCastDetail] = useState(undefined)
	const [ isdisplayfahrenvalue, setFahrenCelsiusvalue] = useState(true)
	const [ weathertypes , setWeatherTypes] = useState(undefined)
	const [ originalweatherdata, setoriginalWeatherData] = useState(undefined);
	const [ currentweatherid, setWeatherId] = useState(0);

	useEffect (() => {
		// show the Weather details at load time
		const result = getWeather("Chennai" ,true , 1)

	}, [])

	// Fetch the json from openweathermap url
	// set the local state
	const getWeather = async (cityname,isdefault = false , cityid = 0) => {
		const api_call = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityname},IN&appid=cf3f9956c7e13de9cb12fb4b0b5f5205`);	
		const response = await api_call.json();

		setTimeout(() =>{
				setWeatherData(response.list)
				filterweathers(response.list,isdefault,cityid)
		},0)

	}	
	
	// Filter the nearest weather details based on current time.
	const filterweathers = (responsedata,isdefault = false, cityid = 0) =>{
		var weather_types = []
		var filter_data_pair = []
		var today  = new Date()
		var halfdays = new Array( "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun" );
		let fulldays = new Array( "Monday", "Tuesday", "Wednesday", "Thusday", "Friday", "Saturday", "Sunday" ); 

		var t_hours = today.getHours()

		responsedata && responsedata.map((item) => {
			var c_w_date = new Date(item.dt_txt)

			var c_getDate = c_w_date.getDate()
			var c_hours = c_w_date.getHours()
			var c_day = c_w_date.getDay() != 0 ? c_w_date.getDay() - 1  : 6
			if(Math.abs(t_hours - c_hours) < 3)
			{
				var isdateexists = filter_data_pair && filter_data_pair.findIndex(x => x.id == c_getDate)
				if(isdateexists == -1){		
					let converttofahrenheit = parseFloat(item.main.temp) * 9/5 - 459.67
					let convettocelsius = parseFloat(item.main.temp) - 273.15
					let iconpath = "http://openweathermap.org/img/w/" + item.weather[0].icon + ".png"

					let windfmph = (item.wind.speed * 2.237).toFixed(2)
					let windckmh = (item.wind.speed * 3.6).toFixed(2)

					let resultwithkeypair = {id:c_getDate,halfdays:halfdays[c_day],fahrenvalue:converttofahrenheit,
					iconpath:iconpath,weatherdescription:item.weather[0].description,isshowfahren:isdisplayfahrenvalue,
					celsiusvalue:convettocelsius, fullday:fulldays[c_day] , humidity:item.main.humidity,
					windfmph : windfmph,windckmh : windckmh,weatherid:item.weather[0].id}
					
					filter_data_pair.push(resultwithkeypair)

					let weather_type = {id:item.weather[0].id,weathertype:jsUcfirst(item.weather[0].description)}
					
					//Filter the weather types.
					var isweatherexists = weather_types && weather_types.findIndex(x => x.id == item.weather[0].id)
					if(isweatherexists == -1){
						weather_types.push(weather_type)
					}
				}
			}			
	})

	setfilterWeatherData(filter_data_pair)
	setoriginalWeatherData(filter_data_pair)

	setWeatherTypes(weather_types)

		//It will be work in load time and city change event
		if (isdefault == true){
			setTimeout(() =>{
				showforecastperday(filter_data_pair[0].id , filter_data_pair, cityid , isdefault)
			},0)
		}
	}

	// Change the weather details based on city name
	const updateCity = city => {
		setCurrentCity({id : city.id,name : city.name})
		setWeatherId(0)
		
		const result = getWeather(city.name , true, city.id)
	}

	// Get the specific weather information based on weather selection.
	const showforecastperday = (forecastid, forecastdetailfordefault = undefined , cityid = 0, isdefault = false) => {

		setForeCastId({id:forecastid})
		let cityname
		let statename 

		if(isdefault) {
			let currentcitydet = cities.filter(x => x.id == cityid)[0]
			cityname = currentcitydet.name
			statename = currentcitydet.state
		} else {		
			cityname = currentcity.name	
			statename = cities.filter(x => x.id == currentcity.id)[0].state
		}

		var curdate  = new Date()
		var c_day = curdate.getDay() != 0 ? curdate.getDay() - 1  : 6
		var c_hour = curdate.getHours()
		var ampm = c_hour < 12 ? "AM" : "PM"
		var hour = c_hour + " 00 " + ampm
		var forecastdetail

		if (isdefault) {
			forecastdetail = forecastdetailfordefault.filter(x => x.id == forecastid)[0]		
		} else {
			forecastdetail = filterweatherdata.filter(x => x.id == forecastid)[0]
		}
	
		setForeCastDetail({id:forecastid.id,cityname:cityname,
							statename:statename,fullday:forecastdetail.fullday,
							ahour : hour,weatherdescription : jsUcfirst(forecastdetail.weatherdescription),
							iconpath : forecastdetail.iconpath,fahrenvalue : forecastdetail.fahrenvalue,
							isshowfahren : forecastdetail.isshowfahren,celsiusvalue : forecastdetail.celsiusvalue,
							humidity:forecastdetail.humidity,windfmph : forecastdetail.windfmph,windckmh :forecastdetail.windckmh
						}) 
	}

	function jsUcfirst(string) 
	{
    	return string.charAt(0).toUpperCase() + string.slice(1);
	}

	// Change the Fahreneit and Celsuis value based on link selection
	const onFCLinkClicked = isshowfahren => {
		let weatherdataforupdate = filterweatherdata
		let originalweatherdataforupdate = originalweatherdata

		let t_forecastdetail = forecastdetail

		setFahrenCelsiusvalue(isshowfahren)

		weatherdataforupdate && weatherdataforupdate.forEach(element => {
			element.isshowfahren = isshowfahren
		});
		
		originalweatherdataforupdate && originalweatherdataforupdate.forEach(element => {
			element.isshowfahren = isshowfahren
		});

		setfilterWeatherData(weatherdataforupdate)
		setoriginalWeatherData(originalweatherdataforupdate)

		t_forecastdetail.isshowfahren = isshowfahren

		setForeCastDetail(t_forecastdetail)

		console.log(weatherdataforupdate)
	}

	// Filter the weather details based on weather change.
	const weatherChanged = weatherid =>{

		setWeatherId(weatherid)

		let weatherdataforweatherchange = originalweatherdata
		let w_forecastdetail = forecastdetail
		let weather_datas
		if (weatherid != 0){
			weather_datas = weatherdataforweatherchange && weatherdataforweatherchange.filter(x => x.weatherid == weatherid)
		} else {
			weather_datas = weatherdataforweatherchange
		}

		let firstweatherdata = weather_datas[0]
		w_forecastdetail.id = firstweatherdata.id
		w_forecastdetail.weatherdescription = jsUcfirst(firstweatherdata.weatherdescription)
		w_forecastdetail.iconpath = firstweatherdata.iconpath
		w_forecastdetail.fahrenvalue = firstweatherdata.fahrenvalue
		w_forecastdetail.celsiusvalue = firstweatherdata.celsiusvalue
		w_forecastdetail.humidity = firstweatherdata.humidity
		w_forecastdetail.windfmph = firstweatherdata.windfmph
		w_forecastdetail.windckmh = firstweatherdata.windckmh
		
		setfilterWeatherData(weather_datas)
		setForeCastDetail(w_forecastdetail)
	}

	return (
		<div id={"main"} className = {"divmain"}>
        	<h1>Weather Forecast</h1>
			<DropDownList cities = {cities} updateCity = {updateCity} 
				weathertypes = {weathertypes} weatherChanged ={weatherChanged} currentweatherid = {currentweatherid}/>
			<br></br>
			<ForeCastPerDay forecastdetail = {forecastdetail} onFCLinkClicked = {onFCLinkClicked} />
			<br></br>
			<ForeCastList filterweatherdata = {filterweatherdata}
			showforecastperday = {showforecastperday} />
    	</div>
	)
}

export default Weather

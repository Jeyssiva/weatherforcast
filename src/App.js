import React, { useState, useEffect,  Fragment } from 'react'
import AddUserForm from './forms/AddUserForm'
import EditUserForm from './forms/EditUserForm'
import UserTable from './tables/UserTable'
import $  from 'jquery';
import { get } from 'http';

const FetchRequest = (url) => {
    const [data, updateData] = useState(undefined);
    useEffect(() => {
        // fetch(url).then(res => {
        //    return res.json();
        //  }).then(json => {
        //    updateData(json);
		// });

		// $.ajaxSetup({
		// 	headers: {
		// 		'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		// 	}
		// });
		
		$.ajax({
            url:"http://api.openweathermap.org/data/2.5/forecast?q=Chennai,IN&mode=json&appid=cf3f9956c7e13de9cb12fb4b0b5f5205",
            type: "POST",
			dataType: "json",
			async: true,
			// data : {
			// 	q : 'Chennai,IN',
			// 	appid: 'cf3f9956c7e13de9cb12fb4b0b5f5205'
			// },
			headers : {
				'Access-Control-Allow-Credentials' : 'true',
				'Access-Control-Allow-Methods' : 'GET,POST',
				'Access-Control-Allow-Origin' : '*',
				'Content-Type' : 'application/json; charset=utf-8'
			},
            success: function(data) {            
                return data
            },
            error: function(error) {
                console.log(error)
            }
		});
		
     }, []);
   
    return data;
}

const App = () => {

	const url = 'http://api.openweathermap.org/data/2.5/forecast?q=Chennai,IN&mode=json&appid=cf3f9956c7e13de9cb12fb4b0b5f5205'
	const result = FetchRequest(url)

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

	return (
		// <div className="container">
		// 	<h1>CRUD App</h1>
		// 	<div className="flex-row">
		// 		<div className="flex-large">
		// 			{editing ? (
		// 				<Fragment>
		// 					<h2>Edit user</h2>
		// 					<EditUserForm
		// 						editing={editing}
		// 						setEditing={setEditing}
		// 						currentUser={currentUser}
		// 						updateUser={updateUser}
		// 					/>
		// 				</Fragment>
		// 			) : (
		// 				<Fragment>
		// 					<h2>Add user</h2>
		// 					<AddUserForm addUser={addUser} />
		// 				</Fragment>
		// 			)}
		// 		</div>
		// 		<div className="flex-large">
		// 			<h2>View users</h2>
		// 			<UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
		// 		</div>
		// 	</div>
		// </div>
		<div>
        	<h1>CRUD App</h1>
    	</div>
	)
}

export default App

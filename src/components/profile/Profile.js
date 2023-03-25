import React, { useState } from 'react'
import { JoblyApi } from '../../api'
import { NavLink } from 'react-router-dom'

function Profile({ curUser, setCurUser }) {
	const [formData, setFormData] = useState({
		firstName: curUser.firstName,
		lastName: curUser.lastName,
		email: curUser.email,
		username: curUser.username,
	})

	async function handleSubmit(evt) {
		evt.preventDefault()

		let profileData = {
			firstName: formData.firstName,
			lastName: formData.lastName,
			email: formData.email,
		}

		let username = formData.username
		let updatedUser

		try {
			updatedUser = await JoblyApi.saveProfile(username, profileData)
		} catch (err) {
			alert('unable to update profile')
			console.error(err)
			return
		}

		setFormData((data) => ({ ...data }))

		// trigger reloading of user information throughout the site
		setCurUser((data) => ({
			...curUser,
			[data]: updatedUser,
		}))
	}

	/** Handle form data changing */
	function handleChange(evt) {
		const { name, value } = evt.target
		setFormData((f) => ({
			...f,
			[name]: value,
		}))
	}

	return (
		<div className='Profile col-md-6 col-lg-4 offset-md-3 offset-lg-4'>
			<h3 className='gradient'>Profile</h3>
			<div className='form-group'>
				<form>
					<div className='mb-3'>
						<label className='form-label'>Username</label>
						<input
							disabled
							className='form-control'
							placeholder={formData.username}
						/>
					</div>
					<div className='mb-3'>
						<label className='form-label'>First Name</label>
						<input
							name='firstName'
							className='form-control'
							value={formData.firstName}
							onChange={handleChange}
						/>
					</div>
					<div className='mb-3'>
						<label className='form-label'>Last Name</label>
						<input
							name='lastName'
							className='form-control'
							value={formData.lastName}
							onChange={handleChange}
						/>
					</div>
					<div className='mb-3'>
						<label className='form-label'>Email</label>
						<input
							name='email'
							className='form-control'
							value={formData.email}
							onChange={handleChange}
						/>
					</div>
					<div className='d-grid'>
						<NavLink
							className='btn btn-success mb-2'
							to='/profile/applications'
						>
							Current Applications
						</NavLink>
					</div>
					<div className='d-grid'>
						<button className='btn btn-primary' onClick={handleSubmit}>
							Save Changes
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Profile

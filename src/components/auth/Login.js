import { React, useState } from 'react'
import { useNavigate } from 'react-router'

function Login({ login }) {
	const navigate = useNavigate()
	const [formData, setFormData] = useState({
		username: '',
		password: '',
	})

	async function handleSubmit(e) {
		e.preventDefault()
		try {
			await login(formData)
			navigate('/')
		} catch (error) {
			alert(error)
		}
	}

	function handleChange(e) {
		const { name, value } = e.target
		setFormData((data) => ({ ...data, [name]: value }))
	}

	return (
		<div className='LoginForm'>
			<div className='container col-md-6 offset-md-3 col-lg-4 offset-lg-4'>
				<h3 className='mb-3 gradient'>Log In</h3>
				<form onSubmit={handleSubmit}>
					<div className='mb-3'>
						<label className='form-label'>Username</label>
						<input
							name='username'
							className='form-control'
							value={formData.username}
							onChange={handleChange}
							autoComplete='username'
							required
						/>
					</div>
					<div className='mb-3'>
						<label className='form-label'>Password</label>
						<input
							type='password'
							name='password'
							className='form-control'
							value={formData.password}
							onChange={handleChange}
							autoComplete='current-password'
							required
						/>
					</div>
					<div className='d-grid'>
						<button className='btn btn-primary' onClick={handleSubmit}>
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Login

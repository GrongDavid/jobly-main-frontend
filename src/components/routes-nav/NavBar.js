import { React, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

function NavBar({ logout, curUser }) {
	const [searchData, setSearchData] = useState('')
	const navigate = useNavigate()

	function handleChange(e) {
		const { value } = e.target
		setSearchData(value)
	}

	async function handleSubmit(e) {
		e.preventDefault()
		navigate(`/search/${searchData}`)
		setSearchData('')
	}
	return (
		<nav
			className='navbar navbar-expand-lg bg-body-tertiary sticky-top bg-white'
			data-bs-theme='light'
		>
			{curUser ? (
				<div className='container-fluid'>
					<NavLink className='navbar-brand' to='/'>
						Jobly
					</NavLink>
					<div className='navbar' id='navbarNav'>
						<div className='navbar-nav'>
							<NavLink className='nav-link active' to='/companies'>
								Companies
							</NavLink>
							<NavLink className='nav-link active' to='jobs'>
								jobs
							</NavLink>
							<form
								className='d-flex form-outline-success justify-content-end'
								role='search'
								onSubmit={handleSubmit}
							>
								<input
									className='form-control me-2 form-outline-success'
									type='search'
									placeholder='Search'
									aria-label='Search'
									onChange={handleChange}
								/>
								<button
									className='btn btn-outline-success bg-white'
									type='submit'
								>
									Search
								</button>
							</form>
							<NavLink className='nav-link active' to='/profile'>
								profile
							</NavLink>
							<NavLink className='nav-link active' to='/' onClick={logout}>
								Logout
							</NavLink>
						</div>
					</div>
				</div>
			) : (
				<div className='container-fluid '>
					<NavLink className='navbar-brand' to='/'>
						Jobly
					</NavLink>
					<div className='navbar-nav justify-content-end'>
						<div className='d-flex'>
							<NavLink className='nav-link active' to='/signup'>
								Signup
							</NavLink>
							<NavLink className='nav-link active' to='/login'>
								Login
							</NavLink>
						</div>
					</div>
				</div>
			)}
		</nav>
	)
}

export default NavBar

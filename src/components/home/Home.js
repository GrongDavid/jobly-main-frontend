import React from 'react'
import { NavLink } from 'react-router-dom'

function Home({ curUser = null }) {
	console.log(curUser)
	return (
		<div className='Home d-flex justify-content-center align-items-center'>
			<div>
				<h1 className='Home-h1 fw-bold gradient'>Jobly</h1>
				<p className='Home-p mt-4 gradient'>
					All of the jobs you want and more, in one convenient place
				</p>
				{curUser ? (
					<h2 className='Home-h2 gradient'>Welcome Back, {curUser.username}</h2>
				) : (
					<>
						<NavLink
							className='btn btn-primary btn-lg fw-bold p-2 m-2 mt-4'
							to='/login'
						>
							Login
						</NavLink>
						<NavLink
							className='btn btn-primary btn-lg fw-bold p-2 m-2 mt-4'
							to='/signup'
						>
							Signup
						</NavLink>
					</>
				)}
			</div>
		</div>
	)
}

export default Home

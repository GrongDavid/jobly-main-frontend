import { Routes, Route } from 'react-router'
import CompanyDetail from '../company-components/CompanyDetail'
import CompanyList from '../company-components/CompanyList'
import JobList from '../job-components/JobList'
import Profile from '../profile/Profile'
import Home from '../home/Home'
import Signup from '../auth/Signup'
import Login from '../auth/Login'
import ApplicationList from '../profile/ApplicationList'

function JoblyRoutes({
	jobs,
	companies,
	curUser = null,
	login,
	signup,
	apply,
	setCurUser,
}) {
	return (
		<div>
			<Routes>
				{curUser ? (
					<>
						<Route
							path='/companies'
							element={<CompanyList companies={companies} />}
						/>
						<Route
							path='/companies/:handle'
							element={
								<CompanyDetail
									companies={companies}
									curUser={curUser}
									apply={apply}
								/>
							}
						/>
						<Route
							path='/jobs'
							element={
								<JobList
									jobs={jobs}
									applications={curUser.applications}
									apply={apply}
								/>
							}
						/>
						<Route
							path='/profile'
							element={<Profile curUser={curUser} setCurUser={setCurUser} />}
						/>
						<Route
							path='/profile/applications'
							element={
								<ApplicationList
									jobs={jobs}
									applications={curUser.applications}
								/>
							}
						/>
						<Route path='/' element={<Home curUser={curUser} />} />
					</>
				) : (
					<>
						<Route path='/login' element={<Login login={login} />} />
						<Route path='/signup' element={<Signup signup={signup} />} />
						<Route path='/' element={<Home />} />
					</>
				)}
			</Routes>
		</div>
	)
}

export default JoblyRoutes

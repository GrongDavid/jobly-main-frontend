import { React, useState, useEffect } from 'react'
import './App.css'
import NavBar from './components/routes-nav/NavBar'
import JoblyRoutes from './components/routes-nav/JoblyRoutes'
import { JoblyApi } from './api'
import decode from 'jwt-decode'
import useLocalStorage from './hooks/useLocalStorage'

function App() {
	const [jobs, setJobs] = useState([])
	const [companies, setCompanies] = useState([])
	const [applicationIds, setApplicationIds] = useState(new Set([]))
	const [curUser, setCurUser] = useState({ data: null })
	const [userToken, setUserToken] = useLocalStorage('token')

	async function getJobs() {
		try {
			const res = await JoblyApi.getJobs()
			return res
		} catch (error) {
			console.error('could not fetch jobs')
		}
	}

	async function getCompanies() {
		try {
			const res = await JoblyApi.getCompanies()
			return res
		} catch (error) {
			console.error('could not fetch companies')
		}
	}

	useEffect(() => {
		async function set() {
			const [jobs, companies] = await Promise.all([getJobs(), getCompanies()])
			setJobs(jobs)
			setCompanies(companies)
		}
		set()
	}, [])

	useEffect(() => {
		async function getCurUser() {
			console.log(userToken)
			if (userToken) {
				try {
					let { username } = decode(userToken)
					JoblyApi.token = userToken

					let curUser = await JoblyApi.getUser(username)
					setCurUser({ data: curUser })
					setApplicationIds(new Set(curUser.applications))
				} catch (error) {
					console.error('unable to load user', error)
					setCurUser({ data: null })
				}
			} else {
				setCurUser({ data: null })
			}
		}
		getCurUser()
	}, [userToken])

	async function signup(data) {
		let token = await JoblyApi.signup(data)
		setUserToken(token)
	}

	async function logout() {
		setApplicationIds(new Set([]))
		setCurUser({ data: null })
		setUserToken(null)
		console.log(userToken)
	}

	async function login(data) {
		let token = await JoblyApi.login(data)
		setUserToken(token)
	}

	function apply(id) {
		if (applicationIds.has(id)) {
			return
		} else {
			JoblyApi.apply(curUser.data.username, id)
			setApplicationIds(new Set([...applicationIds, id]))
		}
		console.log('here')
	}
	console.log(curUser)
	return (
		<div className='App'>
			<NavBar logout={logout} curUser={curUser.data} />
			<JoblyRoutes
				jobs={jobs}
				companies={companies}
				curUser={curUser.data}
				login={login}
				signup={signup}
				apply={apply}
				setCurUser={setCurUser}
			/>
		</div>
	)
}

export default App

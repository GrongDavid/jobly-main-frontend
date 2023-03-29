import { React, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { JoblyApi } from '../../api'
import JobList from '../job-components/JobList'
import CompanyList from '../company-components/CompanyList'

function Search({ apply, applications }) {
	const [searchResults, setSearchResults] = useState({
		jobs: [],
		companies: [],
	})

	const { search } = useParams()

	useEffect(() => {
		async function getJobResults() {
			try {
				let res = await JoblyApi.getJobs(search)
				return res
			} catch (error) {
				console.error(`No jobs found with this search, ${search}`, error)
			}
		}

		async function getCompanyResults() {
			try {
				let res = await JoblyApi.getCompanies(search)
				return res
			} catch (error) {
				console.error(`No companies found with this search, ${search}`, error)
			}
		}

		async function setResults() {
			let [jobRes, companyRes] = await Promise.all([
				getJobResults(),
				getCompanyResults(),
			])
			setSearchResults({ jobs: jobRes, companies: companyRes })
		}

		setResults()
	}, [search])

	if (!(searchResults.jobs[0] || searchResults.companies[0])) {
		return (
			<h1 className='gradient'>
				Could not find any Jobs or <br /> Companies for this search
			</h1>
		)
	}

	return (
		<div>
			{searchResults.jobs[0] ? (
				<JobList
					jobs={searchResults.jobs}
					apply={apply}
					applications={applications}
				/>
			) : null}
			{searchResults.companies[0] ? (
				<CompanyList companies={searchResults.companies} />
			) : null}
		</div>
	)
}

export default Search

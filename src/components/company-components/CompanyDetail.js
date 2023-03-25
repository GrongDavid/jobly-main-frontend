import { React, useState, useEffect } from 'react'
import CompanyList from './CompanyList'
import { useParams } from 'react-router-dom'
import { JoblyApi } from '../../api'
import JobList from '../job-components/JobList'

function CompanyDetail({ companies, curUser, apply }) {
	const { handle } = useParams()
	console.log(handle)
	const [curCompany, setCurCompany] = useState(null)

	useEffect(() => {
		async function setCompany() {
			const company = await JoblyApi.getCompany(handle)
			setCurCompany(company)
		}

		setCompany()
	}, [handle])

	if (!curCompany) {
		return <p>Could not find company</p>
	}

	console.log(curCompany.jobs)

	return (
		<div className='container'>
			<div className='row'>
				<div className='col'>
					<ul>
						<CompanyList companies={companies} alone={false} />
					</ul>
				</div>
				<div className='col' align='center'>
					<h1 className='list-title fw-bold gradient'>Current Jobs</h1>
					<ul>
						<li>
							{curCompany.name} <br /> {curCompany.description}
						</li>
						<li>
							<JobList
								companyJobs={curCompany.jobs}
								applications={curUser.applications}
								apply={apply}
							/>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}

export default CompanyDetail

import React from 'react'
import JobCard from './JobCard'

function JobList({
	jobs,
	companyJobs = null,
	applications = null,
	apply = null,
	applicationList = false,
}) {
	console.log(jobs)
	const listJobs = (jobList) => {
		return jobList.map((job) => (
			<li key={job.id} className='list'>
				<JobCard
					id={job.id}
					title={job.title}
					salary={job.salary}
					equity={job.equity}
					companyName={job.companyName}
					applications={applications}
					apply={apply}
				/>
			</li>
		))
	}

	return (
		<div className='JobList' align='center'>
			<h1 className='list-title gradient'>
				{applicationList ? 'Jobs Applied' : 'Jobs'}
			</h1>
			<div className='container' align='center'>
				<ul>{jobs ? listJobs(jobs) : listJobs(companyJobs)}</ul>
			</div>
		</div>
	)
}

export default JobList

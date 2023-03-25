import { React, useState, useEffect } from 'react'
import { JoblyApi } from '../../api'
import JobList from '../job-components/JobList'

function ApplicationList({ jobs, applications = [] }) {
	let jobsApplied = jobs.filter((job) => {
		return applications.includes(job.id)
	})

	return (
		<div>
			<JobList
				jobs={jobsApplied}
				applications={applications}
				applicationList={true}
			/>
		</div>
	)
}

export default ApplicationList

import { React, useState } from 'react'
import ApplyButton from './ApplyButton'

function JobCard({
	id,
	title,
	salary,
	equity,
	companyName,
	applications,
	apply,
}) {
	/** handles applying for a job */
	async function handleApply() {
		if (applications.includes(id)) {
			alert('You have already applied to this job')
			return
		}
		await apply(id)
		console.log('here in handle')
	}

	return (
		<div>
			<div className='JobCard card'>
				{title} <br />
				{companyName}
				<br /> Salary: {salary ? salary : 'N/A'}
				<br /> Equity: {equity ? equity : 'N/A'}
				<br />
			</div>
			<ApplyButton
				handleApply={handleApply}
				id={id}
				applications={applications}
			/>
		</div>
	)
}

export default JobCard

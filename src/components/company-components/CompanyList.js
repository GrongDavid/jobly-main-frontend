import { React, useState } from 'react'
import { NavLink } from 'react-router-dom'

function CompanyList({ companies, alone = true }) {
	const listCompanies = () => {
		return companies.map((company) => (
			<li key={company.handle} className={alone ? 'lone-list' : 'list'}>
				<NavLink to={`/companies/${company.handle}`}>
					{company.name} <br />
					<br /> {company.description} <br />
					<br /> Employee Count: {company.numEmployees}
				</NavLink>
			</li>
		))
	}

	return (
		<div className='CompanyList'>
			<div align='center'>
				<NavLink to='/companies' className='list-title-link fw-bold'>
					<h1 className='list-title fw-bold gradient'>Companies</h1>
				</NavLink>
			</div>
			<div className='row'>
				<div className='col' align='center'>
					<ul>{listCompanies()}</ul>
				</div>
			</div>
		</div>
	)
}

export default CompanyList

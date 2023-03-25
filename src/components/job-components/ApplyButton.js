import { React, useState } from 'react'

function ApplyButton({ handleApply, id, applications }) {
	const INITIAL_STATE = applications.includes(id) ? true : false

	const [clicked, setClicked] = useState(INITIAL_STATE)

	function click() {
		handleApply()
		setClicked(true)
	}

	return (
		<button
			className={clicked ? 'btn btn-success' : 'btn btn-primary'}
			onClick={click}
			type='submit'
		>
			{clicked ? 'Applied' : 'Apply'}
		</button>
	)
}

export default ApplyButton

import { React, useEffect, useState } from 'react'
import { useParams } from 'react-router'

function Search() {
	const [searchResults, setSearchResults] = useState([])
	const searchString = useParams()

	useEffect(() => {
		async function getResults() {}
	})
}

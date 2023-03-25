import { useState, useEffect } from 'react'

function useLocalStorage(key, value = null) {
	const initialValue = localStorage.getItem(key) || value

	const [item, setItem] = useState(initialValue)

	useEffect(
		function setLocalStorage() {
			item ? localStorage.setItem(key, item) : localStorage.removeItem(key)
		},
		[key, item]
	)

	return [item, setItem]
}

export default useLocalStorage

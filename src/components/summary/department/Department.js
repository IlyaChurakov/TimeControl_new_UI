import React from 'react'
import { useParams } from 'react-router-dom'

const Department = props => {
	const { department } = useParams()

	return (
		<div className='department'>
			<div className='title'>Департамент</div>
		</div>
	)
}

export default Department

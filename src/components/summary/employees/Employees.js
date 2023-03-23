import React, { useEffect, useState } from 'react'
import Loader from '../../loader/Loader'
import PersonBlock from '../personblock/PersonBlock'

const Employees = props => {
	const [persons, setPersons] = useState([])

	const getTopManagers = async () => {
		let now = new Date()
		let nowDay = now.getDate()
		let nowYear = now.getFullYear()
		let nowMonth = now.getMonth() + 1

		let dayBeforeYesterday = `${nowYear}-0${nowMonth}-${nowDay - 2}`
		let yesterday = `${nowYear}-0${nowMonth}-${nowDay - 1}`

		console.log(props.startDate, props.endDate)

		const url =
			props.startDate && props.endDate
				? `http://localhost:8080/employeesStatistic/${props.startDate}/${props.endDate}`
				: `http://localhost:8080/employeesStatistic/${dayBeforeYesterday}/${yesterday}`

		await fetch(url)
			.then(res => {
				return res.json()
			})
			.then(resBody => {
				setPersons(resBody)
				console.log(resBody)
			})
			.catch(err => console.log(err))
	}

	useEffect(() => {
		getTopManagers()
		console.log(props.startDate, props.endDate)
	}, [props.startDate, props.endDate])

	return (
		<div className='sheet__info'>
			{persons.length ? (
				persons.map((person, key) => {
					return <PersonBlock link='/personinfo' key={key} person={person} />
				})
			) : (
				<Loader />
			)}
		</div>
	)
}

export default Employees

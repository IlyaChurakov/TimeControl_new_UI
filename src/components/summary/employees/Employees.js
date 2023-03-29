import React, { useEffect, useState } from 'react'
import Loader from '../../loader/Loader'
import PersonBlock from '../personblock/PersonBlock'

const Employees = props => {
	const [persons, setPersons] = useState(null)

	const getTopManagers = async () => {
		let now = new Date()
		let nowDay = now.getDate()
		let nowYear = now.getFullYear()
		let nowMonth = now.getMonth() + 1

		let dayBeforeYesterday = `${nowYear}-0${nowMonth}-${nowDay - 7}` // week
		let yesterday = `${nowYear}-0${nowMonth}-${nowDay - 1}`

		const url =
			props.startDate && props.endDate
				? `http://${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/employeesStatistic/${props.startDate}/${props.endDate}`
				: `http://${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/employeesStatistic/${dayBeforeYesterday}/${yesterday}`

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
	}, [props.startDate, props.endDate])

	return (
		<div className='sheet__info'>
			{persons && persons.length !== 0 ? (
				persons.length ? (
					persons.map((person, key) => {
						return (
							<PersonBlock
								icon={true}
								link={`/employees/${person.name}`}
								key={key}
								person={person}
							/>
						)
					})
				) : (
					<Loader />
				)
			) : (
				<div className='error'>За этот период данных нет</div>
			)}
		</div>
	)
}

export default Employees

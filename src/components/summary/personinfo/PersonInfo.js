import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../../loader/Loader'
import PersonBlock from '../personblock/PersonBlock'
import './personinfo.scss'

const PersonInfo = props => {
	const [person, setPerson] = useState([])
	const { name } = useParams()

	const [departments, setDepartments] = useState([
		{
			department: 'Департамент инноваций и инжиниринга',
			late_time: '60',
		},
		{
			department: 'Департамент оценки техническго контроля',
			late_time: '50',
		},
		{
			department: 'Автоматизация и перспективные разработки',
			late_time: '70',
		},
		{
			department: 'Центр качества и поставок',
			late_time: '40',
		},
	])

	const getPerson = async () => {
		let now = new Date()
		let nowDay = now.getDate()
		let nowYear = now.getFullYear()
		let nowMonth = now.getMonth() + 1

		let dayBeforeYesterday = `${nowYear}-0${nowMonth}-${nowDay - 2}`
		let yesterday = `${nowYear}-0${nowMonth}-${nowDay - 1}`

		const url =
			props.startDate && props.endDate
				? `http://${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/personStatistic/${props.startDate}/${props.endDate}/${name}`
				: `http://${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/personStatistic/${dayBeforeYesterday}/${yesterday}/${name}`

		await fetch(url)
			.then(res => {
				return res.json()
			})
			.then(resBody => {
				setPerson(resBody)
				console.log(resBody)
			})
			.catch(err => console.log(err))
	}

	const getDepartments = async () => {
		const url = `http://${process.env.REACT_APP_SERVER_URL}/departmens/${props.name}`

		await fetch(url)
			.then(res => {
				return res.json()
			})
			.then(resBody => {
				setDepartments(resBody)
				console.log(resBody)
			})
			.catch(err => console.log(err))
	}

	useEffect(() => {
		getPerson()
		// getDepartments()
	}, [])

	return (
		<div className='sheet__info'>
			<div>
				{person.length ? (
					person.map((item, key) => {
						return <PersonBlock key={key} person={item} />
					})
				) : (
					<Loader />
				)}
				{departments.map((item, key) => {
					return (
						<div key={key}>
							<div>{item.department}</div>
							<div>{item.late_time}</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default PersonInfo

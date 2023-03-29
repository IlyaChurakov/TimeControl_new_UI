import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loader from '../../loader/Loader'
import PersonBlock from '../personblock/PersonBlock'
import ReportLine from '../personblock/reportline/ReportLine'
import './personinfo.scss'

const PersonInfo = props => {
	const [person, setPerson] = useState([])
	const { name } = useParams()

	const [departments, setDepartments] = useState([])

	const getPerson = async () => {
		let now = new Date()
		let nowDay = now.getDate()
		let nowYear = now.getFullYear()
		let nowMonth = now.getMonth() + 1

		let dayBeforeYesterday = `${nowYear}-0${nowMonth}-${nowDay - 7}` // week
		let yesterday = `${nowYear}-0${nowMonth}-${nowDay - 1}`

		const url =
			props.startDate && props.endDate
				? `http://${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/personStatistic/${props.startDate}/${props.endDate}/${name}`
				: `http://${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/personStatistic/${dayBeforeYesterday}/${yesterday}/${name}`

		console.log(url)

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
		let now = new Date()
		let nowDay = now.getDate()
		let nowYear = now.getFullYear()
		let nowMonth = now.getMonth() + 1

		let dayBeforeYesterday = `${nowYear}-0${nowMonth}-${nowDay - 7}` // week
		let yesterday = `${nowYear}-0${nowMonth}-${nowDay - 1}`

		const url =
			props.startDate && props.endDate
				? `http://${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/departments/${props.startDate}/${props.endDate}/${name}`
				: `http://${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/departments/${dayBeforeYesterday}/${yesterday}/${name}`

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
		getDepartments()
	}, [props.startDate, props.endDate])

	return (
		<div className='sheet__info_person'>
			{person && person.length && departments && departments.length !== 0 ? (
				person.length && departments.length ? (
					person.map((item, key) => {
						return (
							<PersonBlock
								icon={true}
								key={key}
								person={item}
								actionHandler={props.sendName}
							/>
						)
					})
				) : (
					<Loader />
				)
			) : (
				<div className='error'>За этот период данных нет</div>
			)}

			<div className='departments'>
				{departments.length && person.length
					? departments.map((item, key) => {
							return (
								<div key={key} className='departments__item'>
									<div className='departments__item_dep'>
										<Link
											to={`/employees/departments/${item.short_name}`}
											className='departments__item_dep-text'
										>
											{item.short_name}
										</Link>
										<ReportLine
											text={'Количество опозданий'}
											percent={{
												all_cnt: item.all_cnt,
												late_cnt: item.late_cnt,
											}}
											color={
												(+item.late_cnt / +item.all_cnt) * 100 > 20
													? '#D0598F'
													: '#65b970'
											}
										/>
										<ReportLine
											text={'Среднее время нахождения в офисе'}
											percent={item.avg_working_time}
											color={item.avg_working_time < 70 ? '#D0598F' : '#65b970'}
										/>
										<ReportLine
											text={'Процент нахождения в рабочей зоне'}
											percent={item.round}
											color={item.round < 70 ? '#D0598F' : '#65b970'}
										/>
									</div>
								</div>
							)
					  })
					: null}
			</div>
		</div>
	)
}

export default PersonInfo

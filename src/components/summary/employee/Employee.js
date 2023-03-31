import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PersonBlock from '../personblock/PersonBlock'
import './employee.scss'

const Employee = props => {
	const { name } = useParams()

	const [cameraEvents, setCameraEvents] = useState([])
	const [doorEvents, setDoorEvents] = useState([])
	const [employee, setEmployee] = useState([])

	const getEmployee = async () => {
		let now = new Date()
		let nowDay = now.getDate()
		let nowYear = now.getFullYear()
		let nowMonth = now.getMonth() + 1

		let dayBeforeYesterday = `${nowYear}-0${nowMonth}-${nowDay - 7}` // week
		let yesterday = `${nowYear}-0${nowMonth}-${nowDay - 1}`

		const url =
			props.startDate && props.endDate
				? `https://${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/employee/${props.startDate}/${props.endDate}/${name}`
				: `https://${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/employee/${dayBeforeYesterday}/${yesterday}/${name}`

		await fetch(url)
			.then(res => {
				return res.json()
			})
			.then(resBody => {
				setEmployee(resBody)
			})
			.catch(err => console.log(err))
	}
	const getEmployeeCameraEvents = async () => {
		let now = new Date()
		let nowDay = now.getDate()
		let nowYear = now.getFullYear()
		let nowMonth = now.getMonth() + 1

		let dayBeforeYesterday = `${nowYear}-0${nowMonth}-${nowDay - 7}` // week
		let yesterday = `${nowYear}-0${nowMonth}-${nowDay - 1}`

		const url =
			props.startDate && props.endDate
				? `https://${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/employeeCameraEvents/${props.startDate}/${props.endDate}/${name}`
				: `https://${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/employeeCameraEvents/${dayBeforeYesterday}/${yesterday}/${name}`

		await fetch(url)
			.then(res => {
				return res.json()
			})
			.then(resBody => {
				setCameraEvents(resBody)
			})
			.catch(err => console.log(err))
	}
	const getEmployeeDoorEvents = async () => {
		let now = new Date()
		let nowDay = now.getDate()
		let nowYear = now.getFullYear()
		let nowMonth = now.getMonth() + 1

		let dayBeforeYesterday = `${nowYear}-0${nowMonth}-${nowDay - 7}` // week
		let yesterday = `${nowYear}-0${nowMonth}-${nowDay - 1}`

		const url =
			props.startDate && props.endDate
				? `https://${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/employeeDoorEvents/${props.startDate}/${props.endDate}/${name}`
				: `https://${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/employeeDoorEvents/${dayBeforeYesterday}/${yesterday}/${name}`

		await fetch(url)
			.then(res => {
				return res.json()
			})
			.then(resBody => {
				setDoorEvents(resBody)
				console.log(resBody)
			})
			.catch(err => console.log(err))
	}

	useEffect(() => {
		props.setName(name)
	}, [])

	useEffect(() => {
		getEmployee()
		getEmployeeCameraEvents()
		getEmployeeDoorEvents()
	}, [props.startDate, props.endDate])

	return (
		<div className='employee'>
			{employee.length ? (
				employee.map((item, key) => {
					return (
						<PersonBlock
							key={key}
							icon={true}
							person={{
								late_cnt: item.late_cnt,
								all_cnt: item.all_cnt,
								name: item.name,
								avg_working_time: item.avg_working_time,
								round: item.round,
							}}
						/>
					)
				})
			) : (
				<div className='error'>Данных по сотруднику нет</div>
			)}
			<div className='employee__wrapper'>
				<div className='employee__wrapper_titles'>
					<div className='employee__wrapper_titles-title'>Камеры</div>
					<div className='employee__wrapper_titles-title'>СКУД</div>
				</div>
				<div className='employee__camera'>
					{cameraEvents.length && employee.length && doorEvents.length
						? cameraEvents.map((item, key) => {
								return (
									<div key={key} className='employee__camera_event'>
										<div className='employee__camera_event-name'>
											{item.name}
										</div>
										<div className='employee__camera_event-date'>
											{item.to_char.split(' ')[0]}
										</div>
										<div className='employee__camera_event-time'>
											{item.to_char.split(' ')[1]}
										</div>
									</div>
								)
						  })
						: null}
				</div>
				<div className='employee__door'>
					{doorEvents.length && cameraEvents.length && employee.length
						? doorEvents.map((item, key) => {
								return (
									<div key={key} className='employee__camera_event'>
										<div className='employee__door_event-type'>
											{item.event_type}
										</div>
										<div className='employee__door_event-name'>{item.name}</div>
										<div className='employee__door_event-date'>
											{item.date.split(' ')[0]}
										</div>
										<div className='employee__door_event-time'>
											{item.date.split(' ')[1]}
										</div>
									</div>
								)
						  })
						: null}
				</div>
			</div>
		</div>
	)
}

export default Employee

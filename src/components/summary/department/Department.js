import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PersonBlock from '../personblock/PersonBlock'
import './department.scss'

const Department = props => {
	const { department } = useParams()
	const [employees, setEmployees] = useState([])
	const [dep, setDep] = useState([])

	const getDepartment = async () => {
		let now = new Date()
		let nowDay = now.getDate()
		let nowYear = now.getFullYear()
		let nowMonth = now.getMonth() + 1

		let dayBeforeYesterday = `${nowYear}-0${nowMonth}-${nowDay - 7}`
		let yesterday = `${nowYear}-0${nowMonth}-${nowDay - 1}`

		const url =
			props.startDate && props.endDate
				? `http://${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/department/${props.startDate}/${props.endDate}/${department}`
				: `http://${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/department/${dayBeforeYesterday}/${yesterday}/${department}`

		console.log(url)

		await fetch(url)
			.then(res => {
				return res.json()
			})
			.then(resBody => {
				setDep(resBody)
				console.log(resBody)
			})
			.catch(err => console.log(err))
	}

	const getDepartmentEmployees = async () => {
		let now = new Date()
		let nowDay = now.getDate()
		let nowYear = now.getFullYear()
		let nowMonth = now.getMonth() + 1

		let dayBeforeYesterday = `${nowYear}-0${nowMonth}-${nowDay - 7}` // week
		let yesterday = `${nowYear}-0${nowMonth}-${nowDay - 1}`

		const url =
			props.startDate && props.endDate
				? `http://${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/departmentEmployees/${props.startDate}/${props.endDate}/${department}`
				: `http://${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/departmentEmployees/${dayBeforeYesterday}/${yesterday}/${department}`

		await fetch(url)
			.then(res => {
				return res.json()
			})
			.then(resBody => {
				setEmployees(resBody)
				console.log(resBody)
			})
			.catch(err => console.log(err))
	}

	useEffect(() => {
		props.setDep(department)
	}, [])

	useEffect(() => {
		getDepartment()
		getDepartmentEmployees()
	}, [props.startDate, props.endDate])

	return (
		<div className='department'>
			<div className='department__title'>
				{dep && dep.length && employees && employees.length
					? dep.map((item, key) => {
							return (
								<PersonBlock
									key={key}
									icon={false}
									person={{
										late_cnt: item.late_cnt,
										all_cnt: item.all_cnt,
										name: item.short_name,
										avg_working_time: item.avg_working_time,
										round: item.round,
									}}
								/>
							)
					  })
					: null}
			</div>

			<div className='department__employees'>
				{employees.length
					? employees.map((item, key) => {
							return (
								<div className='department__employees_employee' key={key}>
									<PersonBlock
										icon={true}
										person={item}
										link={`/employees/employee/${item.name}`}
									/>
								</div>
							)
					  })
					: null}
			</div>
		</div>
	)
}

export default Department

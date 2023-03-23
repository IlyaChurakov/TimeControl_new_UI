import React from 'react'
import Person from './person/Person'
import './personblock.scss'
import ReportLine from './reportline/ReportLine'

const PersonBlock = props => {
	return (
		<div className='person__wrapper'>
			<Person
				link={props.link}
				name={props.person.name}
				post={props.person.post}
			/>
			<ReportLine
				text='Количество опозданий'
				percent={props.person.late_percent}
				color={props.person.late_percent > 50 ? '#D0598F' : '#65b970'}
				margin='0 0 0 68px'
			/>
			{/* Нужно объект с временем перевести в БД в проценты */}
			<ReportLine
				text='Среднее время нахождения в офисе'
				percent={props.person.avg_working_time}
				color={props.person.avg_working_time < 95 ? '#D0598F' : '#65b970'}
				margin='0 0 0 68px'
			/>
			<ReportLine
				text='Процент нахождения в рабочей зоне'
				percent={props.person.work_time_zone}
				color={props.person.work_time_zone < 70 ? '#D0598F' : '#65b970'}
				margin='0 0 0 68px'
			/>
		</div>
	)
}

export default PersonBlock

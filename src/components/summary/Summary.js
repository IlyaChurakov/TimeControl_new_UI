import React, { useEffect, useRef, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { ReactSVG } from 'react-svg'
import logout from '../../icons/log-out-grey.svg'
import logo from '../../icons/main-logo.svg'
import settings from '../../icons/settings.svg'
import Employees from './employees/Employees'
import PersonInfo from './personinfo/PersonInfo'
import './summary.scss'

const Summary = props => {
	const startDate = useRef()
	const endDate = useRef()

	const [stdt, setStdt] = useState(
		startDate.current && startDate.current.value ? startDate.current.value : ''
	)
	const [endt, setEndt] = useState(
		endDate.current && endDate.current.value ? endDate.current.value : ''
	)

	const changeValues = () => {
		setStdt(
			startDate.current && startDate.current.value
				? startDate.current.value
				: ''
		)
		setEndt(
			endDate.current && endDate.current.value ? endDate.current.value : ''
		)
	}

	const [name, setName] = useState('')

	const updatePerson = value => {
		setName(value)
	}

	useEffect(() => {}, [stdt, endt])

	return (
		<div className='summary'>
			<div className='summary__menu_left'>
				<Link to='/'>
					<ReactSVG src={logo} className='summary__menu_left-logo' />
				</Link>
				<input className='summary__menu_left-finder' placeholder='поиск...' />
				<div className='summary__menu_left-links'>
					<a href=''>Камеры</a>
					<a href=''>Отчетность</a>
					<a href=''>Карта офиса</a>
					<a href=''>СКУД</a>
				</div>
			</div>
			<div className='summary__menu_right'>
				<div className='summary__menu_right-logout'>
					<ReactSVG src={logout} />
				</div>
				<div className='summary__menu_right-settings'>
					<ReactSVG src={settings} />
				</div>
			</div>
			<div className='summary__page'>
				<div className='sheet'>
					<div className='sheet__header'>
						<div className='sheet__header_period'>
							<div className='sheet__header_period-title'>Период:</div>
							<div className='sheet__header_period-from'>с</div>
							<input
								className='sheet__header_period-title'
								type='date'
								placeholder='Начало'
								ref={startDate}
								onInput={changeValues}
							/>
							<div className='sheet__header_period-to'>по</div>
							<input
								className='sheet__header_period-title'
								type='date'
								placeholder='Конец'
								ref={endDate}
								onInput={changeValues}
							/>
						</div>
					</div>
					<div className='sheet__header_back'></div>
					<Routes>
						<Route
							path='/'
							element={
								<Employees
									startDate={stdt}
									endDate={endt}
									sendName={updatePerson}
								/>
							}
						/>
						<Route
							path='/:name'
							element={
								<PersonInfo name={name} startDate={stdt} endDate={endt} />
							}
						/>
						<Route path='*' element={<div>Page not found</div>} />
					</Routes>
					<div className='sheet__footer'></div>
				</div>
			</div>
		</div>
	)
}

export default Summary

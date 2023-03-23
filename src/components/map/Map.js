import React from 'react'
import { ReactSVG } from 'react-svg'
import './map.scss'

const Map = props => {
	return (
		<div className='layout'>
			<div className='wrapper'>
				<ReactSVG
					src={props.map}
					className='map'
					beforeInjection={svg => {
						svg.setAttribute('style', 'width: 1200px')
					}}
				/>
				<div className='people'>
					<div className='people__circle'>1</div>
				</div>
			</div>
		</div>
	)
}

export default Map

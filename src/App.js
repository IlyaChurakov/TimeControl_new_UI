import { Route, Routes } from 'react-router-dom'
import './App.scss'
import Main from './components/main/Main'
import Map from './components/map/Map'
import Summary from './components/summary/Summary'
import map3 from './icons/map3.svg'
import map4 from './icons/map4.svg'
import map5 from './icons/map5.svg'
import map6 from './icons/map6.svg'

function App() {
	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<Main />} />
				<Route path='/employees/*' element={<Summary />} />
				<Route path='/map6' element={<Map map={map6} />} />
				<Route path='/map5' element={<Map map={map5} />} />
				<Route path='/map4' element={<Map map={map4} />} />
				<Route path='/map3' element={<Map map={map3} />} />
				<Route path='*' element={<div>Page not found</div>} />
			</Routes>
		</div>
	)
}

export default App

import logo from './logo.svg'
import './App.css'
import Home from './pages/Home'
import Enter from './pages/Enter'
import Scan from './pages/Scan'
import Receipt from './pages/Receipt'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return(
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element = {<Home/>}></Route>
          <Route path='/enter' element = {<Enter/>}></Route>
          <Route path='/scan' element = {<Scan/>}></Route>
          <Route path='/receipt' element = {<Receipt/>}></Route>
        </Routes>
      </div>

    </BrowserRouter>
  )
}

export default App;

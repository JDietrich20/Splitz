import { Link } from 'react-router-dom'
import Enter from './Enter'

export default function Home(){
  return(
    <div className='border'>
      <div id='title-section'>
      <h1 id="logo-name">SplitZ</h1>
      <p className="description">Split bills with friends with just a few taps!</p>
      <Link to='/enter' className='long-button'>Split A Bill Now!</Link>
      </div>
    </div> 
  )
}
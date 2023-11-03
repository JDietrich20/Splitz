import { Link } from 'react-router-dom'
import Enter from './Enter'

export default function Home(){
  return(
    <div className='border'>
      <h1 id="logo-title">SplitZ</h1>
      <p className="description">Split bills with friends with just a few taps!</p>
      <Link to='/enter'>Split A Bill Now!</Link>
    </div> 
  )
}
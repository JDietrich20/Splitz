import { Link } from 'react-router-dom'

export default function Scan(){
  return(
    <div className='border'>
      <div className='navbar'>
      <Link to='/enter'>back</Link>
      <Link to='/receipt'>next</Link>
    </div>
    <h1>Scanner coming soon...</h1>
    </div>
    
  )
}
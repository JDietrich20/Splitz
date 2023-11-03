import { Link } from 'react-router-dom'

export default function Receipt(){
  return(
    <div className='navbar'>
      <Link to='/scan'>scan again</Link>
      <Link to ='#'>Edit</Link>
    </div>
  )
}
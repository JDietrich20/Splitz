import { Link } from 'react-router-dom'

export default function Scan(){
  return(
    <div className='navbar'>
      <Link to='/enter'>back</Link>
      <Link to='/receipt'>next</Link>
    </div>
  )
}
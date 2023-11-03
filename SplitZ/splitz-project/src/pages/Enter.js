import EnterNames from '../components/EnterNames'
import { Link } from 'react-router-dom'

export default function Enter(){
  return(
    <div className='border'>
      <div className='navbar'>
        <Link to='/'>back</Link>
        <Link to='/scan'>next</Link>
      </div>  
      <EnterNames/>
    </div>
  )
}
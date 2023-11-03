import { Link } from 'react-router-dom'

export default function Receipt(){
  return(
    <div className='border'>
      <div className='navbar'>
        <Link to='/scan'>scan again</Link>
        <Link to ='#'>Edit</Link>
      </div>
      <h2 >Scan Completed!</h2>
      <div id='receipt-section'>
        <div className='item'>
          <p className='item-name'>Tonkotsu Udon</p>
          <p className='item-quantity'>2</p>
          <p className='item-price'>18.50</p>
        </div>
        <div className='item'>
          <p className='item-name'>Tempura Zaru Udon</p>
          <p className='item-quantity'>1</p>
          <p className='item-price'>20.25</p>
        </div>
        <div className='item'>
          <p className='item-name'>Tempura Udon</p>
          <p className='item-quantity'>1</p>
          <p className='item-price'>18.75</p>
        </div>
        <div className='item'>
          <p className='item-name'>Takoyaki</p>
          <p className='item-quantity'>1</p>
          <p className='item-price'>9.00</p>
        </div>
        <div className='total-section'>
          <p className='subtotal-price'>87.00</p>
          <div>
            <h1>Total:</h1>
            <p className='total-price'>105.00</p>
          </div>
        </div>
      </div>
      <Link to='/' className='long-button'>Confirm!</Link>
    </div>
    
  )
}
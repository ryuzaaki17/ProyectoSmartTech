import "./Navbar.css"
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <section className='header'>
      <h1 className='logo'>S<span>MAR</span>T<span>ECH</span></h1>
      <nav className='navbar'>
        <ul className='nav-links'>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>
      <div className='icons'>
        <button className='search-button'>
          <i className='fas fa-search'></i>
        </button>
        <Link to ="/carrito" className='icon-button'>
          <i className='fas fa-shopping-cart' ></i>
          <span className='counter'>3</span>
        </Link>
      </div>
    </section>
  )
}

export default Navbar

import { useLocation, Link } from 'react-router-dom';

function Nav() {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    return (
        <nav aria-label="Primary navigation">
            <ul>
                <li><Link to="/" className={isActive('/')}>Home</Link></li>
                <li><Link to="/about" className={isActive('/about')}>About</Link></li>
                <li><Link to="/menu" className={isActive('/menu')}>Menu</Link></li>
                <li><Link to="/booking" className={isActive('/booking')}>Booking</Link></li>
                <li><Link to="/order-online" className={isActive('/order-online')}>Order Online</Link></li>
                <li><Link to="/login" className={isActive('/login')}>Login</Link></li>
            </ul>
        </nav>
    )
}

export default Nav;
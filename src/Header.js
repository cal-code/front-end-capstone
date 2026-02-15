import Logo from './Logo.svg';
import Nav from './Nav';

function Header() {
    return (
        <header>
            <h1>
                <img src={Logo} alt="Little Lemon Logo" />
            </h1>
            <Nav />
        </header>
    )
}

export default Header;

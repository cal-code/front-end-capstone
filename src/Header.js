import Logo from './Logo.svg';
import Nav from './Nav';

function Header() {
    return (
        <header>
            <h1>
                <a href="/">
                    <img src={Logo} alt="Little Lemon Logo" />
                </a>
            </h1>
            <Nav />
        </header>
    )
}

export default Header;

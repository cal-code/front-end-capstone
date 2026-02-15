import Logo from './Logo.svg';

function Header() {
    return (
        <header>
            <h1>Little Lemon</h1>
            <img src={Logo} alt="Little Lemon Logo" />
        </header>
    )
}

export default Header;

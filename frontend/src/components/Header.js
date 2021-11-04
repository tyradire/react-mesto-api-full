import { Link } from 'react-router-dom';

function Header(props) {
  
  return (
    <header className="header">
      <img src={props.logo} alt="Логотип" className="header__logo"/>
      <div className="header__status">
        <p className="header__email">{props.userEmail}</p>
        <Link className={props.loggedIn ? "header__button header__button_logged" : "header__button"} onClick={props.handleSignOut} to={props.headerState.link}>{props.headerState.name}</Link>
      </div>
    </header>
  )
}

export default Header;
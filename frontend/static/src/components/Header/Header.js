import { NavLink } from 'react-router-dom';

function Header(props){

    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark nav">
            <div className="container">
                <a className="navbar-brand" style={{fontFamily: 'Oswald', weight: 700}} href="/">Articles App</a>
                {/* <button className="Nabar-toggler" type="button" data-toggle="collapse" data-target="navbarResponsive" aria-controls="navbarResponsive" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button> */}
                <div className="collapse navbar-collapse nav justify-content-end text-light" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto text-light">
                        <li className="nav-item mt-2 mx-1">
                            <NavLink  className="" style={{textDecoration: 'none'}} to='/'>Home</NavLink>
                        </li>
                        {/* <li className="nav-item">
                            <NavLink to='/profile'>Profile</NavLink>
                        </li> */}

                        <li className="nav-item mt-2">
                            <NavLink  style={{textDecoration: 'none'}} to='/myarticles'>My Articles</NavLink>
                        </li>
                        <li className="nav-item mt-2 mx-1">
                            <NavLink style={{textDecoration: 'none'}} to='/register'>Register</NavLink>
                        </li>
                        <li className="nav-item mt-2 mx-1">
                            <NavLink  style={{textDecoration: 'none'}} to='/login'>Login</NavLink>
                        </li>
                        <li className="btn-link">
                            <button style={{textDecoration: 'none'}} className="btn btn-link logout text-light" type="button" onClick={() => props.handleLogoutSubmit()}>Logout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header;
import { NavLink } from 'react-router-dom';
import { useState } from 'react'

function Header(props){
    const state = {date: new Date()}
   


    if(props.admin.is_staff && props.isAuth){
        

    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark nav">
            <div className="container">
                <a className="navbar-brand" style={{fontFamily: 'Oswald', weight: 700, fontSize: '30px'}} href="/">Chatty News</a>
                <div class="date">
                    <p className="d-flex justify-content-center"style={{color: 'white', fontFamily: 'Oswald',}}>  {state.date.toLocaleDateString()}</p>
                </div>
                <div className="collapse navbar-collapse nav justify-content-end text-light" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto text-light">
                        <li className="nav-item mt-2 mx-1">
                            <NavLink  className="" style={{textDecoration: 'none'}} to='/'>Home</NavLink>
                        </li>
                        {/* <li className="nav-item">
                            <NavLink to='/profile'>Profile</NavLink>
                        </li> */}

                        <li className="nav-item mt-2">
                            <NavLink  style={{textDecoration: 'none'}} to='/admin'>Admin</NavLink>
                        </li>
                        {/* <li className="nav-item mt-2 mx-1">
                            <NavLink style={{textDecoration: 'none'}} to='/register'>Register</NavLink>
                        </li>
                        <li className="nav-item mt-2 mx-1">
                            <NavLink  style={{textDecoration: 'none'}} to='/login'>Login</NavLink>
                        </li> */}
                        <li className="btn-link">
                            <button style={{textDecoration: 'none'}} className="btn btn-link logout text-light" type="button" onClick={() => props.handleLogoutSubmit()}>Logout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

     )}
 if(props.isAuth && !props.admin.is_staff){
     return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark nav">
            <div className="container">
                <a className="navbar-brand" style={{fontFamily: 'Oswald', weight: 700}} href="/">Chatty News</a>
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
                        {/* <li className="nav-item mt-2 mx-1">
                            <NavLink style={{textDecoration: 'none'}} to='/register'>Register</NavLink>
                        </li> */}
                        {/* <li className="nav-item mt-2 mx-1">
                            <NavLink  style={{textDecoration: 'none'}} to='/login'>Login</NavLink>
                        </li> */}
                        <li className="btn-link">
                            <button style={{textDecoration: 'none'}} className="btn btn-link logout text-light" type="button" onClick={() => props.handleLogoutSubmit()}>Logout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
                    }

    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark nav">
            <div className="container">
                <a className="navbar-brand" style={{fontFamily: 'Oswald', weight: 700}} href="/">Chatty News</a>
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
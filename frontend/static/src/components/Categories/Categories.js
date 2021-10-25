import { NavLink } from 'react-router-dom';

function Categories(props){

    return(
        <>
        <header className="headerTitle">Articles App</header>
        <nav className="navbar navbar-expand-lg bg-dark">
            <div className="container">
                <a className="navbar-brand" href="/">Categories</a>
                <button className="Nabar-toggler" type="button" data-toggle="collapse" data-target="navbarResponsive" aria-controls="navbarResponsive" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink to='/all'>All</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/local'>Local</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/World'>World</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        </>
    )
}

export default Categories;
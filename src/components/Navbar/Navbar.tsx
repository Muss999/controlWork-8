import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary mb-3">
            <div className="container">
                <Link to={"/"} className="navbar-brand">
                    QUOTES CENTRAL
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink to={"/quotes"} className="nav-link">
                                Quotes
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={"/add-quote"} className="nav-link">
                                Add new quote
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

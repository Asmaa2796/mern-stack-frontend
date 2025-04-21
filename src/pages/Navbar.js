import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg py-3 shadow-sm">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand">
          <img src={"../img/logo.png"} alt="" />
          </span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fa fa-bars text-white"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto p-0">
            <li className="nav-item">
              <Link to="/">
                <span className="nav-link">Home</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about">
                <span className="nav-link">About</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/books">
                <span className="nav-link">Books</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/books/add">
                <span className="nav-link">New book</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

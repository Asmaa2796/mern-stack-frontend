import { Link } from "react-router-dom";

const Banner = ({ currentPage, sub, to }) => {
  return (
    <div className="banner">
      <div aria-label="breadcrumb">
        <ol className="list-unstyled p-0 breadcrumb bg-light p-3 rounded border">
          <li className="mx-1">
            <Link to="/">Home</Link>
          </li>
          <li className="mx-1">/</li>
          {sub && (
            <>
              <li className="mx-1">
                <Link to={to}>{sub}</Link>
              </li>
              <li className="mx-1">/</li>
            </>
          )}
          <li className="active" aria-current="page">
            {currentPage}
          </li>
        </ol>
      </div>
    </div>
  );
};

export default Banner;

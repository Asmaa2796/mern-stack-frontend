import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import config from "../../api/baseUrl";
const { baseURL, photoBaseURL } = config;
const ViewBooks = () => {
  const [books, setBooks] = useState([]);
  const getBooks = async () => {
    try {
      const response = await axios.get(`${baseURL}/books`);

      if (response.status === 200 && Array.isArray(response.data)) {
        setBooks(response.data);
      } else {
        console.log("Unexpected response:", response.data);
        setBooks([]); // fallback
      }
    } catch (err) {
      console.log(err);
      setBooks([]);
    }
  };
  useEffect(() => {
    document.title = "All Books";
    getBooks();
  }, []);
  return (
    <div className="book_view py-5">
      <div className="container">
        <h3>All Books</h3>
        <div className="row">
          {Array.isArray(books) && books.length > 0 ? (
            books.map((book) => (
              <div className="col-lg-6" key={book._id}>
                <div className="card shadow-sm border p-4 my-3">
                  <div className="row">
                    <div className="book_info col-lg-8">
                      <h4 className="sub-color"><i className="fa fa-caret-left"></i> {book.title}</h4>
                      <h5 className="text-color my-3"><i className="fa fa-pencil"></i> {book.author}</h5>
                      <b className="category">{book.category}</b>
                      <div className="desc-sm">{book.shortDesc}</div>
                      <hr />
                      <p className="line-height desc text-secondary">
                        {book.longDesc}
                      </p>
                      <Link to={`/books/${book._id}`}>
                        <span className="sec1-color">View details <i className="fa fa-angle-double-right"></i></span>
                      </Link>
                    </div>
                    <div className="col-lg-4">
                      <div className="book_cover border bg-light p-2 rounded d-flex justify-content-center align-items-center text-center">
                        <img
                          src={`${photoBaseURL}/${book.photo}`}
                          alt="Book Cover"
                          className="rounded"
                          style={{ width: "auto", maxHeight: "180px" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewBooks;
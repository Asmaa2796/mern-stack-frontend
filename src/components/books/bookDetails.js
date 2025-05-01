import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams, Link } from "react-router-dom";
import config from "../../api/baseUrl";
import { useEffect, useState } from "react";
import Banner from "../../pages/Banner";
const { baseURL, photoBaseURL } = config;
const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    document.title = "Book Details";
    const getBookDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${baseURL}/books/${id}`);
        if (response.status === 200) {
          console.log(response.data);
          setBook(response.data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getBookDetails();
  }, [id, navigate]);
  const onDelete = async () => {
    try {
      const response = await axios.delete(`${baseURL}/books/${id}`);
      if (response.status === 200) {
        toast.success("Book deleted successfully", {
          onClose: () => navigate("/books"),
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="book_view py-5">
      <div className="container">
        <Banner currentPage="Book details" sub="Books" to="/books" />
        {loading ? (
          <div className="skeleton-wrapper">
            <div className="skeleton-image mb-3"></div>
            <div className="skeleton-text mb-2"></div>
            <div className="skeleton-text mb-2"></div>
            <div className="skeleton-text short mb-2"></div>
          </div>
        ) : book ? (
          <div className="card shadow-sm border p-4 my-3">
            <div className="row">
              <div className="book_info col-lg-8">
                <h4 className="sub-color">
                  <i className="fa fa-caret-left"></i> {book.title}
                </h4>
                <h5 className="text-color my-3">
                  <i className="fa fa-pencil"></i> {book.author}
                </h5>
                <b className="category">{book.category}</b>
                <div>{book.shortDesc}</div>
                <hr />
                <p className="line-height desc text-secondary">
                  {book.longDesc}
                </p>

                <div class="d-flex justify-content-between">
                  <Link to={`/books/edit/${book._id}`}>
                    <span className="text-success">
                      Edit book <i className="fa fa-pencil"></i>
                    </span>
                  </Link>
                  <span
                    onClick={onDelete}
                    className="text-danger"
                    style={{ cursor: "pointer" }}
                  >
                    Delete <i className="fa fa-trash"></i>
                  </span>
                </div>
              </div>
              <div className="book_cover text-center col-lg-4">
                <img
                  src={`${photoBaseURL}/${book.photo}`}
                  alt="Book Cover"
                  style={{ width: "auto", maxHeight: "220px" }}
                />
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
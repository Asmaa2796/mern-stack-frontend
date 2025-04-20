import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import config from "../../api/baseUrl";
import categories from "../../api/data";
const { baseURL, photoBaseURL } = config;
const EditBook = () => {
  document.title = "Update Book";
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [longDesc, setLongDesc] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
  useEffect(() => {
    const updateBook = async () => {
      try {
        const response = await axios.get(`${baseURL}/books/${id}`);
        if (response.status === 200) {
          const book = response.data;
          setTitle(book.title);
          setAuthor(book.author);
          setCategory(book.category);
          setShortDesc(book.shortDesc);
          setLongDesc(book.longDesc);
          setPhotoPreview(`${photoBaseURL}/${book.photo}`);
          setBook(response.data);
        }
      } catch (error) {
        toast.error("Failed to load book data");
        console.error(error);
      }
    };
    updateBook();
  }, [id]);
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("category", category);
    formData.append("shortDesc", shortDesc);
    formData.append("longDesc", longDesc);
    if (photo) formData.append("photo", photo);

    try {
      const response = await axios.put(`${baseURL}/books/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 200) {
        toast.success("Book updated successfully",{
          onClose: () => navigate("/books")
        });
        
      } else {
        toast.warning("Failed to update the book");
      }
    } catch (error) {
      toast.error("Something went wrong during update");
      console.error(error);
    }
  };

  const handlePhotoOnChange = (e) => {
    const file = e.target.files[0];
    if (file) setPhoto(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="book py-5 form-style">
      <div className="container">
        <h4 className="text-center my-4 text-color">Update Book</h4>
        {book ? (
          <form className="shadow-sm" onSubmit={handleOnSubmit}>
            <label htmlFor="title">Book Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              name="title"
              id="title"
            />

            <label htmlFor="author">Book Author</label>
            <input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              name="author"
              id="author"
            />

            <label htmlFor="category">Book Category</label>
            <select
              value={category}
              name="category"
              id="category"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled>
                Select Category
              </option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.value}>
                  {cat.option}
                </option>
              ))}
            </select>

            <div className="file file--upload mt-2">
              <label htmlFor="input-file">
                <i className="fa fa-book"></i> Upload Book Cover
              </label>
              <input
                id="input-file"
                type="file"
                name="photo"
                accept="image/*"
                onChange={handlePhotoOnChange}
              />
            </div>

            {photoPreview && (
              <div className="image-preview">
                <img
                  src={photoPreview}
                  alt="Preview"
                  style={{ maxHeight: "100px" }}
                />
              </div>
            )}

            <label htmlFor="shortDesc">Short Description</label>
            <textarea
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
              required
              name="shortDesc"
              id="shortDesc"
            />

            <label htmlFor="longDesc">Long Description</label>
            <textarea
              value={longDesc}
              onChange={(e) => setLongDesc(e.target.value)}
              required
              name="longDesc"
              id="longDesc"
            />

            <button type="submit">Update</button>
          </form>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default EditBook;
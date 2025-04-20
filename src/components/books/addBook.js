import { useState ,useEffect} from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import categories from "../../api/data";
import axios from "axios";
import config from "../../api/baseUrl";
const { baseURL } = config;
const AddBook = () => {
  useEffect(() => {
    document.title = "Add Book";
  }, []);
  const navigate = useNavigate();
  // input fields
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [longDesc, setLongDesc] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!photo) {
      toast.error("Please upload a book cover photo.");
      return;
    }
    if (!category) {
      toast.error("Please select category");
      return;
    }
    // send data
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("category", category);
    formData.append("shortDesc", shortDesc);
    formData.append("longDesc", longDesc);
    if (photo) formData.append("photo", photo);

    try {
      const response = await axios.post(`${baseURL}/books`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        toast.success("Book added successfully", {
          onClose: () => navigate("/books")
        });
        // reset form
        setTitle("");
        setCategory("");
        setShortDesc("");
        setLongDesc("");
        setAuthor("");
        setPhoto(null);
        setPhotoPreview(null);
      } else {
        toast.warning("Error adding book", "Warning");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!", "Error");
    }
  };
  // display photo before submit
  const handlePhotoOnChange = (e) => {
    const file = e.target.files[0];
    if(file) setPhoto(file);
    // display photo
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoPreview(reader.result);
    }
    reader.readAsDataURL(file);
    console.log(file);
  }
  return (
    <div className="book form-style">
      <div className="container">
        <h4 className="text-center my-4 text-color">Add Book</h4>
        <form className="shadow-sm" onSubmit={handleOnSubmit}>
          <label htmlFor="title">Book Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <label htmlFor="author">Book Author</label>
          <input
            type="text"
            id="author"
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
          <label htmlFor="category">Book Category</label>
          <select
            id="category"
            value={category}
            name="category"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" disabled>
              Select Book Category
            </option>
            {categories.length > 0 ? (
              categories.map((cat) => (
                <option value={cat.value} key={cat.id}>
                  {cat.option}
                </option>
              ))
            ) : (
              <></>
            )}
          </select>
          <div className="file file--upload justify-content-start mt-2">
            <label htmlFor="input-file" className="no-label ml-0">
              <i className="fa fa-book"></i> Upload Book Cover
            </label>
            <input
              id="input-file"
              name="photo"
              type="file"
              accept="image/*"
              onChange={handlePhotoOnChange}
            />
          </div>
          {/* display photo */}
          {photoPreview && (
            <div className="image-preview">
              <img
                src={photoPreview}
                alt="Preview"
                style={{ width: "auto", maxHeight: "100px" }}
              />
            </div>
          )}
          <label htmlFor="shortDesc">Book Short Description</label>
          <textarea
            id="shortDesc"
            name="shortDesc"
            value={shortDesc}
            onChange={(e) => setShortDesc(e.target.value)}
            required
          ></textarea>
          <label htmlFor="longDesc">Book Long Description</label>
          <textarea
            id="longDesc"
            name="longDesc"
            value={longDesc}
            onChange={(e) => setLongDesc(e.target.value)}
            required
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
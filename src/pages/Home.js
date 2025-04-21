import { useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
    useEffect(() => {
        document.title = "Home";
    }, []);
      
    return (
        <div className='container py-5'>
            <h1>Here all content</h1>
            <Link to='/books/add'><span className="text-color">Add Book</span></Link>
            <br/>
            <Link to='/books'><span className="text-color">Books</span></Link>
        </div>
    );
}

export default Home;

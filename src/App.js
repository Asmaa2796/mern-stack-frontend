import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home';
// book routes
import AddBook from './components/books/addBook';
import ViewBooks from './components/books/viewBooks';
import BookDetails from './components/books/bookDetails';
import EditBook from './components/books/editBook';
import Navbar from './pages/Navbar';
import Footer from './pages/Footer';

function App() {
  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route exact='*' path='/' element={<Home/>}/>
        <Route path='/books' element={<ViewBooks/>}/>
        <Route path='/books/add' element={<AddBook/>}/>
        <Route path='/books/:id' element={<BookDetails/>}/>
        <Route path='/books/edit/:id' element={<EditBook/>}/>
      </Routes>
      <Footer/>
    </Router>
    <ToastContainer position="top-right" autoClose={1000} />
    </>
  );
}

export default App;

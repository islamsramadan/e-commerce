import { Routes, Route } from 'react-router-dom';

import './App.scss';
import SearchPage from './Pages/Search';
import Search from './common/Header/Search/Search';
import Footer from './common/Footer/Footer';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import SignUp from './Pages/SignUp/SignUp';
import NavbarComp from './components/Navabar/Navbar';
import ProductDetailsPage from './Pages/ProductDetails';
// import SearchPage from './Pages/Search';

function App() {
    return (
        <div className="App">
            <Search />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signUp" element={<SignUp />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/product/:id" element={<ProductDetailsPage />} />
                <Route path="*" element={<h1>can't find this page </h1>} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;

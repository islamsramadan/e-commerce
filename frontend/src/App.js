import './App.scss';
import SearchPage from './Pages/Search';
import Search from './common/Header/Search/Search';
import { Routes, Route } from 'react-router-dom';
import Footer from './common/Footer/Footer';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import SignUp from './Pages/SignUp/SignUp';
import Profile from './Pages/Profile/Profile';
import Orders from './Pages/Orders/Orders';
import Cart from './Pages/Cart/Cart';

function App() {
    return (
        <div className="App">
            <Search />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signUp" element={<SignUp />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="*" element={<h1>can't find this page </h1>} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;

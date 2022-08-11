import { Routes, Route } from 'react-router-dom';

import './App.scss';
import SearchPage from './Pages/Search';
import Search from './common/Header/Search/Search';
import Loader from './common/Loader/Loader';
import Footer from './common/Footer/Footer';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import SignUp from './Pages/SignUp/SignUp';
import Profile from './Pages/Profile/Profile';
import Orders from './Pages/Orders/Orders';
import Cart from './Pages/Cart/Cart';
import NavbarComp from './components/Navabar/Navbar';
import ProductDetailsPage from './Pages/ProductDetails';
import AdminPage from './Pages/Admin';
import { logout } from './store/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import RequireAuth from './RequireAuth';
import UnAuthorized from './Pages/UnAuthorized/UnAuthorized';

function App() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    return (
        <div className="App ">
            <Search />
            <button
                className="btn btn-primary m-3"
                onClick={() => {
                    let user = JSON.parse(localStorage.getItem('token'));
                    console.log('currentUser', user);
                }}
            >
                current user
            </button>
            <button
                onClick={() => {
                    dispatch(logout());
                    console.log('logout');
                }}
            >
                logout
            </button>
            <Routes>
                {/*public routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signUp" element={<SignUp />} />

                {/*protected routes */}
                <Route element={<RequireAuth allowedRoles={['customer']} />}>
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/product/:id" element={<ProductDetailsPage />} />
                </Route>

                <Route element={<RequireAuth allowedRoles={['customer', 'business']} />}>
                    <Route path="/profile" element={<Profile />} />
                </Route>

                {/*Permission role based routes */}
                <Route element={<RequireAuth allowedRoles={['admin']} />}>
                    <Route path="/admin/*" element={<AdminPage />} />
                </Route>

                <Route path="/unauthorized" element={<UnAuthorized />} />
                <Route path="*" element={<h1>can't find this page </h1>} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;

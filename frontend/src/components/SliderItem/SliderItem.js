import productImg from '../../assets/home-slider/slide-1.png';
import PrimaryButton from '../../common/PrimaryButton/Button';
import './SliderItem.css';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCategoryProducts } from '../../store/products/productSlice';

export default function SliderItem({ category }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onClickCategoryHandel = (categoryId) => {
        dispatch(getCategoryProducts(categoryId));
        navigate('search');
    };
    return (
        <div className="home-slider-item">
            <div className="row">
                <div className="col-12 col-lg-8">
                    <div className="home-slider-left align-self-center">
                        <h1 className="fw-bold text-capitalize home-slider-heading">{category.name}</h1>
                        <p className="home-slider-description fs-5">{category.description}</p>
                        {/* <PrimaryButton onClick={() => onClickCategoryHandel(category._id)} /> */}
                        <button
                            onClick={() => onClickCategoryHandel(category._id)}
                            className="text-white rounded-4  fs-5 button-primary"
                        >
                            <div className="text-decoration-none text-white">visit collection</div>
                        </button>
                    </div>
                </div>
                <div className="col-4 d-none d-lg-block">
                    <div className="home-slider-right">
                        <img src={productImg} alt="t-shirt" />
                    </div>
                </div>
            </div>
        </div>
    );
}

import Slider from 'react-slick';
import SliderItem from '../SliderItem/SliderItem';
import './Slider.style.css';

import { useSelector, useDispatch } from 'react-redux';

import { useEffect } from 'react';
import { getCategories } from '../../store/categories/categorySlice';

export default function HomeSlider() {
    const dispatch = useDispatch();
    const { categories } = useSelector((state) => state.categories);
    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);
    // console.log(categories);

    const settings = {
        dots: true,
        infinite: true,
        speed: 900,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        appendDots: (dots) => {
            return <ul className="">{dots}</ul>;
        },
    };

    return (
        <div className="home-slider py-5 mb-5 bg-white">
            <div className="container">
                <Slider {...settings}>
                    {categories.map((category) => (
                        <SliderItem key={category._id} category={category} />
                    ))}
                </Slider>
            </div>
        </div>
    );
}

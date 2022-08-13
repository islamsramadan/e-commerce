import './CategoryPreview.style.css';
import { AiOutlineClockCircle } from 'react-icons/ai';
import Slider from 'react-slick';
import ProductCard from '../ProductCard/ProductCard';
import { Link } from 'react-router-dom';
import { AiOutlineFire } from 'react-icons/ai';
import HeadingPrimary from '../HeadingPrimary';

import { useDispatch, useSelector } from 'react-redux';
import { getTopRatedProducts, getLastAddedProducts } from '../../store/products/productSlice';
import { useEffect } from 'react';

export default function CategoryPreview() {
    const dispatch = useDispatch();
    const { topRatedProducts, lastAddedProducts } = useSelector((state) => state.products);
    useEffect(() => {
        dispatch(getTopRatedProducts());
        dispatch(getLastAddedProducts());
    }, []);

    console.log(`topRatedProducts`, topRatedProducts);
    console.log(`lastAddedProducts`, lastAddedProducts);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
        // appendDots: (dots) => {
        //   return <ul>{dots}</ul>;
        // },
    };

    function NextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                // style={{ ...style, display: "block", background: "green" }}
                onClick={onClick}
            />
        );
    }

    function PrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                // style={{ ...style, display: "block", background: "green" }}
                onClick={onClick}
            />
        );
    }
    return (
        <>
            <div className="category-preview">
                <div className="container">
                    <div className="preview-upper d-flex justify-content-between align-items-center">
                        <HeadingPrimary title="Top Rated" icon={<AiOutlineFire className="me-2" />} />
                    </div>
                    <div className=" my-5">
                        <div className="container">
                            <Slider {...settings}>
                                {topRatedProducts.map((product) => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>

            <div className="category-preview">
                <div className="container">
                    <div className="preview-upper d-flex justify-content-between align-items-center">
                        <HeadingPrimary title="Last Added" icon={<AiOutlineClockCircle className="me-2" />} />
                    </div>
                    <div className=" my-5">
                        <div className="container">
                            <Slider {...settings}>
                                {/* {lastAddedProducts.map((product) => (
                                    <ProductCard key={product._id} product={product} />
                                ))} */}
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

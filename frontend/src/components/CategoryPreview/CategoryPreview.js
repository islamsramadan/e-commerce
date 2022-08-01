import "./CategoryPreview.style.css";
import { IoShirtOutline } from "react-icons/io5";
import Slider from "react-slick";
import ProductCard from "../ProductCard/ProductCard";
import { Link } from "react-router-dom";
import { AiOutlineRight } from "react-icons/ai";
import HeadingPrimary from "../HeadingPrimary";

export default function CategoryPreview() {
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
    <div className="category-preview">
      <div className="container">
        <div className="preview-upper d-flex justify-content-between align-items-center">
          <HeadingPrimary
            title="Clothes category"
            icon={<IoShirtOutline className="me-2" />}
          />
          <Link to="/" className="text-decoration-none text-black fw-semibold">
            visite collection
            <AiOutlineRight className="ms-1" />
          </Link>
        </div>
        <div className=" my-5">
          <div className="container">
            <Slider {...settings}>
              {[1, 2, 3, 4].map((item, index) => (
                <ProductCard key={index} />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}
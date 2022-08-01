import Slider from "react-slick";
import SliderItem from "../SliderItem/SliderItem";
import "./Slider.style.css";

export default function HomeSlider() {
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
          {[1, 2, 3, 4].map((item, index) => (
            <SliderItem key={index} />
          ))}
        </Slider>
      </div>
    </div>
  );
}

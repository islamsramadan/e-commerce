import productImg from "../../assets/home-slider/slide-1.png";
import PrimaryButton from "../../common/PrimaryButton/Button";
import "./SliderItem.css";

export default function SliderItem() {
  return (
    <div className="home-slider-item">
      <div className="row">
        <div className="col-12 col-lg-8">
          <div className="home-slider-left align-self-center">
            <h1 className="fw-bold text-capitalize home-slider-heading">
              50 % off for your first shopping
            </h1>
            <p className="home-slider-description fs-5">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque
              architecto accusamus illum? Et odit ex mollitia doloremque ea,
              suscipit perferendis enim adipisci sunt! Quos nobis, minima
              tempore deserunt ea illo.
            </p>
            <PrimaryButton></PrimaryButton>
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

import "./Footer.style.css";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { GoLocation } from "react-icons/go";

export default function Footer() {
  return (
    <footer className=" px-3 pt-5 pb-1 footer text-white">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-4 mb-3 mb-md-0">
            <h2 className="footer-logo mb-3">logo</h2>
            <p className="footer-description lead">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Consectetur accusantium amet omnis, ipsam consequatur maxime quo
              illo{" "}
            </p>
          </div>
          <div className="col-12 col-lg-4 mb-3 mb-md-0 text-lg-center">
            <h4 className="mb-3">Our talented team</h4>
            <ul className="p-0 team-list">
              <li className="my-2">
                <a href="#" className=" text-white text-decoration-none">
                  Islam Mansour
                </a>
              </li>
              <li className="my-2">
                <a href="#" className=" text-white text-decoration-none">
                  Ahmed Ibrahim
                </a>
              </li>
              <li className="my-2">
                <a href="#" className=" text-white text-decoration-none">
                  Ahmed Pasher
                </a>
              </li>
              <li className="my-2">
                <a href="#" className=" text-white text-decoration-none">
                  Mo`omen Sayed
                </a>
              </li>
              <li className="my-2">
                <a href="#" className=" text-white text-decoration-none">
                  Osama Abdellatif
                </a>
              </li>
            </ul>
          </div>
          <div className="col-12 col-lg-3 ms-auto mb-3 mb-md-0">
            <h4>Contact Us</h4>
            <ul className=" ps-0 contact-list">
              <li className="my-3 d-flex align-items-center">
                <AiOutlineMail className="me-2" />
                <p className="mb-0">amzon@outlook.com</p>
              </li>
              <li className="my-3 d-flex align-items-center">
                <AiOutlinePhone className="me-2" />
                <p className="mb-0">+2082848843</p>
              </li>
              <li className="my-3 d-flex align-items-center">
                <GoLocation className="me-2" />
                <p className="mb-0">Egypt-cairo</p>
              </li>
            </ul>
          </div>
        </div>
        <hr />
        <p className="text-center">
          Made with 💓 Group-6@ITI ©2022 All rights reserved
        </p>
      </div>
    </footer>
  );
}

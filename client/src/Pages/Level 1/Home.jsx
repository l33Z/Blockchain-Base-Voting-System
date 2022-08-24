import React from "react";
import Navbar from "../../Components/Navbar";
import "./Home.css";
import { NavLink } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import homeBg1 from "../../assets/homeBg1.png";
import homeBg2 from "../../assets/homeBg2.png";
import homeBg3 from "../../assets/homeBg3.png";
import homeBg4 from "../../assets/homeBg4.png";
import homeBg5 from "../../assets/homeBg5.png";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="homeContainer">
        <div className="homeMain">
          <div className="leftHomeSide">
            <div className="leftMainHome">
              <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                pagination={{
                  clickable: true,
                }}
                autoplay={{
                  delay: 1000,
                  disableOnInteraction: false,
                }}
                modules={[Pagination, Autoplay]}
                className="mySwiper votingImagesContainer"
              >
                <SwiperSlide>
                  <img src={homeBg1} alt="img1" className="homeImg" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={homeBg2} alt="img1" className="homeImg" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={homeBg3} alt="img1" className="homeImg" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={homeBg4} alt="img1" className="homeImg" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={homeBg5} alt="img1" className="homeImg" />
                </SwiperSlide>
              </Swiper>
            </div>
          </div>

          <div className="rightHomeSide">
            <h1>
              The Next Generation of Voting
              <br />
              Based On
              <span id="blockchain">Blockchain</span>
            </h1>

            <h2 id="homeInfo">
              Conduct online elections with complete <br />
              confidence in their reliability.
            </h2>

            <div className="homeBtnGroup">
              <NavLink to="/login" className="letstart">
                Let's Start
              </NavLink>
              <NavLink to="/about" className="readmore">
                Read More
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

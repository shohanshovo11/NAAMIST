import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image from "../../assets/name-day.jpg";
import { Link } from "react-router-dom";

const heroItems = [
  {
    image: image,
    motto: "Reconnect with your roots",
    description:
      "Rediscover memories, reconnect with friends, and reignite your bond with our Alumni community.",
  },
  {
    image: "/images/events/2/am_2.jpg",
    motto: "Explore the Universe",
    description:
      "Dive into the mysteries of the cosmos with our cutting-edge space research community.",
  },
  {
    image: "/images/events/3/1.jpg",
    motto: "Experience Tranquility",
    description:
      "Find peace and connect with nature through our serene and beautiful campus environment.",
  },
];

function HeroSlider() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="hero-slider w-full overflow-hidden relative">
      <Slider {...settings}>
        {heroItems.map((item, index) => (
          <div key={index} className="relative">
            <img
              src={item.image}
              alt={`Slide ${index + 1}`}
              className="w-full h-[300px] sm:h-[400px] md:h-[calc(100vh-70px)] object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center">
              <div className="container mx-auto px-4 text-white max-w-screen-xl text-left">
                <div className="text-left w-full md:w-2/3">
                  <h2 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-4 font-sans">
                    {item.motto}
                  </h2>
                  <p className="text-sm sm:text-lg md:text-2xl font-sans font-extralight mb-2 sm:mb-4">
                    {item.description}
                  </p>
                  <Link to={"/authorization"}>
                    <button className="bg-secondary text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-lg transition-transform transform hover:scale-105 hover:opacity-90">
                      Get Connected
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default HeroSlider;

import { useState, useEffect, useRef, useCallback } from 'react';
import Axios from '../../utils/axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { Skeleton } from "antd";

const imgUrl = import.meta.env.VITE_IMAGE_URL;

function HeroSlider() {
  const user = useAuthUser();
  const [slides, setSlides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const lastFetchRef = useRef(null);

  const fetchData = useCallback(async () => {
    // If data was fetched in the last 5 minutes, don't fetch again
    if (lastFetchRef.current && Date.now() - lastFetchRef.current < 300000) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await Axios.get('/hero-slider');
      setSlides(response.data);
      lastFetchRef.current = Date.now();
    } catch (error) {
      console.error('Error fetching slides:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isLoading) {
    return (
      <div className="w-full">
        <Skeleton.Image active className="w-full h-[400px]" />
      </div>
    );
  }

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
  };

  return (
    <div className="hero-slider w-full overflow-hidden relative">
      <Slider {...settings}>
        {slides.map((item, index) => (
          <div key={index} className="relative">
            <img
              src={`${imgUrl}/slider/${item.sliderImage}`}
              alt={`Slide ${index + 1}`}
              className="w-full h-[300px] sm:h-[400px] md:h-[calc(100vh-70px)] object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center">
              <div className="container mx-auto px-4 text-white max-w-screen-xl text-left">
                <div className="text-left w-full md:w-2/3">
                  <h2 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-4 font-sans">
                    {item.title}
                  </h2>
                  <p className="text-sm sm:text-lg md:text-2xl font-sans font-extralight mb-2 sm:mb-4">
                    {item.description}
                  </p>
                   {
                    user && (
                      <button className="bg-secondary text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-lg transition-transform transform hover:scale-105 hover:opacity-90">
                        Get Connected
                      </button>
                    )
                  }
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

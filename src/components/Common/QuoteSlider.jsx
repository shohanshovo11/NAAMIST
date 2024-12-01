import { useState, useEffect } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Axios from '../../utils/axios';

function QuoteSlider() {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await Axios.get('/quotes');
        setQuotes(response.data);
      } catch (error) {
        console.error('Error fetching quotes:', error);
      }
    };
    
    fetchQuotes();
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    cssEase: "linear"
  };

  return (
    <div className="w-full bg-primary flex justify-center items-center py-10 md:py-16 lg:py-20 mb-10">
      <Slider {...settings} className="w-full overflow-hidden">
        {quotes.map((quote, index) => (
          <div key={index} className="flex justify-center items-center px-4">
            <div className="w-full max-w-screen-lg mx-auto flex flex-col text-center">
              <h2 className="text-lg md:text-xl lg:text-2xl text-white font-extralight leading-relaxed md:leading-snug lg:leading-loose tracking-wider">
                {quote.text}
              </h2>
              <h3 className="text-base md:text-lg lg:text-xl text-white mt-4 self-end">
                {quote.author}
              </h3>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default QuoteSlider;

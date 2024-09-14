import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function QuoteSlider() {
  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const quotes = [
    {
      text: `"It is my utmost pleasure to thank you all once again from the depths of my heart and to look forward earnestly to your continuing involvement in the coming years as we march ahead in unison toward a new zenith of achievements."`,
      author: "- Cdre Md Mohidul Hasan, (E), OSP, psc, BN",
    },
    {
      text: `Welcome to the start of an incredible journey! The experiences and friendships you build here will last a lifetime. We can’t wait to see you grow and join our proud alumni family.
      Wishing you success and a bright future ahead!`,
      author: "- Md. Sakib-Ul-Alam, President(Name Alumni Association)",
    },
    {
      text: `Your journey is just beginning, but soon, you’ll stand where we do now — proud alumni of this incredible institution. Embrace every moment, challenge yourself, and remember, you’re not just making memories, you’re creating your legacy.`,
      author: "- Hasan Ruhan Rabbi, VP(Name Alumni Association)",
    },
  ];

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

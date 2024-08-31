import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function QuoteSlider() {
  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    // arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const quotes = [
    {
      text: `"It is my utmost pleasure to thank you all once again from the depths of my heart and to look forward earnestly to your continuinng involvement in the coming years as we march ahead in unison toward a new zenith of achivements."`,
      author: "- Cdre Md Mohidul Hasan, (E), OSP, psc, BN",
    },
    {
      text: `"Alumni connections are the lifeblood of our community, and your ongoing support drives our mission forward. Together, we achieve greatness."`,
      author: "- Dr. Jane Doe",
    },
    {
      text: `"Education is the foundation upon which we build our future. The strength of our alumni network ensures that we continue to thrive and evolve."`,
      author: "- Prof. John Smith",
    },
  ];

  return (
    <div className=" w-full h-[300px] bg-primary flex justify-center items-center mb-10">
      <Slider {...settings} className=" w-full overflow-hidden">
        {quotes.map((quote, index) => (
          <div key={index} className="flex justify-center items-center">
            <div className="mx-auto w-3/6 flex flex-col">
              <h2 className="text-2xl text-white font-extralight leading-10 tracking-[3.4px]">
                {quote.text}
              </h2>
              <h3 className="text-xl text-white mt-4 self-end">
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

function NameGallery() {
  const alumniImages = [
    "/images/events/2/am_1.jpg",
    "/images/events/2/am_2.jpg",
    "/images/events/2/am_3.jpg",
    "/images/events/2/am_4.jpg",
    "/images/events/3/1.jpg",
    "/images/events/2/am_5.jpg",
  ];

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-primary">
        NAME Alumni Gallery
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {alumniImages.map((image, index) => (
          <div key={index} className="overflow-hidden rounded-lg shadow-lg">
            <img
              src={image}
              alt={`Alumni ${index + 1}`}
              className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button className="px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-black transition-colors duration-300">
          View More
        </button>
      </div>
    </div>
  );
}

export default NameGallery;

// Hero Section Component
const HeroSection = ({ title, imageUrl }) => {
  return (
    <div
      className="w-full h-48 bg-cover bg-center relative flex items-center justify-center"
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      {/* Content */}
      <h1 className="relative text-4xl font-bold text-white">{title}</h1>
    </div>
  );
};

export default HeroSection;

import HeroSection from "../Common/HeroSection";
import erganogram from "../../assets/erganogram.png";
import { Helmet } from "react-helmet-async";

const AboutUs = () => {
  return (
    <>
      <Helmet>
        <title>About Us - NAAMIST | NAME Alumni Association of MIST</title>
        <meta
          name="description"
          content="Learn about NAAMIST, the NAME Alumni Association of MIST. Connect with a global network of MIST NAME alumni, discover our mission, and get involved."
        />
        <meta
          name="keywords"
          content="MIST NAME Alumni, NAAMIST, Naval Architecture and Marine Engineering, MIST Alumni Network, Alumni Bond, Military Institute of Science and Technology, Alumni Association"
        />
        <meta
          property="og:title"
          content="About Us - NAAMIST | NAME Alumni Association of MIST"
        />
        <meta
          property="og:description"
          content="NAAMIST promotes the interests, welfare, and educational aims of MIST alumni, establishing a lifetime bond with the university."
        />
        <meta
          property="og:image"
          content="https://mist.ac.bd/storage/photos/name/10-1024x683.jpg"
        />
        <meta
          property="og:url"
          content="https://www.namealumnimist.com/about"
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="About Us - NAAMIST | NAME Alumni Association of MIST"
        />
        <meta
          name="twitter:description"
          content="Learn about NAAMIST, the NAME Alumni Association of MIST. Discover our mission, and get involved with the global alumni network."
        />
        <meta
          name="twitter:image"
          content="https://mist.ac.bd/storage/photos/name/10-1024x683.jpg"
        />

        {/* Canonical Link */}
        <link rel="canonical" href="/about-us" />
      </Helmet>
      <HeroSection
        imageUrl={"https://mist.ac.bd/storage/photos/name/10-1024x683.jpg"}
        title={"About Us"}
      />
      <div className="max-w-screen-md mx-auto p-6">
        <section className="mb-8">
          <h1 className="text-3xl font-bold text-center text-primary">
            MIST NAME Alumni Network
          </h1>
          <p className="text-lg text-center text-gray-600 mt-4">
            Join the exclusive network of the verified MIST NAME Alumni
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-primary">About MIST</h2>
          <p className="text-gray-700 mt-4 leading-relaxed">
            The Military Institute of Science and Technology (MIST) and its
            predecessor institutions are among the most recognized and
            prestigious educational institutions in Bangladesh. MIST has
            maintained a rich heritage and proudly served the nation by
            producing graduate engineers with many accomplishments since its
            inception. Many MIST graduates have left their mark in research,
            science & technology across the globe. A large number of MIST
            graduates are working as professional engineers, university
            teachers, researchers, IT specialists, programmers, and in other
            professional areas in all major cities worldwide.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-primary">Our Bond</h2>
          <p className="text-gray-700 mt-4 leading-relaxed">
            The MIST alumni share a strong common bond through their prior
            association with MIST. A common forum reflecting the MIST tie and
            bond among themselves is both needed and justified. The NAAMIST
            (National Alumni Association of MIST) was formed in 2004 with this
            in mind. The vision of NAAMIST is to create an engaging and mutually
            beneficial lifetime link between the Military Institute of Science
            and Technology and its community of alumni.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-primary">Our Mission</h2>
          <p className="text-gray-700 mt-4 leading-relaxed">
            NAAMIST promotes the interests, welfare, and educational aims of
            MIST and its alumni, establishes and maintains a mutually beneficial
            relationship between the university and its alumni, and encourages
            lifelong engagement of alumni with their fellow alumni and the
            university community.
          </p>
          <p className="text-gray-700 mt-4 leading-relaxed">
            NAAMIST also promotes and supports MIST students in the areas of
            research and education, scholarships, and projects/events by
            addressing financial and bureaucratic needs. NAAMIST always
            acknowledges the achievements of alumni members, faculty, and
            students.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-primary">
            Students and Alumni Demographics
          </h2>
          <ul className="text-gray-700 mt-4 list-disc list-inside">
            <li>
              2000+ undergraduate students and 300+ postgraduate students from
              the host country and 57 OIC member states.
            </li>
            <li>Over 5500 alumni.</li>
            <li>2000+ alumni serving across the world.</li>
            <li>3000+ alumni residing in the host country.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-primary">
            Connect with Us
          </h2>
          <p className="text-gray-700 mt-4 leading-relaxed">
            NAAMIST represents the interests of MIST graduates worldwide. We are
            committed to keeping our alumni connected, involved, and maintaining
            long-lasting brotherhood within the alumni community.
          </p>
          <p className="text-lg text-center text-gray-600 mt-4">
            Connect with the MIST Alumni Network platform, exclusively for MIST
            Alumni only.
          </p>
        </section>

        <section className="mt-4">
          <div>
            <img src={erganogram} alt="Erganogram" />
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutUs;

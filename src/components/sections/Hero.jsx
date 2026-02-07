
const Hero = () => {
  return (
    <section
      id="home"
      className="relative pt-16 overflow-hidden text-white"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/1200x/be/c1/37/bec137201cce32e6b1645cc0dae1ef04.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Glow particles */}
      <div className="particles"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-40 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-md">
          Visionary Achiever Social&apos;s Club
        </h1>

        <h3 className="text-xl md:text-2xl mb-8 text-white">
          Empowering Success Through Connection
        </h3>

        <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto text-white">
          Join Lagos&apos;s premier community of professionals, entrepreneurs, and
          achievers committed to personal growth, networking, and collective
          success.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#contact"
            className="bg-vasc-orange text-white px-8 py-3 rounded-xl font-semibold hover:bg-vasc-gold transition-all shadow-xl hover:shadow-2xl"
          >
            Become a Member
          </a>

          <a
            href="#about"
            className="border-2 border-vasc-orange text-vasc-orange bg-white/90 px-8 py-3 rounded-xl font-semibold hover:bg-vasc-orange hover:text-white transition-all shadow-md hover:shadow-xl"
          >
            Learn More
          </a>
        </div>
      </div>

      <div className="relative text-center pb-8">
        <svg
          className="h-8 w-8 mx-auto animate-bounce text-vasc-orange"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
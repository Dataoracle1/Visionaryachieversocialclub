const About = () => {
  const values = [
    {
      icon: (
        <svg className="h-10 w-10 text-vasc-orange mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
        </svg>
      ),
      title: 'Community',
      description: 'Building lasting relationships among achievers',
    },
    {
      icon: (
        <svg className="h-10 w-10 text-vasc-orange mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
        </svg>
      ),
      title: 'Excellence',
      description: 'Striving for the highest standards in all we do',
    },
    {
      icon: (
        <svg className="h-10 w-10 text-vasc-orange mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
      ),
      title: 'Growth',
      description: 'Continuous personal and professional development',
    },
    {
      icon: (
        <svg className="h-10 w-10 text-vasc-orange mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
        </svg>
      ),
      title: 'Impact',
      description: 'Creating positive change in our community',
    },
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-vasc-navy mb-4">
            About Us
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Building a community of excellence in Lagos since 2024
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-bold text-vasc-navy mb-4">
              Our Mission
            </h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Achiever Social&apos;s Club is dedicated to fostering a vibrant
              community of ambitious professionals and entrepreneurs in Lagos. We
              provide a platform for meaningful connections, continuous learning,
              and collaborative growth.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Through our carefully curated events, workshops, and networking
              opportunities, we empower our members to achieve their personal and
              professional goals while contributing to the growth of Nigeria&apos;s
              business ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-vasc-orange/10 p-6 rounded-lg hover:shadow-lg transition-shadow">
                {value.icon}
                <h4 className="font-bold text-vasc-navy mb-2">{value.title}</h4>
                <p className="text-sm text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
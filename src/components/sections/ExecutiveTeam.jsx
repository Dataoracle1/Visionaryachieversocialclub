const ExecutiveTeam = () => {
  const executives = [
    {
      name: 'AbdulHameed Salawu',
      position: 'President',
      description: 'Leading the club\'s strategic vision and fostering growth across all member sectors',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    },
    {
      name: 'Abdullahi Eneji Abubakar',
      position: 'Vice President',
      description: 'Coordinating member engagement and overseeing club operations',
      image: 'https://i.postimg.cc/hvRQVgSF/Whats-App-Image-2026-02-05-at-8-55-31-PM.jpg',
    },
    {
      name: 'Ibrahim Otaru',
      position: 'General Secretary',
      description: 'Managing communications, documentation, and member records',
      image: 'https://i.postimg.cc/LX320MzD/secretary-jpg.jpg',
    },
    {
      name: 'Aisha Jameel',
      position: 'Treasurer',
      description: 'Overseeing financial management and ensuring fiscal responsibility',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
    },
    {
      name: 'Adebayo Joseph',
      position: 'Director of Events',
      description: 'Planning and executing memorable events and networking sessions',
      image: 'https://i.postimg.cc/c46xmCJy/cordinator-jpg.jpg',
    },
    {
      name: 'Abubakar Omeiza AbdulKareem',
      position: 'General Adviser',
      description: 'Offering expert advice, supporting leadership decisions, and helping the club grow in the right direction',
      image: 'https://i.postimg.cc/gcyn1CYs/Whats-App-Image-2026-02-05-at-8-54-56-PM.jpg',
    },
    {
      name: 'Isah Ige Jimoh',
      position: 'Displinary Officer',
      description: 'Mantaining order and ensuring all members adhere to the club\'s code of conduct',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    },
    {
      name: 'Yetunde Mustapha',
      position: 'Legal Advisor',
      description: 'Providing legal guidance and ensuring regulatory compliance',
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-vasc-navy mb-4">
            Meet Our Executive Team
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Dedicated leaders committed to driving the club&apos;s vision and serving our members
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {executives.map((executive, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="aspect-square bg-gradient-to-br from-vasc-orange to-vasc-gold overflow-hidden">
                <img
                  src={executive.image}
                  alt={executive.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 text-center">
                <h4 className="text-xl font-bold text-vasc-navy mb-1">
                  {executive.name}
                </h4>
                <p className="text-vasc-orange font-semibold mb-2">
                  {executive.position}
                </p>
                <p className="text-sm text-gray-600">
                  {executive.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExecutiveTeam;
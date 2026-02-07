const Testimonials = () => {
  const testimonials = [
    {
      name: 'Yakubu Quadri',
      role: 'Tech Entrepreneur',
      initials: 'YQ',
      content: "Joining Achiever Social's Club was the best decision for my career. The connections I've made and the knowledge I've gained have been invaluable.",
      rating: 5,
    },
    {
      name: 'Onimisi AbdulAzeez',
      role: 'Marketing Director',
      initials: 'OA',
      content: "The mentorship program connected me with industry leaders who genuinely care about my growth. This club is a game-changer for ambitious professionals.",
      rating: 5,
    },
    {
      name: 'Tunde Akinyemi',
      role: 'Investment Banker',
      initials: 'TA',
      content: "I've secured multiple business partnerships through club events. The quality of members and the professional atmosphere make every meeting worthwhile.",
      rating: 5,
    },
  ];

  const StarIcon = () => (
    <svg className="h-5 w-5 text-vasc-gold fill-current" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-vasc-navy mb-4">
            What Our Members Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from achievers who&apos;ve transformed their networks and careers
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              {/* Star Rating */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 mb-4 italic">
                &quot;{testimonial.content}&quot;
              </p>

              {/* Author */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-vasc-orange/20 rounded-full flex items-center justify-center text-vasc-navy font-bold text-lg">
                  {testimonial.initials}
                </div>
                <div className="ml-3">
                  <p className="font-bold text-vasc-navy">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
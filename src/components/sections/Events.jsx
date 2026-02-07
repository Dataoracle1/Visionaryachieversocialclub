import { eventsService  } from '../../services/eventsService';

const Events = ({ showToast }) => {
  const events = [
    {
      id: 1,
      title: 'Monthly General Meeting',
      date: 'December 7',
      time: '4:00 PM - 7:00 PM',
      location: 'The Landmark Centre, Victoria Island',
      description: 'Join fellow members for our monthly gathering, networking, and guest speaker session.',
    },
  //   {
  //     id: 2,
  //     title: 'Leadership Workshop',
  //     date: 'December 18',
  //     time: '10:00 AM - 2:00 PM',
  //     location: 'Radisson Blu, Ikeja',
  //     description: 'Quarterly leadership development workshop with industry experts and interactive sessions.',
  //   },
  //   {
  //     id: 3,
  //     title: 'Annual Gala Dinner',
  //     date: 'December 28',
  //     time: '6:00 PM - 11:00 PM',
  //     location: 'Eko Hotel & Suites',
  //     description: 'Our prestigious annual celebration featuring awards, entertainment, and networking.',
  //   },
  ];

  const handleRSVP = async (eventTitle) => {
    const memberId = localStorage.getItem('memberId');

    if (!memberId) {
      showToast('warning', 'Login Required', 'Please login or register first to RSVP');
      return;
    }

    try {
      showToast('info', 'Processing...', 'Please wait while we process your RSVP', 2000);

      const response = await eventsAPI.rsvpToEvent('event_id', memberId);

      if (response.success) {
        showToast('success', 'RSVP Confirmed!', `You've successfully registered for ${eventTitle}`);
      } else {
        showToast('error', 'RSVP Failed', response.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('RSVP error:', error);
      showToast('error', 'Error', 'Failed to process RSVP. Please try again.');
    }
  };

  return (
    <section id="events" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-vasc-navy mb-4">
            Upcoming Events
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join us for exciting networking and learning opportunities
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="bg-vasc-orange text-white p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm">
                      {event.date.split(' ')[0]}
                    </p>
                    <p className="text-3xl font-bold">
                      {event.date.split(' ')[1]}
                    </p>
                  </div>
                  <svg
                    className="h-10 w-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-vasc-navy mb-2">
                  {event.title}
                </h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <svg
                      className="h-4 w-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-sm">{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <svg
                      className="h-4 w-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="text-sm">{event.location}</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{event.description}</p>
                {/* <button
                  onClick={() => handleRSVP(event.title)}
                  className="w-full bg-vasc-orange text-white py-2 rounded-lg hover:bg-vasc-gold transition-colors font-semibold"
                >
                  RSVP Now
                </button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
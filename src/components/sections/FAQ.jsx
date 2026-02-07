import { useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'How do I become a member?',
      answer: 'To become a member, you must be at least 18 years old and either a professional or student. Submit your application through our contact form or visit our office at 32 Idowu Taylor Street, Victoria Island. The annual membership fee is ₦50,000 which gives you access to all events, workshops, and exclusive resources.',
    },
    {
      question: 'When and where are meetings held?',
      answer: 'Our monthly general meetings are held on the first Saturday of every month from 4:00 PM to 7:00 PM at The Landmark Centre, Victoria Island, Lagos. We also have weekly networking sessions every Wednesday at 6:00 PM.',
    },
    {
      question: 'What is the dress code for events?',
      answer: 'For regular meetings and networking sessions, business casual attire is recommended. For special events like our Annual Gala Dinner and formal workshops, business formal or cocktail attire is required. Specific dress codes will be mentioned in event invitations.',
    },
    {
      question: 'Can I bring guests to events?',
      answer: 'Yes! Members can bring up to two guests to regular networking sessions and monthly meetings. However, some exclusive workshops and the Annual Gala may have different guest policies. Please check with the Events Director or refer to the specific event invitation.',
    },
    {
      question: 'What types of workshops do you offer?',
      answer: 'We offer quarterly workshops on leadership development, business strategy, personal branding, financial management, digital marketing, and more. All workshops are led by industry experts and include interactive sessions, case studies, and networking opportunities.',
    },
    {
      question: 'Is there a refund policy for membership fees?',
      answer: 'Membership fees are non-refundable once processed. However, if you\'re unable to attend events due to unforeseen circumstances, you can transfer your membership to another eligible individual with approval from the executive committee.',
    },
    {
      question: 'How can I get involved in club activities?',
      answer: 'We encourage active participation! Members can volunteer for event committees, suggest workshop topics, mentor newer members, or even propose new initiatives. Contact any executive team member to learn about current volunteer opportunities.',
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-vasc-navy mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about joining our community
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-vasc-navy pr-4">
                  {faq.question}
                </span>
                <svg
                  className={`h-5 w-5 text-vasc-orange flex-shrink-0 transform transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
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
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6 text-gray-600">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
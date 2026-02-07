// import { useState } from 'react';
// import { contactAPI } from '../services/api';

// const Contact = ({ showToast }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     message: '',
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       showToast('error', 'Invalid Email', 'Please enter a valid email address');
//       return;
//     }

//     if (formData.message.trim().length < 10) {
//       showToast('warning', 'Message Too Short', 'Please enter a message with at least 10 characters');
//       return;
//     }

//     setIsSubmitting(true);
//     showToast('info', 'Sending...', 'Please wait while we process your message', 2000);

//     try {
//       const response = await contactAPI.sendMessage(formData);

//       if (response.success) {
//         showToast('success', 'Message Sent!', response.message || 'Thank you for contacting us. We\'ll get back to you soon!');
//         setFormData({ name: '', email: '', phone: '', message: '' });
//       } else {
//         showToast('error', 'Error', response.message || 'Something went wrong. Please try again.');
//       }
//     } catch (error) {
//       console.error('Contact error:', error);
//       showToast('error', 'Connection Error', 'Failed to send message. Please check your internet connection and try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <section id="contact" className="py-16 md:py-24 bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-bold text-vasc-navy mb-4">
//             Get In Touch
//           </h2>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             Ready to join our community? We&apos;d love to hear from you
//           </p>
//         </div>

//         <div className="grid md:grid-cols-2 gap-12">
//           {/* Contact Form */}
//           <div>
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div>
//                 <label className="block text-gray-700 font-semibold mb-2">
//                   Full Name *
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                   className="input-field"
//                   placeholder="Enter your full name"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 font-semibold mb-2">
//                   Email Address *
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                   className="input-field"
//                   placeholder="your.email@example.com"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 font-semibold mb-2">
//                   Phone Number
//                 </label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   className="input-field"
//                   placeholder="+234 800 000 0000"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 font-semibold mb-2">
//                   Message *
//                 </label>
//                 <textarea
//                   name="message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   required
//                   rows="4"
//                   className="input-field"
//                   placeholder="Tell us about yourself and why you'd like to join..."
//                 ></textarea>
//               </div>
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="w-full bg-vasc-orange text-white py-3 rounded-lg font-semibold hover:bg-vasc-gold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {isSubmitting ? 'Sending...' : 'Send Message'}
//               </button>
//             </form>
//           </div>

//           {/* Contact Information */}
//           <div className="space-y-6">
//             <div>
//               <h3 className="text-2xl font-bold text-vasc-navy mb-6">
//                 Contact Information
//               </h3>
//               <div className="space-y-4">
//                 <div className="flex items-start">
//                   <svg
//                     className="h-6 w-6 text-vasc-orange mr-3 mt-1 flex-shrink-0"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                     />
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                     />
//                   </svg>
//                   <div>
//                     <p className="font-semibold text-vasc-navy">Address</p>
//                     <p className="text-gray-600">
//                       32 Idowu Taylor Street, Victoria Island, Lagos, Nigeria
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-start">
//                   <svg
//                     className="h-6 w-6 text-vasc-orange mr-3 mt-1 flex-shrink-0"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
//                     />
//                   </svg>
//                   <div>
//                     <p className="font-semibold text-vasc-navy">Phone</p>
//                     <p className="text-gray-600">+234 801 234 5678</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start">
//                   <svg
//                     className="h-6 w-6 text-vasc-orange mr-3 mt-1 flex-shrink-0"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//                     />
//                   </svg>
//                   <div>
//                     <p className="font-semibold text-vasc-navy">Email</p>
//                     <p className="text-gray-600">info@achieversocialclub.ng</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start">
//                   <svg
//                     className="h-6 w-6 text-vasc-orange mr-3 mt-1 flex-shrink-0"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                     />
//                   </svg>
//                   <div>
//                     <p className="font-semibold text-vasc-navy">Office Hours</p>
//                     <p className="text-gray-600">Monday - Friday: 9:00 AM - 5:00 PM</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-vasc-orange/10 p-6 rounded-lg">
//               <h4 className="font-bold text-vasc-navy mb-3">Membership Inquiry</h4>
//               <p className="text-gray-700 mb-4">
//                 Interested in becoming a member? Our annual membership fee is ₦50,000
//                 and includes access to all events, workshops, and exclusive resources.
//               </p>
//               <p className="text-sm text-gray-600">
//                 Ask our AI assistant for more details about membership benefits and
//                 requirements!
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Contact;    



import { useState } from 'react';
import { contactService } from '../../services/contactService';

const Contact = ({ showToast }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showToast('error', 'Invalid Email', 'Please enter a valid email address');
      return;
    }

    if (formData.message.trim().length < 10) {
      showToast('warning', 'Message Too Short', 'Please enter a message with at least 10 characters');
      return;
    }

    setIsSubmitting(true);
    showToast('info', 'Sending...', 'Please wait while we process your message', 2000);

    try {
      // const response = await contactAPI.sendMessage(formData); 
      const response = await contactService.sendMessage(formData);

    //   if (response.success) {
    //     showToast('success', 'Message Sent!', response.message || 'Thank you for contacting us. We\'ll get back to you soon!');
    //     setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    //   } else {
    //     showToast('error', 'Error', response.message || 'Something went wrong. Please try again.');
    //   }
    // } catch (error) {
    //   console.error('Contact error:', error);
    //   showToast('error', 'Connection Error', 'Failed to send message. Please check your internet connection and try again.');
    // } finally {
    //   setIsSubmitting(false);
     showToast('success', 'Message Sent!', 'Thank you for contacting us. We\'ll get back to you soon!');
  setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
} catch (error) {
  console.error('Contact error:', error);
  showToast('error', 'Connection Error', error.message || 'Failed to send message. Please check your internet connection and try again.');
} finally {
  setIsSubmitting(false);
}
    
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-vasc-navy mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to join our community? We&apos;d love to hear from you
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="+234 800 000 0000"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="What is this regarding?"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="input-field"
                  placeholder="Tell us about yourself and why you'd like to join..."
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-vasc-orange text-white py-3 rounded-lg font-semibold hover:bg-vasc-gold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-vasc-navy mb-6">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <svg
                    className="h-6 w-6 text-vasc-orange mr-3 mt-1 flex-shrink-0"
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
                  <div>
                    <p className="font-semibold text-vasc-navy">Address</p>
                    <p className="text-gray-600">
                      32 Idowu Taylor Street, Victoria Island, Lagos, Nigeria
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg
                    className="h-6 w-6 text-vasc-orange mr-3 mt-1 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <div>
                    <p className="font-semibold text-vasc-navy">Phone</p>
                    <p className="text-gray-600">+234 801 234 5678</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg
                    className="h-6 w-6 text-vasc-orange mr-3 mt-1 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <div>
                    <p className="font-semibold text-vasc-navy">Email</p>
                    <p className="text-gray-600">info@achieversocialclub.ng</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg
                    className="h-6 w-6 text-vasc-orange mr-3 mt-1 flex-shrink-0"
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
                  <div>
                    <p className="font-semibold text-vasc-navy">Office Hours</p>
                    <p className="text-gray-600">Monday - Friday: 9:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-vasc-orange/10 p-6 rounded-lg">
              <h4 className="font-bold text-vasc-navy mb-3">Membership Inquiry</h4>
              <p className="text-gray-700 mb-4">
                Interested in becoming a member? Our annual membership fee is ₦50,000
                and includes access to all events, workshops, and exclusive resources.
              </p>
              <p className="text-sm text-gray-600">
                Ask our AI assistant for more details about membership benefits and
                requirements!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
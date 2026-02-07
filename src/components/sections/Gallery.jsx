// import { useState } from 'react';

// const Gallery = () => {
//   const [selectedImage, setSelectedImage] = useState(null);

//   const galleryImages = [
//     {
//       src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500&h=350&fit=crop',
//       title: 'Annual Gala 2025',
//       description: 'Our prestigious yearly celebration',
//     },
//     {
//       src: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=500&h=350&fit=crop',
//       title: 'Leadership Workshop',
//       description: 'Quarterly professional development',
//     },
//     {
//       src: 'https://images.unsplash.com/photo-1560439514-4e9645039924?w=500&h=350&fit=crop',
//       title: 'Networking Session',
//       description: 'Weekly member connections',
//     },
//     {
//       src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=500&h=350&fit=crop',
//       title: 'Business Pitch Night',
//       description: 'Members showcase innovations',
//     },
//     {
//       src: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=500&h=350&fit=crop',
//       title: 'Community Service',
//       description: 'Giving back to Lagos',
//     },
//     {
//       src: 'https://images.unsplash.com/photo-1528605105345-5344ea20e269?w=500&h=350&fit=crop',
//       title: 'Monthly General Meeting',
//       description: 'First sunday gathering',
//     },
//   ];

//   const openModal = (index) => {
//     setSelectedImage(index);
//   };

//   const closeModal = () => {
//     setSelectedImage(null);
//   };

//   const nextImage = () => {
//     setSelectedImage((prev) => (prev + 1) % galleryImages.length);
//   };

//   const prevImage = () => {
//     setSelectedImage((prev) => 
//       prev === 0 ? galleryImages.length - 1 : prev - 1
//     );
//   };

//   const handleKeyDown = (e) => {
//     if (selectedImage === null) return;
    
//     if (e.key === 'ArrowRight') nextImage();
//     if (e.key === 'ArrowLeft') prevImage();
//     if (e.key === 'Escape') closeModal();
//   };

//   return (
//     <section id="gallery" className="py-16 md:py-24 bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-bold text-vasc-navy mb-4">
//             Event Gallery
//           </h2>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             Capturing memorable moments from our events and gatherings
//           </p>
//         </div>

//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {galleryImages.map((image, index) => (
//             <div
//               key={index}
//               className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer"
//               onClick={() => openModal(index)}
//             >
//               <img
//                 src={image.src}
//                 alt={image.title}
//                 className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-300"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
//                 <div className="p-4 text-white">
//                   <h3 className="font-bold text-lg">{image.title}</h3>
//                   <p className="text-sm">{image.description}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Gallery Modal */}
//       {selectedImage !== null && (
//         <div
//           className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
//           onClick={closeModal}
//           onKeyDown={handleKeyDown}
//           tabIndex={0}
//         >
//           <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-white text-xl font-bold">
//                 {galleryImages[selectedImage].title}
//               </h3>
//               <button
//                 onClick={closeModal}
//                 className="text-white hover:text-vasc-orange transition-colors"
//                 aria-label="Close modal"
//               >
//                 <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
//                 </svg>
//               </button>
//             </div>
//             <img
//               src={galleryImages[selectedImage].src}
//               alt={galleryImages[selectedImage].title}
//               className="w-full rounded-lg"
//             />
//             <p className="text-white mt-4 text-center">
//               {galleryImages[selectedImage].description}
//             </p>
//             <div className="flex justify-between mt-6">
//               <button
//                 onClick={prevImage}
//                 className="text-white hover:text-vasc-orange transition-colors"
//                 aria-label="Previous image"
//               >
//                 <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
//                 </svg>
//               </button>
//               <button
//                 onClick={nextImage}
//                 className="text-white hover:text-vasc-orange transition-colors"
//                 aria-label="Next image"
//               >
//                 <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default Gallery;    



import { useState, useEffect } from 'react';
import { galleryService } from '../../services/galleryService';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch gallery images from backend
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        const data = await galleryService.getAllItems();
        console.log('Gallery data from backend:', data);
        
        // Ensure we always set an array
        if (Array.isArray(data)) {
          setGalleryImages(data);
        } else if (data && Array.isArray(data.data)) {
          setGalleryImages(data.data);
        } else {
          setGalleryImages([]);
        }
        
        setError(null);
      } catch (err) {
        console.error('Failed to fetch gallery:', err);
        setError('Failed to load gallery images');
        setGalleryImages([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const openModal = (index) => {
    setSelectedImage(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => 
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  const handleKeyDown = (e) => {
    if (selectedImage === null) return;
    
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'Escape') closeModal();
  };

  if (loading) {
    return (
      <section id="gallery" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xl text-gray-600">Loading gallery...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="gallery" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xl text-red-600">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (galleryImages.length === 0) {
    return (
      <section id="gallery" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-vasc-navy mb-4">
              Event Gallery
            </h2>
            <p className="text-xl text-gray-600">No images in gallery yet</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="gallery" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-vasc-navy mb-4">
            Event Gallery
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Capturing memorable moments from our events and gatherings
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={image._id || index}
              className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer"
              onClick={() => openModal(index)}
            >
              <img
                src={image.imageUrl}
                alt={image.title}
                className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4 text-white">
                  <h3 className="font-bold text-lg">{image.title}</h3>
                  <p className="text-sm">{image.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white text-xl font-bold">
                {galleryImages[selectedImage].title}
              </h3>
              <button
                onClick={closeModal}
                className="text-white hover:text-vasc-orange transition-colors"
                aria-label="Close modal"
              >
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <img
              src={galleryImages[selectedImage].imageUrl}
              alt={galleryImages[selectedImage].title}
              className="w-full rounded-lg"
            />
            <p className="text-white mt-4 text-center">
              {galleryImages[selectedImage].description}
            </p>
            <div className="flex justify-between mt-6">
              <button
                onClick={prevImage}
                className="text-white hover:text-vasc-orange transition-colors"
                aria-label="Previous image"
              >
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                </svg>
              </button>
              <button
                onClick={nextImage}
                className="text-white hover:text-vasc-orange transition-colors"
                aria-label="Next image"
              >
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
import React from 'react';
import './PhotoGallery.css';

const PhotoGallery = ({ photos }) => {
  // If no photos provided, use these placeholder images
  const defaultPhotos = [
    'photo1.jpg',
    'photo2.jpg',
    'photo3.jpg',
    'photo4.jpg',
    'photo5.jpg',
    'photo6.jpg',
    'photo7.jpg',
    'photo8.jpg',
    'photo9.jpg',
    'photo10.jpg',
  ];

  const displayPhotos = photos || defaultPhotos;

  return (
    <div className="photo-gallery-container">
      <h2 className="text-2xl lg:text-3xl font-bold text-secondary mb-6">Photography</h2>
      <p className="mb-6 text-base lg:text-lg text-text-secondary">
        Some snapshots from my adventures and explorations.
      </p>
      
      <div className="scrolling-gallery">
        <div className="scroll-track">
          {displayPhotos.concat(displayPhotos).map((photo, index) => (
            <div key={index} className="gallery-item">
              <img src={photo} alt={`Gallery photo ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotoGallery;

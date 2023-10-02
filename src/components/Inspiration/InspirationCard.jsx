import React from 'react';

export default function InspirationCard({ image, title }) {
  return (
    <div className="w-1/2 md:w-1/3 lg:w-1/4 transform transition duration-500 ease-in-out hover:scale-105 reveal">
      <img src={image} alt={title} className="my-2 w-full" />
    </div>
  );
}

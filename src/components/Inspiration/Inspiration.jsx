import React from 'react';
import InspirationCard from './InspirationCard'
import { images } from '../../inspiration'

export default function Inspiration() {
  const randomImages = [...images].sort(() => Math.random() - 0.5);

  return (
    <div 
    className="min-h-screen flex flex-col justify-center items-center mt-36"
    id="inspiration"
    >
      <div className="text-center">
        <h2 className="text-6xl reveal">Inspiration</h2>
        <p className="text-2xl mt-10 mb-20 reveal">A collection of media that has fueled my creativity.</p>
      </div>
      <div className="flex justify-center flex-wrap gap-4">
        {randomImages.map(image => (
          <InspirationCard key={image.title} image={image.artwork} />
        ))}
      </div>
    </div>
  );
}

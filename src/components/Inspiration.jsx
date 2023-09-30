import React from 'react';
import InspirationCard from './InspirationCard'
import { images } from '../inspiration'

export default function Inspiration() {
  const randomImages = [...images].sort(() => Math.random() - 0.5);

  return (
    <div className="min-h-screen">
      <div className="text-center">
        <h2 className="text-4xl mt-20">Inspiration</h2>
        <p className="text-2xl my-10">A collection of media that has fueled my creativity.</p>
      </div>
      <div className="flex justify-center flex-wrap gap-4">
        {randomImages.map(image => (
          <InspirationCard key={image.title} image={image.artwork} />
        ))}
      </div>
    </div>
  );
}


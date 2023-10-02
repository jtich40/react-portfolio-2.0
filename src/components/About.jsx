import React from 'react';

export default function About() {
  return (
    <div className="flex justify-center items-center min-h-screen reveal mx-8">
      <div className="card bg-base-100 shadow-xl max-w-md p-8">
        <figure>
          <img
            src="/images/555_hq.jpg"
            alt="headshot"
            className="max-w-full h-auto rounded-full"
          />
        </figure>
        <div className="card-body mt-4">
          <h2 className="card-title text-2xl font-bold">About Me</h2>
          <p className="mt-4">
            I like to solve problems with code, and I don't stop until I find
            answers. I've always got the end user in mind.
            <br /><br />
            I'm probably the most extroverted software engineer you'll ever meet. 
            I love forging authentic relationships with people and learning their stories. 
            I believe that we're better together, and I'm always looking for ways to collaborate with others.
            <br /><br />
            When I'm not building software, you might catch me on the
            basketball court or watching <em>The Office</em> for the <em>n<sup>th</sup></em> time.
          </p>
        </div>
      </div>
    </div>
  );
}

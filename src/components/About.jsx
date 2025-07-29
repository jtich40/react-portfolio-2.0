import React from "react";

export default function About() {
  return (
    <div
      className="flex justify-center items-center mx-8 min-h-screen reveal"
      id="about"
    >
      <div className="p-8 max-w-md shadow-xl card bg-neutral-800">
        <figure>
          <img
            src="/images/headshot.png"
            alt="headshot"
            className="object-cover mx-auto w-64 h-64 rounded-full"
          />
        </figure>
        <div className="mt-4 card-body">
          <h2 className="text-2xl font-bold card-title">About Me</h2>
          <p className="mt-4">
            I like to solve problems with code, and I don't stop until I find
            answers. I've always got the end user in mind.
            <br />
            <br />
            I'm probably the most extroverted software engineer you'll ever
            meet. I love forging authentic relationships with people and
            learning their stories. I believe that we're better together, and
            I'm always looking for ways to collaborate with others.
            <br />
            <br />
            When I'm not building software, you might catch me on the basketball
            court or watching <em>The Office</em> for the{" "}
            <em>
              n<sup>th</sup>
            </em>{" "}
            time.
          </p>
        </div>
      </div>
    </div>
  );
}

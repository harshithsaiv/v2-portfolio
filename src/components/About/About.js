import React from 'react';

const About = () => {
  return (
    <div className="flex items-center justify-center min-h-screen py-20 lg:py-0">
      <div className="max-w-3xl w-full animate-fade-in px-4 lg:px-0">
        <h1 className="text-3xl lg:text-4xl font-bold text-secondary mb-8">About Me</h1>
        <div className="space-y-6 text-base lg:text-lg text-text-secondary leading-relaxed">
          <p>
          I’m a developer and problem solver driven by a passion for creating innovative, secure, and intelligent systems that tackle real-world challenges. With a unique blend of skills in AI, cybersecurity, and software engineering, I specialize in crafting solutions that are not only scalable and efficient but also meticulously designed for performance and usability.
          </p>
          <p>
          Currently, I’m a graduate student and Information Security Student Assistant at {''}<span className="text-white">California State University, 
          Sacramento</span>, where I collaborate on cutting-edge {''}<span className="text-white">research</span> and impactful projects. From designing AI-driven applications 
          and verifying {''}<span className="text-white">GPU systems</span> to optimizing {''}<span className="text-white">backend frameworks</span>, my work is fueled by curiosity and a relentless pursuit
          of excellence.
          </p>
          <p>
            In the past, I've had the opportunity to contribute to diverse fields, including {' '}
            <span className="text-white">blockchain</span> and{' '}
            <span className="text-white">Machine Learning</span> to{' '}
            <span className="text-white">Cloud Computing</span> and{' '}  
            <span className="text-white">GPU centric applications</span>. 
            collaborating with startups, government agencies, and academic institutions. My journey has allowed me to {''}<span className="text-white">develop</span> software solutions, 
            {''}<span className="text-white">secure</span> digital infrastructure, and {''}<span className="text-white">mentor</span> others through teaching and community engagement.
          </p>
          <p>
          When I’m not coding or brainstorming the next big idea, you’ll find me cycling offbeat trails, exploring peaks in California, 
          or designing creative side projects that blend innovation with practicality.
          </p>
          <div className="mt-8">
            <p className="mb-4 text-lg lg:text-xl">Here are a few technologies I've been working with recently:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm lg:text-base">
              {[
                "Python",
                "CUDA",
                "JAVA",
                "AWS",
                "Docker",
                "Kubernetes"
              ].map((tech, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="text-secondary">▹</span>
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

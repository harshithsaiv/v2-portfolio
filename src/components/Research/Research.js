import React from 'react';

const research = [
  {
    title: "Detection of Smart Contract Vulnerabilities using AST-AI Paradigm",
    publication: "Under Research - Funded by California State University, Sacramento",
    date: "2024",
    description: "A research study focused on leveraging Abstract Syntax Trees (AST) and AI models to detect vulnerabilities in Ethereum smart contracts. The project aims to enhance the security of blockchain-based applications by identifying common vulnerabilities and providing automated solutions to mitigate them.",
    link: "http://research.harshithsai.com.s3-website-us-east-1.amazonaws.com/"
  },
  {
    title: "A Novel Sensing Technologies for Enhanced Crop Monitoring and Management in Precision Agriculture",
    publication: "International Researcher for Government of Malaysia",
    date: "2023-2024",
    description: "A research study focused on developing advanced machine learning models and deep image processing techniques for precision agriculture. The project leverages AI-driven analytics and innovative sensing technologies to enhance crop monitoring, improve yield prediction, and optimize resource management.",
    // link: "https://example.com/research"
  }
];

const Research = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-5xl w-full animate-slide-up">
        <h1 className="text-5xl lg:text-4xl font-bold text-secondary mb-8">Research</h1>
        <div className="space-y-8 lg:space-y-12">
          {research.map((item, index) => (
            <div 
              key={index}
              className="group p-4 lg:p-6 rounded-lg hover:bg-gray-800/30 transition-all duration-300 border border-gray-800/50 hover:border-secondary"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl lg:text-2xl font-semibold text-text-primary group-hover:text-secondary">
                    {item.title}
                  </h3>
                  <p className="text-sm lg:text-base text-text-secondary">{item.publication}</p>
                </div>
                <span className="text-xs lg:text-sm text-text-secondary font-mono mt-2 lg:mt-0">{item.date}</span>
              </div>
              <p className="text-sm lg:text-base text-text-secondary group-hover:text-text-primary transition-colors duration-300 leading-relaxed mb-4">
                {item.description}
              </p>
              <a 
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm lg:text-base text-secondary hover:text-white transition-colors duration-300 inline-flex items-center"
              >
                Read Publication
                <svg className="w-4 h-4 lg:w-5 lg:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Research; 
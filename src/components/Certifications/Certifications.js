import React from 'react';

const certifications = [
  {
    title: "AWS Certified Solutions Architect - Associate",
    issuer: "Amazon Web Services",
    date: "2023",
    description: "Expertise in designing and implementing scalable, highly available, and fault-tolerant distributed systems on AWS. Proficient in cloud architecture, serverless computing, containerization, and DevOps practices for production-grade applications.",
    link: "https://aws.amazon.com/certification/"
  },
  {
    title: "NVIDIA Deep Learning Institute - GPU Programming",
    issuer: "NVIDIA",
    date: "2024",
    description: "Advanced certification in GPU programming with CUDA, parallel computing architectures, and optimizing deep learning workloads. Specialized in accelerating AI/ML applications using NVIDIA GPUs and understanding GPU memory hierarchies for high-performance computing.",
    link: "https://www.nvidia.com/en-us/training/"
  },
  {
    title: "Google Cloud Professional Cloud Developer",
    issuer: "Google Cloud",
    date: "2022",
    description: "Certified in building scalable and highly available applications using Google Cloud Platform. Expertise in containerization with Docker and Kubernetes, CI/CD pipelines, microservices architecture, and cloud-native application development.",
    link: "https://cloud.google.com/certification"
  },
  {
    title: "Deep Learning Specialization",
    issuer: "DeepLearning.AI (Coursera)",
    date: "2023",
    description: "Comprehensive specialization covering neural networks, deep learning optimization, CNNs, RNNs, and transformers. Hands-on experience with PyTorch and TensorFlow for building production-ready ML models and deploying AI systems at scale.",
    link: "https://www.deeplearning.ai/"
  }
];

const Certifications = () => {
  return (
    <div className="flex items-center justify-center min-h-screen py-20 lg:py-0">
      <div className="max-w-3xl w-full animate-slide-up px-4 lg:px-0">
        <h1 className="text-4xl lg:text-6xl font-bold text-secondary mb-8 lg:mb-12">Certifications</h1>
        <div className="space-y-8 lg:space-y-12">
          {certifications.map((cert, index) => (
            <div 
              key={index}
              className="group p-6 lg:p-8 rounded-lg hover:bg-gray-800/30 transition-all duration-300 border border-gray-800/50 hover:border-secondary"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4 lg:mb-6">
                <div>
                  <h3 className="text-2xl lg:text-3xl font-semibold text-text-primary group-hover:text-secondary transition-colors duration-300">
                    {cert.title}
                  </h3>
                  <p className="text-lg lg:text-xl text-text-secondary">{cert.issuer}</p>
                </div>
                <span className="text-base lg:text-lg text-text-secondary font-mono mt-2 lg:mt-0">{cert.date}</span>
              </div>
              <p className="text-base lg:text-lg text-text-secondary group-hover:text-text-primary transition-colors duration-300 leading-relaxed mb-6">
                {cert.description}
              </p>
              <a 
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-white transition-colors duration-300 text-base lg:text-lg inline-flex items-center"
              >
                View Certificate
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

export default Certifications; 
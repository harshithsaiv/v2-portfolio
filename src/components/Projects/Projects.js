import React from 'react';

const projects = [
  {
    title: "QR Code Risk Analyser",
    description: "Advanced security tool leveraging ML to detect malicious QR codes with 95% accuracy. Implemented real-time threat detection system processing 1000+ scans/minute. Reduced false positives by 40% using custom neural network architecture.",
    tech: ["Python", "TensorFlow", "React", "AWS Lambda", "AWS S3", "Flask"],
    links: {
      github: "https://github.com/harshithsaiv/QR-Code-Risk-Analyzer.git",
    }
  },
  {
    title: "TimeTuner",
    description: "AI-powered scheduling assistant integrating GPT-3.5 with Google Calendar. Automated appointment scheduling with 98% accuracy, reducing manual scheduling time by 75%. Handles 500+ scheduling requests/day with natural language processing.",
    tech: ["Python", "OpenAI API", "Google Calendar API", "FastAPI", "Docker", "Redis"],
    links: {
      github: "https://github.com/harshithsaiv/TimeTuner",
    }
  },
  {
    title: "ServerPulse",
    description: "High-performance server monitoring system handling 10K+ metrics/second. Reduced incident response time by 60% through automated alerting. Built with C++ achieving 30% better performance than existing solutions.",
    tech: ["C++", "React", "Node.js", "MongoDB", "AWS EC2", "AWS Lambda"],
    links: {
      github: "https://github.com/harshithsaiv/ServerPulse.git",
    }
  },
  {
    title: "NormCompressAI",
    description: "Novel image compression framework achieving 40% better compression ratio than JPEG. Implemented custom autoencoder architecture with adaptive norm-based loss functions, reducing model size by 35% while maintaining quality. Processed 100K+ images with sub-second latency.",
    tech: ["PyTorch", "Python", "CUDA", "TensorFlow", "OpenCV", "Docker"],
    links: {
      github: "https://github.com/harshithsaiv/NormCompressAI",
    }
  },
  {
    title: "Hermes",
    description: "Distributed tracing system for microservices achieving 99.9% uptime. Processes 1M+ spans/minute with sub-millisecond latency. Reduced debugging time by 70% through advanced visualization and analytics.",
    tech: ["Python", "OpenTelemetry", "Docker", "Kubernetes", "Grafana", "Flask"],
    links: {
      github: "https://github.com/yourusername/hermes-tracer",
    }
  },
  {
    title: "DVWA React Dashboard",
    description: "Built an interactive security training platform with 100K+ monthly active users. Developed hands-on vulnerability modules reducing learning curve by 60%. Implemented real-time assessment system with 95% accuracy in tracking user progress.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Docker", "DVWA", "JWT", "Redis"],
    links: {
      github: "https://github.com/yourusername/dvwa-react-dashboard",
    }
  }
];

const Projects = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-5xl w-full animate-slide-up">
        <h1 className="text-5xl lg:text-4xl font-bold text-secondary mb-8">Projects</h1>
        <div className="space-y-8 lg:space-y-12">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="group p-4 sm:p-6 lg:p-8 rounded-lg hover:bg-gray-800/30"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                <h3 className="text-xl sm:text-2xl lg:text-3xl">
                  {project.title}
                </h3>
                <div className="flex gap-2">
                  <a 
                    href={project.links.github}
                    className="text-text-secondary hover:text-secondary transition-colors duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" clipRule="evenodd"/>
                    </svg>
                  </a>
                  <a 
                    href={project.links.live}
                    className="text-text-secondary hover:text-secondary transition-colors duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                    </svg>
                  </a>
                </div>
              </div>
              <p className="text-sm lg:text-base text-text-secondary group-hover:text-text-primary transition-colors duration-300 leading-relaxed mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 lg:gap-3">
                {project.tech.map((tech, i) => (
                  <span 
                    key={i}
                    className="px-2 py-1 text-xs lg:text-sm text-secondary bg-secondary/10 rounded-full font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;

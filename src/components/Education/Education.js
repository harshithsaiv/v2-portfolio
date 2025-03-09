import React from 'react';

const education = [
  {
    degree: "Master of Science in Computer Science",
    school: "California State University, Sacramento",
    period: "2023 - Present",
    gpa: "4.0/4.0",
    logo: "/sac_state_logo.png",
    courses: [
      "Advanced Algorithms",
      "Parallel Programming in CUDA",
      "Artificial Intelligence",
      "Network Security",
      "Cryptography",
      "Programming Principles and Practice",
      "AdvancedComputer Architecture",
    ],
    highlights: [
      "Evergreen Graduate Research Assistant in AI & Security",
      "Teaching Assistant for Computer Security , Blockchain, Operating System , Programming Logic ",
      "President of IEEE Club at Sac State"
    ]
  },
//   {
//     degree: "LLM MOOC",
//     school: "University of California, Berkeley",
//     period: "Fall 2024",
//     logo: "/UC-Berkeley-Seal-Logo.png",
//     focus: "Large Language Models and Applications",
//     description: "Advanced study in LLM architectures, fine-tuning, and real-world applications",
//     highlights: [
//       "Specialization in Transformer Architecture",
//       "Focus on LLM Fine-tuning & Deployment",
//       "Real-world Applications Development",
//       "RAG Application Development",
//       "Capstone Project on LLM Fine-tuning & Deployment",
//     ]
//   }
];

const Education = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-5xl w-full animate-slide-up">
        <h1 className="text-3xl lg:text-4xl font-bold text-secondary mb-8">Education</h1>
        <div className="space-y-12">
          {education.map((edu, index) => (
            <div 
              key={index}
              className="group rounded-xl border border-gray-800/50 hover:border-secondary transition-all duration-300 overflow-hidden"
            >
              {/* Header with Logo */}
              <div className="bg-gray-800/30 p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-800/50">
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-0">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white/10 rounded-lg p-2 flex items-center justify-center">
                    <img 
                      src={edu.logo}
                      alt={`${edu.school} logo`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl lg:text-2xl font-semibold text-text-primary group-hover:text-secondary transition-colors duration-300">
                      {edu.degree}
                    </h3>
                    <p className="text-sm lg:text-base text-text-secondary mt-1">
                      {edu.school}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2 sm:gap-0">
                  {edu.gpa && (
                    <span className="text-xs lg:text-sm text-secondary bg-secondary/10 px-3 py-1 rounded-full font-mono mb-2">
                      GPA: {edu.gpa}
                    </span>
                  )}
                  <span className="text-xs lg:text-sm text-text-secondary font-mono">
                    {edu.period}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {edu.courses && (
                  <div>
                    <h4 className="text-sm lg:text-base font-medium text-secondary mb-3">Key Courses</h4>
                    <div className="flex flex-wrap gap-2">
                      {edu.courses.map((course, i) => (
                        <span 
                          key={i}
                          className="text-xs lg:text-sm text-text-secondary bg-gray-800/50 px-3 py-1 rounded-full hover:bg-secondary/10 hover:text-secondary transition-colors duration-300 whitespace-nowrap"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {edu.highlights && (
                  <div>
                    <h4 className="text-sm lg:text-base font-medium text-secondary mb-3">Highlights</h4>
                    <ul className="space-y-2">
                      {edu.highlights.map((highlight, i) => (
                        <li 
                          key={i}
                          className="flex items-start gap-2 text-sm lg:text-base text-text-secondary whitespace-nowrap overflow-hidden text-ellipsis"
                        >
                          <span className="text-secondary mt-1">▹</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {edu.focus && (
                  <div className="bg-secondary/5 p-4 rounded-lg border border-secondary/10">
                    <h4 className="text-sm lg:text-base font-medium text-secondary mb-2">Focus Area</h4>
                    <p className="text-sm lg:text-base text-text-secondary">
                      {edu.focus}
                    </p>
                    {edu.description && (
                      <p className="text-sm text-text-secondary mt-2 opacity-80">
                        {edu.description}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Education;
import React from 'react';

const education = [
  {
    degree: 'Master of Science in Computer Science',
    school: 'California State University, Sacramento',
    period: '2023 – Present',
    gpa: '4.0 / 4.0',
    courses: [
      'Parallel Programming in CUDA',
      'Advanced Algorithms & Data Structures',
      'Artificial Intelligence & Machine Learning',
      'Computer Architecture & GPU Computing',
      'Software Engineering Principles',
      'Deep Learning & Neural Networks',
      'Distributed Systems',
    ],
    highlights: [
      'Evergreen Graduate Research Assistant: AI & Security',
      'Teaching Assistant: Computer Security, Blockchain, OS, Programming Logic',
      'President, IEEE Club at Sacramento State',
    ],
  },
];

const Education = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-4xl w-full animate-slide-up px-4 lg:px-0">

        <div className="mb-12">
          <p className="text-xs font-mono text-secondary tracking-widest mb-2">02 / Education</p>
          <h1 className="text-3xl lg:text-4xl font-black text-text-primary">Academic Background</h1>
        </div>

        <div className="space-y-6">
          {education.map((edu, index) => (
            <div
              key={index}
              className="group border border-stone-900/10 rounded-lg hover:border-secondary/30 transition-all duration-300 overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 border-b border-stone-900/10 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold text-text-primary group-hover:text-secondary transition-colors duration-200 mb-1">
                    {edu.degree}
                  </h3>
                  <p className="text-sm font-mono text-stone-500">{edu.school}</p>
                </div>
                <div className="flex flex-row sm:flex-col items-center sm:items-end gap-3 sm:gap-1.5 flex-shrink-0">
                  {edu.gpa && (
                    <span className="text-xs font-mono text-secondary bg-secondary/5 border border-secondary/20 px-2.5 py-1 rounded">
                      GPA {edu.gpa}
                    </span>
                  )}
                  <span className="text-xs font-mono text-stone-500">{edu.period}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 grid sm:grid-cols-2 gap-8">
                {edu.courses && (
                  <div>
                    <p className="text-xs font-mono text-stone-500 mb-3 tracking-widest">{'// key courses'}</p>
                    <div className="flex flex-wrap gap-2">
                      {edu.courses.map((course, i) => (
                        <span
                          key={i}
                          className="text-xs font-mono text-stone-500 bg-stone-100 border border-stone-900/10 px-2.5 py-1 rounded hover:text-secondary hover:border-secondary/20 transition-all duration-200 cursor-default"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {edu.highlights && (
                  <div>
                    <p className="text-xs font-mono text-stone-500 mb-3 tracking-widest">{'// highlights'}</p>
                    <ul className="space-y-2.5">
                      {edu.highlights.map((h, i) => (
                        <li key={i} className="flex gap-2.5 text-sm text-stone-500 leading-relaxed">
                          <span className="text-secondary flex-shrink-0 text-xs mt-0.5">▹</span>
                          {h}
                        </li>
                      ))}
                    </ul>
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

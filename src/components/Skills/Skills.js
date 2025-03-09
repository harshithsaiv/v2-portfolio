import React from 'react';

const skillCategories = [
  {
    title: "Languages",
    skills: [
      { name: "JAVA", level: "Expert" },
      { name: "JavaScript", level: "Intermediate" },
      { name: "Python", level: "Intermediate" },
      { name: "GoLang", level: "Intermediate" },
      { name: "SQL", level: "Intermediate" }
    ]
  },
  {
    title: "Frameworks & Libraries",
    skills: [
      { name: "Spring Boot", level: "Expert" },
      { name: "Kafka", level: "Advanced" },
      { name: "FastAPI", level: "Advanced" },
      { name: "Pytorch", level: "Advanced" },
      { name: "Flask", level: "Intermediate" },
    ]
  },
  {
    title: "Tools & Platforms",
    skills: [
      { name: "Git & GitHub", level: "Advanced" },
      { name: "Docker", level: "Intermediate" },
      { name: "Pytorch", level: "Advanced" },
      { name: "Terraform", level: "Intermediate" },
      { name: "Ansible", level: "Intermediate" },      
      { name: "AWS", level: "Intermediate" },
      { name: "CI/CD", level: "Advanced" },
      { name: "Kubernetes", level: "Intermediate" }
    ]
  }
];

const Skills = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-3xl w-full animate-slide-up">
        <h1 className="text-3xl lg:text-4xl font-bold text-secondary mb-8">Skills</h1>
        <div className="space-y-12">
          {skillCategories.map((category, index) => (
            <div key={index} className="space-y-6">
              <h2 className="text-xl lg:text-2xl font-semibold text-text-primary">
                {category.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="group p-4 rounded-lg border border-gray-800/50 hover:border-secondary hover:bg-gray-800/30">
                    <div className="flex justify-between items-center">
                      <h3 className="text-base lg:text-lg text-text-primary group-hover:text-secondary">
                        {skill.name}
                      </h3>
                      <span className="text-xs lg:text-sm text-text-secondary font-mono px-3 py-1 bg-secondary/10 rounded-full">
                        {skill.level}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills; 
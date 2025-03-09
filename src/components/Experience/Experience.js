import React from 'react';

const experiences = [
  {
    title: "Cyber Security Student Assistant",
    company: "California State University, Sacramento",
    period: "2023 - Present",
    description: [
"Built an in-house SIEM tool using Elasticsearch and Kibana for log analysis",
"Analyzed abuse mailbox reports and set rules to purge suspicious emails",
"Conducted network audits with Nmap to identify vulnerabilities",
"Automated log collection with scripts, improving efficiency",
"Generated Qualys reports for management to enhance security",
"Performed forensic analysis during CrowdStrike incidents to identify IOCs"
    ],
    tech: ["AWS","Elasticsearch", "Kibana", "Logstash", "Nmap", "Docker", "Python","Bash"]
  },
  {
    title: "Security Software Engineer Intern",
    company: "REINFOSEC",
    period: "2022 - 2023",
    description: [
     "Developed Education-focused Damn Vulnerable Web Application (DVWA) to enhance threat detection and prevention",
"Automated vulnerability scanning workflows, improving efficiency by 30%",
"Built microservices using SpringBoot following JAVA CERT standards",
"Implemented log analysis systems to monitor and respond to potential security incidents"
    ],
    tech: ["React", "Node.js", "Express.js","SpringBoot", "Wireshark","Burp Suite","Kali Linux","AWS"]
  },
  {
    title: "AWS Cloud Internship",
    company: "Government of India",
    period: "Oct. 2021 - Dec. 2021",
    description: [
      "Enhanced performance using AWS CloudFront caching, improving UX",
      "Implemented responsive designs with AWS Amplify for scalability",
      "Automated CI/CD pipelines with AWS CodePipeline, reducing downtime",
    ],
    tech: ["JavaScript", "React", "Redux", "SASS"]
  }
];

const Experience = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-5xl w-full animate-slide-up">
        <h1 className="text-5xl lg:text-4xl font-bold text-secondary mb-8">Experience</h1>
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div key={index} className="group p-6 rounded-lg hover:bg-gray-800/30 transition-all duration-300 border border-gray-800/50 hover:border-secondary">
              <div className="flex flex-col space-y-2 lg:flex-row lg:space-y-0 lg:items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl lg:text-2xl font-semibold text-text-primary group-hover:text-secondary">
                    {exp.title}
                  </h3>
                  <p className="text-base lg:text-lg text-text-secondary">{exp.company}</p>
                </div>
                <span className="text-sm lg:text-base text-text-secondary font-mono">{exp.period}</span>
              </div>
              <ul className="space-y-3 mb-6">
                {exp.description.map((desc, i) => (
                  <li key={i} className="text-sm lg:text-base text-text-secondary group-hover:text-text-primary">
                    <span className="text-secondary mr-2 font-mono">▹</span>
                    <span className="leading-relaxed">{desc}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                {exp.tech.map((tech, i) => (
                  <span key={i} className="px-3 py-1 text-xs lg:text-sm text-secondary bg-secondary/10 rounded-full font-mono">
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

export default Experience;

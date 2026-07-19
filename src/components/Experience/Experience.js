import React from 'react';

const experiences = [
  {
    title: 'AI Engineer · Founding Engineer',
    company: 'Optispan',
    companyNote: 'Longevity Healthcare · Startup',
    period: '2024 – Present',
    current: true,
    description: [
      'Building agentic clinical intelligence systems: architected multi-step reasoning pipelines for medical knowledge retrieval (OpenEvidence-style), integrating vector search, reranking, and LLM synthesis for clinical decision support',
      'Engineered real-time AI scribing system with Whisper-based transcription, medical entity extraction (ICD-10/CPT codes), and SOAP note auto-generation, reducing physician documentation time significantly',
      'Built voice agents for telehealth consultations: real-time STT, intent classification, context-aware response generation, and handoff orchestration using LangGraph state machines',
      'Designed end-to-end RAG pipelines over clinical literature with hybrid search, reranking, and grounded generation, validated for clinical accuracy against physician review',
      'Post-training the clinical model (MedGemma-based, alongside Gemini) with a two-stage alignment pipeline: Direct Preference Optimization (DPO) on clinician-reviewed preference pairs for cheap offline alignment, followed by Proximal Policy Optimization (PPO) against a reward model trained on combined clinician review and in-app user ratings, with a KL penalty to the reference policy to keep outputs from drifting off-distribution',
      'Founding Engineer for the mobile product: solely responsible for shipping the native iOS app (Swift) to the App Store and the Android app to the Play Store, owning the release end to end',
      'Acted as Product Designer for the mobile apps, designing the complete iOS and Android user workflow, screen by screen, before any UI code was written',
      'Own product features end-to-end: requirements → system design → implementation → deployment → user feedback loop; act as Product Engineer on the AI layer',
    ],
    tech: ['Python', 'LangGraph', 'LangChain', 'OpenAI API', 'Claude API', 'Whisper', 'FastAPI', 'LiveKit', 'Pinecone', 'AWS', 'PostgreSQL', 'Swift', 'Android', 'MedGemma', 'Gemini', 'PPO', 'DPO'],
  },
  {
    title: 'Software Engineering Intern',
    company: 'State Street Global Markets',
    period: 'Summer 2024',
    description: [
      'Reduced trading platform latency by 35% (600ms → 390ms) through Java/Spring Boot optimization, enabling $10M+ in additional daily transaction volume across global markets',
      'Architected RESTful microservices handling 10K+ concurrent requests/second with 99.95% uptime for 500+ institutional clients',
      'Implemented CI/CD pipeline with Docker and Kubernetes reducing deployment time by 40% for 15-engineer trading team',
      'Conducted code reviews for 50+ pull requests, maintaining 95% test coverage and preventing 12+ critical production bugs',
      'Delivered 8 production features ahead of schedule collaborating across 3 time zones using Agile/Scrum',
    ],
    tech: ['Java', 'Spring Boot', 'Python', 'SQL', 'React', 'Docker', 'Kubernetes', 'AWS'],
  },
  {
    title: 'Software Developer & AI Research Assistant',
    company: 'California State University, Sacramento',
    period: 'Jan 2023 – 2024',
    description: [
      'Engineered GPU-accelerated SIEM platform processing 1M+ security events/hour across 5,000+ campus devices using CUDA and PyTorch, achieving 99.9% uptime',
      'Built distributed Elasticsearch cluster with sub-200ms query latency handling 500GB+ daily log ingestion, 60% faster incident detection (30min → 12min)',
      'Developed ML-based anomaly detection with 92% accuracy, preventing 15+ potential breaches and saving $200K+ in damages',
      'Optimized data pipeline throughput by 45% via Docker/Kubernetes, reducing infrastructure costs by $50K annually',
      'Led published research on GPU-accelerated smart contract vulnerability detection (IEEE TPS 2025)',
    ],
    tech: ['Python', 'CUDA', 'PyTorch', 'AWS', 'Elasticsearch', 'Docker', 'Kubernetes', 'TensorFlow'],
  },
  {
    title: 'Software Engineer Intern',
    company: 'REINFOSEC',
    period: 'May 2022 – Aug 2023',
    description: [
      'Architected full-stack security training platform serving 100K+ monthly users with React and Spring Boot, achieving 99.7% uptime and 4.8/5 user satisfaction',
      'Reduced API response time by 40% (800ms → 480ms) through microservices optimization, improving UX for 10K+ concurrent users',
      'Built automated testing framework increasing code coverage from 40% → 90%, reducing production bugs by 30%',
      'Implemented Jenkins CI/CD cutting deployment time by 65% and enabling 3× faster feature releases for 8-person team',
    ],
    tech: ['Java', 'Spring Boot', 'React', 'Node.js', 'Docker', 'PostgreSQL', 'AWS', 'Jenkins'],
  },
];

const Experience = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-4xl w-full animate-slide-up px-4 lg:px-0">

        <div className="mb-12">
          <p className="text-xs font-mono text-secondary tracking-widest mb-2">03 / Experience</p>
          <h1 className="text-3xl lg:text-4xl font-black text-text-primary">Where I&apos;ve Worked</h1>
        </div>

        <div className="relative">
          {/* Timeline vertical line */}
          <div className="absolute left-0 top-2 bottom-2 w-px bg-stone-900/10" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className="relative pl-8 group">
                {/* Timeline dot */}
                <div className={`absolute left-[-4px] top-1.5 w-2 h-2 rounded-full border transition-colors duration-300 ${
                  exp.current
                    ? 'bg-secondary border-secondary'
                    : 'bg-stone-300 border-stone-300 group-hover:bg-secondary group-hover:border-secondary'
                }`} />

                <div className="mb-1 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                  <h3 className="text-lg font-bold text-text-primary group-hover:text-secondary transition-colors duration-200">
                    {exp.title}
                  </h3>
                  <span className="text-secondary text-sm font-mono">@ {exp.company}</span>
                  {exp.current && (
                    <span className="text-xs font-mono text-primary bg-secondary px-1.5 py-0.5 rounded self-start sm:self-auto">
                      current
                    </span>
                  )}
                </div>
                {exp.companyNote && (
                  <p className="text-xs font-mono text-stone-500 mb-0.5">{exp.companyNote}</p>
                )}
                <p className="text-xs font-mono text-stone-500 mb-4">{exp.period}</p>

                <ul className="space-y-2.5 mb-5">
                  {exp.description.map((desc, i) => (
                    <li key={i} className="flex gap-3 text-sm text-stone-500 leading-relaxed group-hover:text-text-secondary transition-colors duration-200">
                      <span className="text-secondary flex-shrink-0 mt-0.5 text-xs">▹</span>
                      {desc}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((t, i) => (
                    <span
                      key={i}
                      className="text-xs font-mono text-stone-500 border border-stone-900/10 rounded px-2 py-0.5 hover:text-secondary hover:border-secondary/30 transition-all duration-200 cursor-default"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Experience;

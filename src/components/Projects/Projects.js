import React from 'react';

const projects = [
  {
    title: 'NormCompressAI',
    featured: true,
    description:
      'GPU-accelerated image compression framework achieving 40% better compression than JPEG using custom CUDA kernels.',
    metrics: ['40% better compression', 'sub-second latency'],
    tech: ['CUDA', 'PyTorch', 'Python', 'C++', 'TensorFlow', 'OpenCV', 'Docker'],
    github: 'https://github.com/harshithsaiv/NormCompressAI',
  },
  {
    title: 'RAFT-WAL — Distributed Consensus in Rust',
    featured: true,
    description:
      'Write-Ahead Log backed by a Raft-lite consensus algorithm — leader election, log replication, fault-tolerant commits, no unsafe blocks.',
    metrics: ['Raft consensus', '100% safe Rust'],
    tech: ['Rust', 'Raft Protocol', 'Distributed Systems', 'WAL', 'Consensus'],
    github: 'https://github.com/harshithsaiv/RAFT-WAL',
  },
  {
    title: 'lsm-tree — Storage Engine in Rust',
    featured: false,
    description:
      'K.I.S.S. implementation of an LSM-tree in safe Rust — the storage engine behind LevelDB, RocksDB, and Cassandra.',
    metrics: ['LSM compaction', 'bloom filter'],
    tech: ['Rust', 'Storage Engine', 'LSM-tree', 'Systems Programming'],
    github: 'https://github.com/harshithsaiv/lsm-tree',
  },
  {
    title: 'API-Gateway-Rust',
    featured: false,
    description:
      'High-performance API gateway built in async Rust (Tokio) — request routing, middleware composition, rate limiting.',
    metrics: ['async Tokio runtime', 'zero-copy routing'],
    tech: ['Rust', 'Tokio', 'Async I/O', 'Networking', 'Systems'],
    github: 'https://github.com/harshithsaiv/API-Gateway-Rust',
  },
  {
    title: 'SolidityAST Vulnerability Scanner',
    featured: false,
    description:
      'Static analysis tool parsing Solidity smart contract ASTs to detect vulnerability patterns — underpins IEEE TPS 2025 research.',
    metrics: ['IEEE TPS 2025 paper', '10K+ contracts analyzed'],
    tech: ['Python', 'Solidity', 'AST Parsing', 'Static Analysis', 'Security'],
    github: 'https://github.com/harshithsaiv/SolidityAST-Vulnerability-Scanner',
  },
  {
    title: 'QR Code Risk Analyzer',
    featured: false,
    description:
      'CNN and ensemble ML to detect malicious QR codes in real time, deployed on AWS with scalable microservices.',
    metrics: ['95% detection accuracy', '1000+ scans/min'],
    tech: ['Python', 'TensorFlow', 'React', 'AWS Lambda', 'FastAPI', 'Docker'],
    github: 'https://github.com/harshithsaiv/QR-Code-Risk-Analyzer.git',
  },
  {
    title: 'ServerPulse — Distributed Monitoring',
    featured: false,
    description:
      'C++ distributed monitoring system with lock-free data structures, WebSocket dashboard, and ML-based predictive alerting.',
    metrics: ['10K+ metrics/sec', '60% faster incident response'],
    tech: ['C++', 'Python', 'React', 'Node.js', 'MongoDB', 'Docker', 'Kubernetes', 'AWS'],
    github: 'https://github.com/harshithsaiv/ServerPulse.git',
  },
];

const GithubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"
      clipRule="evenodd"
    />
  </svg>
);

const ProjectCard = ({ project }) => (
  <a
    href={project.github}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative flex flex-col border border-stone-900/10 rounded-lg p-5 hover:border-secondary/30 hover:shadow-sm transition-all duration-300"
  >
    <div className="flex items-start justify-between gap-3 mb-2">
      <h3 className="text-sm font-bold text-text-primary group-hover:text-secondary transition-colors duration-200 leading-snug">
        {project.title}
      </h3>
      <span className="flex-shrink-0 text-stone-400 group-hover:text-secondary transition-colors duration-200">
        <GithubIcon />
      </span>
    </div>

    {project.featured && (
      <span className="self-start text-[10px] font-mono text-primary bg-secondary px-1.5 py-0.5 rounded mb-2">
        featured
      </span>
    )}

    <p className="text-xs text-stone-500 leading-relaxed mb-3 group-hover:text-text-secondary transition-colors duration-200">
      {project.description}
    </p>

    <div className="flex flex-wrap gap-x-2.5 gap-y-1 mb-3">
      {project.metrics.map((m, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span className="text-stone-400 text-[10px] font-mono">·</span>}
          <span className="text-[10px] font-mono text-secondary/70">{m}</span>
        </React.Fragment>
      ))}
    </div>

    <div className="mt-auto flex flex-wrap gap-1.5">
      {project.tech.slice(0, 4).map((t, i) => (
        <span key={i} className="text-[10px] font-mono text-stone-500 px-1.5 py-0.5 border border-stone-900/10 rounded">
          {t}
        </span>
      ))}
      {project.tech.length > 4 && (
        <span className="text-[10px] font-mono text-stone-400 px-1.5 py-0.5">
          +{project.tech.length - 4} more
        </span>
      )}
    </div>
  </a>
);

const Projects = () => {
  return (
    <div className="w-full max-w-6xl mx-auto animate-slide-up">

      <div className="mb-10">
        <p className="text-xs font-mono text-secondary tracking-widest mb-2">05 / Projects</p>
        <h1 className="text-3xl lg:text-4xl font-black text-text-primary">Things I&apos;ve Built</h1>
        <p className="text-xs font-mono text-stone-500 mt-2">
          GPU systems · Rust infrastructure · agentic AI · distributed systems
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>

    </div>
  );
};

export default Projects;

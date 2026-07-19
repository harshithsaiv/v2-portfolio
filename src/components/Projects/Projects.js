import React from 'react';

const projects = [
  {
    title: 'NormCompressAI',
    featured: true,
    description:
      'GPU-accelerated image compression framework achieving 40% better compression than JPEG. Custom CUDA kernels for real-time parallel processing with PyTorch, 35% model size reduction through novel norm-based loss functions. Processes 100K+ images with sub-second latency.',
    metrics: ['40% better compression', '100K+ images/run', 'sub-second latency'],
    tech: ['CUDA', 'PyTorch', 'Python', 'C++', 'TensorFlow', 'OpenCV', 'Docker'],
    github: 'https://github.com/harshithsaiv/NormCompressAI',
  },
  {
    title: 'RAFT-WAL — Distributed Consensus in Rust',
    featured: true,
    description:
      'Write-Ahead Log implementation backed by a Raft-lite consensus algorithm, written in safe Rust. Implements leader election, log replication, and fault-tolerant commit semantics. Designed for use as an embedded durability layer in distributed systems — production-ready, no unsafe blocks.',
    metrics: ['Raft consensus', 'fault-tolerant replication', '100% safe Rust'],
    tech: ['Rust', 'Raft Protocol', 'Distributed Systems', 'WAL', 'Consensus'],
    github: 'https://github.com/harshithsaiv/RAFT-WAL',
  },
  {
    title: 'lsm-tree — Storage Engine in Rust',
    featured: false,
    description:
      'K.I.S.S. implementation of an LSM-tree (Log-Structured Merge-tree) in safe Rust — the storage engine architecture behind LevelDB, RocksDB, and Cassandra. Includes MemTable, SSTable flushing, compaction, and bloom filter for key existence checks.',
    metrics: ['LSM compaction', 'bloom filter', 'zero unsafe Rust'],
    tech: ['Rust', 'Storage Engine', 'LSM-tree', 'Systems Programming'],
    github: 'https://github.com/harshithsaiv/lsm-tree',
  },
  {
    title: 'API-Gateway-Rust',
    featured: false,
    description:
      'High-performance API gateway crate built entirely in Rust. Handles request routing, middleware composition, rate limiting, and load balancing. Leverages async Rust (Tokio) for non-blocking I/O with minimal overhead — a systems-level take on what usually gets built in Go or Node.',
    metrics: ['async Tokio runtime', 'rate limiting', 'zero-copy routing'],
    tech: ['Rust', 'Tokio', 'Async I/O', 'Networking', 'Systems'],
    github: 'https://github.com/harshithsaiv/API-Gateway-Rust',
  },
  {
    title: 'SolidityAST Vulnerability Scanner',
    featured: false,
    description:
      'Python-based static analysis tool that parses Solidity smart contract ASTs to detect vulnerability patterns. Underpins the published IEEE TPS 2025 research on GPU-accelerated vulnerability detection — the data pipeline and pattern extraction layer feeding the XAST transformer model.',
    metrics: ['AST-based analysis', 'IEEE TPS 2025 paper', '10K+ contracts analyzed'],
    tech: ['Python', 'Solidity', 'AST Parsing', 'Static Analysis', 'Security'],
    github: 'https://github.com/harshithsaiv/SolidityAST-Vulnerability-Scanner',
  },
  {
    title: 'QR Code Risk Analyzer',
    featured: false,
    description:
      'Enterprise security tool using CNN and ensemble ML to detect malicious QR codes with 95% accuracy. Real-time threat detection processing 1000+ scans/minute, reducing false positives by 40% through advanced feature engineering. Deployed on AWS with scalable microservices.',
    metrics: ['95% detection accuracy', '1000+ scans/min', '40% fewer false positives'],
    tech: ['Python', 'TensorFlow', 'React', 'AWS Lambda', 'FastAPI', 'Docker'],
    github: 'https://github.com/harshithsaiv/QR-Code-Risk-Analyzer.git',
  },
  {
    title: 'ServerPulse — Distributed Monitoring',
    featured: false,
    description:
      'High-performance C++ distributed monitoring system handling 10K+ metrics/second with sub-millisecond latency. Multi-threaded backend with lock-free data structures achieving 30% better throughput than industry benchmarks. WebSocket real-time dashboard. 60% faster incident response via ML-based predictive alerting.',
    metrics: ['10K+ metrics/sec', '30% faster than benchmarks', '60% faster incident response'],
    tech: ['C++', 'Python', 'React', 'Node.js', 'MongoDB', 'Docker', 'Kubernetes', 'AWS'],
    github: 'https://github.com/harshithsaiv/ServerPulse.git',
  },
];

const Projects = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-4xl w-full animate-slide-up px-4 lg:px-0">

        <div className="mb-12">
          <p className="text-xs font-mono text-secondary tracking-widest mb-2">// projects</p>
          <h1 className="text-3xl lg:text-4xl font-black text-white">Things I&apos;ve Built</h1>
          <p className="text-xs font-mono text-gray-600 mt-2">
            GPU systems · Rust infrastructure · agentic AI · distributed systems
          </p>
        </div>

        <div className="space-y-5">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative border border-gray-800/60 rounded-lg p-6 hover:border-secondary/30 hover:bg-gray-900/30 transition-all duration-300"
            >
              {/* Number + title row */}
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-gray-700 select-none tabular-nums">
                    {String(index + 1).padStart(2, '0')}.
                  </span>
                  <h3 className="text-base font-bold text-gray-100 group-hover:text-secondary transition-colors duration-200">
                    {project.title}
                  </h3>
                  {project.featured && (
                    <span className="hidden sm:inline text-xs font-mono text-black bg-secondary px-2 py-0.5 rounded">
                      featured
                    </span>
                  )}
                </div>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View on GitHub"
                  className="flex-shrink-0 text-gray-700 hover:text-secondary transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>

              {/* Impact metrics */}
              <div className="flex flex-wrap gap-x-3 gap-y-1 mb-3 pl-7">
                {project.metrics.map((m, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && <span className="text-gray-700 text-xs font-mono">·</span>}
                    <span className="text-xs font-mono text-secondary/70">{m}</span>
                  </React.Fragment>
                ))}
              </div>

              <p className="text-sm text-gray-500 leading-relaxed mb-4 pl-7 group-hover:text-gray-400 transition-colors duration-200">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-x-3 gap-y-1.5 pl-7">
                {project.tech.map((t, i) => (
                  <span key={i} className="text-xs font-mono text-gray-600 hover:text-gray-400 transition-colors cursor-default">
                    {t}
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

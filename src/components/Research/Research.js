import React from 'react';

const research = [
  {
    title: 'XAST: GPU-Accelerated Smart Contract Vulnerability Detection via AST-Based Transformers',
    venue: 'IEEE TPS-ISA 2025',
    institution: 'California State University, Sacramento',
    year: '2025',
    status: 'Published',
    metrics: ['40% faster inference', '94% detection accuracy', '10K+ contracts/hour'],
    description:
      'Novel approach combining GPU-accelerated deep learning with Abstract Syntax Tree (AST) representations to detect Ethereum smart contract vulnerabilities. Custom CUDA kernels achieve 40% faster inference at 94% detection accuracy, processing 10K+ smart contracts/hour. Focuses on explainability for DeFi/DAO risk analysis — making vulnerability detection interpretable for developers and auditors.',
    link: 'https://www.computer.org/csdl/proceedings-article/tps-isa/2025/969100a352/2eytftkhp5e',
  },
  {
    title: 'Real-Time Computer Vision for Precision Agriculture Using GPU Computing',
    venue: 'International Collaboration',
    institution: 'Government of Malaysia',
    year: '2023–2024',
    status: 'In Progress',
    metrics: ['95% accuracy', '10K+ images/hour', 'sub-100ms latency'],
    description:
      'Production-grade GPU-accelerated computer vision pipeline using PyTorch and CUDA for real-time crop monitoring. Distributed ML inference processing 10K+ images/hour with sub-100ms latency, deployed across 50+ agricultural sites. Kubernetes-based auto-scaling reduced infrastructure costs by 40%.',
    link: '',
  },
  {
    title: 'Parallel Algorithms for Large-Scale Data Processing on NVIDIA GPUs',
    venue: 'Academic Research',
    institution: 'California State University, Sacramento',
    year: '2026',
    status: 'Under Review',
    metrics: ['10× CPU speedup', '5.2B keys/sec sorting', '12 TFLOPS matrix ops'],
    description:
      'Optimized GPU algorithms using CUDA C++ achieving 10× speedup over CPU baselines. Parallel sorting at 5.2B keys/sec, matrix operations at 12 TFLOPS, graph algorithms tuned for NVIDIA A100. Provides scalable software engineering patterns for compute-intensive AI/ML workloads.',
    link: '',
  },
];

const statusStyle = {
  Published: 'text-secondary border-secondary/30 bg-secondary/5',
  'In Progress': 'text-yellow-400 border-yellow-400/30 bg-yellow-400/5',
  'Under Review': 'text-blue-400 border-blue-400/30 bg-blue-400/5',
};

const Research = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-4xl w-full animate-slide-up px-4 lg:px-0">

        <div className="mb-12">
          <p className="text-xs font-mono text-secondary tracking-widest mb-2">// research</p>
          <h1 className="text-3xl lg:text-4xl font-black text-white">Published Work</h1>
          <p className="text-xs font-mono text-gray-600 mt-2">
            GPU computing, AI/ML, and smart contract security
          </p>
        </div>

        <div className="space-y-5">
          {research.map((item, index) => (
            <div
              key={index}
              className="group border border-gray-800/60 rounded-lg p-6 hover:border-secondary/30 hover:bg-gray-900/20 transition-all duration-300"
            >
              {/* Title + status */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2">
                <h3 className="text-base font-bold text-gray-100 group-hover:text-secondary transition-colors duration-200 leading-snug">
                  {item.title}
                </h3>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-xs font-mono text-gray-600">{item.year}</span>
                  <span className={`text-xs font-mono px-2 py-0.5 rounded border ${statusStyle[item.status] || 'text-gray-500 border-gray-700'}`}>
                    {item.status}
                  </span>
                </div>
              </div>

              {/* Venue */}
              <p className="text-xs font-mono text-gray-600 mb-3">
                {item.venue} · {item.institution}
              </p>

              {/* Metrics */}
              <div className="flex flex-wrap gap-x-3 gap-y-1 mb-3">
                {item.metrics.map((m, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && <span className="text-gray-700 text-xs font-mono">·</span>}
                    <span className="text-xs font-mono text-secondary/70">{m}</span>
                  </React.Fragment>
                ))}
              </div>

              <p className="text-sm text-gray-500 leading-relaxed mb-4 group-hover:text-gray-400 transition-colors duration-200">
                {item.description}
              </p>

              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-secondary hover:text-white transition-colors duration-200"
                >
                  Read Publication — IEEE Computer Society
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Research;

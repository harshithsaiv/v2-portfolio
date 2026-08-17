import React from 'react';

const skillCategories = [
  {
    label: 'languages',
    skills: [
      { name: 'Python', expert: true },
      { name: 'Java', expert: true },
      { name: 'Rust', expert: true },
      { name: 'C++', expert: false },
      { name: 'CUDA', expert: false },
      { name: 'Go', expert: false },
      { name: 'TypeScript', expert: false },
      { name: 'SQL', expert: false },
    ],
  },
  {
    label: 'agentic AI & LLMs',
    skills: [
      { name: 'LangGraph', expert: true },
      { name: 'LangChain', expert: false },
      { name: 'OpenAI API', expert: false },
      { name: 'Claude API', expert: false },
      { name: 'RAG Pipelines', expert: true },
      { name: 'Vector DBs', expert: false },
      { name: 'Prompt Engineering', expert: false },
      { name: 'Function Calling', expert: false },
      { name: 'MCP', expert: false },
      { name: 'Pydantic AI', expert: false },
    ],
  },
  {
    label: 'inference & optimization',
    skills: [
      { name: 'vLLM', expert: false },
      { name: 'TensorRT', expert: false },
      { name: 'ONNX Runtime', expert: false },
      { name: 'llama.cpp', expert: false },
      { name: 'Triton Inference Server', expert: false },
      { name: 'CUDA Kernels', expert: true },
      { name: 'Model Quantization', expert: false },
      { name: 'FP16 / INT8', expert: false },
      { name: 'Batching & Throughput', expert: false },
    ],
  },
  {
    label: 'AI/ML & GPU computing',
    skills: [
      { name: 'PyTorch', expert: true },
      { name: 'TensorFlow', expert: false },
      { name: 'OpenCV', expert: false },
      { name: 'Whisper', expert: false },
      { name: 'GPU Optimization', expert: false },
      { name: 'Scikit-learn', expert: false },
      { name: 'Neural Networks', expert: false },
    ],
  },
  {
    label: 'backend & realtime',
    skills: [
      { name: 'FastAPI', expert: true },
      { name: 'Spring Boot', expert: true },
      { name: 'LiveKit / WebRTC', expert: false },
      { name: 'WebSockets', expert: false },
      { name: 'Node.js', expert: false },
      { name: 'Kafka', expert: false },
      { name: 'Flask', expert: false },
      { name: 'React', expert: false },
    ],
  },
  {
    label: 'cloud & DevOps',
    skills: [
      { name: 'AWS', expert: true },
      { name: 'Docker', expert: false },
      { name: 'Kubernetes', expert: false },
      { name: 'Git & GitHub', expert: true },
      { name: 'CI/CD', expert: false },
      { name: 'Terraform', expert: false },
      { name: 'Pinecone / Chroma', expert: false },
      { name: 'PostgreSQL', expert: false },
    ],
  },
];

const Skills = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-4xl w-full animate-slide-up px-4 lg:px-0">

        <div className="mb-12">
          <p className="text-xs font-mono text-secondary tracking-widest mb-2">04 / Skills</p>
          <h1 className="text-3xl lg:text-4xl font-black text-text-primary">Technical Proficiencies</h1>
          <p className="text-xs font-mono text-stone-500 mt-2">
            <span className="text-secondary">★</span> denotes expert-level proficiency
          </p>
        </div>

        <div className="space-y-10">
          {skillCategories.map((category, index) => (
            <div key={index}>
              <p className="text-xs font-mono text-stone-500 mb-4 tracking-widest">{`// ${category.label}`}</p>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <span
                    key={i}
                    className={`px-3 py-1.5 text-sm font-mono rounded border transition-all duration-200 cursor-default hover:border-secondary/40 hover:bg-secondary/5 ${
                      skill.expert
                        ? 'text-secondary border-secondary/40 bg-secondary/5'
                        : 'text-stone-500 border-stone-900/10 bg-stone-100'
                    }`}
                  >
                    {skill.name}
                    {skill.expert && <span className="ml-1.5 text-secondary/70 text-xs">★</span>}
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

export default Skills;

import React, { useRef, useEffect } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import * as d3 from 'd3'; // Add d3 import

const KnowledgeGraph = () => {
  const graphRef = useRef(null);

  // Knowledge graph data with nodes and links
  const graphData = {
    nodes: [
      { id: "ML", name: "Machine Learning", group: 1, size: 25 },
      { id: "CUDA", name: "CUDA Programming", group: 1, size: 20 },
      { id: "GPU", name: "GPU Architecture", group: 1, size: 18 },
      { id: "SysArch", name: "System Architecture", group: 2, size: 22 },
      { id: "DistSys", name: "Distributed Systems", group: 2, size: 20 },
      { id: "Kubernetes", name: "Kubernetes", group: 2, size: 16 },
      { id: "Docker", name: "Docker", group: 2, size: 15 },
      { id: "Security", name: "Security", group: 3, size: 20 },
      { id: "Cloud", name: "Cloud Computing", group: 3, size: 18 },
      { id: "WebDev", name: "Web Development", group: 4, size: 15 },
      { id: "React", name: "React", group: 4, size: 12 },
      { id: "Algorithms", name: "Algorithms", group: 5, size: 20 },
      { id: "DataStr", name: "Data Structures", group: 5, size: 18 }
    ],
    links: [
      { source: "ML", target: "CUDA", value: 5 },
      { source: "CUDA", target: "GPU", value: 8 },
      { source: "ML", target: "Algorithms", value: 6 },
      { source: "ML", target: "DataStr", value: 3 },
      { source: "SysArch", target: "DistSys", value: 7 },
      { source: "DistSys", target: "Kubernetes", value: 5 },
      { source: "DistSys", target: "Docker", value: 6 },
      { source: "Kubernetes", target: "Docker", value: 9 },
      { source: "SysArch", target: "Security", value: 4 },
      { source: "Cloud", target: "Security", value: 7 },
      { source: "Cloud", target: "DistSys", value: 8 },
      { source: "WebDev", target: "React", value: 6 },
      { source: "React", target: "WebDev", value: 6 },
      { source: "Algorithms", target: "DataStr", value: 10 },
      { source: "GPU", target: "SysArch", value: 4 }
    ]
  };

  useEffect(() => {
    if (graphRef.current) {
      // Customize graph once it's rendered
      const fg = graphRef.current;
      
      // Set zoom limits
      fg.d3Force('charge').strength(-120);
      fg.d3Force('link').distance(link => 100 / (link.value || 1));
      fg.d3Force('center', d3.forceCenter());
      
      // Initial zoom to fit
      setTimeout(() => {
        fg.zoomToFit(400);
      }, 500);
    }
  }, []);

  const nodeCanvasObject = (node, ctx, globalScale) => {
    const label = node.name;
    const fontSize = 12 / globalScale;
    ctx.font = `${fontSize}px Sans-Serif`;
    
    // Node circle
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.size / 2, 0, 2 * Math.PI, false);
    
    // Fill based on group with transparency
    switch (node.group) {
      case 1: ctx.fillStyle = 'rgba(239, 68, 68, 0.7)'; break; // Red
      case 2: ctx.fillStyle = 'rgba(59, 130, 246, 0.7)'; break; // Blue
      case 3: ctx.fillStyle = 'rgba(16, 185, 129, 0.7)'; break; // Green
      case 4: ctx.fillStyle = 'rgba(245, 158, 11, 0.7)'; break; // Yellow
      default: ctx.fillStyle = 'rgba(139, 92, 246, 0.7)'; break; // Purple
    }
    
    ctx.fill();
    
    // Node border
    ctx.strokeStyle = node.__highlight ? '#fff' : 'rgba(255,255,255,0.5)';
    ctx.lineWidth = node.__highlight ? 2 : 1;
    ctx.stroke();
    
    // Node label
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'white';
    ctx.fillText(label, node.x, node.y + node.size / 1.5);
  };

  return (
    <div className="bg-gray-800/40 rounded-xl overflow-hidden p-5">
      <h3 className="text-lg font-semibold text-white mb-4">My Knowledge Graph</h3>
      <p className="text-gray-400 text-sm mb-4">
        An interactive visualization of topics I'm currently learning and how they connect.
        <span className="block mt-2 italic">Drag nodes to explore connections, scroll to zoom.</span>
      </p>
      
      <div className="h-[400px] w-full border border-gray-700 rounded-lg overflow-hidden bg-gray-900/50">
        <ForceGraph2D
          ref={graphRef}
          graphData={graphData}
          nodeCanvasObject={nodeCanvasObject}
          nodeRelSize={1}
          linkWidth={link => link.value * 0.5}
          linkColor={() => 'rgba(255, 255, 255, 0.2)'}
          cooldownTicks={100}
          onNodeHover={node => {
            // Reset all nodes
            graphData.nodes.forEach(n => {
              n.__highlight = false;
            });
            
            // Highlight hovered node and connections
            if (node) {
              node.__highlight = true;
              // Find connected nodes
              graphData.links
                .filter(link => link.source.id === node.id || link.target.id === node.id)
                .forEach(link => {
                  const connectedNode = link.source.id === node.id ? link.target : link.source;
                  connectedNode.__highlight = true;
                });
            }
            
            return graphRef.current && graphRef.current.refresh();
          }}
        />
      </div>
      
      <div className="flex flex-wrap gap-3 mt-4">
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-red-500 inline-block mr-2"></span>
          <span className="text-xs text-gray-300">ML & GPU</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-blue-500 inline-block mr-2"></span>
          <span className="text-xs text-gray-300">System & Distributed</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-green-500 inline-block mr-2"></span>
          <span className="text-xs text-gray-300">Security & Cloud</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-amber-500 inline-block mr-2"></span>
          <span className="text-xs text-gray-300">Web Development</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-purple-500 inline-block mr-2"></span>
          <span className="text-xs text-gray-300">CS Fundamentals</span>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeGraph;

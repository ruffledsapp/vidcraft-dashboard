import { useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes = [
  {
    id: 'upload',
    type: 'input',
    data: { label: 'Video Upload' },
    position: { x: 250, y: 0 },
    className: 'bg-card',
  },
  {
    id: 'preprocessing',
    data: { label: 'Pre-processing' },
    position: { x: 250, y: 100 },
    className: 'bg-card',
  },
  {
    id: 'analysis',
    data: { label: 'AI Analysis' },
    position: { x: 250, y: 200 },
    className: 'bg-card',
  },
  {
    id: 'results',
    type: 'output',
    data: { label: 'Results' },
    position: { x: 250, y: 300 },
    className: 'bg-card',
  },
];

const initialEdges = [
  { id: 'e1-2', source: 'upload', target: 'preprocessing', animated: true },
  { id: 'e2-3', source: 'preprocessing', target: 'analysis', animated: true },
  { id: 'e3-4', source: 'analysis', target: 'results', animated: true },
];

export const AnalysisPipeline = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="h-[400px] w-full bg-background rounded-lg border border-border">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        className="bg-background"
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};
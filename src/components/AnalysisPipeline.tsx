import { useCallback, useState } from 'react';
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
import { Badge } from '@/components/ui/badge';
import { Sparkles, Upload, Brain, ChartBar, Lock } from 'lucide-react';

const initialNodes = [
  {
    id: 'upload',
    type: 'custom',
    data: { 
      label: 'Video Upload',
      icon: Upload,
      description: 'Upload or paste YouTube URL',
      status: 'waiting'
    },
    position: { x: 250, y: 0 },
    className: 'bg-card border-2 border-border/50 rounded-xl w-[200px]',
  },
  {
    id: 'preprocessing',
    type: 'custom',
    data: { 
      label: 'Pre-processing',
      icon: Brain,
      description: 'Extract frames and audio',
      status: 'locked',
      isPro: true
    },
    position: { x: 250, y: 100 },
    className: 'bg-card border-2 border-border/50 rounded-xl w-[200px]',
  },
  {
    id: 'analysis',
    type: 'custom',
    data: { 
      label: 'AI Analysis',
      icon: Sparkles,
      description: 'Scene detection & insights',
      status: 'locked',
      isPro: true
    },
    position: { x: 250, y: 200 },
    className: 'bg-card border-2 border-border/50 rounded-xl w-[200px]',
  },
  {
    id: 'results',
    type: 'custom',
    data: { 
      label: 'Results',
      icon: ChartBar,
      description: 'View detailed analytics',
      status: 'locked'
    },
    position: { x: 250, y: 300 },
    className: 'bg-card border-2 border-border/50 rounded-xl w-[200px]',
  },
];

const initialEdges = [
  { 
    id: 'e1-2', 
    source: 'upload', 
    target: 'preprocessing', 
    animated: true,
    style: { stroke: '#9b87f5' }
  },
  { 
    id: 'e2-3', 
    source: 'preprocessing', 
    target: 'analysis', 
    animated: true,
    style: { stroke: '#9b87f5' }
  },
  { 
    id: 'e3-4', 
    source: 'analysis', 
    target: 'results', 
    animated: true,
    style: { stroke: '#9b87f5' }
  },
];

// Custom Node Component
const CustomNode = ({ data }) => {
  const Icon = data.icon;
  return (
    <div className="p-4 text-center">
      <div className="flex items-center justify-center mb-2">
        <Icon className="w-6 h-6 text-muted-foreground" />
      </div>
      <h3 className="font-semibold mb-1">{data.label}</h3>
      <p className="text-xs text-muted-foreground mb-2">{data.description}</p>
      <div className="flex justify-center gap-2">
        {data.isPro && (
          <Badge variant="secondary" className="bg-gradient-to-r from-[#9b87f5] to-[#F97316] text-white">
            <Crown className="w-3 h-3 mr-1" />
            PRO
          </Badge>
        )}
        {data.status === 'locked' && (
          <Badge variant="outline" className="gap-1">
            <Lock className="w-3 h-3" />
            Locked
          </Badge>
        )}
      </div>
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

export const AnalysisPipeline = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="h-[500px] w-full bg-background rounded-lg border border-border">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        className="bg-background"
      >
        <Background />
        <Controls />
        <MiniMap 
          nodeColor={(node) => {
            return node.data.status === 'locked' ? '#64748b' : '#9b87f5';
          }}
        />
      </ReactFlow>
    </div>
  );
};
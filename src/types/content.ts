export type GraphNodeType = 'character' | 'concept' | 'event' | 'place' | 'time';

export type GraphNode = {
  id: string;
  type: GraphNodeType;
  label: string;
  description: string;
  imageAsset?: string;
  meta?: Record<string, string>;
  chat?: Array<{
    question: string;
    reply: string;
  }>;
};

export type GraphEdge = {
  from: string;
  to: string;
  relationLabel?: string;
};

export type Graph = {
  nodes: GraphNode[];
  edges: GraphEdge[];
};

export type Insight = {
  id: string;
  index: number;
  title: string;
  body: string;
  quote?: string;
  tags?: string[];
  relatedNodeIds?: string[];
};

export type BookSummary = {
  id: string;
  title: string;
  author?: string;
  categories?: string[];
  durationMinutes?: number;
  coverAsset?: string;
  overview: string;
  insights: Insight[];
  graph?: Graph;
};

export type ChatContextSource = 'home' | 'explore' | 'summary' | 'graph' | 'library';

export type ChatContext = {
  source: ChatContextSource;
  summaryId?: string;
  insightId?: string;
  nodeId?: string;
  contextText: string;
};

export type NoteItemType = 'highlight' | 'note' | 'quote';

export type NoteItem = {
  id: string;
  type: NoteItemType;
  timeLabel: string;
  summaryId: string;
  insightId?: string;
  title?: string;
  excerpt: string;
  coverKey?: string;
  thumbKey?: string;
};


import type { BookSummary, ChatContext, GraphNode, Insight, NoteItem } from '../types/content';
import rawSummaries from './summaries.json';
import rawNotes from './notes.json';
import type { ImageSourcePropType } from 'react-native';

const summaries: BookSummary[] = rawSummaries as BookSummary[];
const notes: NoteItem[] = rawNotes as NoteItem[];

export function listSummaries(): BookSummary[] {
  return summaries;
}

export function getSummaryById(summaryId: string): BookSummary | undefined {
  return summaries.find((s) => s.id === summaryId);
}

export function searchSummaries(query: string): BookSummary[] {
  const q = query.trim().toLowerCase();
  if (!q) return summaries;

  return summaries.filter((s) => {
    const haystack = [s.title, s.author, ...(s.categories ?? [])].filter(Boolean).join(' ').toLowerCase();
    return haystack.includes(q);
  });
}

export function listCategories(): string[] {
  const set = new Set<string>();
  summaries.forEach((s) => (s.categories ?? []).forEach((c) => set.add(c)));
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

export function listSummariesByCategory(category: string): BookSummary[] {
  const target = category.trim().toLowerCase();
  if (!target) return [];
  return summaries.filter((s) => (s.categories ?? []).some((c) => c.toLowerCase() === target));
}

export function listSummariesByAuthor(authorName: string): BookSummary[] {
  const target = authorName.trim().toLowerCase();
  if (!target) return [];
  return summaries.filter((s) => (s.author ?? '').toLowerCase() === target);
}

export function resolveSummaryCoverSource(summaryId: string): ImageSourcePropType | undefined {
  switch (summaryId) {
    case 'sapiens':
      return require('../assets/book-detail/sapiens-cover.jpg');
    case 'deep-work':
      return require('../assets/home/home-4.jpg');
    case 'innsmouth':
      return require('../assets/translator/project-cover.jpg');
    case 'atomic-habits':
      return require('../assets/home/home-2.jpg');
    case 'the-alchemist':
      return require('../assets/home/home-3.jpg');
    case 'focus':
      return require('../assets/home/home-5.jpg');
    case 'five-am-club':
      return require('../assets/home/home-6.jpg');
    default:
      return undefined;
  }
}

export function getInsight(summary: BookSummary, insightId: string): Insight | undefined {
  return summary.insights.find((i) => i.id === insightId);
}

export function getNode(summary: BookSummary, nodeId: string): GraphNode | undefined {
  return summary.graph?.nodes.find((n) => n.id === nodeId);
}

export function buildChatContext(params: {
  source: ChatContext['source'];
  summary?: BookSummary;
  insight?: Insight;
  node?: GraphNode;
  extraText?: string;
}): ChatContext {
  const { source, summary, insight, node, extraText } = params;

  const parts: string[] = [];
  if (summary) {
    parts.push(`Tóm tắt: ${summary.title}${summary.author ? ` — ${summary.author}` : ''}`);
    parts.push(`Overview: ${summary.overview}`);
  }
  if (insight) {
    parts.push(`Ý chính ${insight.index}: ${insight.title}`);
    parts.push(insight.body);
    if (insight.quote) parts.push(`Trích dẫn: ${insight.quote}`);
  }
  if (node) {
    parts.push(`Node: ${node.label} (${node.type})`);
    parts.push(node.description);
  }
  if (extraText) parts.push(extraText);

  return {
    source,
    summaryId: summary?.id,
    insightId: insight?.id,
    nodeId: node?.id,
    contextText: parts.join('\n'),
  };
}

export function listNotes(): NoteItem[] {
  return notes;
}

export function listNotesForLibrary(): NoteItem[] {
  return notes.filter((n) => Boolean(n.thumbKey));
}

export function listNotesForHighlights(): NoteItem[] {
  return notes.filter((n) => Boolean(n.coverKey));
}

export function resolveNoteCoverSource(note: NoteItem): ImageSourcePropType | undefined {
  switch (note.coverKey) {
    case 'notes.sapiens-cover':
      return require('../assets/notes/sapiens-cover.jpg');
    case 'notes.atomic-habits-cover':
      return require('../assets/notes/atomic-habits-cover.jpg');
    case 'notes.meditations-cover':
      return require('../assets/notes/meditations-cover.jpg');
    case 'notes.deep-work-cover':
      return require('../assets/notes/deep-work-cover.jpg');
    default:
      return undefined;
  }
}

export function resolveNoteThumbSource(note: NoteItem): ImageSourcePropType | undefined {
  switch (note.thumbKey) {
    case 'library.note-sapiens':
      return require('../assets/library/note-sapiens.jpg');
    case 'library.note-deep-work':
      return require('../assets/library/note-deep-work.jpg');
    default:
      return undefined;
  }
}


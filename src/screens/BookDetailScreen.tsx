import React from 'react';
import {
  Image,
  ImageSourcePropType,
  LayoutChangeEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Svg, { Line } from 'react-native-svg';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  clamp,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import FloatingAskBar from '../components/FloatingAskBar';
import SegmentedTabs from '../components/SegmentedTabs';
import { RootStackParamList } from '../navigation/AppNavigator';
import { uiColors, uiRadius, uiSizing, uiSpacing, uiTypography } from '../theme/ui';
import { buildChatContext, getNode, getSummaryById } from '../data';
import type { BookSummary, GraphNode, Insight } from '../types/content';

type BookDetailRouteProp = RouteProp<RootStackParamList, 'BookDetail'>;
type BookDetailNavigationProp = StackNavigationProp<RootStackParamList, 'BookDetail'>;

type BookDetailScreenProps = {
  route: BookDetailRouteProp;
  navigation: BookDetailNavigationProp;
};

type BookTab = 'summary' | 'graph';
type GraphPoint = { x: number; y: number };
type GraphLayoutNode = {
  node: GraphNode;
  point: GraphPoint;
  size: number;
  zIndex: number;
};

const FOCUS_NODE_SIZE = 102;
const DEFAULT_NODE_SIZE = 62;
const SMALL_NODE_SIZE = 52;

const getNodeColor = (type: GraphNode['type']) => {
  if (type === 'character') return { bg: '#E8E5FB', fg: '#5341CD' };
  if (type === 'concept') return { bg: '#E2F7EF', fg: '#006B55' };
  if (type === 'event') return { bg: '#FFE8D6', fg: '#AC5D00' };
  if (type === 'place') return { bg: '#EDEEF2', fg: '#474554' };
  if (type === 'time') return { bg: '#EDEEF2', fg: '#474554' };
  return { bg: '#EDEEF2', fg: '#474554' };
};

const getNodeIcon = (type: GraphNode['type']) => {
  if (type === 'character') return 'person';
  if (type === 'concept') return 'psychology';
  if (type === 'event') return 'bolt';
  if (type === 'place') return 'location-on';
  if (type === 'time') return 'schedule';
  return 'category';
};

const getNodeSize = (node: GraphNode, isFocus: boolean, nodeCount: number) => {
  if (isFocus) return FOCUS_NODE_SIZE;
  if (nodeCount > 12) return SMALL_NODE_SIZE;
  return DEFAULT_NODE_SIZE;
};

const graphTypePriority: Record<GraphNode['type'], number> = {
  character: 0,
  concept: 1,
  event: 2,
  time: 3,
  place: 4,
};

const computeGraphLayout = (params: {
  nodes: GraphNode[];
  focusId: string;
  canvasSize: { width: number; height: number };
}): Record<string, GraphLayoutNode> => {
  const { nodes, focusId, canvasSize } = params;
  const { width, height } = canvasSize;

  if (width <= 0 || height <= 0 || nodes.length === 0) return {};

  const focus = nodes.find((n) => n.id === focusId) ?? nodes[0];
  const others = nodes
    .filter((n) => n.id !== focus.id)
    .slice()
    .sort((a, b) => {
      const pa = graphTypePriority[a.type] ?? 99;
      const pb = graphTypePriority[b.type] ?? 99;
      if (pa !== pb) return pa - pb;
      return a.label.localeCompare(b.label);
    });

  const center: GraphPoint = { x: width * 0.5, y: height * 0.5 };
  const radiusBase = Math.min(width, height) * 0.5;
  const maxRadius = Math.max(120, radiusBase - 40);

  const byId: Record<string, GraphLayoutNode> = {};

  byId[focus.id] = {
    node: focus,
    point: center,
    size: getNodeSize(focus, true, nodes.length),
    zIndex: 4,
  };

  if (others.length === 0) return byId;

  const nodesPerRing = 10;
  const ringCount = Math.max(1, Math.ceil(others.length / nodesPerRing));
  const ringGap = ringCount > 1 ? Math.min(70, Math.max(48, maxRadius / (ringCount + 0.8))) : 0;

  const startAngle = -Math.PI / 2;
  let cursor = 0;

  for (let ringIndex = 0; ringIndex < ringCount; ringIndex++) {
    const ringNodes = others.slice(cursor, cursor + nodesPerRing);
    cursor += ringNodes.length;
    if (ringNodes.length === 0) break;

    const ringRadius = ringCount === 1 ? Math.min(maxRadius, 0.68 * maxRadius) : Math.min(maxRadius, 90 + ringIndex * ringGap);
    const count = ringNodes.length;
    const angleStep = (Math.PI * 2) / count;
    const ringOffset = (ringIndex % 2 === 0 ? 0 : angleStep / 2) + ringIndex * 0.08;

    ringNodes.forEach((node, index) => {
      const angle = startAngle + ringOffset + index * angleStep;
      const point: GraphPoint = {
        x: center.x + Math.cos(angle) * ringRadius,
        y: center.y + Math.sin(angle) * ringRadius,
      };

      byId[node.id] = {
        node,
        point,
        size: getNodeSize(node, false, nodes.length),
        zIndex: 3,
      };
    });
  }

  return byId;
};

const pointOnCircle = (origin: GraphPoint, target: GraphPoint, radius: number): GraphPoint => {
  const dx = target.x - origin.x;
  const dy = target.y - origin.y;
  const distance = Math.hypot(dx, dy);

  if (distance === 0) {
    return origin;
  }

  const ratio = radius / distance;

  return {
    x: origin.x + dx * ratio,
    y: origin.y + dy * ratio,
  };
};

export default function BookDetailScreen({ route, navigation }: BookDetailScreenProps) {
  const [activeTab, setActiveTab] = React.useState<BookTab>('summary');
  const [activeInsightIndex, setActiveInsightIndex] = React.useState(0);
  const [selectedNodeId, setSelectedNodeId] = React.useState<string | null>(null);
  const [graphCanvasSize, setGraphCanvasSize] = React.useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  const graphScale = useSharedValue(1);
  const graphTranslateX = useSharedValue(0);
  const graphTranslateY = useSharedValue(0);
  const panStartX = useSharedValue(0);
  const panStartY = useSharedValue(0);
  const pinchStartScale = useSharedValue(1);
  const summaryId = route.params?.summaryId ?? 'sapiens';
  const summary = React.useMemo<BookSummary | undefined>(() => getSummaryById(summaryId), [summaryId]);
  const title = summary?.title ?? 'Tóm tắt';
  const author = summary?.author ?? '';

  const insights = summary?.insights ?? [];
  const activeInsight: Insight | undefined = insights[activeInsightIndex];
  const totalInsights = insights.length || 1;
  const progressPct = Math.round(((activeInsightIndex + 1) / totalInsights) * 100);

  React.useEffect(() => {
    setActiveInsightIndex(0);
    setSelectedNodeId(null);
    graphScale.value = 1;
    graphTranslateX.value = 0;
    graphTranslateY.value = 0;
  }, [graphScale, graphTranslateX, graphTranslateY, summaryId]);

  const coverSource = React.useMemo<ImageSourcePropType>(() => {
    if (summaryId === 'sapiens') return require('../assets/book-detail/sapiens-cover.jpg');
    if (summaryId === 'deep-work') return require('../assets/home/home-4.jpg');
    if (summaryId === 'innsmouth') return require('../assets/translator/project-cover.jpg');
    return require('../assets/library/continue-reading.jpg');
  }, [summaryId]);

  const openAskChat = React.useCallback(
    (initialPrompt?: string) => {
      const context = buildChatContext({
        source: activeTab === 'graph' ? 'graph' : 'summary',
        summary,
        insight: activeTab === 'summary' ? activeInsight : undefined,
        node: activeTab === 'graph' && selectedNodeId && summary ? getNode(summary, selectedNodeId) : undefined,
      });
      navigation.navigate('AskAI', { initialPrompt, context });
    },
    [activeInsight, activeTab, navigation, selectedNodeId, summary]
  );

  const handleGraphCanvasLayout = React.useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;

    if (width <= 0 || height <= 0) {
      return;
    }

    setGraphCanvasSize((prev) => {
      if (prev.width === width && prev.height === height) {
        return prev;
      }

      return { width, height };
    });
  }, []);

  const resetGraphViewport = React.useCallback(() => {
    graphScale.value = withTiming(1, { duration: 180 });
    graphTranslateX.value = withTiming(0, { duration: 180 });
    graphTranslateY.value = withTiming(0, { duration: 180 });
  }, [graphScale, graphTranslateX, graphTranslateY]);

  const zoomGraphBy = React.useCallback(
    (delta: number) => {
      const next = clamp(graphScale.value + delta, 0.7, 2.6);
      graphScale.value = withTiming(next, { duration: 140 });
    },
    [graphScale]
  );

  const graphAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: graphTranslateX.value },
        { translateY: graphTranslateY.value },
        { scale: graphScale.value },
      ],
    };
  }, []);

  const panGesture = React.useMemo(() => {
    return Gesture.Pan()
      .onBegin(() => {
        panStartX.value = graphTranslateX.value;
        panStartY.value = graphTranslateY.value;
      })
      .onUpdate((e) => {
        graphTranslateX.value = panStartX.value + e.translationX;
        graphTranslateY.value = panStartY.value + e.translationY;
      });
  }, [graphTranslateX, graphTranslateY, panStartX, panStartY]);

  const pinchGesture = React.useMemo(() => {
    return Gesture.Pinch()
      .onBegin(() => {
        pinchStartScale.value = graphScale.value;
      })
      .onUpdate((e) => {
        graphScale.value = clamp(pinchStartScale.value * e.scale, 0.7, 2.6);
      });
  }, [graphScale, pinchStartScale]);

  const doubleTapGesture = React.useMemo(() => {
    return Gesture.Tap().numberOfTaps(2).onStart(() => {
      graphScale.value = withTiming(1, { duration: 180 });
      graphTranslateX.value = withTiming(0, { duration: 180 });
      graphTranslateY.value = withTiming(0, { duration: 180 });
    });
  }, [graphScale, graphTranslateX, graphTranslateY]);

  const graphGesture = React.useMemo(
    () => Gesture.Simultaneous(panGesture, pinchGesture, doubleTapGesture),
    [doubleTapGesture, panGesture, pinchGesture]
  );

  const graphNodes = React.useMemo<GraphNode[]>(() => summary?.graph?.nodes ?? [], [summary?.graph?.nodes]);
  const graphEdges = React.useMemo(() => summary?.graph?.edges ?? [], [summary?.graph?.edges]);

  const graphEdgeLines = React.useMemo(() => {
    if (graphCanvasSize.width <= 0 || graphCanvasSize.height <= 0) return [];

    const focusId = selectedNodeId ?? graphNodes[0]?.id ?? '';
    const layout = computeGraphLayout({ nodes: graphNodes, focusId, canvasSize: graphCanvasSize });

    return graphEdges
      .map((edge) => {
        const from = layout[edge.from];
        const to = layout[edge.to];
        if (!from || !to) return null;
        const start = pointOnCircle(from.point, to.point, from.size / 2);
        const end = pointOnCircle(to.point, from.point, to.size / 2);
        return { id: `${edge.from}-${edge.to}-${edge.label ?? ''}`, start, end };
      })
      .filter(Boolean) as Array<{ id: string; start: GraphPoint; end: GraphPoint }>;
  }, [graphCanvasSize, graphEdges, graphNodes, selectedNodeId]);

  const focusNodeId = selectedNodeId ?? graphNodes[0]?.id ?? null;

  const graphLayoutById = React.useMemo(() => {
    const focusId = focusNodeId ?? graphNodes[0]?.id ?? '';
    return computeGraphLayout({ nodes: graphNodes, focusId, canvasSize: graphCanvasSize });
  }, [focusNodeId, graphCanvasSize, graphNodes]);

  const selectedNode: GraphNode | undefined = React.useMemo(() => {
    if (!summary || !selectedNodeId) return undefined;
    return getNode(summary, selectedNodeId);
  }, [selectedNodeId, summary]);

  const openCharacterChat = React.useCallback(() => {
    if (!summary || !selectedNode || selectedNode.type !== 'character') return;
    navigation.navigate('CharacterChat', { summaryId: summary.id, nodeId: selectedNode.id });
  }, [navigation, selectedNode, summary]);

  React.useEffect(() => {
    if (activeTab !== 'graph') return;
    if (selectedNodeId) return;
    if (graphNodes[0]?.id) setSelectedNodeId(graphNodes[0].id);
  }, [activeTab, graphNodes, selectedNodeId]);

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.topBar}>
        <Pressable style={styles.iconBtn} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={22} color="#64748B" />
        </Pressable>
        <Text style={styles.topTitle} numberOfLines={1}>{title}</Text>
        <Pressable style={styles.iconBtn}>
          <MaterialIcons name="bookmark-border" size={21} color="#64748B" />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.headerSection}>
          <View style={styles.coverFrame}>
            <Image source={coverSource} style={styles.cover} resizeMode="cover" />
          </View>
          <Text style={styles.bookTitle}>{title}</Text>
          {author ? <Text style={styles.bookAuthor}>{author}</Text> : null}

          <View style={styles.badgesWrap}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{`${summary?.durationMinutes ?? 15} PHÚT TÓM TẮT`}</Text>
            </View>
            <View style={styles.badge}><Text style={styles.badgeText}>{`${insights.length} Ý CHÍNH`}</Text></View>
            {summary?.graph ? <View style={styles.badge}><Text style={styles.badgeText}>SƠ ĐỒ</Text></View> : null}
          </View>

          <View style={styles.aboutCard}>
            <Text style={styles.aboutTitle}>Tóm tắt nhanh</Text>
            <Text style={styles.aboutText}>{summary?.overview ?? 'Chưa có nội dung.'}</Text>
          </View>
        </View>

        <SegmentedTabs
          value={activeTab}
          onChange={setActiveTab}
          options={[
            { key: 'summary', label: 'Tóm tắt' },
            { key: 'graph', label: 'Sơ đồ' },
          ]}
        />

        {activeTab === 'summary' ? (
          <View style={styles.tabContent}>
            <View>
              <View style={styles.progressTop}>
                <View>
                  <Text style={styles.progressLabel}>Tiến độ hiện tại</Text>
                  <Text style={styles.progressSub}>{`Ý chính ${activeInsightIndex + 1} / ${totalInsights}`}</Text>
                </View>
                <Text style={styles.progressMeta}>{`${progressPct}% • ${Math.max(1, Math.round((summary?.durationMinutes ?? 15) * (1 - progressPct / 100)))} PHÚT CÒN LẠI`}</Text>
              </View>
              <View style={styles.progressBarTrack}>
                <View style={[styles.progressBarFill, { width: `${progressPct}%` }]} />
              </View>
            </View>

            <View style={styles.insightCard}>
              <Text style={styles.insightLabel}>{`Ý CHÍNH ${String(activeInsight?.index ?? activeInsightIndex + 1).padStart(2, '0')}`}</Text>
              <Text style={styles.insightTitle}>{activeInsight?.title ?? 'Chưa có ý chính'}</Text>
              <Text style={styles.insightText}>{activeInsight?.body ?? ''}</Text>
            </View>

            {activeInsight?.quote ? (
              <View style={styles.quoteCard}>
                <Text style={styles.quoteText}>{`"${activeInsight.quote}"`}</Text>
                <Text style={styles.quoteTag}>TRÍCH DẪN</Text>
              </View>
            ) : null}

            <View style={styles.insightNavRow}>
              <Pressable
                style={styles.prevBtn}
                onPress={() => setActiveInsightIndex((v) => Math.max(0, v - 1))}
                disabled={activeInsightIndex <= 0}
              >
                <Text style={styles.prevBtnText}>Trước</Text>
              </Pressable>
              <Pressable
                style={styles.nextBtn}
                onPress={() => setActiveInsightIndex((v) => Math.min(totalInsights - 1, v + 1))}
                disabled={activeInsightIndex >= totalInsights - 1}
              >
                <Text style={styles.nextBtnText}>Ý chính tiếp theo</Text>
              </Pressable>
            </View>

            <View style={styles.actionRow}>
              {[
                { icon: 'stylus-note', label: 'Đánh dấu' },
                { icon: 'format-quote', label: 'Lưu trích dẫn' },
                { icon: 'note-add', label: 'Ghi chú' },
                { icon: 'ios-share', label: 'Chia sẻ' },
              ].map((item) => (
                <Pressable key={item.label} style={styles.actionItem}>
                  <MaterialIcons name={item.icon as any} size={20} color="#474554" />
                  <Text style={styles.actionLabel}>{item.label}</Text>
                </Pressable>
              ))}
            </View>

            <View style={styles.utilityRow}>
              {['save', 'edit', 'share', 'text-fields'].map((icon) => (
                <Pressable key={icon} style={styles.utilityItem}>
                  <MaterialIcons name={icon as any} size={21} color="#474554" />
                </Pressable>
              ))}
            </View>
          </View>
        ) : null}

        {activeTab === 'graph' ? (
          <View style={styles.tabContent}>
            <Text style={styles.graphTitle}>Sơ đồ mối quan hệ</Text>
            <Text style={styles.graphHint}>Chạm node để xem chi tiết • Kéo/zoom để khám phá</Text>

            <View style={styles.bookGraphCanvas} onLayout={handleGraphCanvasLayout}>
              <GestureDetector gesture={graphGesture}>
                <Animated.View style={[styles.graphLayer, graphAnimatedStyle]}>
                  <Svg
                    width={graphCanvasSize.width}
                    height={graphCanvasSize.height}
                    viewBox={`0 0 ${graphCanvasSize.width} ${graphCanvasSize.height}`}
                    style={styles.graphSvg}
                    pointerEvents="none"
                  >
                    {graphEdgeLines.map((e) => (
                      <Line
                        key={e.id}
                        x1={e.start.x}
                        y1={e.start.y}
                        x2={e.end.x}
                        y2={e.end.y}
                        stroke="#BFC4D8"
                        strokeWidth={2}
                        strokeLinecap="round"
                      />
                    ))}
                  </Svg>

                  {graphNodes
                    .slice()
                    .sort((a, b) => {
                      const aIsFocus = a.id === focusNodeId;
                      const bIsFocus = b.id === focusNodeId;
                      if (aIsFocus && !bIsFocus) return 1;
                      if (!aIsFocus && bIsFocus) return -1;
                      return 0;
                    })
                    .map((node) => {
                      const layout = graphLayoutById[node.id];
                      if (!layout) return null;
                      const isFocus = node.id === focusNodeId;
                      const size = layout.size;
                      const { fg } = getNodeColor(node.type);
                      const icon = getNodeIcon(node.type);
                      const circleBgStyle =
                        node.type === 'character'
                          ? styles.graphNodeBgCharacter
                          : node.type === 'concept'
                            ? styles.graphNodeBgConcept
                            : node.type === 'event'
                              ? styles.graphNodeBgEvent
                              : node.type === 'place'
                                ? styles.graphNodeBgPlace
                                : node.type === 'time'
                                  ? styles.graphNodeBgTime
                                  : styles.graphNodeBgDefault;

                      return (
                        <Pressable
                          key={node.id}
                          onPress={() => setSelectedNodeId(node.id)}
                          style={[
                            styles.graphNodeWrap,
                            isFocus ? styles.graphNodeWrapFocus : styles.graphNodeWrapBase,
                            {
                              left: layout.point.x - size / 2,
                              top: layout.point.y - size / 2,
                              width: size,
                            },
                          ]}
                        >
                          <View
                            style={[
                              styles.graphNodeCircle,
                              isFocus ? styles.graphNodeCircleFocus : styles.graphNodeCircleBase,
                              circleBgStyle,
                              {
                                width: size,
                                height: size,
                                borderRadius: size / 2,
                              },
                            ]}
                          >
                            <MaterialIcons name={icon as any} size={Math.max(18, Math.round(size * 0.36))} color={fg} />
                          </View>
                          <Text style={styles.graphNodeLabel} numberOfLines={1}>
                            {node.label}
                          </Text>
                        </Pressable>
                      );
                    })}
                </Animated.View>
              </GestureDetector>

              <View style={styles.canvasControls}>
                <Pressable style={styles.canvasControlBtn} onPress={() => zoomGraphBy(0.18)}>
                  <MaterialIcons name="zoom-in" size={18} color="#474554" />
                </Pressable>
                <Pressable style={styles.canvasControlBtn} onPress={() => zoomGraphBy(-0.18)}>
                  <MaterialIcons name="zoom-out" size={18} color="#474554" />
                </Pressable>
                <Pressable style={styles.canvasControlBtn} onPress={resetGraphViewport}>
                  <MaterialIcons name="my-location" size={18} color="#474554" />
                </Pressable>
              </View>
            </View>

            <Text style={styles.bookSelectedTitle}>Thực thể được chọn</Text>
            <View style={styles.bookEntityCard}>
              <Image
                source={
                  summaryId === 'sapiens'
                    ? require('../assets/book-detail/sapiens-mini.jpg')
                    : summaryId === 'innsmouth'
                      ? require('../assets/translator/robert-chat.jpg')
                    : require('../assets/library/continue-reading.jpg')
                }
                style={styles.bookEntityImage}
              />
              <View style={styles.bookEntityHead}>
                <Text style={styles.bookEntityName}>{selectedNode?.label ?? '—'}</Text>
                <Text style={styles.bookEntityRole}>{(selectedNode?.type ?? 'concept').toUpperCase()}</Text>
              </View>
              <Text style={styles.bookEntityDesc}>
                {selectedNode?.description ?? 'Chọn một node để xem chi tiết.'}
              </Text>

              {selectedNode ? (
                <View style={styles.bookRelationChip}>
                  <MaterialIcons name="link" size={14} color="#474554" />
                  <Text style={styles.bookRelationText}>{`ID: ${selectedNode.id}`}</Text>
                </View>
              ) : null}

              {selectedNode?.type === 'character' ? (
                <Pressable style={styles.chatCharacterBtnBook} onPress={openCharacterChat}>
                  <MaterialIcons name="chat" size={16} color="#FFFFFF" />
                  <Text style={styles.chatCharacterBtnBookText}>Chat với nhân vật</Text>
                </Pressable>
              ) : (
                <Pressable
                  style={styles.chatCharacterBtnBook}
                  onPress={() =>
                    openAskChat(`Giải thích node "${selectedNode?.label ?? ''}" và liên hệ với các ý chính quan trọng.`)
                  }
                >
                  <MaterialIcons name="chat" size={16} color="#FFFFFF" />
                  <Text style={styles.chatCharacterBtnBookText}>Hỏi về node này</Text>
                </Pressable>
              )}
            </View>
          </View>
        ) : null}
      </ScrollView>

      <FloatingAskBar
        placeholder={activeTab === 'graph' ? 'Hỏi sơ đồ về mối liên hệ này...' : 'Hỏi Bạn Đọc về bản tóm tắt này...'}
        bottomOffset={16}
        onOpenFullChat={() => openAskChat()}
        onSubmitPrompt={(prompt) => openAskChat(prompt)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: uiColors.background },
  topBar: {
    height: 58,
    paddingHorizontal: uiSpacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconBtn: { width: 34, height: 34, borderRadius: 99, alignItems: 'center', justifyContent: 'center' },
  topTitle: { fontSize: uiTypography.h2, color: uiColors.text, fontWeight: '600' },
  content: { paddingHorizontal: uiSpacing.lg, paddingBottom: 150, gap: uiSpacing.lg },
  headerSection: { alignItems: 'center', gap: 8 },
  coverFrame: {
    borderRadius: 18,
    padding: 3,
    backgroundColor: '#EDEEF2',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  cover: { width: 126, height: 188, borderRadius: 16 },
  bookTitle: { marginTop: 6, textAlign: 'center', fontSize: uiTypography.h2, color: uiColors.text, fontWeight: '800' },
  bookAuthor: { fontSize: uiTypography.bodySm, color: uiColors.textMuted, fontWeight: '500' },
  badgesWrap: { marginTop: 6, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 6 },
  badge: { borderRadius: 999, backgroundColor: '#E7E8EC', paddingHorizontal: 10, paddingVertical: 6 },
  badgeText: { fontSize: 10, color: '#474554', fontWeight: '700' },
  aboutCard: { marginTop: 6, width: '100%', borderRadius: uiRadius.lg, backgroundColor: uiColors.surfaceMuted, padding: 14 },
  aboutTitle: { color: uiColors.primaryDeep, fontSize: uiTypography.caption, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.6 },
  aboutText: { marginTop: 6, color: uiColors.textMuted, fontSize: uiTypography.bodySm, lineHeight: 22, fontWeight: '500' },
  openTranslatorBtn: {
    marginTop: -4,
    minHeight: uiSizing.tabHeight,
    borderRadius: uiRadius.md,
    backgroundColor: '#5D4AD6',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  openTranslatorText: { color: '#FFFFFF', fontSize: uiTypography.bodySm, fontWeight: '700' },
  tabContent: { gap: 14 },
  progressTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  progressLabel: { fontSize: 10, color: '#6C5CE7', fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.6 },
  progressSub: { marginTop: 2, fontSize: 12, color: '#191C1F', fontWeight: '700' },
  progressMeta: { fontSize: 10, color: '#787586', fontWeight: '600' },
  progressBarTrack: { marginTop: 6, height: 6, borderRadius: 999, backgroundColor: '#D9DADE', overflow: 'hidden' },
  progressBarFill: { width: '35%', height: 6, borderRadius: 999, backgroundColor: '#006B55' },
  insightCard: { borderRadius: 18, backgroundColor: '#FFFFFF', padding: 16, gap: 8 },
  insightLabel: { fontSize: 11, color: '#5341CD', fontWeight: '800', letterSpacing: 1.2 },
  insightTitle: { fontSize: 28, lineHeight: 34, color: '#191C1F', fontWeight: '800' },
  insightText: { fontSize: 14, lineHeight: 31, color: '#474554', fontWeight: '500' },
  quoteCard: { borderRadius: 18, backgroundColor: '#F2EEEE', padding: 16, gap: 10 },
  quoteText: { fontSize: 18, lineHeight: 33, color: '#2F1500', fontStyle: 'italic', fontWeight: '600' },
  quoteTag: { alignSelf: 'flex-end', fontSize: 10, color: '#6E3900', fontWeight: '800', letterSpacing: 1 },
  insightNavRow: { flexDirection: 'row', gap: 10 },
  prevBtn: { flex: 1, height: 44, borderRadius: 14, borderWidth: 1, borderColor: '#C8C4D7', alignItems: 'center', justifyContent: 'center' },
  prevBtnText: { color: '#5341CD', fontWeight: '600', fontSize: 14 },
  nextBtn: { flex: 2, height: 44, borderRadius: 14, backgroundColor: '#6C5CE7', alignItems: 'center', justifyContent: 'center' },
  nextBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 14 },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 16,
    backgroundColor: '#F2F3F7',
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  actionItem: { alignItems: 'center', gap: 5, width: '24%' },
  actionLabel: { fontSize: 10, color: '#474554', fontWeight: '700' },
  utilityRow: { flexDirection: 'row', justifyContent: 'space-around', borderRadius: 16, backgroundColor: '#EDEEF2', paddingVertical: 10 },
  utilityItem: { padding: 6 },
  graphTitle: {
    fontSize: uiTypography.h2,
    color: '#191C1F',
    fontWeight: '700',
  },
  graphHint: {
    marginTop: 2,
    color: '#474554',
    fontSize: 14,
    fontWeight: '500',
  },
  bookGraphCanvas: {
    height: 420,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E2F0',
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  graphLayer: {
    ...StyleSheet.absoluteFillObject,
  },
  graphSvg: {
    ...StyleSheet.absoluteFillObject,
  },
  graphNodeWrap: {
    position: 'absolute',
    alignItems: 'center',
  },
  graphNodeWrapBase: {
    zIndex: 3,
  },
  graphNodeWrapFocus: {
    zIndex: 5,
  },
  graphNodeCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  graphNodeCircleBase: {
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  graphNodeCircleFocus: {
    borderWidth: 2,
    borderColor: '#5341CD',
  },
  graphNodeBgCharacter: { backgroundColor: '#E8E5FB' },
  graphNodeBgConcept: { backgroundColor: '#E2F7EF' },
  graphNodeBgEvent: { backgroundColor: '#FFE8D6' },
  graphNodeBgPlace: { backgroundColor: '#EDEEF2' },
  graphNodeBgTime: { backgroundColor: '#EDEEF2' },
  graphNodeBgDefault: { backgroundColor: '#EDEEF2' },
  graphNodeLabel: {
    marginTop: 6,
    maxWidth: 110,
    color: '#191C1F',
    fontSize: 11,
    fontWeight: '700',
    backgroundColor: '#FFFFFFE8',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#E3E8EF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    overflow: 'hidden',
  },
  bookCenterNodeWrap: {
    position: 'absolute',
    alignItems: 'center',
    zIndex: 3,
  },
  bookCenterNodeOuter: {
    width: 102,
    height: 102,
    borderRadius: 51,
    padding: 3,
    backgroundColor: '#5341CD',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  bookCenterNodeImage: { width: '100%', height: '100%', borderRadius: 48, borderWidth: 2, borderColor: '#FFFFFF' },
  bookNodeName: {
    marginTop: 10,
    color: '#191C1F',
    fontSize: 12,
    fontWeight: '700',
    backgroundColor: '#FFFFFFE8',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#E3E8EF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    overflow: 'hidden',
  },
  bookNodeLeftWrap: {
    position: 'absolute',
    alignItems: 'center',
    zIndex: 3,
  },
  bookNodeRightWrap: {
    position: 'absolute',
    alignItems: 'center',
    zIndex: 3,
  },
  bookSmallNodeGreen: {
    width: 66,
    height: 66,
    borderRadius: 33,
    padding: 2,
    backgroundColor: '#6DFAD2',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  bookSmallNodePurple: {
    width: 62,
    height: 62,
    borderRadius: 31,
    padding: 2,
    backgroundColor: '#C6BFFF',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  bookSmallNodeImage: { width: '100%', height: '100%', borderRadius: 30, borderWidth: 2, borderColor: '#FFFFFF' },
  bookNodeLabel: {
    marginTop: 4,
    color: '#191C1F',
    fontSize: 11,
    fontWeight: '600',
    backgroundColor: '#FFFFFFE8',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#E3E8EF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    overflow: 'hidden',
  },
  bookLocationWrap: {
    position: 'absolute',
    alignItems: 'center',
    zIndex: 3,
  },
  bookLocationDot: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#E7E8EC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookLocationLabel: { marginTop: 4, color: '#787586', fontSize: 10, fontWeight: '700', letterSpacing: 0.7 },
  bookSelectedTitle: { color: '#191C1F', fontSize: 18, fontWeight: '700', paddingHorizontal: 2 },
  bookEntityCard: {
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#ECECF2',
    padding: 16,
    gap: 10,
  },
  bookEntityImage: { width: 96, height: 96, borderRadius: 16 },
  bookEntityHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  bookEntityName: { color: '#191C1F', fontSize: 18, fontWeight: '700', flex: 1, paddingRight: 8 },
  bookEntityRole: {
    color: '#00725B',
    backgroundColor: '#6DFAD2',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
    overflow: 'hidden',
  },
  bookEntityDesc: { color: '#474554', fontSize: 14, lineHeight: 22 },
  bookRelationChip: {
    borderRadius: 12,
    backgroundColor: '#F2F3F7',
    borderWidth: 1,
    borderColor: '#E0E2EA',
    minHeight: 34,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
  },
  bookRelationText: { color: '#373849', fontSize: 13, fontWeight: '500' },
  chatCharacterBtnBook: {
    marginTop: 4,
    minHeight: 48,
    borderRadius: 14,
    backgroundColor: '#5341CD',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  chatCharacterBtnBookText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  mapCanvas: {
    height: 320,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E2F0',
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  centerNodeWrap: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginLeft: -32,
    marginTop: -32,
  },
  centerNode: {
    width: 64,
    height: 64,
    borderRadius: 99,
    backgroundColor: '#6C5CE7',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerNodeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  nodeCognitiveWrap: {
    position: 'absolute',
    left: 48,
    top: 56,
    alignItems: 'center',
    gap: 6,
  },
  nodePrimary: {
    width: 56,
    height: 56,
    borderRadius: 99,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6C5CE7',
    borderWidth: 3,
    borderColor: '#E4DFFF',
  },
  nodeTag: {
    color: '#6C5CE7',
    fontSize: 9,
    fontWeight: '700',
    backgroundColor: '#E4DFFF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  nodeMythsWrap: {
    position: 'absolute',
    right: 40,
    top: 90,
    alignItems: 'center',
    gap: 4,
  },
  nodeGreen: {
    width: 52,
    height: 52,
    borderRadius: 99,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00B894',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  nodeLabel: {
    color: '#474554',
    fontSize: 9,
    fontWeight: '700',
  },
  nodeAgricultureWrap: {
    position: 'absolute',
    right: 56,
    bottom: 56,
    alignItems: 'center',
    gap: 4,
  },
  nodeReligionWrap: {
    position: 'absolute',
    left: 34,
    bottom: 74,
    alignItems: 'center',
    gap: 4,
  },
  nodeNeutral: {
    width: 46,
    height: 46,
    borderRadius: 99,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E7E8EC',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  canvasControls: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    gap: 6,
  },
  canvasControlBtn: {
    width: 34,
    height: 34,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#ECE9F4',
  },
  graphCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  graphCardTitle: {
    marginTop: 3,
    fontSize: 24,
    lineHeight: 31,
    color: '#191C1F',
    fontWeight: '800',
    maxWidth: 215,
  },
  selectedTag: {
    marginTop: 4,
    borderRadius: 999,
    backgroundColor: '#E4DFFF',
    color: '#4029BA',
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontSize: 10,
    fontWeight: '800',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  graphCardText: {
    color: '#474554',
    fontSize: 14,
    lineHeight: 24,
    fontWeight: '500',
  },
  connectedWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    alignItems: 'center',
  },
  connectedLabel: {
    color: '#787586',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  connectedChip: {
    color: '#191C1F',
    fontSize: 12,
    fontWeight: '600',
    borderRadius: 8,
    backgroundColor: '#EDEEF2',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  graphActionsWrap: {
    gap: 8,
    paddingTop: 4,
  },
  graphActionBtn: {
    alignSelf: 'flex-start',
    borderRadius: 10,
    backgroundColor: '#E8E5FB',
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  graphActionText: {
    color: '#5341CD',
    fontSize: 14,
    fontWeight: '700',
  },
  relatedInsightBtn: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  relatedInsightText: {
    color: '#5341CD',
    fontSize: 14,
    fontWeight: '700',
  },
  placeholderCard: {
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    padding: 18,
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  placeholderTitle: { fontSize: 18, color: '#191C1F', fontWeight: '700' },
  placeholderText: { textAlign: 'center', color: '#474554', fontSize: 14, lineHeight: 21, fontWeight: '500' },
});
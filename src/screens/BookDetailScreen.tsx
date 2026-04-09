import React from 'react';
import {
  Image,
  ImageSourcePropType,
  LayoutChangeEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  ViewStyle,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BottomNavBar from '../components/BottomNavBar';
import FloatingAskBar from '../components/FloatingAskBar';
import SegmentedTabs from '../components/SegmentedTabs';
import { RootStackParamList } from '../navigation/AppNavigator';
import { uiColors, uiRadius, uiSizing, uiSpacing, uiTypography } from '../theme/ui';

type BookDetailRouteProp = RouteProp<RootStackParamList, 'BookDetail'>;
type BookDetailNavigationProp = StackNavigationProp<RootStackParamList, 'BookDetail'>;

type BookDetailScreenProps = {
  route: BookDetailRouteProp;
  navigation: BookDetailNavigationProp;
};

type BookTab = 'summary' | 'graph';
type GraphPoint = { x: number; y: number };

const CENTER_NODE_SIZE = 102;
const LEFT_NODE_SIZE = 66;
const RIGHT_NODE_SIZE = 62;
const LOCATION_NODE_SIZE = 42;

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

const buildConnectorStyle = (
  from: GraphPoint,
  to: GraphPoint,
  fromRadius: number,
  toRadius: number
): ViewStyle => {
  const start = pointOnCircle(from, to, fromRadius);
  const end = pointOnCircle(to, from, toRadius);
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const length = Math.hypot(dx, dy);
  const angle = Math.atan2(dy, dx);
  const midX = (start.x + end.x) / 2;
  const midY = (start.y + end.y) / 2;

  return {
    position: 'absolute',
    left: midX - length / 2,
    top: midY - 1,
    width: length,
    height: 2,
    borderRadius: 99,
    backgroundColor: '#BFC4D8',
    transform: [{ rotateZ: `${angle}rad` }],
    zIndex: 1,
  };
};

const DEFAULT_BOOK_COVER = require('../assets/library/continue-reading.jpg');

const BOOK_COVER_MAP: Array<{ keywords: string[]; source: ImageSourcePropType }> = [
  {
    keywords: ['sapiens'],
    source: require('../assets/book-detail/sapiens-cover.jpg'),
  },
  {
    keywords: ['thói quen nguyên tử', 'atomic habits'],
    source: require('../assets/home/home-2.jpg'),
  },
  {
    keywords: ['làm việc sâu', 'deep work'],
    source: require('../assets/home/home-4.jpg'),
  },
];

export default function BookDetailScreen({ route, navigation }: BookDetailScreenProps) {
  const [activeTab, setActiveTab] = React.useState<BookTab>('summary');
  const [graphCanvasSize, setGraphCanvasSize] = React.useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  const title = route.params?.title ?? 'Sapiens: Lược sử loài người';
  const author = route.params?.author ?? 'Yuval Noah Harari';

  const coverSource = React.useMemo<ImageSourcePropType>(() => {
    const normalizedTitle = title.trim().toLowerCase();
    const matched = BOOK_COVER_MAP.find((item) =>
      item.keywords.some((keyword) => normalizedTitle.includes(keyword))
    );

    return matched?.source ?? DEFAULT_BOOK_COVER;
  }, [title]);

  const openAskChat = React.useCallback(
    (initialPrompt?: string) => {
      navigation.navigate('AskAI', { initialPrompt });
    },
    [navigation]
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

  const graphPoints = React.useMemo(() => {
    const { width, height } = graphCanvasSize;

    return {
      center: { x: width * 0.5, y: height * 0.54 },
      left: { x: width * 0.31, y: height * 0.34 },
      right: { x: width * 0.69, y: height * 0.36 },
      time: { x: width * 0.5, y: height * 0.78 },
    };
  }, [graphCanvasSize]);

  const graphConnectorStyles = React.useMemo(() => {
    if (graphCanvasSize.width <= 0 || graphCanvasSize.height <= 0) {
      return {
        left: null,
        right: null,
        bottom: null,
      };
    }

    return {
      left: buildConnectorStyle(
        graphPoints.left,
        graphPoints.center,
        LEFT_NODE_SIZE / 2,
        CENTER_NODE_SIZE / 2
      ),
      right: buildConnectorStyle(
        graphPoints.right,
        graphPoints.center,
        RIGHT_NODE_SIZE / 2,
        CENTER_NODE_SIZE / 2
      ),
      bottom: buildConnectorStyle(
        graphPoints.center,
        graphPoints.time,
        CENTER_NODE_SIZE / 2,
        LOCATION_NODE_SIZE / 2
      ),
    };
  }, [graphCanvasSize, graphPoints]);

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.topBar}>
        <Pressable style={styles.iconBtn} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={22} color="#64748B" />
        </Pressable>
        <Text style={styles.topTitle}>Sapiens</Text>
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
          <Text style={styles.bookAuthor}>{author}</Text>

          <View style={styles.badgesWrap}>
            <View style={styles.badge}><Text style={styles.badgeText}>15 PHÚT TÓM TẮT</Text></View>
            <View style={styles.badge}><Text style={styles.badgeText}>8 INSIGHT</Text></View>
            <View style={styles.badge}><Text style={styles.badgeText}>SƠ ĐỒ</Text></View>
          </View>

          <View style={styles.aboutCard}>
            <Text style={styles.aboutTitle}>Về cuốn sách</Text>
            <Text style={styles.aboutText}>
              Yuval Noah Harari đi qua toàn bộ lịch sử nhân loại, từ những con người đầu tiên đến
              các bước ngoặt lớn của Cách mạng Nhận thức, Nông nghiệp và Khoa học.
            </Text>
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
                  <Text style={styles.progressSub}>Insight 2 trên 8</Text>
                </View>
                <Text style={styles.progressMeta}>35% ĐÃ ĐỌC • CÒN 8 PHÚT</Text>
              </View>
              <View style={styles.progressBarTrack}>
                <View style={styles.progressBarFill} />
              </View>
            </View>

            <View style={styles.insightCard}>
              <Text style={styles.insightLabel}>INSIGHT 01</Text>
              <Text style={styles.insightTitle}>Cuộc cách mạng nhận thức</Text>
              <Text style={styles.insightText}>
                Khoảng 70.000 năm trước, Homo Sapiens trải qua một bước nhảy về nhận thức. Từ đó,
                con người có thể nói về những điều không tồn tại vật lý như quốc gia, tiền tệ hay
                thần linh, tạo ra năng lực hợp tác quy mô lớn giữa những người xa lạ.
              </Text>
            </View>

            <View style={styles.quoteCard}>
              <Text style={styles.quoteText}>
                "Điều giúp Sapiens thống trị thế giới là khả năng cùng tin vào những hư cấu tập thể."
              </Text>
              <Text style={styles.quoteTag}>Ý CHÍNH</Text>
            </View>

            <View style={styles.insightNavRow}>
              <Pressable style={styles.prevBtn}><Text style={styles.prevBtnText}>Trước</Text></Pressable>
              <Pressable style={styles.nextBtn}><Text style={styles.nextBtnText}>Insight tiếp theo</Text></Pressable>
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
            <Text style={styles.graphTitle}>Bản đồ quan hệ nhân vật</Text>

            <View style={styles.bookGraphCanvas} onLayout={handleGraphCanvasLayout}>
              {graphConnectorStyles.left ? <View style={graphConnectorStyles.left} /> : null}
              {graphConnectorStyles.right ? <View style={graphConnectorStyles.right} /> : null}
              {graphConnectorStyles.bottom ? <View style={graphConnectorStyles.bottom} /> : null}

              <View
                style={[
                  styles.bookCenterNodeWrap,
                  {
                    left: graphPoints.center.x - CENTER_NODE_SIZE / 2,
                    top: graphPoints.center.y - CENTER_NODE_SIZE / 2,
                  },
                ]}
              >
                <View style={styles.bookCenterNodeOuter}>
                  <Image source={require('../assets/book-detail/sapiens-mini.jpg')} style={styles.bookCenterNodeImage} />
                </View>
                <Text style={styles.bookNodeName}>Homo Sapiens</Text>
              </View>

              <View
                style={[
                  styles.bookNodeLeftWrap,
                  {
                    left: graphPoints.left.x - LEFT_NODE_SIZE / 2,
                    top: graphPoints.left.y - LEFT_NODE_SIZE / 2,
                  },
                ]}
              >
                <View style={styles.bookSmallNodeGreen}>
                  <MaterialIcons name="psychology" size={22} color="#006B55" />
                </View>
                <Text style={styles.bookNodeLabel}>Cách mạng nhận thức</Text>
              </View>

              <View
                style={[
                  styles.bookNodeRightWrap,
                  {
                    left: graphPoints.right.x - RIGHT_NODE_SIZE / 2,
                    top: graphPoints.right.y - RIGHT_NODE_SIZE / 2,
                  },
                ]}
              >
                <View style={styles.bookSmallNodePurple}>
                  <MaterialIcons name="auto-awesome" size={22} color="#5341CD" />
                </View>
                <Text style={styles.bookNodeLabel}>Hư cấu tập thể</Text>
              </View>

              <View
                style={[
                  styles.bookLocationWrap,
                  {
                    left: graphPoints.time.x - LOCATION_NODE_SIZE / 2,
                    top: graphPoints.time.y - LOCATION_NODE_SIZE / 2,
                  },
                ]}
              >
                <View style={styles.bookLocationDot}><MaterialIcons name="location-on" size={16} color="#5D5B6E" /></View>
                <Text style={styles.bookLocationLabel}>70.000 NĂM TRƯỚC</Text>
              </View>

              <View style={styles.canvasControls}>
                <Pressable style={styles.canvasControlBtn}><MaterialIcons name="zoom-in" size={18} color="#474554" /></Pressable>
                <Pressable style={styles.canvasControlBtn}><MaterialIcons name="zoom-out" size={18} color="#474554" /></Pressable>
                <Pressable style={styles.canvasControlBtn}><MaterialIcons name="my-location" size={18} color="#474554" /></Pressable>
              </View>
            </View>

            <Text style={styles.bookSelectedTitle}>Nhân vật được chọn</Text>
            <View style={styles.bookEntityCard}>
              <Image source={require('../assets/book-detail/sapiens-mini.jpg')} style={styles.bookEntityImage} />
              <View style={styles.bookEntityHead}>
                <Text style={styles.bookEntityName}>Homo Sapiens</Text>
                <Text style={styles.bookEntityRole}>TRUNG TÂM</Text>
              </View>
              <Text style={styles.bookEntityDesc}>
                Loài người có khả năng tạo và cùng tin vào các câu chuyện chung. Chính năng lực này giúp Sapiens hợp tác ở quy mô lớn và thay đổi lịch sử.
              </Text>

              <View style={styles.bookRelationChip}><MaterialIcons name="link" size={14} color="#474554" /><Text style={styles.bookRelationText}>Nút liên quan: Cách mạng nhận thức</Text></View>
              <View style={styles.bookRelationChip}><MaterialIcons name="auto-awesome" size={14} color="#474554" /><Text style={styles.bookRelationText}>Ý tưởng chính: Hư cấu tập thể</Text></View>
              <View style={styles.bookRelationChip}><MaterialIcons name="schedule" size={14} color="#474554" /><Text style={styles.bookRelationText}>Mốc thời gian: 70.000 năm trước</Text></View>

              <Pressable style={styles.chatCharacterBtnBook} onPress={() => navigation.navigate('TranslatorCharacterChat')}>
                <MaterialIcons name="chat" size={16} color="#FFFFFF" />
                <Text style={styles.chatCharacterBtnBookText}>Khám phá ý tưởng liên quan</Text>
              </Pressable>
            </View>
          </View>
        ) : null}
      </ScrollView>

      <FloatingAskBar
        placeholder={activeTab === 'graph' ? 'Hỏi sơ đồ về mối liên hệ này...' : 'Hỏi Bạn Đọc về bản tóm tắt này...'}
        onOpenFullChat={() => openAskChat()}
        onSubmitPrompt={(prompt) => openAskChat(prompt)}
      />

      <BottomNavBar activeTab="search" />
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
import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BottomNavBar from '../components/BottomNavBar';
import FloatingAskBar from '../components/FloatingAskBar';
import { Screen, TopBar } from '../components/ui';
import { RootStackParamList } from '../navigation/AppNavigator';
import { uiSpacing, uiTypography } from '../theme/ui';
import { buildChatContext, getInsight, getSummaryById, listNotesForLibrary, listSummaries, resolveNoteThumbSource } from '../data';
import type { NoteItem } from '../types/content';

type LibraryNavigationProp = StackNavigationProp<RootStackParamList, 'Library'>;

type LibraryScreenProps = {
  navigation: LibraryNavigationProp;
};

type UploadItem = {
  id: string;
  fileName: string;
  meta: string;
  icon: string;
  iconBg: string;
  iconColor: string;
};

const LIBRARY_FILTERS = ['Tất cả', 'Đã lưu', 'Đang đọc', 'Bộ sưu tập'];

const UPLOADS: UploadItem[] = [
  {
    id: 'up-1',
    fileName: 'Product_Design_Strategy.pdf',
    meta: 'Thêm 2 ngày trước • 4.2 MB',
    icon: 'picture-as-pdf',
    iconBg: '#E4DFFF',
    iconColor: '#5341CD',
  },
  {
    id: 'up-2',
    fileName: 'Meeting_Notes_Q3.epub',
    meta: 'Thêm 5 ngày trước • 1.1 MB',
    icon: 'description',
    iconBg: '#EDE8E3',
    iconColor: '#8A4A00',
  },
];

export default function LibraryScreen({ navigation }: LibraryScreenProps) {
  const [activeFilter, setActiveFilter] = React.useState('Tất cả');

  const openAskChat = React.useCallback(
    (initialPrompt?: string) => {
      const libraryContext = buildChatContext({
        source: 'library',
        extraText: `Ngữ cảnh: Thư viện. Bộ lọc hiện tại: "${activeFilter}".`,
      });
      navigation.navigate('AskAI', { initialPrompt, context: libraryContext });
    },
    [activeFilter, navigation]
  );

  const openSummary = React.useCallback(
    (summaryId: string) => navigation.navigate('BookDetail', { summaryId }),
    [navigation]
  );

  const continueSummary = React.useMemo(() => getSummaryById('sapiens'), []);
  const savedSummaries = React.useMemo(() => listSummaries(), []);
  const notes = React.useMemo(() => listNotesForLibrary(), []);

  return (
    <Screen mode="static" edges={['top']} contentStyle={styles.screenContent}>
      <TopBar
        title="Thư viện của tôi"
        right={
          <Pressable style={styles.iconBtn} onPress={() => navigation.navigate('UploadManagement')}>
            <MaterialIcons name="ios-share" size={22} color="#60708A" />
          </Pressable>
        }
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.goalCard}>
          <Text style={styles.goalLabel}>THÓI QUEN TÓM TẮT</Text>
          <Text style={styles.goalTitle}>5/7 ngày</Text>
          <View style={styles.goalProgressTrack}>
            <View style={styles.goalProgressFill} />
          </View>
          <Text style={styles.goalHint}>Giữ nhịp đều để đọc tóm tắt nhanh hơn mỗi ngày.</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
          {LIBRARY_FILTERS.map((filter) => {
            const active = filter === activeFilter;

            return (
              <Pressable
                key={filter}
                style={[styles.filterTab, active ? styles.filterTabActive : undefined]}
                onPress={() => setActiveFilter(filter)}
              >
                <Text style={[styles.filterText, active ? styles.filterTextActive : undefined]}>{filter}</Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Đang đọc tiếp</Text>
          <Pressable>
            <Text style={styles.linkText}>Xem tất cả</Text>
          </Pressable>
        </View>

        <Pressable
          style={styles.continueCard}
          onPress={() => openSummary('sapiens')}
        >
          <Image source={require('../assets/library/continue-reading.jpg')} style={styles.continueImage} />
          <View style={styles.continueMeta}>
            <Text style={styles.continueTitle}>{continueSummary?.title ?? 'Sapiens: Lược sử loài người'}</Text>
            <Text style={styles.continueAuthor}>{continueSummary?.author ?? 'Yuval Noah Harari'}</Text>
            <View style={styles.progressRow}>
              <Text style={styles.progressLabel}>Ý CHÍNH</Text>
              <Text style={styles.progressPct}>1/3</Text>
            </View>
            <View style={styles.progressTrack}>
              <View style={styles.progressFill} />
            </View>
          </View>
        </Pressable>

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Đã lưu</Text>
          <Pressable>
            <Text style={styles.linkText}>Xem tất cả</Text>
          </Pressable>
        </View>

        <View style={styles.uploadList}>
          {savedSummaries.map((summary) => (
            <Pressable
              key={summary.id}
              style={styles.uploadCard}
              onPress={() => openSummary(summary.id)}
            >
              <View style={styles.uploadLeft}>
                <View style={[styles.uploadIconWrap, styles.uploadIconWrapSaved]}>
                  <MaterialIcons name="bookmark" size={23} color="#5341CD" />
                </View>
                <View>
                  <Text style={styles.uploadTitle}>{summary.title}</Text>
                  <Text style={styles.uploadMeta}>{`${summary.durationMinutes ?? 15} phút tóm tắt • ${summary.insights.length} ý chính`}</Text>
                </View>
              </View>
              <MaterialIcons name="chevron-right" size={22} color="#7D7B8B" />
            </Pressable>
          ))}
        </View>

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Ghi chú & nổi bật</Text>
          <Pressable>
            <MaterialIcons name="more-horiz" size={22} color="#7D7B8B" />
          </Pressable>
        </View>

        <View style={styles.notesList}>
          {notes.map((note: NoteItem) => {
            const summary = getSummaryById(note.summaryId);
            const insight = summary && note.insightId ? getInsight(summary, note.insightId) : undefined;
            const noteTitle = summary?.title ?? 'Tóm tắt';
            const subTitle = insight ? `Ý chính ${String(insight.index).padStart(2, '0')}: ${insight.title}` : '';

            return (
            <Pressable
              key={note.id}
              style={styles.noteCard}
              onPress={() =>
                navigation.navigate('InsightDetail', {
                  summaryId: note.summaryId,
                  insightId: note.insightId,
                  personalNote: note.excerpt,
                  savedOn: 'Đã lưu',
                })
              }
            >
              <View style={styles.noteTop}>
                <Image source={resolveNoteThumbSource(note) ?? require('../assets/library/continue-reading.jpg')} style={styles.noteImage} />
                <View>
                  <View style={[styles.noteTypePill, note.type === 'quote' ? styles.quotePill : styles.highlightPill]}>
                    <Text style={[styles.noteTypeText, note.type === 'quote' ? styles.quoteText : styles.highlightText]}>
                      {note.type === 'quote' ? 'TRÍCH DẪN' : 'ĐÁNH DẤU'}
                    </Text>
                  </View>
                  <Text style={styles.noteBookTitle}>{noteTitle}</Text>
                  {subTitle ? <Text style={styles.noteBookSubTitle} numberOfLines={1}>{subTitle}</Text> : null}
                </View>
              </View>
              <Text style={styles.noteBody}>{note.excerpt}</Text>
              <Pressable
                style={styles.noteActionBtn}
                onPress={() =>
                  navigation.navigate('InsightDetail', {
                    summaryId: note.summaryId,
                    insightId: note.insightId,
                    personalNote: note.excerpt,
                    savedOn: 'Đã lưu',
                  })
                }
              >
                <Text style={styles.noteActionText}>MỞ</Text>
              </Pressable>
            </Pressable>
            );
          })}
        </View>

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Tệp của tôi</Text>
          <Pressable onPress={() => navigation.navigate('UploadManagement')}>
            <Text style={styles.linkText}>Bộ lọc</Text>
          </Pressable>
        </View>

        <View style={styles.uploadList}>
          {UPLOADS.map((item) => (
            <View key={item.id} style={styles.uploadCard}>
              <View style={styles.uploadLeft}>
                <View style={[styles.uploadIconWrap, { backgroundColor: item.iconBg }]}>
                  <MaterialIcons name={item.icon} size={23} color={item.iconColor} />
                </View>
                <View>
                  <Text style={styles.uploadTitle}>{item.fileName}</Text>
                  <Text style={styles.uploadMeta}>{item.meta}</Text>
                </View>
              </View>
              <Pressable>
                <MaterialIcons name="more-vert" size={22} color="#7D7B8B" />
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>

      <FloatingAskBar
        placeholder="Hỏi Bạn Đọc về thư viện của bạn"
        onOpenFullChat={() => openAskChat()}
        onSubmitPrompt={(prompt) => openAskChat(prompt)}
      />
      <BottomNavBar activeTab="library" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContent: {
    paddingHorizontal: 0,
  },
  iconBtn: {
    width: 34,
    height: 34,
    borderRadius: 99,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: uiSpacing.lg,
    paddingBottom: 150,
    gap: 16,
  },
  goalCard: {
    borderRadius: 28,
    paddingHorizontal: 18,
    paddingVertical: 16,
    backgroundColor: '#5E4BD6',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  goalLabel: {
    color: '#DCD7FF',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  goalTitle: {
    marginTop: 6,
    color: '#FFFFFF',
    fontSize: uiTypography.h2,
    fontWeight: '800',
  },
  goalProgressTrack: {
    marginTop: 14,
    height: 11,
    borderRadius: 99,
    backgroundColor: '#9B8DFF',
    overflow: 'hidden',
  },
  goalProgressFill: {
    width: '72%',
    height: '100%',
    borderRadius: 99,
    backgroundColor: '#63F3D0',
  },
  goalHint: {
    marginTop: 14,
    color: '#FFFFFF',
    fontSize: uiTypography.bodySm,
    lineHeight: 26,
    fontWeight: '600',
  },
  filterRow: {
    gap: 20,
    paddingTop: 6,
  },
  filterTab: {
    paddingBottom: 7,
  },
  filterTabActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#5341CD',
  },
  filterText: {
    color: '#B5B2C5',
    fontSize: uiTypography.body,
    fontWeight: '700',
  },
  filterTextActive: {
    color: '#3439CC',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: '#191C1F',
    fontSize: uiTypography.h3,
    fontWeight: '700',
  },
  linkText: {
    color: '#3439CC',
    fontSize: uiTypography.bodySm,
    fontWeight: '700',
  },
  continueCard: {
    borderRadius: 26,
    padding: 14,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    gap: 14,
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  continueImage: {
    width: 92,
    height: 132,
    borderRadius: 12,
  },
  continueMeta: {
    flex: 1,
    justifyContent: 'center',
  },
  continueTitle: {
    color: '#191C1F',
    fontSize: uiTypography.h3,
    fontWeight: '700',
  },
  continueAuthor: {
    marginTop: 2,
    color: '#474554',
    fontSize: 15,
    fontWeight: '500',
  },
  progressRow: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabel: {
    color: '#3439CC',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  progressPct: {
    color: '#3439CC',
    fontSize: 12,
    fontWeight: '700',
  },
  progressTrack: {
    marginTop: 5,
    height: 8,
    borderRadius: 99,
    backgroundColor: '#E1E2E6',
    overflow: 'hidden',
  },
  progressFill: {
    width: '64%',
    height: '100%',
    borderRadius: 99,
    backgroundColor: '#008F73',
  },
  notesList: {
    gap: 12,
  },
  noteCard: {
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    padding: 14,
    gap: 10,
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  noteTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  noteImage: {
    width: 46,
    height: 46,
    borderRadius: 8,
  },
  noteTypePill: {
    alignSelf: 'flex-start',
    borderRadius: 99,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  quotePill: {
    backgroundColor: '#F2D7BE',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  highlightPill: {
    backgroundColor: '#63F3D0',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  noteTypeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  quoteText: {
    color: '#6F3D00',
  },
  highlightText: {
    color: '#006B55',
  },
  noteBookTitle: {
    marginTop: 3,
    color: '#191C1F',
    fontSize: uiTypography.body,
    fontWeight: '700',
  },
  noteBookSubTitle: {
    marginTop: 3,
    color: '#787586',
    fontSize: 12,
    fontWeight: '600',
  },
  noteBody: {
    color: '#191C1F',
    fontSize: uiTypography.body,
    lineHeight: 26.67,
    fontStyle: 'italic',
  },
  noteActionBtn: {
    borderRadius: 11,
    backgroundColor: '#E7E8EC',
    alignItems: 'center',
    justifyContent: 'center',
    height: 42,
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  noteActionText: {
    color: '#3439CC',
    fontSize: 15,
    fontWeight: '700',
  },
  uploadList: {
    gap: 12,
  },
  uploadCard: {
    borderRadius: 20,
    backgroundColor: '#EFF0F5',
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  uploadLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  uploadIconWrap: {
    width: 50,
    height: 50,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadIconWrapSaved: {
    backgroundColor: '#E4DFFF',
  },
  uploadTitle: {
    color: '#191C1F',
    fontSize: uiTypography.h3,
    fontWeight: '600',
  },
  uploadMeta: {
    marginTop: 2,
    color: '#787586',
    fontSize: 14,
    fontWeight: '500',
  },
});
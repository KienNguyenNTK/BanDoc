import React from 'react';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from '../navigation/AppNavigator';
import SegmentedTabs from '../components/SegmentedTabs';
import { uiColors, uiRadius, uiSpacing, uiTypography } from '../theme/ui';

type NotesHighlightsNavigationProp = StackNavigationProp<RootStackParamList, 'NotesHighlights'>;

type NotesHighlightsScreenProps = {
  navigation: NotesHighlightsNavigationProp;
};

type FilterTab = 'all' | 'highlight' | 'note' | 'quote';
type ItemType = 'highlight' | 'note' | 'quote';

type NoteItem = {
  id: string;
  type: ItemType;
  timeLabel: string;
  bookTitle: string;
  excerpt: string;
  title?: string;
  author: string;
  cover: any;
};

const ITEMS: NoteItem[] = [
  {
    id: '1',
    type: 'highlight',
    timeLabel: '2 giờ trước',
    bookTitle: 'Sapiens - Cách mạng nhận thức',
    excerpt: 'Lịch sử là thứ chỉ một số rất ít người thực sự tạo ra, trong khi số đông còn lại vẫn đang cày ruộng và gánh nước.',
    author: 'Yuval Noah Harari',
    cover: require('../assets/notes/sapiens-cover.jpg'),
  },
  {
    id: '2',
    type: 'note',
    timeLabel: '5 giờ trước',
    title: 'Hệ thống quan trọng hơn mục tiêu',
    bookTitle: 'Thói quen nguyên tử - Nền tảng',
    excerpt: 'Mục tiêu thật sự không phải vạch đích, mà là danh tính của người có thể liên tục chạm tới nó. Tập trung vào 1% tiến bộ mỗi ngày.',
    author: 'James Clear',
    cover: require('../assets/notes/atomic-habits-cover.jpg'),
  },
  {
    id: '3',
    type: 'quote',
    timeLabel: 'Hôm qua',
    bookTitle: 'Suy tưởng - Marcus Aurelius',
    excerpt: 'Hạnh phúc của bạn phụ thuộc vào chất lượng suy nghĩ của chính bạn.',
    author: 'Marcus Aurelius',
    cover: require('../assets/notes/meditations-cover.jpg'),
  },
  {
    id: '4',
    type: 'highlight',
    timeLabel: '12 Th01',
    bookTitle: 'Làm việc sâu - Quy tắc thành công',
    excerpt: 'Rời khỏi đám đông mất tập trung để trở thành số ít tập trung là một trải nghiệm mang tính chuyển đổi.',
    author: 'Cal Newport',
    cover: require('../assets/notes/deep-work-cover.jpg'),
  },
];

const TAB_LABELS: Array<{ key: FilterTab; label: string }> = [
  { key: 'all', label: 'Tất cả' },
  { key: 'highlight', label: 'Đánh dấu' },
  { key: 'note', label: 'Ghi chú' },
  { key: 'quote', label: 'Trích dẫn' },
];

export default function NotesHighlightsScreen({ navigation }: NotesHighlightsScreenProps) {
  const [activeTab, setActiveTab] = React.useState<FilterTab>('all');

  const filteredItems = React.useMemo(() => {
    if (activeTab === 'all') {
      return ITEMS;
    }

    return ITEMS.filter((item) => item.type === activeTab);
  }, [activeTab]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable style={styles.iconBtn} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color="#5341CD" />
          </Pressable>
          <Text style={styles.headerTitle}>Ghi chú và đánh dấu</Text>
        </View>

        <Pressable style={styles.iconBtn}>
          <MaterialIcons name="more-vert" size={22} color="#667085" />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <SegmentedTabs value={activeTab} options={TAB_LABELS} onChange={setActiveTab} />

        <View style={styles.feedList}>
          {filteredItems.map((item) => {
            const typeColor = item.type === 'highlight' ? '#5341CD' : item.type === 'note' ? '#AC5D00' : '#006B55';

            return (
              <View key={item.id} style={styles.card}>
                <View style={styles.cardTopMeta}>
                  <View style={styles.metaLeft}>
                    <Image source={item.cover} style={styles.cover} />
                    <View>
                      <Text style={[styles.typeLabel, { color: typeColor }]}>{item.type.toUpperCase()}</Text>
                      <Text style={styles.timeLabel}>{item.timeLabel}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.excerptArea}>
                  {item.title ? <Text style={styles.noteTitle}>{item.title}</Text> : null}

                  {item.type === 'quote' ? (
                    <View style={styles.quoteWrap}>
                      <Text style={styles.quoteMark}>“</Text>
                      <Text style={styles.quoteText}>{item.excerpt}</Text>
                    </View>
                  ) : (
                    <Text style={styles.excerptText}>{item.excerpt}</Text>
                  )}
                </View>

                <View style={styles.bookInfoWrap}>
                  <MaterialIcons name="menu-book" size={16} color="#5F6071" />
                  <Text style={styles.bookInfoText}>{item.bookTitle}</Text>
                </View>

                <View style={styles.actionRow}>
                  <Pressable
                    style={styles.secondaryBtn}
                    onPress={() => navigation.navigate('BookDetail', { title: item.bookTitle, author: item.author })}
                  >
                    <Text style={styles.secondaryBtnText}>Mở sách</Text>
                  </Pressable>

                  <Pressable
                    style={styles.secondaryBtn}
                    onPress={() =>
                      navigation.navigate('InsightDetail', {
                        bookTitle: item.bookTitle,
                        author: item.author,
                        personalNote: item.excerpt,
                        insightTitle: item.title ?? 'Trích đoạn đã lưu',
                      })
                    }
                  >
                    <Text style={styles.secondaryBtnText}>Insight liên quan</Text>
                  </Pressable>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      <Pressable style={styles.fab}>
        <MaterialIcons name="add" size={30} color="#FFFFFF" />
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: uiColors.background,
  },
  header: {
    height: 60,
    paddingHorizontal: uiSpacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  iconBtn: {
    width: 34,
    height: 34,
    borderRadius: 99,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: uiColors.text,
    fontSize: uiTypography.h3,
    fontWeight: '700',
  },
  content: {
    paddingHorizontal: uiSpacing.lg,
    paddingTop: 10,
    paddingBottom: 100,
    gap: 16,
  },
  feedList: {
    gap: 14,
  },
  card: {
    borderRadius: 18,
    backgroundColor: uiColors.surface,
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  cardTopMeta: {
    marginBottom: 10,
  },
  metaLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cover: {
    width: 44,
    height: 62,
    borderRadius: 6,
    backgroundColor: '#E9EAF1',
  },
  typeLabel: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.1,
  },
  timeLabel: {
    marginTop: 2,
    color: uiColors.textSubtle,
    fontSize: 13,
    fontWeight: '500',
  },
  excerptArea: {
    gap: 8,
  },
  noteTitle: {
    color: uiColors.text,
    fontSize: 19,
    fontWeight: '700',
    lineHeight: 24,
  },
  excerptText: {
    color: uiColors.text,
    fontSize: 15.83,
    lineHeight: 25,
    fontWeight: '500',
  },
  quoteWrap: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    paddingRight: 4,
  },
  quoteMark: {
    color: '#B9B7C9',
    fontSize: 34,
    lineHeight: 28,
    marginTop: -2,
  },
  quoteText: {
    flex: 1,
    color: uiColors.text,
    fontSize: 15.83,
    lineHeight: 25,
    fontWeight: '500',
    fontStyle: 'italic',
  },
  bookInfoWrap: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#ECECF2',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bookInfoText: {
    color: '#3E3F50',
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
  },
  actionRow: {
    marginTop: 12,
    flexDirection: 'row',
    gap: 10,
  },
  secondaryBtn: {
    flex: 1,
    minHeight: 46,
    borderRadius: uiRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F3F7',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  secondaryBtnText: {
    color: uiColors.primaryDeep,
    fontSize: uiTypography.bodySm,
    fontWeight: '700',
  },
  fab: {
    position: 'absolute',
    right: 22,
    bottom: 26,
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: '#6C5CE7',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
});

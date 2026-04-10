import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BottomNavBar from '../components/BottomNavBar';
import FloatingAskBar from '../components/FloatingAskBar';
import { Screen, TopBar } from '../components/ui';
import { RootStackParamList } from '../navigation/AppNavigator';
import { uiColors, uiSpacing, uiTypography } from '../theme/ui';
import { buildChatContext, listSummariesByCategory, listCategories, resolveSummaryCoverSource, searchSummaries } from '../data';

type SearchScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Search'>;

type SearchScreenProps = {
  navigation: SearchScreenNavigationProp;
};

const TRENDING_SEARCHES = ['Năng suất', 'Lịch sử', 'Tư duy', 'Tập trung'];

const TOP_AUTHORS = [
  {
    id: 'author-1',
    name: 'James Clear',
    image: require('../assets/search/author-1.jpg'),
  },
  {
    id: 'author-2',
    name: 'Brene Brown',
    image: require('../assets/search/author-2.jpg'),
  },
  {
    id: 'author-3',
    name: 'Robert Greene',
    image: require('../assets/search/author-3.jpg'),
  },
  {
    id: 'author-4',
    name: 'Carol Dweck',
    image: require('../assets/search/author-4.jpg'),
  },
];

const pickTopicVisual = (topic: string) => {
  const t = topic.trim().toLowerCase();

  if (t.includes('năng suất') || t.includes('tập trung')) {
    return { icon: 'timer', wrapStyle: styles.topicIconBlue, iconColor: '#2B4ACB' as const };
  }
  if (t.includes('lịch sử')) {
    return { icon: 'account-balance', wrapStyle: styles.topicIconGreen, iconColor: '#00725B' as const };
  }
  if (t.includes('tư duy') || t.includes('triết')) {
    return { icon: 'psychology', wrapStyle: styles.topicIconBrown, iconColor: '#884800' as const };
  }
  if (t.includes('kinh dị') || t.includes('hư cấu')) {
    return { icon: 'auto-stories', wrapStyle: styles.topicIconPrimary, iconColor: '#FFFFFF' as const };
  }
  if (t.includes('kinh doanh') || t.includes('tài chính')) {
    return { icon: 'payments', wrapStyle: styles.topicIconBrown, iconColor: '#884800' as const };
  }

  return { icon: 'local-offer', wrapStyle: styles.topicIconBrown, iconColor: '#884800' as const };
};

export default function SearchScreen({ navigation }: SearchScreenProps) {
  const [searchText, setSearchText] = React.useState('');
  const categories = React.useMemo(() => listCategories().slice(0, 6), []);

  const openAskChat = React.useCallback(
    (initialPrompt?: string) => {
      const exploreContext = buildChatContext({
        source: 'explore',
        extraText: `Ngữ cảnh: Khám phá. Từ khóa tìm kiếm hiện tại: "${searchText || '—'}"`,
      });
      navigation.navigate('AskAI', { initialPrompt, context: exploreContext });
    },
    [navigation, searchText]
  );

  const results = React.useMemo(() => searchSummaries(searchText), [searchText]);
  const openSummary = React.useCallback(
    (summaryId: string) => navigation.navigate('BookDetail', { summaryId }),
    [navigation]
  );

  const openTopic = React.useCallback(
    (topicTitle: string, description?: string) => {
      navigation.navigate('TopicDetail', { title: topicTitle, description });
    },
    [navigation]
  );

  return (
    <Screen mode="static" edges={['top']} contentStyle={styles.screenContent}>
      <TopBar
        title="Khám phá"
        right={
          <Pressable style={styles.filterBtn}>
            <MaterialIcons name="filter-list" size={22} color={uiColors.primary} />
          </Pressable>
        }
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.searchInputWrap}>
          <MaterialIcons name="search" size={22} color="#8D8A9D" />
          <TextInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Tìm tóm tắt, tác giả hoặc chủ đề..."
            placeholderTextColor="#8D8A9D"
            style={styles.searchInput}
            returnKeyType="search"
          />
        </View>

        <View style={styles.aiCard}>
          <View style={styles.aiHeaderRow}>
            <View style={styles.aiIconWrap}>
              <MaterialIcons name="auto-awesome" size={18} color="#6C5CE7" />
            </View>
            <Text style={styles.aiTitle}>Hôm nay bạn muốn khám phá gì?</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.aiPromptRow}>
            <Pressable style={styles.aiPromptChip} onPress={() => openAskChat('Tôi nên đọc gì tiếp theo?')}>
              <Text style={styles.aiPromptText}>Tôi nên đọc gì tiếp theo?</Text>
            </Pressable>
            <Pressable style={styles.aiPromptChip} onPress={() => openAskChat('Gợi ý tóm tắt 10 phút')}>
              <Text style={styles.aiPromptText}>Gợi ý tóm tắt 10 phút</Text>
            </Pressable>
            <Pressable style={styles.aiPromptChip} onPress={() => openAskChat('Gợi ý tóm tắt về sự tập trung')}>
              <Text style={styles.aiPromptText}>Tóm tắt về sự tập trung</Text>
            </Pressable>
          </ScrollView>
        </View>

        <View>
          <Text style={styles.sectionTitle}>Tìm kiếm thịnh hành</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.trendingRow}>
            {TRENDING_SEARCHES.map((item, index) => (
              <Pressable
                key={item}
                style={[styles.trendingChip, index === 0 ? styles.trendingChipHighlight : undefined]}
                onPress={() => openTopic(item, `Khám phá tóm tắt theo chủ đề ${item.toLowerCase()}.`)}
              >
                {index === 0 ? <MaterialIcons name="trending-up" size={15} color="#00725B" /> : null}
                <Text
                  style={[
                    styles.trendingChipText,
                    index === 0 ? styles.trendingChipTextHighlight : undefined,
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View>
          <Text style={styles.sectionTitle}>Khám phá chủ đề</Text>
          <View style={styles.topicGrid}>
            {categories.map((cat, idx) => {
              const primary = idx === 1;
              const count = listSummariesByCategory(cat).length;
              const meta = count > 0 ? `${count} tóm tắt` : 'Mới cập nhật';
              const visual = pickTopicVisual(cat);
              return (
                <Pressable
                  key={cat}
                  style={primary ? styles.topicCardPrimary : styles.topicCardLight}
                  onPress={() => openTopic(cat, `Khám phá tóm tắt theo chủ đề ${cat.toLowerCase()}.`)}
                >
              <View style={primary ? styles.topicIconPrimary : visual.wrapStyle}>
                <MaterialIcons name={visual.icon as any} size={18} color={primary ? '#FFFFFF' : visual.iconColor} />
              </View>
              <View>
                <Text style={primary ? styles.topicTitlePrimary : styles.topicTitle}>{cat}</Text>
                <Text style={primary ? styles.topicMetaPrimary : styles.topicMeta}>{meta}</Text>
              </View>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Tác giả nổi bật</Text>
            <Pressable>
              <Text style={styles.seeAllText}>Xem tất cả</Text>
            </Pressable>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.authorRow}>
            {TOP_AUTHORS.map((author, index) => (
              <Pressable
                key={author.id}
                style={styles.authorItem}
                onPress={() => navigation.navigate('AuthorDetail', { authorName: author.name })}
              >
                <View style={[styles.authorAvatarWrap, index === 0 ? styles.authorAvatarActive : undefined]}>
                  <Image source={author.image} style={styles.authorAvatar} />
                </View>
                <Text style={styles.authorName} numberOfLines={1}>{author.name}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View>
          <Text style={styles.sectionTitle}>Tóm tắt nổi bật</Text>
          <View style={styles.bookList}>
            {results.map((summary) => (
              <Pressable
                key={summary.id}
                style={styles.bookCard}
                onPress={() => openSummary(summary.id)}
              >
                <Image
                  source={resolveSummaryCoverSource(summary.id) ?? require('../assets/library/continue-reading.jpg')}
                  style={styles.bookCover}
                />
                <View style={styles.bookMeta}>
                  <Text style={styles.bookTitle}>{summary.title}</Text>
                  <Text style={styles.bookAuthor}>{summary.author ?? ''}</Text>
                  <View style={styles.ratingRow}>
                    <MaterialIcons name="schedule" size={14} color="#00725B" />
                    <Text style={styles.ratingText}>{`${summary.durationMinutes ?? 15} phút tóm tắt`}</Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>

      <FloatingAskBar
        placeholder="Hỏi về tóm tắt, tác giả hoặc chủ đề..."
        onOpenFullChat={() => openAskChat()}
        onSubmitPrompt={(prompt) => openAskChat(prompt)}
      />
      <BottomNavBar activeTab="search" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContent: {
    paddingHorizontal: 0,
  },
  filterBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: uiSpacing.lg,
    paddingBottom: 150,
    gap: 16,
  },
  searchInputWrap: {
    height: 56,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#ECE9F4',
    paddingHorizontal: uiSpacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#191C1F',
    fontWeight: '500',
    paddingVertical: 0,
  },
  aiCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#DDD9EC',
    backgroundColor: '#FFFFFF',
    padding: 12,
    gap: 10,
  },
  aiHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  aiIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 99,
    backgroundColor: '#ECEAFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  aiTitle: {
    color: '#191C1F',
    fontSize: 15,
    fontWeight: '700',
  },
  aiPromptRow: {
    gap: 8,
    paddingRight: 4,
  },
  aiPromptChip: {
    borderWidth: 1,
    borderColor: '#D8D5E4',
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  aiPromptText: {
    color: '#474554',
    fontSize: 12,
    fontWeight: '600',
  },
  sectionTitle: {
    color: '#191C1F',
    fontSize: uiTypography.h3,
    fontWeight: '700',
    marginBottom: 8,
  },
  trendingRow: {
    gap: 10,
    paddingRight: 8,
  },
  trendingChip: {
    borderRadius: 999,
    backgroundColor: '#E7E8EC',
    paddingHorizontal: 14,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  trendingChipHighlight: {
    backgroundColor: '#D7F2EA',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  trendingChipText: {
    color: '#474554',
    fontSize: 13,
    fontWeight: '600',
  },
  trendingChipTextHighlight: {
    color: '#00725B',
  },
  topicGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  topicCardLight: {
    width: '48%',
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    padding: 14,
    minHeight: 132,
    justifyContent: 'space-between',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  topicCardPrimary: {
    width: '48%',
    borderRadius: 20,
    backgroundColor: '#6C5CE7',
    padding: 14,
    minHeight: 132,
    justifyContent: 'space-between',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  topicIconBrown: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#F7EBDD',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  topicIconPrimary: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#FFFFFF33',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topicIconGreen: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#D7F2EA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topicIconBlue: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#DFE7FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topicTitle: {
    color: '#191C1F',
    fontSize: 16,
    fontWeight: '800',
  },
  topicMeta: {
    marginTop: 2,
    color: '#787586',
    fontSize: 12,
    fontWeight: '600',
  },
  topicTitlePrimary: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  topicMetaPrimary: {
    marginTop: 2,
    color: '#E4DFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  topicWideCard: {
    width: '100%',
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  topicWideMeta: {
    marginLeft: 12,
    flex: 1,
  },
  topicWideRocket: {
    position: 'absolute',
    right: -10,
    top: -6,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  seeAllText: {
    color: '#6C5CE7',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 10,
  },
  authorRow: {
    gap: 12,
    paddingRight: 10,
  },
  authorItem: {
    width: 78,
    alignItems: 'center',
  },
  authorAvatarWrap: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 2,
    borderColor: 'transparent',
    padding: 2,
    marginBottom: 8,
    backgroundColor: uiColors.background,
  },
  authorAvatarActive: {
    borderColor: '#6C5CE7',
  },
  authorAvatar: {
    width: '100%',
    height: '100%',
    borderRadius: 99,
  },
  authorName: {
    color: '#191C1F',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
  bookList: {
    gap: 10,
  },
  bookCard: {
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ECE9F4',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  bookCover: {
    width: 56,
    height: 84,
    borderRadius: 10,
  },
  bookMeta: {
    flex: 1,
  },
  bookTitle: {
    color: '#191C1F',
    fontSize: 15,
    fontWeight: '800',
  },
  bookAuthor: {
    color: '#787586',
    marginTop: 2,
    fontSize: 12,
    fontWeight: '600',
  },
  ratingRow: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ratingText: {
    color: '#474554',
    fontSize: 12,
    fontWeight: '700',
  },
});
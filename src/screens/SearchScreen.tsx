import React from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
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
import { RootStackParamList } from '../navigation/AppNavigator';
import { uiColors, uiSpacing, uiTypography } from '../theme/ui';

type SearchScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Search'>;

type SearchScreenProps = {
  navigation: SearchScreenNavigationProp;
};

const TRENDING_SEARCHES = ['Làm việc sâu', 'Naval Ravikant', 'Chủ nghĩa khắc kỷ', 'Đạo đức AI'];

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

const POPULAR_BOOKS = [
  {
    id: 'book-1',
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    rating: '4.8 (2.4k)',
    image: require('../assets/search/book-1.jpg'),
  },
  {
    id: 'book-2',
    title: "Can't Hurt Me",
    author: 'David Goggins',
    rating: '4.9 (5.1k)',
    image: require('../assets/search/book-2.jpg'),
  },
];

export default function SearchScreen({ navigation }: SearchScreenProps) {
  const [searchText, setSearchText] = React.useState('');

  const openAskChat = React.useCallback(
    (initialPrompt?: string) => {
      navigation.navigate('AskAI', { initialPrompt });
    },
    [navigation]
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tìm kiếm</Text>
        <Pressable style={styles.filterBtn}>
          <MaterialIcons name="filter-list" size={22} color="#6C5CE7" />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.searchInputWrap}>
          <MaterialIcons name="search" size={22} color="#8D8A9D" />
          <TextInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Tìm sách, tác giả hoặc chủ đề..."
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
            <Pressable style={styles.aiPromptChip}>
              <Text style={styles.aiPromptText}>Tôi nên đọc gì tiếp theo?</Text>
            </Pressable>
            <Pressable style={styles.aiPromptChip}>
              <Text style={styles.aiPromptText}>Gợi ý tóm tắt 10 phút</Text>
            </Pressable>
            <Pressable style={styles.aiPromptChip}>
              <Text style={styles.aiPromptText}>Sách về sự tập trung</Text>
            </Pressable>
          </ScrollView>
        </View>

        <View>
          <Text style={styles.sectionTitle}>Tìm kiếm thịnh hành</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.trendingRow}>
            {TRENDING_SEARCHES.map((item, index) => (
              <View
                key={item}
                style={[styles.trendingChip, index === 0 ? styles.trendingChipHighlight : undefined]}
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
              </View>
            ))}
          </ScrollView>
        </View>

        <View>
          <Text style={styles.sectionTitle}>Khám phá chủ đề</Text>
          <View style={styles.topicGrid}>
            <Pressable
              style={styles.topicCardLight}
              onPress={() =>
                navigation.navigate('TopicDetail', {
                  title: 'Tâm lý học',
                  description: 'Hiểu về hành vi, trí nhớ và cách con người ra quyết định',
                })
              }
            >
              <View style={styles.topicIconBrown}>
                <MaterialIcons name="psychology" size={18} color="#884800" />
              </View>
              <View>
                <Text style={styles.topicTitle}>Tâm lý học</Text>
                <Text style={styles.topicMeta}>1.2k sách</Text>
              </View>
            </Pressable>

            <Pressable
              style={styles.topicCardPrimary}
              onPress={() =>
                navigation.navigate('TopicDetail', {
                  title: 'Tài chính',
                  description: 'Nắm vững tư duy tiền bạc, đầu tư và quản trị tài sản cá nhân',
                })
              }
            >
              <View style={styles.topicIconPrimary}>
                <MaterialIcons name="payments" size={18} color="#FFFFFF" />
              </View>
              <View>
                <Text style={styles.topicTitlePrimary}>Tài chính</Text>
                <Text style={styles.topicMetaPrimary}>850 sách</Text>
              </View>
            </Pressable>

            <Pressable
              style={styles.topicCardLight}
              onPress={() =>
                navigation.navigate('TopicDetail', {
                  title: 'Khoa học & Công nghệ',
                  description: 'Theo dõi các ý tưởng mới về khoa học ứng dụng và công nghệ hiện đại',
                })
              }
            >
              <View style={styles.topicIconGreen}>
                <MaterialIcons name="science" size={22} color="#00725B" />
              </View>
              <View>
                <Text style={styles.topicTitle}>Khoa học & Công nghệ</Text>
                <Text style={styles.topicMeta}>Mới mỗi tuần</Text>
              </View>
            </Pressable>

            <Pressable
              style={styles.topicCardLight}
              onPress={() =>
                navigation.navigate('TopicDetail', {
                  title: 'Phát triển bản thân',
                  description: 'Xây thói quen tốt, tăng hiệu suất và phát triển tư duy bền vững',
                })
              }
            >
              <View style={styles.topicIconBlue}>
                <MaterialIcons name="self-improvement" size={20} color="#2B4ACB" />
              </View>
              <View>
                <Text style={styles.topicTitle}>Phát triển bản thân</Text>
                <Text style={styles.topicMeta}>940 sách</Text>
              </View>
            </Pressable>
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
          <Text style={styles.sectionTitle}>Sách phổ biến</Text>
          <View style={styles.bookList}>
            {POPULAR_BOOKS.map((book) => (
              <Pressable
                key={book.id}
                style={styles.bookCard}
                onPress={() => navigation.navigate('BookDetail', { title: book.title, author: book.author })}
              >
                <Image source={book.image} style={styles.bookCover} />
                <View style={styles.bookMeta}>
                  <Text style={styles.bookTitle}>{book.title}</Text>
                  <Text style={styles.bookAuthor}>{book.author}</Text>
                  <View style={styles.ratingRow}>
                    <MaterialIcons name="star" size={14} color="#AC5D00" />
                    <Text style={styles.ratingText}>{book.rating}</Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>

      <FloatingAskBar
        placeholder="Hỏi về sách, tác giả hoặc chủ đề..."
        onOpenFullChat={() => openAskChat()}
        onSubmitPrompt={(prompt) => openAskChat(prompt)}
      />
      <BottomNavBar activeTab="search" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: uiColors.background,
  },
  header: {
    paddingHorizontal: uiSpacing.lg,
    paddingTop: 8,
    paddingBottom: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: uiTypography.h2,
    fontWeight: '800',
    color: '#6C5CE7',
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
import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BottomNavBar from '../components/BottomNavBar';
import FloatingAskBar from '../components/FloatingAskBar';
import { RootStackParamList } from '../navigation/AppNavigator';
import { uiColors, uiSpacing, uiTypography } from '../theme/ui';

type TrendingNowNavigationProp = StackNavigationProp<RootStackParamList, 'TrendingNow'>;

type TrendingNowScreenProps = {
  navigation: TrendingNowNavigationProp;
};

type TrendingBook = {
  id: string;
  title: string;
  author: string;
  rating: string;
  summary: string;
  image: number;
};

const FILTERS = ['Tất cả', 'Tâm lý học', 'Kinh doanh', 'Lịch sử', 'Công nghệ'];

const BOOKS: TrendingBook[] = [
  {
    id: 'tr-1',
    title: 'Thói quen nguyên tử',
    author: 'James Clear',
    rating: '4.8',
    summary: '12 phút tóm tắt',
    image: require('../assets/trending/trending-1.jpg'),
  },
  {
    id: 'tr-2',
    title: 'Nhà giả kim',
    author: 'Paulo Coelho',
    rating: '4.9',
    summary: '10 phút tóm tắt',
    image: require('../assets/trending/trending-2.jpg'),
  },
  {
    id: 'tr-3',
    title: 'Làm việc sâu',
    author: 'Cal Newport',
    rating: '4.7',
    summary: '15 phút tóm tắt',
    image: require('../assets/trending/trending-3.jpg'),
  },
  {
    id: 'tr-4',
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    rating: '4.8',
    summary: '18 phút tóm tắt',
    image: require('../assets/trending/trending-4.jpg'),
  },
];

export default function TrendingNowScreen({ navigation }: TrendingNowScreenProps) {
  const [activeFilter, setActiveFilter] = React.useState('Tất cả');

  const openAskChat = React.useCallback(
    (initialPrompt?: string) => {
      navigation.navigate('AskAI', { initialPrompt });
    },
    [navigation]
  );

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable style={styles.iconBtn} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={22} color="#6C5CE7" />
          </Pressable>
          <Text style={styles.headerTitle}>Xu hướng hiện tại</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
          {FILTERS.map((filter) => {
            const active = filter === activeFilter;

            return (
              <Pressable
                key={filter}
                style={[styles.filterChip, active ? styles.filterChipActive : undefined]}
                onPress={() => setActiveFilter(filter)}
              >
                <Text style={[styles.filterText, active ? styles.filterTextActive : undefined]}>{filter}</Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={styles.listWrap}>
          {BOOKS.map((book) => (
            <Pressable
              key={book.id}
              style={styles.bookCard}
              onPress={() => navigation.navigate('BookDetail', { title: book.title, author: book.author })}
            >
              <Image source={book.image} style={styles.bookImage} />
              <View style={styles.bookRight}>
                <View>
                  <View style={styles.titleRow}>
                    <Text style={styles.bookTitle}>{book.title}</Text>
                    <MaterialIcons name="bookmark-border" size={21} color="#787586" />
                  </View>
                  <Text style={styles.bookAuthor}>{book.author}</Text>
                </View>

                <View style={styles.metaRow}>
                  <View style={styles.metaBadge}>
                    <MaterialIcons name="star" size={15} color="#AC5D00" />
                    <Text style={styles.metaBadgeText}>{book.rating}</Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <MaterialIcons name="schedule" size={16} color="#474554" />
                    <Text style={styles.summaryText}>{book.summary}</Text>
                  </View>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <FloatingAskBar
        placeholder="Hỏi Bạn Đọc nên học gì tiếp theo"
        onOpenFullChat={() => openAskChat()}
        onSubmitPrompt={(prompt) => openAskChat(prompt)}
      />
      <BottomNavBar activeTab="home" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: uiColors.background,
  },
  header: {
    height: 58,
    paddingHorizontal: uiSpacing.lg,
    justifyContent: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconBtn: {
    width: 34,
    height: 34,
    borderRadius: 99,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: uiTypography.h2,
    color: '#191C1F',
    fontWeight: '700',
  },
  content: {
    paddingHorizontal: uiSpacing.lg,
    paddingBottom: 150,
    gap: 14,
  },
  filterRow: {
    gap: 10,
    paddingBottom: 8,
  },
  filterChip: {
    borderRadius: 999,
    backgroundColor: '#E1E2E6',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  filterChipActive: {
    backgroundColor: '#6C5CE7',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  filterText: {
    color: '#474554',
    fontSize: 13,
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  listWrap: {
    gap: 12,
  },
  bookCard: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  bookImage: {
    width: 112,
    height: 170,
  },
  bookRight: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    justifyContent: 'space-between',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },
  bookTitle: {
    flex: 1,
    color: '#191C1F',
    fontSize: uiTypography.h3,
    fontWeight: '800',
    lineHeight: 24,
  },
  bookAuthor: {
    marginTop: 4,
    color: '#474554',
    fontSize: 13,
    fontWeight: '500',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  metaBadge: {
    borderRadius: 10,
    backgroundColor: '#F2F3F7',
    paddingHorizontal: 8,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  metaBadgeText: {
    color: '#191C1F',
    fontSize: 12,
    fontWeight: '700',
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  summaryText: {
    color: '#474554',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
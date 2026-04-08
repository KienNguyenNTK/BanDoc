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
import { uiColors, uiSpacing } from '../theme/ui';

type CollectionDetailNavigationProp = StackNavigationProp<RootStackParamList, 'CollectionDetail'>;

type CollectionDetailScreenProps = {
  navigation: CollectionDetailNavigationProp;
  route: {
    params: RootStackParamList['CollectionDetail'];
  };
};

type CollectionBook = {
  id: string;
  title: string;
  author: string;
  description: string;
  image: number;
};

type RelatedCollection = {
  id: string;
  title: string;
  countLabel: string;
  image: number;
  tint: string;
};

const COLLECTION_BOOKS: CollectionBook[] = [
  {
    id: 'cb-1',
    title: 'Tư duy nhanh và chậm',
    author: 'Daniel Kahneman',
    description: 'Khám phá hai hệ tư duy chi phối cách chúng ta ra quyết định.',
    image: require('../assets/collection-detail/book-1.jpg'),
  },
  {
    id: 'cb-2',
    title: 'Thói quen nguyên tử',
    author: 'James Clear',
    description: 'Cách thực tế để xây thói quen tốt và loại bỏ thói quen xấu.',
    image: require('../assets/collection-detail/book-2.jpg'),
  },
  {
    id: 'cb-3',
    title: 'Nghệ thuật tư duy minh bạch',
    author: 'Rolf Dobelli',
    description: 'Tổng hợp các sai lệch nhận thức ảnh hưởng trực tiếp đến đời sống.',
    image: require('../assets/collection-detail/book-3.jpg'),
  },
];

const RELATED_COLLECTIONS: RelatedCollection[] = [
  {
    id: 'rc-1',
    title: 'Nền tảng tâm lý học',
    countLabel: '12 cuốn',
    image: require('../assets/collection-detail/related-1.jpg'),
    tint: '#6C5CE714',
  },
  {
    id: 'rc-2',
    title: 'Khắc kỷ ứng dụng',
    countLabel: '8 cuốn',
    image: require('../assets/collection-detail/related-2.jpg'),
    tint: '#00B8941A',
  },
  {
    id: 'rc-3',
    title: 'Viết lách hiệu quả',
    countLabel: '5 cuốn',
    image: require('../assets/collection-detail/related-3.jpg'),
    tint: '#AC5D0016',
  },
];

const META_CHIPS = ['6 cuốn sách', '42 ý chính', '3 giờ nghe', 'Phù hợp cho người mới'];

export default function CollectionDetailScreen({ navigation, route }: CollectionDetailScreenProps) {
  const collectionTitle = route.params?.title || 'Sách giúp tư duy tốt hơn';

  const openAskChat = React.useCallback(
    (initialPrompt?: string) => {
      navigation.navigate('AskAI', { initialPrompt });
    },
    [navigation]
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable style={styles.iconBtn} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={22} color="#6C5CE7" />
          </Pressable>
          <Text style={styles.headerTitle}>Bộ sưu tập</Text>
        </View>
        <Pressable style={styles.iconBtn}>
          <MaterialIcons name="bookmark-border" size={22} color="#787586" />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.heroBlock}>
          <Text style={styles.heroTitle}>{collectionTitle}</Text>
          <Text style={styles.heroSubtitle}>
            Lộ trình chọn lọc giúp bạn tư duy sắc bén, quyết định tốt hơn và phản biện sâu hơn.
          </Text>
        </View>

        <View style={styles.metaWrap}>
          {META_CHIPS.map((chip) => (
            <View key={chip} style={styles.metaChip}>
              <Text style={styles.metaChipText}>{chip}</Text>
            </View>
          ))}
        </View>

        <View style={styles.descriptionCard}>
          <Text style={styles.descriptionText}>
            Bộ sưu tập này gom những cuốn sách giúp bạn nhìn vấn đề rõ hơn, tránh bẫy nhận thức và xây dựng
            hệ thống tư duy vững chắc trong công việc lẫn cuộc sống.
          </Text>
        </View>

        <View style={styles.bookList}>
          {COLLECTION_BOOKS.map((book) => (
            <Pressable
              key={book.id}
              style={styles.bookCard}
              onPress={() => navigation.navigate('BookDetail', { title: book.title, author: book.author })}
            >
              <Image source={book.image} style={styles.bookImage} />
              <View style={styles.bookRight}>
                <View>
                  <Text style={styles.bookTitle}>{book.title}</Text>
                  <Text style={styles.bookAuthor}>{book.author}</Text>
                  <Text style={styles.bookDescription} numberOfLines={2}>
                    {book.description}
                  </Text>
                </View>
                <View style={styles.viewBookRow}>
                  <Text style={styles.viewBookText}>XEM CHI TIẾT</Text>
                  <MaterialIcons name="chevron-right" size={16} color="#6C5CE7" />
                </View>
              </View>
            </Pressable>
          ))}
        </View>

        <View style={styles.relatedSection}>
          <Text style={styles.relatedTitle}>Bộ sưu tập liên quan</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.relatedRow}>
            {RELATED_COLLECTIONS.map((item) => (
              <Pressable
                key={item.id}
                style={styles.relatedCard}
                onPress={() => navigation.push('CollectionDetail', { title: item.title })}
              >
                <View style={[styles.relatedImageWrap, { backgroundColor: item.tint }]}>
                  <Image source={item.image} style={styles.relatedImage} />
                </View>
                <View style={styles.relatedMeta}>
                  <Text style={styles.relatedCardTitle}>{item.title}</Text>
                  <Text style={styles.relatedCardCount}>{item.countLabel}</Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <FloatingAskBar
        placeholder="Hỏi Bạn Đọc về bộ sưu tập này"
        onOpenFullChat={() => openAskChat()}
        onSubmitPrompt={(prompt) => openAskChat(prompt)}
      />
      <BottomNavBar activeTab="library" />
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
    fontSize: 23,
    color: '#191C1F',
    fontWeight: '700',
  },
  content: {
    paddingHorizontal: uiSpacing.lg,
    paddingTop: 6,
    paddingBottom: 150,
    gap: 16,
  },
  heroBlock: {
    gap: 7,
  },
  heroTitle: {
    color: '#191C1F',
    fontSize: 50,
    lineHeight: 55,
    fontWeight: '800',
    letterSpacing: -0.8,
  },
  heroSubtitle: {
    color: '#787586',
    fontSize: 14,
    lineHeight: 21,
    maxWidth: 350,
  },
  metaWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  metaChip: {
    borderRadius: 999,
    backgroundColor: '#E7E8EC',
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  metaChipText: {
    color: '#474554',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  descriptionCard: {
    borderRadius: 24,
    backgroundColor: '#F2F3F7',
    paddingHorizontal: 18,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  descriptionText: {
    color: '#474554',
    fontSize: 15,
    lineHeight: 24,
    fontWeight: '500',
  },
  bookList: {
    gap: 14,
  },
  bookCard: {
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    padding: 12,
    flexDirection: 'row',
    gap: 12,
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  bookImage: {
    width: 94,
    height: 138,
    borderRadius: 14,
  },
  bookRight: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 3,
  },
  bookTitle: {
    color: '#191C1F',
    fontSize: 21,
    lineHeight: 28,
    fontWeight: '700',
  },
  bookAuthor: {
    marginTop: 2,
    color: '#6C5CE7',
    fontSize: 12.67,
    fontWeight: '600',
  },
  bookDescription: {
    marginTop: 7,
    color: '#787586',
    fontSize: 13.08,
    lineHeight: 21,
  },
  viewBookRow: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  viewBookText: {
    color: '#6C5CE7',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  relatedSection: {
    gap: 12,
  },
  relatedTitle: {
    color: '#191C1F',
    fontSize: 22,
    fontWeight: '700',
  },
  relatedRow: {
    gap: 12,
    paddingRight: 4,
  },
  relatedCard: {
    width: 198,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  relatedImageWrap: {
    height: 112,
  },
  relatedImage: {
    width: '100%',
    height: '100%',
    opacity: 0.9,
  },
  relatedMeta: {
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  relatedCardTitle: {
    color: '#191C1F',
    fontSize: 16,
    fontWeight: '600',
  },
  relatedCardCount: {
    marginTop: 4,
    color: '#787586',
    fontSize: 13,
    fontWeight: '500',
  },
});
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
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BottomNavBar from '../components/BottomNavBar';
import FloatingAskBar from '../components/FloatingAskBar';
import { RootStackParamList } from '../navigation/AppNavigator';
import { uiColors, uiSpacing } from '../theme/ui';

type AuthorDetailRouteProp = RouteProp<RootStackParamList, 'AuthorDetail'>;
type AuthorDetailNavigationProp = StackNavigationProp<RootStackParamList, 'AuthorDetail'>;

type AuthorDetailScreenProps = {
  route: AuthorDetailRouteProp;
  navigation: AuthorDetailNavigationProp;
};

const BOOKS = [
  {
    id: 'book-1',
    title: 'Sapiens: Lược sử loài người',
    description: 'Khám phá lịch sử nhân loại từ thời kỳ đồ đá đến hiện đại.',
    image: require('../assets/author/author-book-1.jpg'),
  },
  {
    id: 'book-2',
    title: 'Homo Deus: Lược sử tương lai',
    description: 'Bàn về tương lai của con người và cuộc đua với công nghệ.',
    image: require('../assets/author/author-book-2.jpg'),
  },
  {
    id: 'book-3',
    title: '21 bài học cho thế kỷ 21',
    description: 'Giải đáp các câu hỏi quan trọng nhất của thời đại mới.',
    image: require('../assets/author/author-book-3.jpg'),
  },
];

const RELATED_AUTHORS = [
  { id: 'ra-1', name: 'Daniel Kahneman', image: require('../assets/author/related-author-1.jpg') },
  { id: 'ra-2', name: 'Jared Diamond', image: require('../assets/author/related-author-2.jpg') },
  { id: 'ra-3', name: 'Steven Pinker', image: require('../assets/author/related-author-3.jpg') },
  { id: 'ra-4', name: 'Malcolm Gladwell', image: require('../assets/author/related-author-4.jpg') },
];

export default function AuthorDetailScreen({ route, navigation }: AuthorDetailScreenProps) {
  const authorName = route.params?.authorName ?? 'Yuval Noah Harari';

  const openAskChat = React.useCallback(
    (initialPrompt?: string) => {
      navigation.navigate('AskAI', { initialPrompt });
    },
    [navigation]
  );

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.topBar}>
        <View style={styles.topLeft}>
          <Pressable style={styles.iconBtn} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={22} color="#64748B" />
          </Pressable>
          <Text style={styles.topTitle}>Chi tiết tác giả</Text>
        </View>
        <Pressable style={styles.iconBtn}>
          <MaterialIcons name="share" size={21} color="#64748B" />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.authorHeader}>
          <View style={styles.heroWrap}>
            <Image source={require('../assets/author/author-hero.jpg')} style={styles.heroImage} />
          </View>
          <Text style={styles.authorName}>{authorName}</Text>
          <Text style={styles.authorRole}>Sử gia và tác giả</Text>
        </View>

        <View style={styles.bioCard}>
          <Text style={styles.bioText}>
            Yuval Noah Harari là sử gia, triết gia và là tác giả của các đầu sách nổi tiếng như
            Sapiens, Homo Deus và 21 bài học cho thế kỷ 21.
          </Text>
        </View>

        <View style={styles.tagWrap}>
          {['Lịch sử', 'Văn minh', 'Tiến hóa loài người', 'Triết học'].map((item) => (
            <View key={item} style={styles.tagChip}>
              <Text style={styles.tagText}>{item}</Text>
            </View>
          ))}
        </View>

        <View>
          <Text style={styles.sectionTitle}>Sách của {authorName}</Text>
          <View style={styles.bookList}>
            {BOOKS.map((book) => (
              <Pressable
                key={book.id}
                style={styles.bookCard}
                onPress={() => navigation.navigate('BookDetail', { title: book.title, author: authorName })}
              >
                <Image source={book.image} style={styles.bookCover} />
                <View style={styles.bookMeta}>
                  <Text style={styles.bookTitle}>{book.title}</Text>
                  <Text style={styles.bookDesc}>{book.description}</Text>
                  <View style={styles.viewBookBtn}>
                    <Text style={styles.viewBookText}>Xem sách</Text>
                    <MaterialIcons name="chevron-right" size={16} color="#5341CD" />
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        </View>

        <View>
          <Text style={styles.sectionTitle}>Tác giả liên quan</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.relatedRow}>
            {RELATED_AUTHORS.map((item) => (
              <View key={item.id} style={styles.relatedItem}>
                <Image source={item.image} style={styles.relatedAvatar} />
                <Text style={styles.relatedName}>{item.name}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <FloatingAskBar
        placeholder="Hỏi Bạn Đọc về tác giả này..."
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
  topBar: {
    height: 58,
    paddingHorizontal: uiSpacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topLeft: {
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
  topTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#191C1F',
  },
  content: {
    paddingHorizontal: uiSpacing.lg,
    paddingBottom: 150,
    gap: 16,
  },
  authorHeader: {
    marginTop: 6,
    alignItems: 'center',
  },
  heroWrap: {
    width: 118,
    height: 118,
    borderRadius: 59,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    overflow: 'hidden',
    marginBottom: 10,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  authorName: {
    fontSize: 22,
    color: '#191C1F',
    fontWeight: '800',
    textAlign: 'center',
  },
  authorRole: {
    marginTop: 2,
    fontSize: 14,
    color: '#5341CD',
    fontWeight: '500',
  },
  bioCard: {
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  bioText: {
    fontSize: 15,
    lineHeight: 24,
    color: '#474554',
    fontWeight: '500',
  },
  tagWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tagChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#E7E8EC',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  tagText: {
    fontSize: 13,
    color: '#2E3134',
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 18,
    color: '#191C1F',
    fontWeight: '700',
    marginBottom: 10,
  },
  bookList: {
    gap: 10,
  },
  bookCard: {
    borderRadius: 16,
    backgroundColor: '#EDEEF2',
    padding: 10,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  bookCover: {
    width: 88,
    height: 124,
    borderRadius: 10,
  },
  bookMeta: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 16,
    color: '#191C1F',
    fontWeight: '800',
    lineHeight: 22,
  },
  bookDesc: {
    marginTop: 3,
    color: '#787586',
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '500',
  },
  viewBookBtn: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    alignSelf: 'flex-start',
  },
  viewBookText: {
    color: '#5341CD',
    fontSize: 14,
    fontWeight: '700',
  },
  relatedRow: {
    gap: 12,
    paddingRight: 10,
  },
  relatedItem: {
    width: 84,
    alignItems: 'center',
  },
  relatedAvatar: {
    width: 74,
    height: 74,
    borderRadius: 99,
    marginBottom: 8,
  },
  relatedName: {
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 16,
    color: '#191C1F',
    fontWeight: '500',
  },
});
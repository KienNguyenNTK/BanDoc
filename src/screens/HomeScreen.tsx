import React, { useState } from 'react';
import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from '../navigation/AppNavigator';
import BottomNavBar from '../components/BottomNavBar';
import FloatingAskBar from '../components/FloatingAskBar';
import AskAIBottomSheet from '../components/AskAIBottomSheet';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
};

type BookCard = {
  id: string;
  title: string;
  author: string;
  image: ImageSourcePropType;
};

type CollectionCard = {
  id: string;
  title: string;
  countLabel: string;
  image: ImageSourcePropType;
};

const COLORS = {
  background: '#F7F8FC',
  surface: '#FFFFFF',
  primary: '#6C5CE7',
  text: '#191C1F',
  mutedText: '#474554',
  border: '#C8C4D7',
  secondary: '#00B894',
};

const TRENDING_BOOKS: BookCard[] = [
  {
    id: 'trending-1',
    title: 'Atomic Habits',
    author: 'James Clear',
    image: require('../assets/home/home-2.jpg'),
  },
  {
    id: 'trending-2',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    image: require('../assets/home/home-3.jpg'),
  },
  {
    id: 'trending-3',
    title: 'Deep Work',
    author: 'Cal Newport',
    image: require('../assets/home/home-4.jpg'),
  },
];

const RECOMMENDED_BOOKS: BookCard[] = [
  {
    id: 'rec-1',
    title: 'Focus',
    author: 'Daniel Goleman',
    image: require('../assets/home/home-5.jpg'),
  },
  {
    id: 'rec-2',
    title: 'The 5 AM Club',
    author: 'Robin Sharma',
    image: require('../assets/home/home-6.jpg'),
  },
];

const COLLECTIONS: CollectionCard[] = [
  {
    id: 'col-1',
    title: 'Tủ sách cho nhà sáng lập',
    countLabel: '8 cuốn',
    image: require('../assets/home/home-7.jpg'),
  },
  {
    id: 'col-2',
    title: 'Chánh niệm và dòng chảy',
    countLabel: '12 cuốn',
    image: require('../assets/home/home-8.jpg'),
  },
];

const TOPICS = [
  'Tâm lý học',
  'Lịch sử',
  'Kinh doanh',
  'Triết học',
  'AI',
  'Năng suất',
];

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const [askModalVisible, setAskModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Chào buổi tối, Alex</Text>
          <Text style={styles.headerTitle}>Sẵn sàng học điều mới hôm nay?</Text>
        </View>
        <Pressable style={styles.notificationButton}>
          <MaterialIcons name="notifications-none" size={23} color={COLORS.text} />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.discoveryCard}>
          <View style={styles.discoveryTopRow}>
            <View style={styles.discoveryIconWrap}>
              <MaterialIcons name="auto-awesome" size={18} color={COLORS.primary} />
            </View>
            <Text style={styles.discoveryTitle}>Hôm nay bạn muốn khám phá gì?</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chipsRow}
          >
            <Pressable style={styles.chip}>
              <Text style={styles.chipText}>Tôi nên đọc gì tiếp theo?</Text>
            </Pressable>
            <Pressable style={styles.chip}>
              <Text style={styles.chipText}>Gợi ý tóm tắt trong 10 phút</Text>
            </Pressable>
            <Pressable style={styles.chip}>
              <Text style={styles.chipText}>Sách về tập trung</Text>
            </Pressable>
          </ScrollView>
        </View>

        <View>
          <Text style={styles.sectionTitle}>Tiếp tục học</Text>
          <Pressable
            style={styles.continueCard}
            onPress={() =>
              navigation.navigate('Reader', {
                bookId: 'book-continue-1',
                title: 'Sapiens',
              })
            }
          >
            <Image
              source={require('../assets/home/home-1.jpg')}
              style={styles.continueImage}
            />
            <View style={styles.continueMeta}>
              <Text style={styles.progressText}>Đang đọc • 65%</Text>
              <Text style={styles.continueTitle}>Sapiens</Text>
              <Text style={styles.continueAuthor}>Yuval Noah Harari</Text>
              <View style={styles.progressTrack}>
                <View style={styles.progressFill} />
              </View>
            </View>
          </Pressable>
        </View>

        <View>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Xu hướng hiện tại</Text>
            <Pressable>
              <Text style={styles.seeAllText}>Xem tất cả</Text>
            </Pressable>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalRow}
          >
            {TRENDING_BOOKS.map((book) => (
              <Pressable key={book.id} style={styles.trendingCard}>
                <Image source={book.image} style={styles.trendingImage} />
                <Text style={styles.trendingTitle} numberOfLines={1}>
                  {book.title}
                </Text>
                <Text style={styles.trendingAuthor}>{book.author}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View>
          <Text style={styles.sectionTitle}>Gợi ý cho bạn</Text>
          <Text style={styles.sectionHint}>Dựa trên thói quen đọc của bạn</Text>
          <View style={styles.verticalList}>
            {RECOMMENDED_BOOKS.map((book) => (
              <Pressable key={book.id} style={styles.recommendedCard}>
                <Image source={book.image} style={styles.recommendedImage} />
                <View style={styles.recommendedMeta}>
                  <Text style={styles.recommendedTitle}>{book.title}</Text>
                  <Text style={styles.recommendedAuthor}>{book.author}</Text>
                  <View style={styles.ratingRow}>
                    <MaterialIcons name="star" size={14} color="#AC5D00" />
                    <Text style={styles.ratingText}>4.8 • 12 phút đọc</Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        </View>

        <View>
          <Text style={styles.sectionTitle}>Khám phá theo chủ đề</Text>
          <Text style={styles.sectionHint}>Chưa biết bắt đầu từ đâu?</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.topicRow}
          >
            {TOPICS.map((topic, index) => {
              const active = index === 1;

              return (
                <Pressable key={topic} style={[styles.topicChip, active ? styles.topicChipActive : undefined]}>
                  <Text style={[styles.topicChipText, active ? styles.topicChipTextActive : undefined]}>
                    {topic}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        <View>
          <Text style={styles.sectionTitle}>Bộ sưu tập</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.collectionsRow}
          >
            {COLLECTIONS.map((collection) => (
              <Pressable key={collection.id} style={styles.collectionCard}>
                <ImageBackground
                  source={collection.image}
                  style={styles.collectionBg}
                  imageStyle={styles.collectionImage}
                >
                  <View style={styles.collectionOverlay}>
                    <Text style={styles.collectionCount}>{collection.countLabel}</Text>
                    <Text style={styles.collectionTitle}>{collection.title}</Text>
                  </View>
                </ImageBackground>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View>
          <Text style={styles.sectionTitle}>Tóm tắt mới</Text>
          <View style={styles.verticalList}>
            <Pressable style={styles.summaryRow}>
              <View style={[styles.summaryIcon, styles.summaryIconGold]}>
                <MaterialIcons name="menu-book" size={19} color="#884800" />
              </View>
              <View style={styles.summaryMeta}>
                <Text style={styles.summaryTitle}>Effortless</Text>
                <Text style={styles.summaryAuthor}>Greg McKeown</Text>
              </View>
              <MaterialIcons name="chevron-right" size={22} color="#787586" />
            </Pressable>
            <Pressable style={styles.summaryRow}>
              <View style={[styles.summaryIcon, styles.summaryIconGreen]}>
                <MaterialIcons name="psychology" size={19} color={COLORS.secondary} />
              </View>
              <View style={styles.summaryMeta}>
                <Text style={styles.summaryTitle}>Think Again</Text>
                <Text style={styles.summaryAuthor}>Adam Grant</Text>
              </View>
              <MaterialIcons name="chevron-right" size={22} color="#787586" />
            </Pressable>
            <Pressable style={styles.summaryRow}>
              <View style={[styles.summaryIcon, styles.summaryIconPurple]}>
                <MaterialIcons name="lightbulb-outline" size={19} color={COLORS.primary} />
              </View>
              <View style={styles.summaryMeta}>
                <Text style={styles.summaryTitle}>The Creative Act</Text>
                <Text style={styles.summaryAuthor}>Rick Rubin</Text>
              </View>
              <MaterialIcons name="chevron-right" size={22} color="#787586" />
            </Pressable>
          </View>
        </View>
      </ScrollView>

      <FloatingAskBar
        text="Hỏi BanDoc nên học gì tiếp theo"
        onPress={() => setAskModalVisible(true)}
      />
      <BottomNavBar activeTab="home" />
      <AskAIBottomSheet
        visible={askModalVisible}
        onClose={() => setAskModalVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  greeting: {
    fontSize: 13,
    color: COLORS.mutedText,
    fontWeight: '600',
  },
  headerTitle: {
    marginTop: 2,
    fontSize: 24,
    lineHeight: 30,
    color: COLORS.text,
    fontWeight: '800',
    maxWidth: 290,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEF0F7',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 150,
    gap: 16,
  },
  discoveryCard: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: '#6C5CE726',
    borderRadius: 16,
    padding: 14,
  },
  discoveryTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  discoveryIconWrap: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#6C5CE717',
    alignItems: 'center',
    justifyContent: 'center',
  },
  discoveryTitle: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: '700',
  },
  chipsRow: {
    gap: 8,
    paddingRight: 4,
  },
  chip: {
    borderWidth: 1,
    borderColor: '#D8D5E4',
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  chipText: {
    color: COLORS.mutedText,
    fontSize: 12,
    fontWeight: '600',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 19,
    fontWeight: '700',
    marginBottom: 8,
  },
  seeAllText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 14,
  },
  continueCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    gap: 14,
    shadowColor: '#191C1F',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  continueImage: {
    width: 95,
    height: 128,
    borderRadius: 12,
  },
  continueMeta: {
    flex: 1,
    justifyContent: 'center',
  },
  progressText: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  continueTitle: {
    marginTop: 6,
    color: COLORS.text,
    fontSize: 23,
    fontWeight: '800',
  },
  continueAuthor: {
    marginTop: 2,
    color: COLORS.mutedText,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 10,
  },
  progressTrack: {
    height: 6,
    borderRadius: 999,
    backgroundColor: '#E3E5EE',
    overflow: 'hidden',
  },
  progressFill: {
    height: 6,
    width: '65%',
    borderRadius: 999,
    backgroundColor: COLORS.secondary,
  },
  horizontalRow: {
    gap: 14,
    paddingRight: 8,
  },
  trendingCard: {
    width: 140,
  },
  trendingImage: {
    width: 140,
    height: 190,
    borderRadius: 14,
    marginBottom: 8,
  },
  trendingTitle: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '700',
  },
  trendingAuthor: {
    color: COLORS.mutedText,
    fontSize: 12,
    marginTop: 1,
  },
  sectionHint: {
    marginTop: -6,
    marginBottom: 10,
    color: COLORS.mutedText,
    fontSize: 12,
  },
  verticalList: {
    gap: 10,
  },
  recommendedCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 12,
    flexDirection: 'row',
    gap: 12,
  },
  recommendedImage: {
    width: 64,
    height: 82,
    borderRadius: 10,
  },
  recommendedMeta: {
    justifyContent: 'center',
  },
  recommendedTitle: {
    color: COLORS.text,
    fontWeight: '700',
    fontSize: 15,
  },
  recommendedAuthor: {
    color: COLORS.mutedText,
    fontSize: 13,
    marginTop: 1,
  },
  ratingRow: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  ratingText: {
    color: COLORS.mutedText,
    fontSize: 12,
  },
  topicRow: {
    gap: 8,
    paddingRight: 8,
  },
  topicChip: {
    borderWidth: 1,
    borderColor: '#D8D5E4',
    borderRadius: 999,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: COLORS.surface,
  },
  topicChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  topicChipText: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '600',
  },
  topicChipTextActive: {
    color: '#FFFFFF',
  },
  collectionsRow: {
    gap: 14,
    paddingRight: 8,
  },
  collectionCard: {
    width: 280,
    height: 160,
    borderRadius: 14,
    overflow: 'hidden',
  },
  collectionBg: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  collectionImage: {
    borderRadius: 14,
  },
  collectionOverlay: {
    padding: 14,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  collectionCount: {
    color: '#E4DFFF',
    textTransform: 'uppercase',
    fontSize: 10,
    letterSpacing: 1,
    fontWeight: '800',
  },
  collectionTitle: {
    marginTop: 2,
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '800',
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
  },
  summaryIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  summaryIconGold: {
    backgroundColor: '#FFE8D4',
  },
  summaryIconGreen: {
    backgroundColor: '#DDFBED',
  },
  summaryIconPurple: {
    backgroundColor: '#ECE9FF',
  },
  summaryMeta: {
    flex: 1,
  },
  summaryTitle: {
    color: COLORS.text,
    fontWeight: '700',
    fontSize: 14,
  },
  summaryAuthor: {
    marginTop: 1,
    color: COLORS.mutedText,
    fontSize: 12,
  },
});

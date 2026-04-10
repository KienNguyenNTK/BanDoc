import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BottomNavBar from '../components/BottomNavBar';
import FloatingAskBar from '../components/FloatingAskBar';
import { Screen, SectionHeader, TopBar } from '../components/ui';
import { RootStackParamList } from '../navigation/AppNavigator';
import { uiSpacing } from '../theme/ui';
import { buildChatContext, listSummaries, listSummariesByAuthor, resolveSummaryCoverSource } from '../data';

type AuthorDetailRouteProp = RouteProp<RootStackParamList, 'AuthorDetail'>;
type AuthorDetailNavigationProp = StackNavigationProp<RootStackParamList, 'AuthorDetail'>;

type AuthorDetailScreenProps = {
  route: AuthorDetailRouteProp;
  navigation: AuthorDetailNavigationProp;
};

const RELATED_AUTHORS = [
  { id: 'ra-1', name: 'Daniel Kahneman', image: require('../assets/author/related-author-1.jpg') },
  { id: 'ra-2', name: 'Jared Diamond', image: require('../assets/author/related-author-2.jpg') },
  { id: 'ra-3', name: 'Steven Pinker', image: require('../assets/author/related-author-3.jpg') },
  { id: 'ra-4', name: 'Malcolm Gladwell', image: require('../assets/author/related-author-4.jpg') },
];

export default function AuthorDetailScreen({ route, navigation }: AuthorDetailScreenProps) {
  const authorName = route.params?.authorName ?? 'Yuval Noah Harari';
  const summaries = React.useMemo(() => {
    const byAuthor = listSummariesByAuthor(authorName);
    return byAuthor;
  }, [authorName]);
  const fallbackSummaries = React.useMemo(() => listSummaries().slice(0, 3), []);

  const openAskChat = React.useCallback(
    (initialPrompt?: string) => {
      const context = buildChatContext({
        source: 'explore',
        extraText: `Ngữ cảnh: Tác giả "${authorName}".`,
      });
      navigation.navigate('AskAI', { initialPrompt, context });
    },
    [authorName, navigation]
  );

  return (
    <Screen mode="static" edges={['top']} contentStyle={styles.screenContent}>
      <TopBar
        title="Chi tiết tác giả"
        onBack={() => navigation.goBack()}
        right={
          <Pressable style={styles.iconBtn}>
            <MaterialIcons name="share" size={21} color="#64748B" />
          </Pressable>
        }
      />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.authorHeader}>
          <View style={styles.heroWrap}>
            <Image source={require('../assets/author/author-hero.jpg')} style={styles.heroImage} />
          </View>
          <Text style={styles.authorName}>{authorName}</Text>
          <Text style={styles.authorRole}>Sử gia và tác giả</Text>
        </View>

        <View style={styles.bioCard}>
          <Text style={styles.bioText} numberOfLines={4} ellipsizeMode="tail">
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
          <Text style={styles.sectionTitle}>Tóm tắt của {authorName}</Text>
          {summaries.length === 0 ? (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyTitle}>Chưa có tóm tắt cho tác giả này</Text>
              <Text style={styles.emptyText} numberOfLines={3} ellipsizeMode="tail">
                Bạn có thể xem các tóm tắt gợi ý bên dưới hoặc tìm một tác giả khác.
              </Text>
              <View style={styles.bookList}>
                {fallbackSummaries.map((summary) => (
                  <Pressable
                    key={summary.id}
                    style={styles.bookCard}
                    onPress={() => navigation.navigate('BookDetail', { summaryId: summary.id })}
                  >
                    <Image
                      source={resolveSummaryCoverSource(summary.id) ?? require('../assets/library/continue-reading.jpg')}
                      style={styles.bookCover}
                    />
                    <View style={styles.bookMeta}>
                      <Text style={styles.bookTitle} numberOfLines={2} ellipsizeMode="tail">
                        {summary.title}
                      </Text>
                      <Text style={styles.bookDesc} numberOfLines={3} ellipsizeMode="tail">
                        {summary.overview}
                      </Text>
                      <View style={styles.viewBookBtn}>
                        <Text style={styles.viewBookText}>Xem tóm tắt</Text>
                        <MaterialIcons name="chevron-right" size={16} color="#5341CD" />
                      </View>
                    </View>
                  </Pressable>
                ))}
              </View>
            </View>
          ) : (
            <View style={styles.bookList}>
              {summaries.map((summary) => (
                <Pressable
                  key={summary.id}
                  style={styles.bookCard}
                  onPress={() => navigation.navigate('BookDetail', { summaryId: summary.id })}
                >
                  <Image
                    source={resolveSummaryCoverSource(summary.id) ?? require('../assets/library/continue-reading.jpg')}
                    style={styles.bookCover}
                  />
                  <View style={styles.bookMeta}>
                    <Text style={styles.bookTitle} numberOfLines={2} ellipsizeMode="tail">
                      {summary.title}
                    </Text>
                    <Text style={styles.bookDesc} numberOfLines={3} ellipsizeMode="tail">
                      {summary.overview}
                    </Text>
                    <View style={styles.viewBookBtn}>
                      <Text style={styles.viewBookText}>Xem tóm tắt</Text>
                      <MaterialIcons name="chevron-right" size={16} color="#5341CD" />
                    </View>
                  </View>
                </Pressable>
              ))}
            </View>
          )}
        </View>

        <View>
          <SectionHeader title="Tác giả liên quan" />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.relatedRow}>
            {RELATED_AUTHORS.map((item) => (
              <Pressable key={item.id} style={styles.relatedItem} onPress={() => navigation.push('AuthorDetail', { authorName: item.name })}>
                <Image source={item.image} style={styles.relatedAvatar} />
                <Text style={styles.relatedName}>{item.name}</Text>
              </Pressable>
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
  emptyCard: {
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  emptyTitle: {
    color: '#191C1F',
    fontSize: 16,
    fontWeight: '800',
  },
  emptyText: {
    marginTop: 6,
    color: '#787586',
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '500',
  },
});
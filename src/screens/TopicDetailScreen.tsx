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
import { uiColors, uiSpacing } from '../theme/ui';
import { buildChatContext, listSummariesByCategory, resolveSummaryCoverSource } from '../data';

type TopicDetailRouteProp = RouteProp<RootStackParamList, 'TopicDetail'>;
type TopicDetailNavigationProp = StackNavigationProp<RootStackParamList, 'TopicDetail'>;

type TopicDetailScreenProps = {
  route: TopicDetailRouteProp;
  navigation: TopicDetailNavigationProp;
};

const CONCEPTS = ['Nhận thức', 'Thiên kiến', 'Hành vi', 'Trí nhớ', 'Động lực', 'Ra quyết định'];
const RELATED_TOPICS = ['Triết học', 'Năng suất', 'Kinh tế học hành vi'];

export default function TopicDetailScreen({ route, navigation }: TopicDetailScreenProps) {
  const topicTitle = route.params?.title ?? 'Tâm lý học';
  const topicDescription =
    route.params?.description ?? 'Hiểu về hành vi, trí nhớ và cách con người ra quyết định';
  const summaries = React.useMemo(() => listSummariesByCategory(topicTitle), [topicTitle]);

  const openAskChat = React.useCallback(
    (initialPrompt?: string) => {
      const context = buildChatContext({
        source: 'explore',
        extraText: `Ngữ cảnh: Chủ đề "${topicTitle}". ${topicDescription}`,
      });
      navigation.navigate('AskAI', { initialPrompt, context });
    },
    [navigation, topicDescription, topicTitle]
  );

  return (
    <Screen mode="static" edges={['top']} contentStyle={styles.screenContent}>
      <TopBar
        title="Chủ đề"
        onBack={() => navigation.goBack()}
        tone="primary"
        right={
          <Pressable style={styles.bookmarkBtn}>
            <MaterialIcons name="bookmark-border" size={20} color="#64748B" />
          </Pressable>
        }
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.headerSection}>
          <View style={styles.topicIconWrap}>
            <MaterialIcons name="psychology" size={30} color="#6C5CE7" />
          </View>
          <Text style={styles.topicTitle}>{topicTitle}</Text>
          <Text style={styles.topicSubtitle}>{topicDescription}</Text>
        </View>

        <View style={styles.descCard}>
          <Text style={styles.descText}>
            Tâm lý học nghiên cứu cách con người suy nghĩ, cảm nhận, ghi nhớ, ra quyết định và hành
            xử. Chủ đề này giúp bạn hiểu rõ các mô hình tinh thần và các mẫu hành vi phổ biến.
          </Text>
        </View>

        <View>
          <SectionHeader title="Khái niệm chính" />
          <View style={styles.chipWrap}>
            {CONCEPTS.map((concept, index) => (
              <View key={concept} style={styles.conceptChip}>
                <Text style={[styles.conceptText, index < 2 ? styles.conceptTextPrimary : undefined]}>
                  {concept}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View>
          <SectionHeader title="Tóm tắt liên quan" rightLabel="Xem tất cả" />

          {summaries.length === 0 ? (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyTitle}>Chưa có tóm tắt cho chủ đề này</Text>
              <Text style={styles.emptyText}>Bạn có thể thử một chủ đề khác hoặc hỏi Bạn Đọc để được gợi ý.</Text>
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
                    <Text style={styles.bookTitleText}>{summary.title}</Text>
                    {summary.author ? <Text style={styles.bookAuthor}>{summary.author}</Text> : null}
                    <View style={styles.ratingRow}>
                      <MaterialIcons name="star" size={15} color="#6C5CE7" />
                      <Text style={styles.ratingValue}>4.8</Text>
                      <Text style={styles.ratingCount}>{`${summary.durationMinutes ?? 12} phút tóm tắt`}</Text>
                    </View>
                  </View>
                </Pressable>
              ))}
            </View>
          )}
        </View>

        <View>
          <Text style={styles.sectionTitle}>Chủ đề liên quan</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.relatedRow}>
            {RELATED_TOPICS.map((item) => (
              <Pressable
                key={item}
                style={styles.relatedChip}
                onPress={() =>
                  navigation.push('TopicDetail', {
                    title: item,
                    description: `Khám phá tóm tắt theo chủ đề ${item.toLowerCase()}.`,
                  })
                }
              >
                <Text style={styles.relatedChipText}>{item}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <FloatingAskBar
        placeholder="Hỏi Bạn Đọc thêm về chủ đề này..."
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
  bookmarkBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#E5E2F0',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: uiColors.background,
  },
  content: {
    paddingHorizontal: uiSpacing.lg,
    paddingTop: 18,
    paddingBottom: 150,
    gap: 20,
  },
  headerSection: {
    alignItems: 'center',
  },
  topicIconWrap: {
    width: 68,
    height: 68,
    borderRadius: 22,
    backgroundColor: '#E9E5FB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  topicTitle: {
    fontSize: 24,
    color: '#191C1F',
    fontWeight: '800',
  },
  topicSubtitle: {
    marginTop: 4,
    maxWidth: 290,
    textAlign: 'center',
    color: '#474554',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 21,
  },
  descCard: {
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  descText: {
    color: '#474554',
    fontSize: 15,
    lineHeight: 28,
    fontWeight: '500',
  },
  sectionTitle: {
    color: '#191C1F',
    fontSize: 19,
    fontWeight: '700',
    marginBottom: 10,
  },
  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  conceptChip: {
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E2F0',
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  conceptText: {
    color: '#474554',
    fontSize: 14,
    fontWeight: '600',
  },
  conceptTextPrimary: {
    color: '#6C5CE7',
  },
  bookList: {
    gap: 10,
  },
  bookCard: {
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    padding: 10,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  bookCover: {
    width: 86,
    height: 122,
    borderRadius: 10,
  },
  bookMeta: {
    flex: 1,
  },
  bookTitleText: {
    color: '#191C1F',
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '800',
  },
  bookAuthor: {
    marginTop: 2,
    color: '#474554',
    fontSize: 13,
    fontWeight: '500',
  },
  ratingRow: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  ratingValue: {
    color: '#191C1F',
    fontSize: 18,
    fontWeight: '700',
  },
  ratingCount: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '500',
  },
  relatedRow: {
    gap: 10,
    paddingRight: 10,
  },
  relatedChip: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E2F0',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: uiSpacing.lg,
    paddingVertical: 10,
  },
  relatedChipText: {
    color: '#191C1F',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyCard: {
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    padding: 16,
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
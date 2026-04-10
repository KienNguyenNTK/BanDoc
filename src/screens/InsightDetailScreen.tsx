import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Screen, TopBar } from '../components/ui';
import { buildChatContext, getInsight, getSummaryById } from '../data';
import { uiSpacing } from '../theme/ui';

type InsightDetailNavigationProp = StackNavigationProp<RootStackParamList, 'InsightDetail'>;
type InsightDetailRouteProp = RouteProp<RootStackParamList, 'InsightDetail'>;

type InsightDetailScreenProps = {
  navigation: InsightDetailNavigationProp;
  route: InsightDetailRouteProp;
};

export default function InsightDetailScreen({ navigation, route }: InsightDetailScreenProps) {
  const params = route.params ?? {};
  const summaryId = params.summaryId;
  const insightId = params.insightId;

  const summary = React.useMemo(() => (summaryId ? getSummaryById(summaryId) : undefined), [summaryId]);
  const insight = React.useMemo(() => (summary && insightId ? getInsight(summary, insightId) : undefined), [insightId, summary]);

  const bookTitle = summary?.title ?? params.bookTitle ?? 'Tóm tắt';
  const author = summary?.author ?? params.author ?? '';
  const genre = params.genre ?? (summary?.categories?.[0] ? summary.categories[0] : 'Tóm tắt');
  const quote = params.quote ?? (insight?.quote ? `"${insight.quote}"` : '');
  const insightTitle =
    params.insightTitle ?? (insight ? `Ý chính ${String(insight.index).padStart(2, '0')} - ${insight.title}` : 'Ý chính');
  const savedOn = params.savedOn ?? 'Đã lưu';
  const personalNote = params.personalNote ?? '';

  const resolvedSummaryId = summary?.id ?? summaryId;

  const coverSource = React.useMemo(() => {
    if (resolvedSummaryId === 'sapiens') return require('../assets/notes/sapiens-cover.jpg');
    if (resolvedSummaryId === 'deep-work') return require('../assets/notes/deep-work-cover.jpg');
    if (resolvedSummaryId === 'innsmouth') return require('../assets/translator/project-cover.jpg');
    return require('../assets/insight/insight-book-cover.jpg');
  }, [resolvedSummaryId]);

  return (
    <Screen mode="static" edges={['top']} contentStyle={styles.screenContent}>
      <TopBar
        title="Ý chính"
        onBack={() => navigation.goBack()}
        right={
          <Pressable style={styles.iconBtn}>
            <MaterialIcons name="share" size={22} color="#5D6A80" />
          </Pressable>
        }
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.bookInfoCard}>
          <Image source={coverSource} style={styles.bookCover} />
          <View style={styles.bookMeta}>
            <Text style={styles.bookTitle}>{bookTitle}</Text>
            {author ? <Text style={styles.bookAuthor}>{author}</Text> : null}
            <View style={styles.genreRow}>
              <MaterialIcons name="menu-book" size={15} color="#5341CD" />
              <Text style={styles.genreText}>{genre}</Text>
            </View>
          </View>
        </View>

        <View style={styles.quoteCard}>
          <MaterialIcons name="format-quote" size={38} color="#C5C0EE" />
          {quote ? <Text style={styles.quoteText}>{quote}</Text> : <Text style={styles.quoteText}>—</Text>}
          <View style={styles.metaDivider} />
          <Text style={styles.insightTitle}>{insightTitle}</Text>
          <Text style={styles.savedOnText}>{savedOn}</Text>
        </View>

        {personalNote ? (
          <>
            <View style={styles.noteSectionHeader}>
              <Text style={styles.noteSectionTitle}>GHI CHÚ CÁ NHÂN</Text>
              <Pressable style={styles.editBtn}>
                <MaterialIcons name="edit" size={15} color="#5341CD" />
                <Text style={styles.editText}>Sửa</Text>
              </Pressable>
            </View>

            <View style={styles.noteCard}>
              <Text style={styles.noteText}>{personalNote}</Text>
            </View>
          </>
        ) : null}
      </ScrollView>

      <View style={styles.bottomActionWrap}>
        <Pressable
          style={styles.primaryAction}
          onPress={() => {
            if (!resolvedSummaryId) return;
            navigation.navigate('BookDetail', { summaryId: resolvedSummaryId });
          }}
          disabled={!resolvedSummaryId}
        >
          <MaterialIcons name="menu-book" size={21} color="#FFFFFF" />
          <Text style={styles.primaryActionText}>Mở tóm tắt</Text>
        </Pressable>

        <Pressable
          style={styles.secondaryAction}
          onPress={() => {
            const context = buildChatContext({
              source: 'summary',
              summary,
              insight,
              extraText: 'Ngữ cảnh: Ý chính. Người dùng muốn hỏi sâu hơn về ý này.',
            });
            navigation.navigate('AskAI', {
              initialPrompt: insight ? `Giải thích sâu hơn ý chính: "${insight.title}"` : 'Giải thích ý chính này rõ hơn.',
              context,
            });
          }}
        >
          <MaterialIcons name="auto-awesome" size={21} color="#5341CD" />
          <Text style={styles.secondaryActionText}>Hỏi về ý chính</Text>
        </Pressable>
      </View>
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
    paddingTop: 8,
    paddingBottom: 190,
    gap: 14,
  },
  bookInfoCard: {
    borderRadius: 24,
    backgroundColor: '#EFF0F5',
    padding: 14,
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  bookCover: {
    width: 92 / 1.3,
    height: 122 / 1.3,
    borderRadius: 10,
  },
  bookMeta: {
    flex: 1,
  },
  bookTitle: {
    color: '#191C1F',
    fontSize: 17,
    fontWeight: '700',
  },
  bookAuthor: {
    marginTop: 2,
    color: '#363745',
    fontSize: 14,
    fontWeight: '500',
  },
  genreRow: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  genreText: {
    color: '#5341CD',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.7,
    fontWeight: '800',
  },
  quoteCard: {
    borderRadius: 26,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  quoteText: {
    marginTop: 10,
    color: '#191C1F',
    fontSize: 16.5,
    lineHeight: 26,
    fontWeight: '600',
  },
  metaDivider: {
    marginTop: 18,
    height: 1,
    backgroundColor: '#E5E5ED',
  },
  insightTitle: {
    marginTop: 14,
    color: '#5341CD',
    fontSize: 16,
    fontWeight: '700',
  },
  savedOnText: {
    marginTop: 4,
    color: '#787586',
    fontSize: 14,
    fontWeight: '500',
  },
  noteSectionHeader: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  noteSectionTitle: {
    color: '#363745',
    fontSize: 16,
    letterSpacing: 1.2,
    fontWeight: '800',
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  editText: {
    color: '#5341CD',
    fontSize: 14,
    fontWeight: '700',
  },
  noteCard: {
    borderRadius: 24,
    backgroundColor: '#F6F0EA',
    borderWidth: 1,
    borderColor: '#EEDBC8',
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  noteText: {
    color: '#2A2B34',
    fontSize: 16,
    lineHeight: 27,
    fontWeight: '500',
  },
  bottomActionWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: uiSpacing.lg,
    paddingTop: 10,
    paddingBottom: 14,
    backgroundColor: '#FFFFFFEE',
    borderTopWidth: 1,
    borderTopColor: '#E4E2EE',
    gap: 10,
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  primaryAction: {
    height: 56,
    borderRadius: 16,
    backgroundColor: '#5341CD',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  primaryActionText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  secondaryAction: {
    height: 56,
    borderRadius: 16,
    backgroundColor: '#E7E8EC',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  secondaryActionText: {
    color: '#5341CD',
    fontSize: 16,
    fontWeight: '800',
  },
});
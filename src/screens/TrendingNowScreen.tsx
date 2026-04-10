import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BottomNavBar from '../components/BottomNavBar';
import FloatingAskBar from '../components/FloatingAskBar';
import { Screen, TopBar } from '../components/ui';
import { RootStackParamList } from '../navigation/AppNavigator';
import { uiSpacing, uiTypography } from '../theme/ui';
import { buildChatContext, listCategories, listSummaries, resolveSummaryCoverSource } from '../data';

type TrendingNowNavigationProp = StackNavigationProp<RootStackParamList, 'TrendingNow'>;

type TrendingNowScreenProps = {
  navigation: TrendingNowNavigationProp;
};

const ratingLabelForSummary = (summaryId: string) => {
  if (summaryId === 'sapiens') return '4.8';
  if (summaryId === 'deep-work') return '4.7';
  if (summaryId === 'innsmouth') return '4.9';
  return '4.8';
};

export default function TrendingNowScreen({ navigation }: TrendingNowScreenProps) {
  const [activeFilter, setActiveFilter] = React.useState('Tất cả');
  const filters = React.useMemo(() => ['Tất cả', ...listCategories().slice(0, 8)], []);
  const allSummaries = React.useMemo(() => listSummaries(), []);
  const list = React.useMemo(() => {
    if (activeFilter === 'Tất cả') return allSummaries;
    return allSummaries.filter((s) => (s.categories ?? []).some((c) => c.toLowerCase() === activeFilter.toLowerCase()));
  }, [activeFilter, allSummaries]);

  const openAskChat = React.useCallback(
    (initialPrompt?: string) => {
      const context = buildChatContext({
        source: 'home',
        extraText: `Ngữ cảnh: Xu hướng hiện tại. Bộ lọc: "${activeFilter}".`,
      });
      navigation.navigate('AskAI', { initialPrompt, context });
    },
    [activeFilter, navigation]
  );

  return (
    <Screen mode="static" edges={['top']} contentStyle={styles.screenContent}>
      <TopBar title="Xu hướng hiện tại" onBack={() => navigation.goBack()} tone="primary" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
          {filters.map((filter) => {
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
          {list.map((summary) => (
            <Pressable
              key={summary.id}
              style={styles.bookCard}
              onPress={() => navigation.navigate('BookDetail', { summaryId: summary.id })}
            >
              <Image
                source={resolveSummaryCoverSource(summary.id) ?? require('../assets/library/continue-reading.jpg')}
                style={styles.bookImage}
              />
              <View style={styles.bookRight}>
                <View>
                  <View style={styles.titleRow}>
                    <Text style={styles.bookTitle}>{summary.title}</Text>
                    <MaterialIcons name="bookmark-border" size={21} color="#787586" />
                  </View>
                  {summary.author ? <Text style={styles.bookAuthor}>{summary.author}</Text> : null}
                </View>

                <View style={styles.metaRow}>
                  <View style={styles.metaBadge}>
                    <MaterialIcons name="star" size={15} color="#AC5D00" />
                    <Text style={styles.metaBadgeText}>{ratingLabelForSummary(summary.id)}</Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <MaterialIcons name="schedule" size={16} color="#474554" />
                    <Text style={styles.summaryText}>{`${summary.durationMinutes ?? 12} phút tóm tắt`}</Text>
                  </View>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <FloatingAskBar
        placeholder="Hỏi Bạn Đọc nên đọc gì tiếp theo"
        onOpenFullChat={() => openAskChat()}
        onSubmitPrompt={(prompt) => openAskChat(prompt)}
      />
      <BottomNavBar activeTab="home" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContent: {
    paddingHorizontal: 0,
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
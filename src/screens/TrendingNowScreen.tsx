import React from 'react';
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BottomNavBar from '../components/BottomNavBar';
import FloatingAskBar from '../components/FloatingAskBar';
import { Screen, TopBar } from '../components/ui';
import { RootStackParamList } from '../navigation/AppNavigator';
import { uiColors, uiRadius, uiSizing, uiSpacing, uiTypography } from '../theme/ui';
import { buildChatContext, listCategories, listSummaries, resolveSummaryCoverSource } from '../data';
import type { BookSummary } from '../types/content';

type TrendingNowNavigationProp = StackNavigationProp<RootStackParamList, 'TrendingNow'>;

type TrendingNowScreenProps = {
  navigation: TrendingNowNavigationProp;
};

const CARD_ACCENTS = ['#6C5CE7', '#006B55', '#AC5D00', '#5341CD', '#2B4ACB', '#884800'] as const;

const ratingLabelForSummary = (summaryId: string) => {
  if (summaryId === 'sapiens') return '4.8';
  if (summaryId === 'deep-work') return '4.7';
  if (summaryId === 'innsmouth') return '4.9';
  return '4.8';
};

function primaryCategory(summary: BookSummary): string | undefined {
  return summary.categories?.[0];
}

export default function TrendingNowScreen({ navigation }: TrendingNowScreenProps) {
  const insets = useSafeAreaInsets();
  const bottomInset = Math.max(insets.bottom, 6);
  const scrollBottomPad =
    uiSizing.bottomNavHeight + bottomInset + uiSizing.floatingAskHeight + uiSpacing.xl + uiSpacing.md;

  const [activeFilter, setActiveFilter] = React.useState('Tất cả');
  const filters = React.useMemo(() => ['Tất cả', ...listCategories().slice(0, 8)], []);
  const allSummaries = React.useMemo(() => listSummaries(), []);
  const list = React.useMemo(() => {
    if (activeFilter === 'Tất cả') return allSummaries;
    return allSummaries.filter((s) =>
      (s.categories ?? []).some((c) => c.toLowerCase() === activeFilter.toLowerCase())
    );
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

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: scrollBottomPad }]}
      >
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Đang được đọc nhiều</Text>
          <Text style={styles.heroSubtitle}>
            {list.length} tóm tắt
            {activeFilter !== 'Tất cả' ? ` · ${activeFilter}` : ''} — chọn một cuốn để bắt đầu.
          </Text>
        </View>

        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Lọc theo chủ đề</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterRow}
          >
            {filters.map((filter) => {
              const active = filter === activeFilter;

              return (
                <Pressable
                  key={filter}
                  style={[styles.filterChip, active ? styles.filterChipActive : styles.filterChipIdle]}
                  onPress={() => setActiveFilter(filter)}
                >
                  <Text style={[styles.filterText, active ? styles.filterTextActive : styles.filterTextIdle]}>
                    {filter}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.listHeader}>
          <Text style={styles.listHeaderTitle}>Danh sách</Text>
          <View style={styles.listHeaderBadge}>
            <Text style={styles.listHeaderBadgeText}>{list.length}</Text>
          </View>
        </View>

        <View style={styles.listWrap}>
          {list.map((summary, index) => {
            const accent = CARD_ACCENTS[index % CARD_ACCENTS.length];
            const category = primaryCategory(summary);

            return (
              <Pressable
                key={summary.id}
                style={({ pressed }) => [styles.bookCard, pressed && styles.bookCardPressed]}
                onPress={() => navigation.navigate('BookDetail', { summaryId: summary.id })}
              >
                <View style={[styles.accentStripe, { backgroundColor: accent }]} />
                <View style={styles.coverWrap}>
                  <Image
                    source={
                      resolveSummaryCoverSource(summary.id) ?? require('../assets/library/continue-reading.jpg')
                    }
                    style={styles.bookImage}
                  />
                </View>
                <View style={styles.bookMain}>
                  <View style={styles.bookTop}>
                    <View style={styles.titleBlock}>
                      {category ? (
                        <View style={[styles.categoryPill, { borderColor: `${accent}35` }]}>
                          <Text style={[styles.categoryPillText, { color: accent }]} numberOfLines={1}>
                            {category}
                          </Text>
                        </View>
                      ) : null}
                      <Text style={styles.bookTitle} numberOfLines={2}>
                        {summary.title}
                      </Text>
                      {summary.author ? (
                        <Text style={styles.bookAuthor} numberOfLines={1}>
                          {summary.author}
                        </Text>
                      ) : null}
                    </View>
                    <Pressable style={styles.bookmarkBtn} hitSlop={12} onPress={() => {}}>
                      <MaterialIcons name="bookmark-border" size={22} color={uiColors.textSubtle} />
                    </Pressable>
                  </View>

                  <View style={styles.bookFooter}>
                    <View style={styles.metaGroup}>
                      <View style={styles.ratingPill}>
                        <MaterialIcons name="star" size={14} color={uiColors.warning} />
                        <Text style={styles.ratingPillText}>{ratingLabelForSummary(summary.id)}</Text>
                      </View>
                      <View style={styles.timePill}>
                        <MaterialIcons name="schedule" size={14} color={uiColors.primaryDeep} />
                        <Text style={styles.timePillText}>{`${summary.durationMinutes ?? 12} phút`}</Text>
                      </View>
                    </View>
                    <View style={[styles.chevronWrap, { backgroundColor: `${accent}14` }]}>
                      <MaterialIcons name="chevron-right" size={22} color={accent} />
                    </View>
                  </View>
                </View>
              </Pressable>
            );
          })}
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

const cardShadow =
  Platform.OS === 'ios'
    ? {
        shadowColor: '#5341CD',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.08,
        shadowRadius: 16,
      }
    : { elevation: 4 };

const styles = StyleSheet.create({
  screenContent: {
    paddingHorizontal: 0,
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: uiSpacing.lg,
    paddingTop: 4,
    gap: 0,
  },
  hero: {
    backgroundColor: '#EDE9FE',
    borderRadius: uiRadius.xl,
    paddingHorizontal: uiSpacing.lg,
    paddingVertical: uiSpacing.md + 2,
    marginBottom: uiSpacing.lg,
    borderWidth: 1,
    borderColor: '#E4DFFF',
  },
  heroTitle: {
    fontSize: uiTypography.body,
    fontWeight: '800',
    color: uiColors.primaryDeep,
    letterSpacing: -0.2,
  },
  heroSubtitle: {
    marginTop: 6,
    fontSize: uiTypography.caption,
    fontWeight: '500',
    color: uiColors.textMuted,
    lineHeight: 18,
  },
  filterSection: {
    marginBottom: uiSpacing.lg,
  },
  filterLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: uiColors.textSubtle,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 10,
  },
  filterRow: {
    gap: 8,
    paddingRight: 4,
  },
  filterChip: {
    borderRadius: uiRadius.full,
    paddingHorizontal: 16,
    paddingVertical: 9,
  },
  filterChipIdle: {
    backgroundColor: uiColors.surface,
    borderWidth: 1.5,
    borderColor: uiColors.borderSoft,
  },
  filterChipActive: {
    backgroundColor: uiColors.primary,
    borderWidth: 1.5,
    borderColor: uiColors.primaryDeep,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '700',
  },
  filterTextIdle: {
    color: uiColors.textMuted,
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  listHeaderTitle: {
    fontSize: uiTypography.h3,
    fontWeight: '800',
    color: uiColors.text,
  },
  listHeaderBadge: {
    minWidth: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#E8E5FB',
    borderWidth: 1,
    borderColor: uiColors.borderSoft,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  listHeaderBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: uiColors.primaryDeep,
  },
  listWrap: {
    gap: 14,
  },
  bookCard: {
    flexDirection: 'row',
    borderRadius: 22,
    overflow: 'hidden',
    backgroundColor: uiColors.surface,
    borderWidth: 1,
    borderColor: '#E8E6F2',
    ...cardShadow,
  },
  bookCardPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.99 }],
  },
  accentStripe: {
    width: 5,
    alignSelf: 'stretch',
  },
  coverWrap: {
    paddingVertical: 12,
    paddingLeft: 12,
    justifyContent: 'center',
  },
  bookImage: {
    width: 96,
    height: 144,
    borderRadius: 14,
    backgroundColor: uiColors.surfaceMuted,
  },
  bookMain: {
    flex: 1,
    paddingLeft: 12,
    paddingRight: 12,
    paddingVertical: 12,
    justifyContent: 'space-between',
    minHeight: 156,
  },
  bookTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
  },
  titleBlock: {
    flex: 1,
    minWidth: 0,
  },
  categoryPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: uiRadius.full,
    backgroundColor: uiColors.surface,
    borderWidth: 1,
    marginBottom: 6,
    maxWidth: '100%',
  },
  categoryPillText: {
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  bookTitle: {
    color: uiColors.text,
    fontSize: uiTypography.body,
    fontWeight: '800',
    lineHeight: 22,
    letterSpacing: -0.2,
  },
  bookAuthor: {
    marginTop: 4,
    color: uiColors.textMuted,
    fontSize: 13,
    fontWeight: '500',
  },
  bookmarkBtn: {
    padding: 4,
    marginTop: -2,
  },
  bookFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    gap: 8,
  },
  metaGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  ratingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFF8F0',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: uiRadius.sm,
    borderWidth: 1,
    borderColor: '#F5E6D8',
  },
  ratingPillText: {
    color: uiColors.text,
    fontSize: 12,
    fontWeight: '800',
  },
  timePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F0EEFF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: uiRadius.sm,
    borderWidth: 1,
    borderColor: '#E4DFFF',
  },
  timePillText: {
    color: uiColors.primaryDeep,
    fontSize: 12,
    fontWeight: '700',
  },
  chevronWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

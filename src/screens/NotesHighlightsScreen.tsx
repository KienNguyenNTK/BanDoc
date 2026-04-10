import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from '../navigation/AppNavigator';
import SegmentedTabs from '../components/SegmentedTabs';
import { Screen, TopBar } from '../components/ui';
import { uiColors, uiRadius, uiSpacing, uiTypography } from '../theme/ui';
import { getInsight, getSummaryById, listNotesForHighlights, resolveNoteCoverSource } from '../data';

type NotesHighlightsNavigationProp = StackNavigationProp<RootStackParamList, 'NotesHighlights'>;

type NotesHighlightsScreenProps = {
  navigation: NotesHighlightsNavigationProp;
};

type FilterTab = 'all' | 'highlight' | 'note' | 'quote';

const TAB_LABELS: Array<{ key: FilterTab; label: string }> = [
  { key: 'all', label: 'Tất cả' },
  { key: 'highlight', label: 'Đánh dấu' },
  { key: 'note', label: 'Ghi chú' },
  { key: 'quote', label: 'Trích dẫn' },
];

export default function NotesHighlightsScreen({ navigation }: NotesHighlightsScreenProps) {
  const [activeTab, setActiveTab] = React.useState<FilterTab>('all');
  const items = React.useMemo(() => listNotesForHighlights(), []);

  const filteredItems = React.useMemo(() => {
    if (activeTab === 'all') {
      return items;
    }

    return items.filter((item) => item.type === activeTab);
  }, [activeTab, items]);

  return (
    <Screen mode="static" edges={['top']} contentStyle={styles.screenContent}>
      <TopBar
        title="Ghi chú và đánh dấu"
        onBack={() => navigation.goBack()}
        tone="primary"
        right={
          <Pressable style={styles.iconBtn}>
            <MaterialIcons name="more-vert" size={22} color="#667085" />
          </Pressable>
        }
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <SegmentedTabs value={activeTab} options={TAB_LABELS} onChange={setActiveTab} />

        <View style={styles.feedList}>
          {filteredItems.map((item) => {
            const typeColor = item.type === 'highlight' ? '#5341CD' : item.type === 'note' ? '#AC5D00' : '#006B55';
            const summary = getSummaryById(item.summaryId);
            const insight = summary && item.insightId ? getInsight(summary, item.insightId) : undefined;
            const bookTitle = summary?.title ?? 'Tóm tắt';
            const insightLine = insight ? `Ý chính ${String(insight.index).padStart(2, '0')}: ${insight.title}` : '';
            const coverSource = resolveNoteCoverSource(item) ?? require('../assets/library/continue-reading.jpg');

            return (
              <View key={item.id} style={styles.card}>
                <View style={styles.cardTopMeta}>
                  <View style={styles.metaLeft}>
                    <Image source={coverSource} style={styles.cover} />
                    <View>
                      <Text style={[styles.typeLabel, { color: typeColor }]}>{item.type.toUpperCase()}</Text>
                      <Text style={styles.timeLabel}>{item.timeLabel}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.excerptArea}>
                  {item.title ? <Text style={styles.noteTitle}>{item.title}</Text> : null}

                  {item.type === 'quote' ? (
                    <View style={styles.quoteWrap}>
                      <Text style={styles.quoteMark}>“</Text>
                      <Text style={styles.quoteText}>{item.excerpt}</Text>
                    </View>
                  ) : (
                    <Text style={styles.excerptText}>{item.excerpt}</Text>
                  )}
                </View>

                <View style={styles.bookInfoWrap}>
                  <MaterialIcons name="menu-book" size={16} color="#5F6071" />
                  <Text style={styles.bookInfoText}>{bookTitle}</Text>
                </View>
                {insightLine ? <Text style={styles.insightLine} numberOfLines={1}>{insightLine}</Text> : null}

                <View style={styles.actionRow}>
                  <Pressable
                    style={styles.secondaryBtn}
                    onPress={() =>
                      navigation.navigate('BookDetail', {
                        summaryId: item.summaryId,
                      })
                    }
                  >
                    <Text style={styles.secondaryBtnText}>Mở tóm tắt</Text>
                  </Pressable>

                  <Pressable
                    style={styles.secondaryBtn}
                    onPress={() =>
                      navigation.navigate('InsightDetail', {
                        personalNote: item.excerpt,
                        summaryId: item.summaryId,
                        insightId: item.insightId,
                      })
                    }
                  >
                    <Text style={styles.secondaryBtnText}>Ý chính liên quan</Text>
                  </Pressable>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      <Pressable style={styles.fab}>
        <MaterialIcons name="add" size={30} color="#FFFFFF" />
      </Pressable>
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
    paddingTop: 10,
    paddingBottom: 100,
    gap: 16,
  },
  feedList: {
    gap: 14,
  },
  card: {
    borderRadius: 18,
    backgroundColor: uiColors.surface,
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  cardTopMeta: {
    marginBottom: 10,
  },
  metaLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cover: {
    width: 44,
    height: 62,
    borderRadius: 6,
    backgroundColor: '#E9EAF1',
  },
  typeLabel: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.1,
  },
  timeLabel: {
    marginTop: 2,
    color: uiColors.textSubtle,
    fontSize: 13,
    fontWeight: '500',
  },
  excerptArea: {
    gap: 8,
  },
  noteTitle: {
    color: uiColors.text,
    fontSize: 19,
    fontWeight: '700',
    lineHeight: 24,
  },
  excerptText: {
    color: uiColors.text,
    fontSize: 15.83,
    lineHeight: 25,
    fontWeight: '500',
  },
  quoteWrap: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    paddingRight: 4,
  },
  quoteMark: {
    color: '#B9B7C9',
    fontSize: 34,
    lineHeight: 28,
    marginTop: -2,
  },
  quoteText: {
    flex: 1,
    color: uiColors.text,
    fontSize: 15.83,
    lineHeight: 25,
    fontWeight: '500',
    fontStyle: 'italic',
  },
  bookInfoWrap: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#ECECF2',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bookInfoText: {
    color: '#3E3F50',
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
  },
  insightLine: {
    marginTop: 6,
    color: '#787586',
    fontSize: 12,
    fontWeight: '600',
  },
  actionRow: {
    marginTop: 12,
    flexDirection: 'row',
    gap: 10,
  },
  secondaryBtn: {
    flex: 1,
    minHeight: 46,
    borderRadius: uiRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F3F7',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  secondaryBtnText: {
    color: uiColors.primaryDeep,
    fontSize: uiTypography.bodySm,
    fontWeight: '700',
  },
  fab: {
    position: 'absolute',
    right: 22,
    bottom: 26,
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: '#6C5CE7',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
});

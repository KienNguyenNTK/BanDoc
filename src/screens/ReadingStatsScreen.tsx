import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from '../navigation/AppNavigator';
import { uiColors, uiSpacing } from '../theme/ui';

type ReadingStatsNavigationProp = StackNavigationProp<RootStackParamList, 'ReadingStats'>;
type TimeRange = 'week' | 'month' | 'year' | 'all';

type ReadingStatsScreenProps = {
  navigation: ReadingStatsNavigationProp;
};

const DAYS = [
  { key: 'T2', h: 0.5, active: false },
  { key: 'T3', h: 0.66, active: false },
  { key: 'T4', h: 1, active: true },
  { key: 'T5', h: 0.75, active: false },
  { key: 'T6', h: 0.32, active: false },
  { key: 'T7', h: 0.25, active: false },
  { key: 'CN', h: 0.5, active: false },
];

const TOPICS = [
  { name: 'Tâm lý học', percent: 35, color: '#5341CD' },
  { name: 'Lịch sử', percent: 25, color: '#006B55' },
  { name: 'Kinh doanh', percent: 20, color: '#6C5CE7' },
  { name: 'Khoa học', percent: 20, color: '#C8C4D7' },
];

export default function ReadingStatsScreen({ navigation }: ReadingStatsScreenProps) {
  const [range, setRange] = React.useState<TimeRange>('week');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable style={styles.iconBtn} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color="#5341CD" />
          </Pressable>
          <Text style={styles.headerTitle}>Thống kê đọc</Text>
        </View>
        <Pressable style={styles.iconBtn}>
          <MaterialIcons name="share" size={22} color="#5341CD" />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.rangeWrap}>
          {[
            { key: 'week' as const, label: 'Tuần' },
            { key: 'month' as const, label: 'Tháng' },
            { key: 'year' as const, label: 'Năm' },
            { key: 'all' as const, label: 'Tất cả' },
          ].map((item) => {
            const active = range === item.key;
            return (
              <Pressable
                key={item.key}
                onPress={() => setRange(item.key)}
                style={[styles.rangeItem, active ? styles.rangeItemActive : undefined]}
              >
                <Text style={[styles.rangeText, active ? styles.rangeTextActive : undefined]}>{item.label}</Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.summaryGrid}>
          <View style={styles.summaryCard}>
            <View style={[styles.summaryIcon, styles.summaryIconPurple]}>
              <MaterialIcons name="schedule" size={20} color="#5341CD" />
            </View>
            <Text style={styles.summaryValue}>245</Text>
            <Text style={styles.summaryLabel}>PHÚT ĐÃ ĐỌC</Text>
          </View>

          <View style={styles.summaryCard}>
            <View style={[styles.summaryIcon, styles.summaryIconGreen]}>
              <MaterialIcons name="headphones" size={20} color="#006B55" />
            </View>
            <Text style={styles.summaryValue}>180</Text>
            <Text style={styles.summaryLabel}>PHÚT ĐÃ NGHE</Text>
          </View>

          <View style={styles.summaryCard}>
            <View style={[styles.summaryIcon, styles.summaryIconOrange]}>
              <MaterialIcons name="auto-stories" size={20} color="#AC5D00" />
            </View>
            <Text style={styles.summaryValue}>18</Text>
            <Text style={styles.summaryLabel}>TÓM TẮT ĐÃ ĐỌC</Text>
          </View>

          <View style={styles.summaryCard}>
            <View style={[styles.summaryIcon, styles.summaryIconIndigo]}>
              <MaterialIcons name="lightbulb" size={20} color="#6C5CE7" />
            </View>
            <Text style={styles.summaryValue}>42</Text>
            <Text style={styles.summaryLabel}>Ý CHÍNH ĐÃ ĐỌC</Text>
          </View>
        </View>

        <View style={styles.cardLarge}>
          <View style={styles.cardLargeHead}>
            <Text style={styles.cardLargeTitle}>Hoạt động theo tuần</Text>
            <Text style={styles.cardLargeSub}>14/08 - 20/08</Text>
          </View>

          <View style={styles.chartBarsRow}>
            {DAYS.map((d) => (
              <View key={d.key} style={styles.chartCol}>
                <View
                  style={[
                    styles.chartBar,
                    { height: `${Math.max(10, d.h * 100)}%` },
                    d.active ? styles.chartBarActive : undefined,
                  ]}
                />
              </View>
            ))}
          </View>

          <View style={styles.chartLabelsRow}>
            {DAYS.map((d) => (
              <View key={`${d.key}-label`} style={styles.chartLabelCol}>
                <Text style={[styles.chartLabel, d.active ? styles.chartLabelActive : undefined]}>{d.key}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.chartHint}>Bạn hoạt động tích cực nhất vào Thứ 4.</Text>
        </View>

        <View style={styles.cardLarge}>
          <View style={styles.streakHead}>
            <View>
              <Text style={styles.metaCap}>Chuỗi hiện tại</Text>
              <Text style={styles.metaValuePrimary}>7 ngày</Text>
            </View>
            <View style={styles.bestWrap}>
              <Text style={styles.metaCap}>Kỷ lục tốt nhất</Text>
              <Text style={styles.metaValue}>14 ngày</Text>
            </View>
          </View>

          <View style={styles.streakRow}>
            {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((day, idx) => (
              <React.Fragment key={day}>
                <View style={styles.dayWrap}>
                  <Text style={styles.dayLabel}>{day}</Text>
                  <View style={styles.dayDot}>
                    <MaterialIcons name="check" size={16} color="#FFFFFF" />
                  </View>
                </View>
                {idx < 6 ? <View style={styles.dayLine} /> : null}
              </React.Fragment>
            ))}
          </View>
        </View>

        <View style={styles.topicCard}>
          <Text style={styles.cardLargeTitle}>Phân bổ chủ đề</Text>
          <View style={styles.topicList}>
            {TOPICS.map((topic) => (
              <View key={topic.name} style={styles.topicItem}>
                <View style={styles.topicHead}>
                  <Text style={styles.topicName}>{topic.name}</Text>
                  <Text style={styles.topicPercent}>{topic.percent}%</Text>
                </View>
                <View style={styles.topicTrack}>
                  <View style={[styles.topicFill, { width: `${topic.percent}%`, backgroundColor: topic.color }]} />
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.aiCard}>
          <View style={styles.aiIconWrap}>
            <MaterialIcons name="auto-awesome" size={32} color="#FFFFFF" />
          </View>
          <Text style={styles.aiTitle}>Tháng này bạn đọc rất tốt!</Text>
          <Text style={styles.aiDesc}>
            Bạn đã đọc 6 bản tóm tắt trong tháng và duy trì chuỗi 7 ngày. Thời gian phù hợp nhất của bạn là buổi tối.
          </Text>
          <Pressable style={styles.aiBtn}>
            <Text style={styles.aiBtnText}>Tiếp tục đọc</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: uiColors.background },
  header: {
    height: 60,
    paddingHorizontal: uiSpacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  iconBtn: {
    width: 34,
    height: 34,
    borderRadius: 99,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: { color: '#191C1F', fontSize: 18, fontWeight: '700' },
  content: { paddingHorizontal: uiSpacing.lg, paddingTop: 8, paddingBottom: 28, gap: 14 },
  rangeWrap: {
    backgroundColor: '#F2F3F7',
    borderRadius: 12,
    padding: 4,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  rangeItem: { flex: 1, height: 38, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  rangeItemActive: { backgroundColor: '#FFFFFF' },
  rangeText: { color: '#66657A', fontSize: 13, fontWeight: '500' },
  rangeTextActive: { color: '#5341CD', fontWeight: '700' },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 10,
  },
  summaryCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 8,
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  summaryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryIconPurple: { backgroundColor: '#5341CD20' },
  summaryIconGreen: { backgroundColor: '#006B5520' },
  summaryIconOrange: { backgroundColor: '#AC5D0020' },
  summaryIconIndigo: { backgroundColor: '#6C5CE720' },
  summaryValue: { color: '#191C1F', fontSize: 23.33, fontWeight: '800' },
  summaryLabel: { color: '#66657A', fontSize: 11, fontWeight: '600', letterSpacing: 0.4 },
  cardLarge: { backgroundColor: '#FFFFFF', borderRadius: 24, paddingHorizontal: uiSpacing.lg, paddingVertical: 16 },
  cardLargeHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 12 },
  cardLargeTitle: { color: '#191C1F', fontSize: 15.83, fontWeight: '700' },
  cardLargeSub: { color: '#787586', fontSize: 11, fontWeight: '600', letterSpacing: 0.7 },
  chartBarsRow: {
    height: 110,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 6,
    marginTop: 4,
  },
  chartCol: {
    flex: 1,
    height: '100%',
    justifyContent: 'flex-end',
  },
  chartBar: { width: '100%', backgroundColor: '#E1E2E6', borderTopLeftRadius: 12, borderTopRightRadius: 12 },
  chartBarActive: { backgroundColor: '#6C5CE7' },
  chartLabelsRow: {
    marginTop: 8,
    flexDirection: 'row',
    gap: 6,
  },
  chartLabelCol: {
    flex: 1,
    alignItems: 'center',
  },
  chartLabel: { color: '#787586', fontSize: 10, fontWeight: '500' },
  chartLabelActive: { color: '#5341CD', fontWeight: '700' },
  chartHint: { marginTop: 8, color: '#474554', fontSize: 14, fontWeight: '500' },
  streakHead: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  metaCap: { color: '#787586', fontSize: 11, fontWeight: '600', letterSpacing: 0.5, textTransform: 'uppercase' },
  metaValuePrimary: { color: '#5341CD', fontSize: 25, fontWeight: '800', marginTop: 2 },
  bestWrap: { alignItems: 'flex-end' },
  metaValue: { color: '#191C1F', fontSize: 25, fontWeight: '700', marginTop: 2 },
  streakRow: {
    backgroundColor: '#F2F3F7',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  dayWrap: { alignItems: 'center', gap: 4 },
  dayLabel: { color: '#787586', fontSize: 10, fontWeight: '600' },
  dayDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#5341CD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayLine: { width: 8, height: 2, backgroundColor: '#5341CD' },
  topicCard: { backgroundColor: '#F2F3F7', borderRadius: 24, paddingHorizontal: uiSpacing.lg, paddingVertical: 16, gap: 12 },
  topicList: { gap: 14 },
  topicItem: { gap: 6 },
  topicHead: { flexDirection: 'row', justifyContent: 'space-between' },
  topicName: { color: '#191C1F', fontSize: 15, fontWeight: '600' },
  topicPercent: { color: '#66657A', fontSize: 14, fontWeight: '500' },
  topicTrack: { height: 8, borderRadius: 99, backgroundColor: '#E1E2E6', overflow: 'hidden' },
  topicFill: { height: '100%', borderRadius: 99 },
  aiCard: {
    borderRadius: 24,
    backgroundColor: '#5341CD',
    paddingHorizontal: 18,
    paddingVertical: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  aiIconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFFFFF30',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  aiTitle: { color: '#FFFFFF', fontSize: 20, fontWeight: '800', textAlign: 'center' },
  aiDesc: {
    marginTop: 8,
    color: '#E8E2FF',
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
  },
  aiBtn: {
    marginTop: 14,
    width: '100%',
    height: 48,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  aiBtnText: { color: '#5341CD', fontSize: 16, fontWeight: '700' },
});
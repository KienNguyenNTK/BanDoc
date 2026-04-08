import React from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from '../navigation/AppNavigator';
import { uiColors, uiSpacing } from '../theme/ui';

type TranslatorChaptersNavigationProp = StackNavigationProp<RootStackParamList, 'TranslatorChapters'>;

type TranslatorChaptersScreenProps = {
  navigation: TranslatorChaptersNavigationProp;
};

type ChapterFilter = 'all' | 'in-progress' | 'translated' | 'revision' | 'not-started';

export default function TranslatorChaptersScreen({ navigation }: TranslatorChaptersScreenProps) {
  const [activeFilter, setActiveFilter] = React.useState<ChapterFilter>('all');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable style={styles.iconBtn} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={22} color="#64748B" />
          </Pressable>
          <Text style={styles.headerTitle}>Các chương</Text>
        </View>
        <Pressable style={styles.iconBtn}>
          <MaterialIcons name="more-vert" size={21} color="#64748B" />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.projectContext}>
          <Text style={styles.projectSubtitle}>PHỤ ĐỀ DỰ ÁN</Text>
          <Text style={styles.projectTitle}>The Shadow over Innsmouth</Text>
        </View>

        <View style={styles.overviewCard}>
          <Text style={styles.overviewLabel}>TỔNG QUAN DỰ ÁN</Text>
          <View style={styles.overviewGrid}>
            <View style={styles.overviewItem}>
              <Text style={styles.overviewItemLabel}>Tổng</Text>
              <Text style={styles.overviewItemValue}>24</Text>
            </View>
            <View style={styles.overviewItem}>
              <Text style={styles.overviewItemLabel}>Đã dịch</Text>
              <Text style={[styles.overviewItemValue, styles.valueSecondary]}>12</Text>
            </View>
            <View style={styles.overviewItem}>
              <Text style={styles.overviewItemLabel}>Đang làm</Text>
              <Text style={[styles.overviewItemValue, styles.valuePrimary]}>4</Text>
            </View>
            <View style={styles.overviewItem}>
              <Text style={styles.overviewItemLabel}>Cần sửa</Text>
              <Text style={[styles.overviewItemValue, styles.valueError]}>2</Text>
            </View>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
          {[
            ['all', 'Tất cả'],
            ['in-progress', 'Đang làm'],
            ['translated', 'Đã dịch'],
            ['revision', 'Cần sửa'],
            ['not-started', 'Chưa bắt đầu'],
          ].map(([id, label]) => {
            const selected = activeFilter === id;
            return (
              <Pressable
                key={id}
                style={[styles.filterBtn, selected ? styles.filterBtnActive : styles.filterBtnDefault]}
                onPress={() => setActiveFilter(id as ChapterFilter)}
              >
                <Text style={[styles.filterText, selected ? styles.filterTextActive : styles.filterTextDefault]}>{label}</Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={styles.continueCardWrap}>
          <View style={styles.continueCardInner}>
            <View style={styles.continueTopRow}>
              <View style={styles.draftingTag}><Text style={styles.draftingText}>BẢN NHÁP</Text></View>
              <Text style={styles.lastEdited}>Sửa lần cuối: 2h trước</Text>
            </View>
            <Text style={styles.continueTitle}>Chương 13: Nghi thức</Text>
            <Pressable style={styles.continueBtn} onPress={() => navigation.navigate('TranslatorChapterSource')}>
              <Text style={styles.continueBtnText}>Tiếp tục làm việc</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.listSection}>
          <Text style={styles.listTitle}>Danh sách chương</Text>

          <View style={styles.chapterCard}>
            <View>
              <Text style={styles.chapterName}>Chương 12: Cuộc chạm trán đầu tiên</Text>
              <View style={styles.chapterMetaRow}>
                <Text style={styles.translatedTag}>ĐÃ DỊCH</Text>
                <View style={styles.graphSyncedWrap}>
                  <MaterialIcons name="sync" size={13} color="#787586" />
                  <Text style={styles.graphSyncedText}>Đã đồng bộ sơ đồ</Text>
                </View>
              </View>
            </View>
            <Pressable style={styles.reviewBtn} onPress={() => navigation.navigate('TranslatorChapterSource')}>
              <Text style={styles.reviewBtnText}>Xem lại</Text>
            </Pressable>
          </View>

          <View style={styles.chapterCard}>
            <View>
              <Text style={styles.chapterName}>Chương 14: Những kẻ từ vực sâu</Text>
              <Text style={styles.notStartedTag}>CHƯA BẮT ĐẦU</Text>
            </View>
            <Pressable style={styles.startBtn} onPress={() => navigation.navigate('TranslatorChapterSource')}>
              <Text style={styles.startBtnText}>Bắt đầu dịch</Text>
            </Pressable>
          </View>

          <View style={styles.chapterCard}>
            <View>
              <Text style={styles.chapterName}>Chương 11: Zadok Allen</Text>
              <Text style={styles.revisionTag}>CẦN CHỈNH SỬA</Text>
            </View>
            <Pressable style={styles.reopenBtn} onPress={() => navigation.navigate('TranslatorChapterTranslation')}>
              <Text style={styles.reopenBtnText}>Mở lại</Text>
            </Pressable>
          </View>
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
  iconBtn: { width: 34, height: 34, borderRadius: 99, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { color: '#191C1F', fontSize: 18, fontWeight: '700' },
  content: { paddingHorizontal: uiSpacing.lg, paddingTop: 8, paddingBottom: 24, gap: 14 },
  projectContext: { gap: 2 },
  projectSubtitle: { color: '#5341CD', fontSize: 11, fontWeight: '700', letterSpacing: 1.5 },
  projectTitle: { color: '#191C1F', fontSize: 23.33, fontWeight: '700' },
  overviewCard: {
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderWidth: 1,
    borderColor: '#EDF0F6',
  },
  overviewLabel: { color: '#787586', fontSize: 11, fontWeight: '800', letterSpacing: 1.4, marginBottom: 12 },
  overviewGrid: { flexDirection: 'row', flexWrap: 'wrap', rowGap: 10 },
  overviewItem: { width: '50%' },
  overviewItemLabel: { color: '#474554', fontSize: 12 },
  overviewItemValue: { color: '#191C1F', fontSize: 21.67, fontWeight: '800' },
  valueSecondary: { color: '#006B55' },
  valuePrimary: { color: '#5341CD' },
  valueError: { color: '#BA1A1A' },
  filterRow: { gap: 8, paddingRight: 8 },
  filterBtn: {
    minHeight: 36,
    borderRadius: 999,
    paddingHorizontal: uiSpacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  filterBtnActive: { backgroundColor: '#6C5CE7', borderColor: '#6C5CE7' },
  filterBtnDefault: { backgroundColor: '#FFFFFF', borderColor: '#D6D4E3' },
  filterText: { fontSize: 13, fontWeight: '600' },
  filterTextActive: { color: '#FFFFFF' },
  filterTextDefault: { color: '#474554' },
  continueCardWrap: {
    borderRadius: 22,
    backgroundColor: '#5D4AD6',
    padding: 2,
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  continueCardInner: { borderRadius: 20, padding: 16, backgroundColor: '#5D4AD6' },
  continueTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  draftingTag: { backgroundColor: '#FFFFFF33', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 5 },
  draftingText: { color: '#FFFFFF', fontSize: 11, fontWeight: '800', letterSpacing: 1 },
  lastEdited: { color: '#E7E2FF', fontSize: 12 },
  continueTitle: { marginTop: 10, color: '#FFFFFF', fontSize: 23.33, fontWeight: '800' },
  continueBtn: {
    marginTop: 14,
    minHeight: 46,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  continueBtnText: { color: '#5341CD', fontSize: 14, fontWeight: '800' },
  listSection: { gap: 10 },
  listTitle: { color: '#66657A', fontSize: 13, fontWeight: '700', paddingHorizontal: 4 },
  chapterCard: {
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderWidth: 1,
    borderColor: '#EEF0F6',
    gap: 10,
  },
  chapterName: { color: '#191C1F', fontSize: 14.17, fontWeight: '700' },
  chapterMetaRow: { marginTop: 5, flexDirection: 'row', alignItems: 'center', gap: 8 },
  translatedTag: {
    color: '#00725B',
    backgroundColor: '#DDF8EE',
    fontSize: 10,
    fontWeight: '800',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  graphSyncedWrap: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  graphSyncedText: { color: '#787586', fontSize: 11, fontWeight: '600' },
  notStartedTag: {
    marginTop: 5,
    color: '#5B5A6E',
    backgroundColor: '#ECEEF4',
    fontSize: 10,
    fontWeight: '800',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
    overflow: 'hidden',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  revisionTag: {
    marginTop: 5,
    color: '#93000A',
    backgroundColor: '#FFDAD6',
    fontSize: 10,
    fontWeight: '800',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
    overflow: 'hidden',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  reviewBtn: {
    minHeight: 42,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#5341CD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewBtnText: { color: '#5341CD', fontSize: 13, fontWeight: '800' },
  startBtn: {
    minHeight: 42,
    borderRadius: 12,
    backgroundColor: '#5341CD',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  startBtnText: { color: '#FFFFFF', fontSize: 13, fontWeight: '800' },
  reopenBtn: {
    minHeight: 42,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#BA1A1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reopenBtnText: { color: '#BA1A1A', fontSize: 13, fontWeight: '800' },
});

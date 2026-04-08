import React from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from '../navigation/AppNavigator';
import { uiColors, uiSpacing } from '../theme/ui';

type TranslatorChapterSourceNavigationProp = StackNavigationProp<RootStackParamList, 'TranslatorChapterSource'>;

type TranslatorChapterSourceScreenProps = {
  navigation: TranslatorChapterSourceNavigationProp;
};

export default function TranslatorChapterSourceScreen({ navigation }: TranslatorChapterSourceScreenProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerWrap}>
        <View style={styles.headerTop}>
          <View style={styles.headerLeft}>
            <Pressable style={styles.iconBtn} onPress={() => navigation.goBack()}>
              <MaterialIcons name="arrow-back" size={23} color="#5341CD" />
            </Pressable>
            <View>
              <Text style={styles.chapterTitle}>Chương 12: Cuộc chạm trán đầu tiên</Text>
              <Text style={styles.bookName}>The Shadow over Innsmouth</Text>
            </View>
          </View>
          <View style={styles.badge}><Text style={styles.badgeText}>BẢN NHÁP</Text></View>
        </View>

        <View style={styles.tabsRow}>
          <Pressable style={[styles.tabBtn, styles.tabBtnActive]}>
            <Text style={[styles.tabText, styles.tabTextActive]}>Nguồn</Text>
          </Pressable>
          <Pressable style={styles.tabBtn} onPress={() => navigation.navigate('TranslatorChapterTranslation')}>
            <Text style={styles.tabText}>Bản dịch</Text>
          </Pressable>
          <Pressable style={styles.tabBtn} onPress={() => navigation.navigate('TranslatorChapterGraph')}>
            <Text style={styles.tabText}>Sơ đồ</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsRow}>
          {['Hỏi về đoạn này', 'Giải thích giọng văn', 'Tra thuật ngữ', 'Mở sơ đồ'].map((label) => (
            <Pressable key={label} style={styles.helperChip}>
              <Text style={styles.helperChipText}>{label}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.sourceCard}>
          <View style={styles.sourceCardHead}>
            <Text style={styles.sourceLabel}>VĂN BẢN GỐC</Text>
            <View style={styles.arrowRow}>
              <MaterialIcons name="chevron-left" size={22} color="#B0AEC0" />
              <MaterialIcons name="chevron-right" size={22} color="#B0AEC0" />
            </View>
          </View>

          <Text style={styles.sourceParagraph}>
            The shadow of the chimney fell across the cobblestones, elongated and distorted by the setting sun. I stood there, my breath hitching in the damp evening air, watching the silhouette of the Gilman House loom against the bruised purple sky. There was a rhythm to the silence here - a heavy, pulsating quiet that felt more like a presence than an absence of sound.
          </Text>
          <Text style={styles.sourceParagraph}>
            Innsmouth was not merely a town in decay; it was a town in retreat. Every shuttered window and rotting wharf seemed to pull back from the light, as if guarding secrets that had festered in the salt spray for generations. As I approached the main square, the smell hit me again - the inescapable, briny stench of something that had been pulled from the deepest trenches of the Atlantic and left to wither in the sun.
          </Text>
          <Text style={styles.sourceParagraph}>
            I could feel eyes upon me. Not the curious eyes of a small-town resident, but the cold, lidless gaze of a predator watching from the safety of the dark. The "Innsmouth Look" was more than a physical deformity; it was a mark of belonging to a heritage I was only beginning to understand.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.bottomPanel}>
        <Pressable style={styles.askBar}>
          <View style={styles.askIcon}><MaterialIcons name="auto-awesome" size={18} color="#5341CD" /></View>
          <Text style={styles.askText}>Hỏi sơ đồ về đoạn văn này...</Text>
          <MaterialIcons name="arrow-forward" size={18} color="#B0AEC0" />
        </Pressable>

        <Pressable style={styles.goBtn} onPress={() => navigation.navigate('TranslatorChapterTranslation')}>
          <Text style={styles.goBtnText}>Chuyển sang bản dịch</Text>
          <MaterialIcons name="translate" size={18} color="#FFFFFF" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: uiColors.background },
  headerWrap: { paddingHorizontal: uiSpacing.lg, paddingTop: 8, paddingBottom: 6 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1, paddingRight: 8 },
  iconBtn: { width: 34, height: 34, borderRadius: 99, alignItems: 'center', justifyContent: 'center' },
  chapterTitle: { color: '#191C1F', fontSize: 19.17, fontWeight: '700' },
  bookName: { color: '#516582', fontSize: 14, fontWeight: '600' },
  badge: { backgroundColor: '#E8E6FA', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6 },
  badgeText: { color: '#5341CD', fontSize: 12, fontWeight: '700', letterSpacing: 1.2 },
  tabsRow: { marginTop: 12, flexDirection: 'row', gap: 8 },
  tabBtn: { flex: 1, minHeight: 54, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  tabBtnActive: { backgroundColor: '#E7E6F9' },
  tabText: { color: '#2D3A4D', fontSize: 16.67, fontWeight: '500' },
  tabTextActive: { color: '#5341CD', fontWeight: '700' },
  content: { paddingHorizontal: uiSpacing.lg, paddingBottom: 180, gap: 14 },
  chipsRow: { gap: 8, paddingBottom: 6, paddingTop: 2 },
  helperChip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#D9D7E7',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    minHeight: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  helperChipText: { color: '#474554', fontSize: 14, fontWeight: '500' },
  sourceCard: {
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#ECECF2',
    paddingHorizontal: uiSpacing.lg,
    paddingVertical: 14,
    gap: 14,
  },
  sourceCardHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sourceLabel: { color: '#787586', fontSize: 11, fontWeight: '800', letterSpacing: 1.5 },
  arrowRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  sourceParagraph: { color: '#191C1F', fontSize: 15.83, lineHeight: 28.33, fontWeight: '500' },
  bottomPanel: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: uiSpacing.lg,
    paddingTop: 12,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#E3E5EC',
    backgroundColor: '#FFFFFFF0',
    gap: 10,
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  askBar: {
    minHeight: 48,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#E5E6ED',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  askIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#F1EEFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  askText: { flex: 1, color: '#66657A', fontSize: 12.5 },
  goBtn: {
    minHeight: 52,
    borderRadius: 14,
    backgroundColor: '#5D4AD6',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  goBtnText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
});

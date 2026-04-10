import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Screen, TopBar, TopTabs } from '../components/ui';
import { uiSpacing } from '../theme/ui';

type TranslatorChapterTranslationNavigationProp = StackNavigationProp<RootStackParamList, 'TranslatorChapterTranslation'>;

type TranslatorChapterTranslationScreenProps = {
  navigation: TranslatorChapterTranslationNavigationProp;
};

export default function TranslatorChapterTranslationScreen({ navigation }: TranslatorChapterTranslationScreenProps) {
  return (
    <Screen mode="static" edges={['top']} contentStyle={styles.screenContent}>
      <TopBar
        title="Chương 12: Cuộc chạm trán đầu tiên"
        subtitle="The Shadow over Innsmouth"
        badgeText="BẢN NHÁP"
        onBack={() => navigation.goBack()}
        tone="primary"
      />
      <TopTabs
        value="translation"
        options={[
          { key: 'source', label: 'Nguồn' },
          { key: 'translation', label: 'Bản dịch' },
          { key: 'graph', label: 'Sơ đồ' },
        ]}
        onChange={(key) => {
          if (key === 'source') navigation.navigate('TranslatorChapterSource');
          if (key === 'graph') navigation.navigate('TranslatorChapterGraph');
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsRow}>
          {['Hỏi về chương này', 'Kiểm tra tính nhất quán', 'Lịch sử thuật ngữ'].map((label) => (
            <Pressable key={label} style={styles.helperChip}>
              <Text style={styles.helperChipText}>{label}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.draftCard}>
          <View style={styles.draftHead}>
            <Text style={styles.draftLabel}>BẢN NHÁP</Text>
            <View style={styles.toolsRow}>
              <MaterialIcons name="history-edu" size={20} color="#B0AEC0" />
              <MaterialIcons name="compare-arrows" size={20} color="#B0AEC0" />
              <MaterialIcons name="update" size={20} color="#B0AEC0" />
            </View>
          </View>

          <Text style={styles.referenceParagraph}>
            The Shadow over Innsmouth was always a name whispered in the coastal taverns with a mixture of dread and curiosity. I stood before the Gilman House, its weathered facade leaning dangerously over the cobblestone street like a skeletal giant waiting to collapse.
          </Text>

          <Text style={styles.translationParagraph}>
            La sombra sobre Innsmouth siempre fue un nombre susurrado en las tabernas costeras con una mezcla de pavor y curiosidad. Me detuve ante la Gilman House, cuya fachada desgastada se inclinaba peligrosamente sobre la calle empedrada como un gigante esquelético esperando colapsar.
          </Text>
        </View>

        <View style={styles.excerptCard}>
          <Text style={styles.excerptLabel}>TRÍCH ĐOẠN VĂN BẢN GỐC</Text>
          <Text style={styles.excerptText}>
            "It was a scene of unsettling decay, where the very salt in the air seemed to corrode the memory of better days..."
          </Text>
          <Pressable style={styles.viewSourceBtn} onPress={() => navigation.navigate('TranslatorChapterSource')}>
            <Text style={styles.viewSourceText}>XEM BẢN GỐC</Text>
            <MaterialIcons name="open-in-new" size={14} color="#5341CD" />
          </Pressable>
        </View>
      </ScrollView>

      <View style={styles.bottomPanel}>
        <Pressable style={styles.askBar}>
          <View style={styles.askIcon}><MaterialIcons name="auto-awesome" size={18} color="#5341CD" /></View>
          <Text style={styles.askText}>Hỏi sơ đồ về chương này...</Text>
          <MaterialIcons name="arrow-forward" size={18} color="#B0AEC0" />
        </Pressable>

        <View style={styles.actionRow}>
          <Pressable style={styles.saveBtn}>
            <Text style={styles.saveBtnText}>LƯU BẢN NHÁP</Text>
          </Pressable>
          <Pressable style={styles.updateBtn} onPress={() => navigation.navigate('TranslatorChapterGraph')}>
            <Text style={styles.updateBtnText}>CẬP NHẬT SƠ ĐỒ</Text>
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContent: { paddingHorizontal: 0 },
  content: { paddingHorizontal: uiSpacing.lg, paddingBottom: 210, gap: 14 },
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
  draftCard: {
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#ECECF2',
    paddingHorizontal: uiSpacing.lg,
    paddingVertical: 14,
    gap: 12,
  },
  draftHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  draftLabel: { color: '#787586', fontSize: 11, fontWeight: '800', letterSpacing: 1.4 },
  toolsRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  referenceParagraph: {
    color: '#8A8897',
    fontSize: 15,
    lineHeight: 27.5,
    fontStyle: 'italic',
    borderLeftWidth: 2,
    borderLeftColor: '#E6E4F8',
    paddingLeft: 10,
  },
  translationParagraph: { color: '#191C1F', fontSize: 20, lineHeight: 35.83, fontWeight: '500' },
  excerptCard: {
    borderRadius: 20,
    backgroundColor: '#F2F3F7',
    borderWidth: 1,
    borderColor: '#E0E2EA',
    padding: 14,
    gap: 8,
  },
  excerptLabel: { color: '#787586', fontSize: 12, fontWeight: '800', letterSpacing: 1.4 },
  excerptText: { color: '#474554', fontSize: 15, lineHeight: 25.83, fontStyle: 'italic' },
  viewSourceBtn: { marginTop: 2, flexDirection: 'row', alignItems: 'center', gap: 6 },
  viewSourceText: { color: '#5341CD', fontSize: 12, fontWeight: '800', letterSpacing: 1.2 },
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
  actionRow: { flexDirection: 'row', gap: 10 },
  saveBtn: {
    flex: 1,
    minHeight: 52,
    borderRadius: 14,
    backgroundColor: '#E1E2E6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  saveBtnText: { color: '#5341CD', fontSize: 14, fontWeight: '800', letterSpacing: 1 },
  updateBtn: {
    flex: 1.4,
    minHeight: 52,
    borderRadius: 14,
    backgroundColor: '#5D4AD6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  updateBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800', letterSpacing: 1 },
});

import React from 'react';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from '../navigation/AppNavigator';
import { uiColors, uiSpacing } from '../theme/ui';

type TranslatorStudioNavigationProp = StackNavigationProp<RootStackParamList, 'TranslatorStudio'>;

type TranslatorStudioScreenProps = {
  navigation: TranslatorStudioNavigationProp;
};

export default function TranslatorStudioScreen({ navigation }: TranslatorStudioScreenProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable style={styles.iconBtn} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color="#191C1F" />
          </Pressable>
          <Text style={styles.headerTitle}>Xưởng dịch</Text>
        </View>
        <Pressable style={styles.iconBtn} onPress={() => navigation.navigate('Settings')}>
          <MaterialIcons name="settings" size={23} color="#64748B" />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Chào buổi sáng.</Text>
          <Text style={styles.welcomeSub}>
            Quản lý bản dịch, tính nhất quán và bộ nhớ ngữ cảnh cốt truyện.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dự án đang hoạt động</Text>
          <View style={styles.activeCard}>
            <Image source={require('../assets/translator/project-cover.jpg')} style={styles.cover} />

            <View style={styles.projectMetaRow}>
              <Text style={styles.inProgressTag}>ĐANG XỬ LÝ</Text>
              <Text style={styles.dot}>•</Text>
              <Text style={styles.langText}>Anh {'->'} Việt</Text>
            </View>

            <Text style={styles.projectTitle}>The Shadow over Innsmouth</Text>
            <Text style={styles.projectSub}>Chương 12 / 24 • Cập nhật 2 giờ trước</Text>

            <View style={styles.progressWrap}>
              <View style={styles.progressHead}>
                <Text style={styles.progressLabel}>Tiến độ dịch</Text>
                <Text style={styles.progressValue}>62%</Text>
              </View>
              <View style={styles.progressTrack}>
                <View style={styles.progressFill} />
              </View>
            </View>

            <View style={styles.actionRow}>
              <Pressable style={styles.primaryBtn} onPress={() => navigation.navigate('TranslatorChapters')}>
                <Text style={styles.primaryBtnText}>Tiếp tục dịch</Text>
              </Pressable>
              <Pressable style={styles.secondaryBtn} onPress={() => navigation.navigate('TranslatorChapters')}>
                <Text style={styles.secondaryBtnText}>Chi tiết</Text>
              </Pressable>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Bản thảo đã tải lên</Text>
            <Pressable>
              <Text style={styles.seeAll}>Xem tất cả</Text>
            </Pressable>
          </View>

          <Pressable style={styles.uploadCard} onPress={() => navigation.navigate('TranslatorChapters')}>
            <View style={[styles.uploadIconWrap, styles.uploadIconOrange]}>
              <MaterialIcons name="description" size={21} color="#C26900" />
            </View>
            <View style={styles.uploadBody}>
              <Text style={styles.uploadTitle}>Call of Cthulhu - Draft.pdf</Text>
              <Text style={styles.uploadMeta}>12 MB • 15/10/2023</Text>
            </View>
            <Text style={styles.completedTag}>HOÀN TẤT</Text>
          </Pressable>

          <Pressable style={styles.uploadCard} onPress={() => navigation.navigate('TranslatorUploadStatus')}>
            <View style={[styles.uploadIconWrap, styles.uploadIconBlue]}>
              <MaterialIcons name="picture-as-pdf" size={21} color="#346BCE" />
            </View>
            <View style={styles.uploadBody}>
              <Text style={styles.uploadTitle}>Mountains of Madness.epub</Text>
              <Text style={styles.uploadMeta}>8.5 MB • 14/10/2023</Text>
            </View>
            <Text style={styles.pendingTag}>ĐANG CHỜ</Text>
          </Pressable>
        </View>

        <Pressable style={styles.importCard} onPress={() => navigation.navigate('TranslatorPreparing')}>
          <View style={styles.importIconWrap}>
            <MaterialIcons name="upload-file" size={30} color="#6C5CE7" />
          </View>
          <Text style={styles.importTitle}>Nhập bản thảo mới</Text>
          <Text style={styles.importSub}>Hỗ trợ PDF, EPUB hoặc TXT</Text>
          <View style={styles.selectFileBtn}>
            <Text style={styles.selectFileText}>Chọn tệp</Text>
          </View>
        </Pressable>

        <Pressable
          style={styles.askBar}
          onPress={() => navigation.navigate('AskAI', { initialPrompt: 'Hãy kiểm tra tính nhất quán tên nhân vật cho bản thảo này.' })}
        >
          <View style={styles.askIconWrap}>
            <MaterialIcons name="auto-awesome" size={18} color="#5341CD" />
          </View>
          <Text style={styles.askPlaceholder}>Hỏi về bản thảo, thuật ngữ hoặc lore...</Text>
          <MaterialIcons name="arrow-forward" size={20} color="#B0AEC0" />
        </Pressable>
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
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 },
  iconBtn: { width: 34, height: 34, borderRadius: 99, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { color: '#5341CD', fontSize: 16.67, fontWeight: '700' },
  content: { paddingHorizontal: uiSpacing.lg, paddingTop: 8, paddingBottom: 28, gap: 18 },
  welcomeSection: { gap: 4 },
  welcomeTitle: { color: '#191C1F', fontSize: 30, fontWeight: '800' },
  welcomeSub: { color: '#474554', fontSize: 15, lineHeight: 24.17 },
  section: { gap: 10 },
  sectionTitle: { color: '#191C1F', fontSize: 19, fontWeight: '700' },
  activeCard: {
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EEF0F6',
    padding: 14,
    alignItems: 'center',
  },
  cover: { width: 136, height: 188, borderRadius: 14 },
  projectMetaRow: { marginTop: 10, flexDirection: 'row', alignItems: 'center', gap: 6 },
  inProgressTag: {
    backgroundColor: '#DDF8EE',
    color: '#006B55',
    fontSize: 10,
    fontWeight: '700',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  dot: { color: '#C8C4D7', fontSize: 12 },
  langText: { color: '#474554', fontSize: 13, fontWeight: '500' },
  projectTitle: {
    marginTop: 8,
    color: '#191C1F',
    fontSize: 29.38,
    fontWeight: '700',
    textAlign: 'center',
  },
  projectSub: { marginTop: 2, color: '#474554', fontSize: 12.73, textAlign: 'center' },
  progressWrap: { width: '100%', marginTop: 12, gap: 6 },
  progressHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  progressLabel: { color: '#191C1F', fontSize: 14, fontWeight: '600' },
  progressValue: { color: '#5341CD', fontSize: 17, fontWeight: '800' },
  progressTrack: { height: 8, borderRadius: 999, backgroundColor: '#E4E6EE', overflow: 'hidden' },
  progressFill: { width: '62%', height: '100%', backgroundColor: '#6C5CE7', borderRadius: 999 },
  actionRow: { width: '100%', marginTop: 14, flexDirection: 'row', gap: 10 },
  primaryBtn: {
    flex: 1,
    minHeight: 46,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6C5CE7',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  primaryBtnText: { color: '#FFFFFF', fontSize: 14.17, fontWeight: '700' },
  secondaryBtn: {
    minWidth: 92,
    minHeight: 46,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E7E8EC',
    paddingHorizontal: uiSpacing.lg,
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  secondaryBtnText: { color: '#191C1F', fontSize: 14.17, fontWeight: '600' },
  sectionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  seeAll: { color: '#5341CD', fontSize: 14.17, fontWeight: '700' },
  uploadCard: {
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EEF0F6',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  uploadIconWrap: { width: 42, height: 42, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  uploadIconOrange: { backgroundColor: '#FEE7D6' },
  uploadIconBlue: { backgroundColor: '#DDEAFE' },
  uploadBody: { flex: 1 },
  uploadTitle: { color: '#191C1F', fontSize: 14.17, fontWeight: '600' },
  uploadMeta: { marginTop: 1, color: '#6E6C7D', fontSize: 13 },
  completedTag: {
    color: '#006B55',
    backgroundColor: '#DDF8EE',
    fontSize: 10,
    fontWeight: '800',
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 5,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  pendingTag: {
    color: '#757289',
    backgroundColor: '#EEF0F5',
    fontSize: 10,
    fontWeight: '800',
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 5,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  importCard: {
    borderRadius: 20,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#D0CCE5',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingVertical: 22,
    paddingHorizontal: uiSpacing.lg,
  },
  importIconWrap: {
    width: 82,
    height: 82,
    borderRadius: 41,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1EEFF',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  importTitle: { marginTop: 12, color: '#191C1F', fontSize: 18.33, fontWeight: '700' },
  importSub: { marginTop: 3, color: '#474554', fontSize: 13.33 },
  selectFileBtn: {
    marginTop: 14,
    minHeight: 44,
    borderRadius: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6C5CE7',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  selectFileText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
  askBar: {
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EEF0F6',
    minHeight: 56,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  askIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1EEFF',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  askPlaceholder: { flex: 1, color: '#6D6B7A', fontSize: 13.33 },
});

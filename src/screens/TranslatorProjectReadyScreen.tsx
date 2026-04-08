import React from 'react';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from '../navigation/AppNavigator';
import { uiColors, uiSpacing } from '../theme/ui';

type TranslatorProjectReadyNavigationProp = StackNavigationProp<RootStackParamList, 'TranslatorProjectReady'>;

type TranslatorProjectReadyScreenProps = {
  navigation: TranslatorProjectReadyNavigationProp;
};

export default function TranslatorProjectReadyScreen({ navigation }: TranslatorProjectReadyScreenProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable style={styles.iconBtn} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color="#5341CD" />
          </Pressable>
          <Text style={styles.headerTitle}>Dự án sẵn sàng</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.heroWrap}>
          <View style={styles.successIconWrap}>
            <MaterialIcons name="check" size={24} color="#FFFFFF" />
          </View>
          <Text style={styles.successLabel}>THÀNH CÔNG</Text>
        </View>

        <Text style={styles.readyTitle}>Sẵn sàng để dịch.</Text>
        <Text style={styles.readySub}>Bản thảo đã được xử lý và có thể bắt đầu dịch ngay.</Text>

        <View style={styles.fileCard}>
          <View style={styles.fileIconWrap}>
            <MaterialIcons name="description" size={28} color="#6C5CE7" />
          </View>
          <View style={styles.fileBody}>
            <Text style={styles.fileTitle}>The Shadow over Innsmouth.docx</Text>
            <Text style={styles.fileMeta}>DOCX • 1.2 MB</Text>
            <Text style={styles.fileMeta}>Đã tải lên: vừa xong</Text>
            <View style={styles.langPills}>
              <Text style={styles.langPill}>Tiếng Anh</Text>
              <MaterialIcons name="trending-flat" size={20} color="#5341CD" />
              <Text style={styles.langPillActive}>Tiếng Việt</Text>
            </View>
          </View>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <MaterialIcons name="menu-book" size={20} color="#006B55" />
            <Text style={styles.statValue}>24</Text>
            <Text style={styles.statLabel}>Chương đã nhận diện</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialIcons name="groups" size={20} color="#5341CD" />
            <Text style={styles.statValue}>142</Text>
            <Text style={styles.statLabel}>Thực thể tìm thấy</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialIcons name="hub" size={20} color="#9C5200" />
            <Text style={styles.statValue}>Đồng bộ</Text>
            <Text style={styles.statLabel}>Trạng thái sơ đồ</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialIcons name="spellcheck" size={20} color="#4B57E8" />
            <Text style={styles.statValue}>85</Text>
            <Text style={styles.statLabel}>Thuật ngữ xác định</Text>
          </View>
        </View>

        <View style={styles.noteCard}>
          <MaterialIcons name="lightbulb" size={20} color="#884800" />
            <Text style={styles.noteText}>
            <Text style={styles.noteBold}>Gợi ý rà soát:</Text> Nên kiểm tra tách chương tại Chương 12. Thuật ngữ có thể tinh chỉnh bất kỳ lúc nào trong Bảng thuật ngữ.
          </Text>
        </View>

        <View style={styles.previewWrap}>
          <Image source={require('../assets/translator/visual-context.jpg')} style={styles.previewImage} />
          <View style={styles.previewOverlay}>
            <Text style={styles.previewLabel}>NGỮ CẢNH HÌNH ẢNH</Text>
            <Text style={styles.previewText}>"Bóng đè lên Innsmouth" - Không khí Lovecraft</Text>
          </View>
        </View>

        <Pressable
          style={styles.startBtn}
          onPress={() => navigation.navigate('TranslatorChapters')}
        >
          <MaterialIcons name="translate" size={20} color="#FFFFFF" />
          <Text style={styles.startBtnText}>Bắt đầu dịch</Text>
        </Pressable>

        <View style={styles.bottomActions}>
          <Pressable style={styles.smallBtn} onPress={() => navigation.navigate('TranslatorChapters')}>
            <MaterialIcons name="account-tree" size={20} color="#191C1F" />
            <Text style={styles.smallBtnText}>Các chương</Text>
          </Pressable>
          <Pressable style={styles.smallBtn} onPress={() => navigation.navigate('TranslatorChapterGraph')}>
            <MaterialIcons name="auto-graph" size={20} color="#191C1F" />
            <Text style={styles.smallBtnText}>Mở sơ đồ</Text>
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
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 },
  iconBtn: { width: 34, height: 34, borderRadius: 99, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { color: '#191C1F', fontSize: 20.5, fontWeight: '700' },
  content: { paddingHorizontal: uiSpacing.lg, paddingTop: 8, paddingBottom: 24, gap: 14 },
  heroWrap: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  successIconWrap: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6C5CE7',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  successLabel: { color: '#5341CD', fontSize: 15, fontWeight: '700', letterSpacing: 2 },
  readyTitle: { color: '#191C1F', fontSize: 32, fontWeight: '800', lineHeight: 40 },
  readySub: { color: '#474554', fontSize: 18.33, lineHeight: 29.17 },
  fileCard: {
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#ECECF2',
    padding: 14,
    flexDirection: 'row',
    gap: 12,
  },
  fileIconWrap: {
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E7E8EC',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  fileBody: { flex: 1, gap: 2 },
  fileTitle: { color: '#191C1F', fontSize: 21, fontWeight: '700' },
  fileMeta: { color: '#4E4D60', fontSize: 15 },
  langPills: { marginTop: 8, flexDirection: 'row', alignItems: 'center', gap: 8 },
  langPill: {
    color: '#191C1F',
    fontSize: 14,
    fontWeight: '600',
    backgroundColor: '#EEF0F5',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  langPillActive: {
    color: '#006B55',
    fontSize: 14,
    fontWeight: '700',
    backgroundColor: '#6DFAD2',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 10 },
  statCard: {
    width: '48.5%',
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#ECECF2',
    padding: 14,
    gap: 4,
    minHeight: 128,
  },
  statValue: { color: '#191C1F', fontSize: 23, fontWeight: '800' },
  statLabel: { color: '#474554', fontSize: 13.33 },
  noteCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EADACD',
    backgroundColor: '#FFF9F4',
    padding: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  noteText: { color: '#474554', fontSize: 14.17, lineHeight: 25, flex: 1 },
  noteBold: { color: '#191C1F', fontWeight: '700' },
  previewWrap: { borderRadius: 24, overflow: 'hidden', height: 230 },
  previewImage: { width: '100%', height: '100%' },
  previewOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.22)',
  },
  previewLabel: { color: '#FFFFFF', fontSize: 12, fontWeight: '700', letterSpacing: 2, opacity: 0.95 },
  previewText: { color: '#FFFFFF', fontSize: 14.17, fontStyle: 'italic', marginTop: 2 },
  startBtn: {
    minHeight: 60,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5D4AD6',
    flexDirection: 'row',
    gap: 10,
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  startBtnText: { color: '#FFFFFF', fontSize: 18.33, fontWeight: '700' },
  bottomActions: { flexDirection: 'row', gap: 10 },
  smallBtn: {
    flex: 1,
    minHeight: 56,
    borderRadius: 16,
    backgroundColor: '#E7E8EC',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  smallBtnText: { color: '#191C1F', fontSize: 14.17, fontWeight: '600' },
});

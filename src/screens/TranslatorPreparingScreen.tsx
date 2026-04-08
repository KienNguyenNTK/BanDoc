import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from '../navigation/AppNavigator';
import { uiColors, uiSpacing } from '../theme/ui';

type TranslatorPreparingNavigationProp = StackNavigationProp<RootStackParamList, 'TranslatorPreparing'>;

type TranslatorPreparingScreenProps = {
  navigation: TranslatorPreparingNavigationProp;
};

export default function TranslatorPreparingScreen({ navigation }: TranslatorPreparingScreenProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable style={styles.iconBtn} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color="#5341CD" />
          </Pressable>
          <Text style={styles.headerTitle}>Đang chuẩn bị dự án</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={styles.subtitle}>Bản thảo của bạn đang được tải lên và xử lý</Text>

        <View style={styles.fileCard}>
          <View style={styles.fileIconWrap}>
            <MaterialIcons name="description" size={28} color="#6C5CE7" />
          </View>
          <View style={styles.fileBody}>
            <Text style={styles.fileTitle}>The Shadow over Innsmouth.docx</Text>
            <Text style={styles.fileMeta}>DOCX • 1.2 MB • </Text>
            <Text style={styles.fileSuccess}>Upload hoàn tất</Text>
          </View>
        </View>

        <View style={styles.progressCard}>
          <View style={styles.progressHead}>
            <Text style={styles.progressLabel}>TIẾN ĐỘ HIỆN TẠI</Text>
            <Text style={styles.progressValue}>40%</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
          </View>
        </View>

        <View style={styles.stepList}>
          <View style={styles.stepDoneRow}>
            <View style={styles.stepDoneIconWrap}>
              <MaterialIcons name="check-circle" size={18} color="#006B55" />
            </View>
            <View>
              <Text style={styles.stepDoneTitle}>Upload hoàn tất</Text>
              <Text style={styles.stepSub}>Bản thảo đã được lưu an toàn trên cloud</Text>
            </View>
          </View>

          <View style={styles.stepActiveRow}>
            <MaterialIcons name="autorenew" size={22} color="#6C5CE7" />
            <View style={styles.stepActiveTextWrap}>
              <Text style={styles.stepActiveTitle}>Đang tách chương</Text>
              <Text style={styles.stepSub}>Phân tích cấu trúc tài liệu và cảnh</Text>
            </View>
          </View>

          {[
            ['Nhận diện nhân vật và thực thể', 'Xác định nhân vật chính và thuật ngữ'],
            ['Dựng sơ đồ cốt truyện ban đầu', 'Ánh xạ quan hệ để AI hiểu ngữ cảnh'],
            ['Chuẩn bị không gian dịch', 'Khởi tạo giao diện biên tập song ngữ'],
          ].map(([title, sub]) => (
            <View key={title} style={styles.stepPendingRow}>
              <MaterialIcons name="radio-button-unchecked" size={20} color="#B0AEC0" />
              <View>
                <Text style={styles.stepPendingTitle}>{title}</Text>
                <Text style={styles.stepSub}>{sub}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.footerWrap}>
          <Text style={styles.footerNote}>TÁC VỤ CÓ THỂ MẤT VÀI PHÚT TÙY KÍCH THƯỚC TỆP</Text>

          <Pressable style={styles.backgroundBtn} onPress={() => navigation.navigate('TranslatorStudio')}>
            <Text style={styles.backgroundBtnText}>Chạy nền</Text>
          </Pressable>

          <Pressable style={styles.cancelBtn} onPress={() => navigation.navigate('TranslatorUploadStatus')}>
            <Text style={styles.cancelBtnText}>Hủy tải lên</Text>
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
  headerTitle: { color: '#191C1F', fontSize: 17, fontWeight: '700' },
  content: { paddingHorizontal: uiSpacing.lg, paddingTop: 8, paddingBottom: 26, gap: 14 },
  subtitle: { color: '#474554', fontSize: 14.17, lineHeight: 22.5 },
  fileCard: {
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#ECECF2',
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  fileIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1EEFF',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  fileBody: { flex: 1 },
  fileTitle: { color: '#191C1F', fontSize: 16.67, fontWeight: '700' },
  fileMeta: { marginTop: 2, color: '#5A596C', fontSize: 15, fontWeight: '500' },
  fileSuccess: { color: '#006B55', fontSize: 15, fontWeight: '700' },
  progressCard: {
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#ECECF2',
    paddingHorizontal: 14,
    paddingVertical: 16,
    gap: 8,
  },
  progressHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  progressLabel: { color: '#474554', fontSize: 13, fontWeight: '800', letterSpacing: 1.4 },
  progressValue: { color: '#5341CD', fontSize: 22.67, fontWeight: '800' },
  progressTrack: { height: 8, borderRadius: 999, backgroundColor: '#E4E6EE', overflow: 'hidden' },
  progressFill: { width: '40%', height: '100%', backgroundColor: '#6C5CE7', borderRadius: 999 },
  stepList: { gap: 10 },
  stepDoneRow: {
    borderRadius: 14,
    backgroundColor: '#F2F3F7',
    minHeight: 74,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  stepDoneIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#DDF8EE',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  stepDoneTitle: { color: '#191C1F', fontSize: 15, fontWeight: '700' },
  stepSub: { color: '#5B5A6E', fontSize: 12.5 },
  stepActiveRow: {
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DCD7F8',
    minHeight: 74,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  stepActiveTextWrap: { flex: 1 },
  stepActiveTitle: { color: '#5341CD', fontSize: 15, fontWeight: '800' },
  stepPendingRow: {
    minHeight: 64,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    opacity: 0.55,
  },
  stepPendingTitle: { color: '#191C1F', fontSize: 15, fontWeight: '600' },
  footerWrap: { marginTop: 8, gap: 10, paddingTop: 8, borderTopWidth: 1, borderTopColor: '#E4E6EE' },
  footerNote: { color: '#6F6D80', fontSize: 11, fontWeight: '800', letterSpacing: 1.2, textAlign: 'center' },
  backgroundBtn: {
    minHeight: 52,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#6C5CE7',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  backgroundBtnText: { color: '#5341CD', fontSize: 16.67, fontWeight: '700' },
  cancelBtn: { minHeight: 44, alignItems: 'center', justifyContent: 'center' },
  cancelBtnText: { color: '#777488', fontSize: 14.17, fontWeight: '600' },
});

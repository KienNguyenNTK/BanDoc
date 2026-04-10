import React from 'react';
import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Screen, TopBar } from '../components/ui';
import { uiSpacing } from '../theme/ui';

type TranslatorUploadStatusNavigationProp = StackNavigationProp<RootStackParamList, 'TranslatorUploadStatus'>;

type TranslatorUploadStatusScreenProps = {
  navigation: TranslatorUploadStatusNavigationProp;
};

export default function TranslatorUploadStatusScreen({ navigation }: TranslatorUploadStatusScreenProps) {
  return (
    <Screen mode="static" edges={['top']} contentStyle={styles.screenContent}>
      <TopBar title="Trạng thái upload" onBack={() => navigation.goBack()} tone="primary" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.errorHeroWrap}>
          <View style={styles.errorHeroIconWrap}>
            <MaterialIcons name="cloud-off" size={34} color="#BA1A1A" />
          </View>
          <Text style={styles.errorTitle}>Upload thất bại</Text>
          <Text style={styles.errorSub}>
            Không thể hoàn tất bước chuẩn bị bản thảo. Vui lòng xem chi tiết bên dưới.
          </Text>
        </View>

        <View style={styles.fileCard}>
          <View style={styles.fileIconWrap}>
            <MaterialIcons name="description" size={25} color="#5341CD" />
          </View>
          <View style={styles.fileBody}>
            <Text style={styles.fileTitle}>The Shadow over Innsmouth.docx</Text>
            <Text style={styles.fileMeta}>DOCX • 1.2 MB</Text>
            <View style={styles.attemptRow}>
              <MaterialIcons name="schedule" size={13} color="#787586" />
              <Text style={styles.attemptText}>Thử lại cách đây 2 phút</Text>
            </View>
          </View>
        </View>

        <View style={styles.reasonCard}>
          <View style={styles.reasonHead}>
            <MaterialIcons name="error" size={20} color="#BA1A1A" />
            <Text style={styles.reasonTitle}>Trích xuất chưa hoàn tất</Text>
          </View>
          <Text style={styles.reasonDesc}>
            Hệ thống gặp vấn đề khi phân tích cấu trúc tài liệu. Tình trạng này thường xảy ra với bố cục phức tạp hoặc tệp bị lỗi.
          </Text>
        </View>

        <View style={styles.actionList}>
          <Pressable style={styles.retryBtn} onPress={() => navigation.navigate('TranslatorPreparing')}>
            <Text style={styles.retryBtnText}>Thử tải lại</Text>
          </Pressable>
          <Pressable style={styles.replaceBtn} onPress={() => navigation.navigate('TranslatorStudio')}>
            <Text style={styles.replaceBtnText}>Đổi tệp khác</Text>
          </Pressable>
          <Pressable style={styles.backBtn} onPress={() => navigation.navigate('TranslatorStudio')}>
            <Text style={styles.backBtnText}>Quay về Studio</Text>
          </Pressable>
        </View>

        <ImageBackground
          source={require('../assets/translator/recommendation-texture.jpg')}
          resizeMode="cover"
          imageStyle={styles.textureImage}
          style={styles.recommendCard}
        >
          <Text style={styles.recommendTitle}>
            <MaterialIcons name="lightbulb" size={17} color="#884800" /> Gợi ý xử lý
          </Text>
          {[
            'Đảm bảo tệp không được đặt mật khẩu',
            'Kiểm tra định dạng hỗ trợ: PDF, EPUB, DOCX',
            'Giữ dung lượng tệp dưới 20MB',
          ].map((tip) => (
            <View key={tip} style={styles.tipRow}>
              <View style={styles.tipDot} />
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </ImageBackground>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContent: { paddingHorizontal: 0 },
  content: { paddingHorizontal: uiSpacing.lg, paddingTop: 8, paddingBottom: 28, gap: 14 },
  errorHeroWrap: { gap: 8 },
  errorHeroIconWrap: {
    width: 66,
    height: 66,
    borderRadius: 33,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFEDEE',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  errorTitle: { color: '#191C1F', fontSize: 30, fontWeight: '800' },
  errorSub: { color: '#474554', fontSize: 18.33, lineHeight: 29.17 },
  fileCard: {
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#ECECF2',
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  fileIconWrap: {
    width: 54,
    height: 54,
    borderRadius: 14,
    backgroundColor: '#F2F3F7',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  fileBody: { flex: 1 },
  fileTitle: { color: '#191C1F', fontSize: 21, fontWeight: '700' },
  fileMeta: { color: '#4E4D60', fontSize: 15, marginTop: 1 },
  attemptRow: { marginTop: 6, flexDirection: 'row', alignItems: 'center', gap: 4 },
  attemptText: { color: '#787586', fontSize: 15 },
  reasonCard: {
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F2D4D4',
    padding: 14,
    gap: 8,
  },
  reasonHead: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  reasonTitle: { color: '#191C1F', fontSize: 20, fontWeight: '700' },
  reasonDesc: { color: '#474554', fontSize: 17.5, lineHeight: 28.33 },
  actionList: { gap: 10 },
  retryBtn: {
    minHeight: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5D4AD6',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  retryBtnText: { color: '#FFFFFF', fontSize: 18.33, fontWeight: '700' },
  replaceBtn: {
    minHeight: 56,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#C8C4D7',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  replaceBtnText: { color: '#5341CD', fontSize: 18.33, fontWeight: '700' },
  backBtn: { minHeight: 42, alignItems: 'center', justifyContent: 'center' },
  backBtnText: { color: '#474554', fontSize: 15, fontWeight: '600' },
  recommendCard: {
    borderRadius: 20,
    backgroundColor: '#ECEFF4',
    overflow: 'hidden',
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  textureImage: { opacity: 0.06 },
  recommendTitle: { color: '#191C1F', fontSize: 20, fontWeight: '700' },
  tipRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  tipDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 7,
    backgroundColor: '#006B55',
  },
  tipText: { color: '#474554', fontSize: 16.67, lineHeight: 25.83, flex: 1 },
});

import React from 'react';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from '../navigation/AppNavigator';
import { uiColors, uiSpacing } from '../theme/ui';

type TranslatorChapterGraphNavigationProp = StackNavigationProp<RootStackParamList, 'TranslatorChapterGraph'>;

type TranslatorChapterGraphScreenProps = {
  navigation: TranslatorChapterGraphNavigationProp;
};

export default function TranslatorChapterGraphScreen({ navigation }: TranslatorChapterGraphScreenProps) {
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
          <Pressable style={styles.tabBtn} onPress={() => navigation.navigate('TranslatorChapterSource')}>
            <Text style={styles.tabText}>Nguồn</Text>
          </Pressable>
          <Pressable style={styles.tabBtn} onPress={() => navigation.navigate('TranslatorChapterTranslation')}>
            <Text style={styles.tabText}>Bản dịch</Text>
          </Pressable>
          <Pressable style={[styles.tabBtn, styles.tabBtnActive]}>
            <Text style={[styles.tabText, styles.tabTextActive]}>Sơ đồ</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsRow}>
          {['Hỏi sơ đồ', 'Kiểm tra tính nhất quán', 'Lịch sử nhân vật'].map((label) => (
            <Pressable key={label} style={styles.helperChip}>
              <Text style={styles.helperChipText}>{label}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.graphCard}>
          <View style={styles.connectionOne} />
          <View style={styles.connectionTwo} />
          <View style={styles.connectionThree} />

          <View style={styles.mainNodeWrap}>
            <View style={styles.mainNodeOuter}>
              <Image source={require('../assets/translator/robert-main.jpg')} style={styles.mainNodeImage} />
            </View>
            <Text style={styles.mainNodeName}>Robert Olmstead</Text>
          </View>

          <View style={styles.zadokNodeWrap}>
            <View style={styles.smallNodeOuterGreen}>
              <Image source={require('../assets/translator/zadok.jpg')} style={styles.smallNodeImage} />
            </View>
            <Text style={styles.nodeLabel}>Zadok Allen</Text>
          </View>

          <View style={styles.clerkNodeWrap}>
            <View style={styles.smallNodeOuterPurple}>
              <Image source={require('../assets/translator/clerk.jpg')} style={styles.smallNodeImage} />
            </View>
            <Text style={styles.nodeLabel}>Người bán hàng</Text>
          </View>

          <View style={styles.locationWrap}>
            <View style={styles.locationDot}><MaterialIcons name="location-on" size={16} color="#5D5B6E" /></View>
            <Text style={styles.locationLabel}>TRẠM XE INNSMOUTH</Text>
          </View>

          <View style={styles.canvasControls}>
            <Pressable style={styles.canvasBtn}><MaterialIcons name="zoom-in" size={18} color="#474554" /></Pressable>
            <Pressable style={styles.canvasBtn}><MaterialIcons name="zoom-out" size={18} color="#474554" /></Pressable>
            <Pressable style={styles.canvasBtn}><MaterialIcons name="my-location" size={18} color="#474554" /></Pressable>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Thực thể được chọn</Text>

        <View style={styles.entityCard}>
          <Image source={require('../assets/translator/robert-main.jpg')} style={styles.entityImage} />
          <View style={styles.entityHead}>
            <Text style={styles.entityName}>Robert Olmstead</Text>
            <Text style={styles.entityRole}>NHÂN VẬT CHÍNH</Text>
          </View>
          <Text style={styles.entityDesc}>
            Một nhà sưu tầm cổ vật tò mò đi qua Massachusetts. Sự quan tâm đến thị trấn Innsmouth khiến anh dần bị cuốn vào mạng lưới kinh hoàng vũ trụ.
          </Text>

          <View style={styles.relationChip}><MaterialIcons name="link" size={14} color="#474554" /><Text style={styles.relationText}>Người dẫn dắt: Zadok Allen</Text></View>
          <View style={styles.relationChip}><MaterialIcons name="warning" size={14} color="#474554" /><Text style={styles.relationText}>Mối đe dọa: Deep Ones</Text></View>
          <View style={styles.relationChip}><MaterialIcons name="location-on" size={14} color="#474554" /><Text style={styles.relationText}>Hiện tại: Newburyport</Text></View>

          <View style={styles.entityActions}>
            <Pressable style={styles.chatCharacterBtn} onPress={() => navigation.navigate('TranslatorCharacterChat')}>
              <MaterialIcons name="chat" size={16} color="#FFFFFF" />
              <Text style={styles.chatCharacterText}>Trò chuyện với nhân vật</Text>
            </Pressable>
            <Pressable style={styles.askCharacterBtn}>
              <MaterialIcons name="auto-awesome" size={16} color="#474554" />
              <Text style={styles.askCharacterText}>Hỏi về nhân vật này</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomPanel}>
        <View style={styles.askInputWrap}>
          <View style={styles.askIcon}><MaterialIcons name="auto-awesome" size={18} color="#5341CD" /></View>
          <TextInput
            placeholder="Hỏi Bạn Đọc về các mối liên hệ..."
            placeholderTextColor="#8A8897"
            style={styles.askInput}
          />
          <MaterialIcons name="arrow-upward" size={18} color="#B0AEC0" />
        </View>

        <Pressable style={styles.backToTranslationBtn} onPress={() => navigation.navigate('TranslatorChapterTranslation')}>
          <Text style={styles.backToTranslationText}>Quay lại bản dịch</Text>
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
  content: { paddingHorizontal: uiSpacing.lg, paddingBottom: 220, gap: 14 },
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
  graphCard: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#ECECF2',
    backgroundColor: '#FFFFFF',
    height: 440,
    position: 'relative',
    overflow: 'hidden',
  },
  connectionOne: {
    position: 'absolute',
    left: '44%',
    top: '44%',
    width: 90,
    height: 2,
    borderTopWidth: 1.5,
    borderColor: '#C8C4D7',
    transform: [{ rotate: '-35deg' }],
  },
  connectionTwo: {
    position: 'absolute',
    left: '31%',
    top: '34%',
    width: 75,
    height: 2,
    borderTopWidth: 1.5,
    borderColor: '#C8C4D7',
    transform: [{ rotate: '52deg' }],
  },
  connectionThree: {
    position: 'absolute',
    left: '38%',
    top: '56%',
    width: 62,
    height: 2,
    borderTopWidth: 1.5,
    borderColor: '#C8C4D7',
    transform: [{ rotate: '75deg' }],
  },
  mainNodeWrap: { position: 'absolute', left: '34%', top: '42%', alignItems: 'center' },
  mainNodeOuter: {
    width: 102,
    height: 102,
    borderRadius: 51,
    padding: 3,
    backgroundColor: '#5341CD',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  mainNodeImage: { width: '100%', height: '100%', borderRadius: 48, borderWidth: 2, borderColor: '#FFFFFF' },
  mainNodeName: {
    marginTop: 6,
    color: '#191C1F',
    fontSize: 15,
    fontWeight: '700',
    backgroundColor: '#FFFFFFE8',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#E3E8EF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    overflow: 'hidden',
  },
  zadokNodeWrap: { position: 'absolute', left: '16%', top: '27%', alignItems: 'center' },
  clerkNodeWrap: { position: 'absolute', right: '16%', top: '35%', alignItems: 'center' },
  smallNodeOuterGreen: {
    width: 66,
    height: 66,
    borderRadius: 33,
    padding: 2,
    backgroundColor: '#6DFAD2',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  smallNodeOuterPurple: {
    width: 62,
    height: 62,
    borderRadius: 31,
    padding: 2,
    backgroundColor: '#C6BFFF',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  smallNodeImage: { width: '100%', height: '100%', borderRadius: 30, borderWidth: 2, borderColor: '#FFFFFF' },
  nodeLabel: {
    marginTop: 4,
    color: '#191C1F',
    fontSize: 13,
    fontWeight: '600',
    backgroundColor: '#FFFFFFE8',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#E3E8EF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    overflow: 'hidden',
  },
  locationWrap: { position: 'absolute', left: '33%', bottom: '24%', alignItems: 'center' },
  locationDot: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#E7E8EC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationLabel: { marginTop: 6, color: '#787586', fontSize: 11, fontWeight: '700', letterSpacing: 1.1 },
  canvasControls: { position: 'absolute', right: 12, top: '56%', gap: 8 },
  canvasBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DCD8EE',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFFE8',
  },
  sectionTitle: { color: '#191C1F', fontSize: 17, fontWeight: '700', paddingHorizontal: 2 },
  entityCard: {
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#ECECF2',
    padding: 16,
    gap: 10,
  },
  entityImage: { width: 96, height: 96, borderRadius: 16 },
  entityHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  entityName: { color: '#191C1F', fontSize: 21.5, fontWeight: '700', flex: 1, paddingRight: 8 },
  entityRole: {
    color: '#00725B',
    backgroundColor: '#6DFAD2',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
    overflow: 'hidden',
  },
  entityDesc: { color: '#474554', fontSize: 15.83, lineHeight: 26.67 },
  relationChip: {
    borderRadius: 12,
    backgroundColor: '#F2F3F7',
    borderWidth: 1,
    borderColor: '#E0E2EA',
    minHeight: 34,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
  },
  relationText: { color: '#373849', fontSize: 14, fontWeight: '500' },
  entityActions: { marginTop: 4, borderTopWidth: 1, borderTopColor: '#ECECF2', paddingTop: 12, gap: 10 },
  chatCharacterBtn: {
    minHeight: 48,
    borderRadius: 14,
    backgroundColor: '#5341CD',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  chatCharacterText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
  askCharacterBtn: {
    minHeight: 48,
    borderRadius: 14,
    backgroundColor: '#E1E2E6',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  askCharacterText: { color: '#373849', fontSize: 14.17, fontWeight: '600' },
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
  askInputWrap: {
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
  askInput: { flex: 1, color: '#474554', fontSize: 12.5 },
  backToTranslationBtn: {
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
  backToTranslationText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
});

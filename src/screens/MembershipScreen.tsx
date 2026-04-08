import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from '../navigation/AppNavigator';
import { uiColors, uiSpacing } from '../theme/ui';

type MembershipNavigationProp = StackNavigationProp<RootStackParamList, 'Membership'>;

type MembershipScreenProps = {
  navigation: MembershipNavigationProp;
};

type BillingMode = 'monthly' | 'yearly';

export default function MembershipScreen({ navigation }: MembershipScreenProps) {
  const [billingMode, setBillingMode] = React.useState<BillingMode>('monthly');

  const premiumPrice = billingMode === 'monthly' ? '$12.99' : '$10.39';
  const premiumPeriod = billingMode === 'monthly' ? '/ tháng' : '/ tháng (gói năm)';

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable style={styles.iconBtn} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color="#191C1F" />
          </Pressable>
          <Text style={styles.headerTitle}>Gói thành viên</Text>
        </View>
        <Pressable style={styles.iconBtn}>
          <MaterialIcons name="info" size={22} color="#6A6B79" />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.introSection}>
          <Text style={styles.introTitle}>Mở khóa đầy đủ trải nghiệm Bạn Đọc</Text>
          <Text style={styles.introSub}>
            Nhận tóm tắt chuyên sâu hơn, sơ đồ tri thức tương tác, audio sống động và kiểm soát tốt hơn với tài liệu cá nhân.
          </Text>
        </View>

        <View style={styles.billingWrap}>
          <View style={styles.billingInner}>
            <Pressable
              style={[styles.billingBtn, billingMode === 'monthly' ? styles.billingBtnActive : undefined]}
              onPress={() => setBillingMode('monthly')}
            >
              <Text style={[styles.billingBtnText, billingMode === 'monthly' ? styles.billingBtnTextActive : undefined]}>
                Tháng
              </Text>
            </Pressable>

            <Pressable
              style={[styles.billingBtn, billingMode === 'yearly' ? styles.billingBtnActive : undefined]}
              onPress={() => setBillingMode('yearly')}
            >
              <View style={styles.yearlyTextRow}>
                <Text style={[styles.billingBtnText, billingMode === 'yearly' ? styles.billingBtnTextActive : undefined]}>
                  Năm
                </Text>
                <View style={styles.savePill}>
                  <Text style={styles.savePillText}>Tiết kiệm 20%</Text>
                </View>
              </View>
            </Pressable>
          </View>
        </View>

        <View style={styles.planList}>
          <View style={styles.premiumCard}>
            <View style={styles.popularTag}>
              <Text style={styles.popularTagText}>Phổ biến nhất</Text>
            </View>

            <Text style={styles.premiumTitle}>Premium</Text>
            <View style={styles.priceRow}>
              <Text style={styles.priceText}>{premiumPrice}</Text>
              <Text style={styles.periodText}>{premiumPeriod}</Text>
            </View>

            <View style={styles.featureList}>
              {[
                'Không giới hạn tóm tắt AI chuyên sâu',
                'Sơ đồ tri thức tương tác nâng cao',
                'Audio chất lượng cao HD',
                '50 lượt tải tài liệu cá nhân / tháng',
              ].map((feature) => (
                <View key={feature} style={styles.featureItem}>
                  <MaterialIcons name="check-circle" size={18} color="#006B55" />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>

            <Pressable style={styles.upgradeBtn}>
              <Text style={styles.upgradeBtnText}>Nâng cấp Premium</Text>
            </Pressable>
          </View>

          <View style={styles.freeCard}>
            <Text style={styles.freeTitle}>Starter</Text>
            <Text style={styles.freePrice}>Miễn phí</Text>
            <View style={styles.freeFeatureList}>
              {['3 tóm tắt chuyên sâu mỗi tháng', 'Giao diện đọc tiêu chuẩn', 'Đồng bộ trên 2 thiết bị'].map((feature) => (
                <View key={feature} style={styles.featureItem}>
                  <MaterialIcons name="check" size={17} color="#787586" />
                  <Text style={styles.freeFeatureText}>{feature}</Text>
                </View>
              ))}
            </View>
            <Text style={styles.currentPlanText}>GÓI HIỆN TẠI</Text>
          </View>
        </View>

        <View style={styles.compareSection}>
          <Text style={styles.compareTitle}>So sánh quyền lợi</Text>
          <View style={styles.compareCard}>
            {[
              { name: 'Tóm tắt chuyên sâu', free: '3/tháng', pro: 'Không giới hạn' },
              { name: 'Chất lượng audio', free: 'Tiêu chuẩn', pro: 'Ultra HD' },
              { name: 'Sơ đồ tri thức', free: 'Cơ bản', pro: 'Tương tác' },
              { name: 'Lưu trữ đám mây', free: '100MB', pro: '5GB' },
            ].map((row, idx) => (
              <View key={row.name} style={[styles.compareRow, idx < 3 ? styles.compareRowBorder : undefined]}>
                <Text style={styles.compareName}>{row.name}</Text>
                <View style={styles.compareValues}>
                  <Text style={styles.compareFree}>{row.free}</Text>
                  <Text style={styles.comparePro}>{row.pro}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.footerArea}>
          <Pressable>
            <Text style={styles.restoreText}>Khôi phục giao dịch</Text>
          </Pressable>

          <View style={styles.policyRow}>
            <Text style={styles.policyText}>Điều khoản dịch vụ</Text>
            <View style={styles.dot} />
            <Text style={styles.policyText}>Chính sách riêng tư</Text>
          </View>

          <Text style={styles.disclaimer}>
            Gói sẽ tự động gia hạn nếu không hủy trước ít nhất 24 giờ trước khi kết thúc chu kỳ hiện tại. Bạn có thể quản lý đăng ký trong phần cài đặt tài khoản App Store.
          </Text>
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
  headerTitle: { color: '#191C1F', fontSize: 18.13, fontWeight: '700' },
  content: { paddingHorizontal: uiSpacing.lg, paddingTop: 8, paddingBottom: 28, gap: 16 },
  introSection: { alignItems: 'center', gap: 8, paddingHorizontal: 12 },
  introTitle: { color: '#191C1F', fontSize: 21.5, fontWeight: '800', textAlign: 'center', lineHeight: 31 },
  introSub: { color: '#474554', fontSize: 16, textAlign: 'center', lineHeight: 22.5 },
  billingWrap: { alignItems: 'center' },
  billingInner: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: '#FFFFFF90',
    borderWidth: 1,
    borderColor: '#DCD8EE',
    borderRadius: 999,
    padding: 4,
    flexDirection: 'row',
    gap: 4,
  },
  billingBtn: { flex: 1, borderRadius: 999, minHeight: 36, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 8 },
  billingBtnActive: { backgroundColor: '#6C5CE7' },
  billingBtnText: { color: '#3D3E4E', fontSize: 15, fontWeight: '700' },
  billingBtnTextActive: { color: '#FFFFFF' },
  yearlyTextRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  savePill: { backgroundColor: '#6DFAD2', borderRadius: 999, paddingHorizontal: 8, paddingVertical: 3 },
  savePillText: { color: '#00725B', fontSize: 10, fontWeight: '800' },
  planList: { gap: 14 },
  premiumCard: {
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: uiSpacing.lg,
    paddingTop: 20,
    paddingBottom: 16,
    borderWidth: 1,
    borderColor: '#DCD8EE',
    overflow: 'hidden',
  },
  popularTag: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#6C5CE7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderBottomLeftRadius: 12,
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  popularTagText: { color: '#FFFFFF', fontSize: 10, fontWeight: '800', letterSpacing: 1, textTransform: 'uppercase' },
  premiumTitle: { color: '#6C5CE7', fontSize: 17, fontWeight: '700' },
  priceRow: { flexDirection: 'row', alignItems: 'flex-end', marginTop: 2 },
  priceText: { color: '#191C1F', fontSize: 28.75, fontWeight: '800' },
  periodText: { color: '#474554', fontSize: 14, fontWeight: '500', marginBottom: 4, marginLeft: 6 },
  featureList: { marginTop: 14, gap: 12 },
  featureItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  featureText: { color: '#191C1F', fontSize: 16, fontWeight: '500', lineHeight: 19.17, flex: 1 },
  upgradeBtn: {
    marginTop: 16,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6C5CE7',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  upgradeBtnText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
  freeCard: {
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: uiSpacing.lg,
    paddingVertical: 18,
    borderWidth: 1,
    borderColor: '#E2E0EE',
    gap: 10,
  },
  freeTitle: { color: '#191C1F', fontSize: 17, fontWeight: '700' },
  freePrice: { color: '#191C1F', fontSize: 28.75, fontWeight: '800', marginTop: -2 },
  freeFeatureList: { gap: 12, marginTop: 2 },
  freeFeatureText: { color: '#474554', fontSize: 16, fontWeight: '500', flex: 1 },
  currentPlanText: {
    marginTop: 6,
    color: '#787586',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  compareSection: { gap: 8 },
  compareTitle: { color: '#191C1F', fontSize: 17.5, fontWeight: '700', paddingHorizontal: 2 },
  compareCard: {
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E0EE',
    overflow: 'hidden',
  },
  compareRow: {
    minHeight: 52,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  compareRowBorder: { borderBottomWidth: 1, borderBottomColor: '#ECECF2' },
  compareName: { color: '#191C1F', fontSize: 15, fontWeight: '600', flex: 1 },
  compareValues: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  compareFree: { color: '#787586', fontSize: 14, fontWeight: '500', minWidth: 62, textAlign: 'right' },
  comparePro: { color: '#6C5CE7', fontSize: 14, fontWeight: '700', minWidth: 74, textAlign: 'right' },
  footerArea: { alignItems: 'center', gap: 12, paddingTop: 4, paddingBottom: 8 },
  restoreText: { color: '#6C5CE7', fontSize: 16, fontWeight: '700' },
  policyRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  policyText: { color: '#787586', fontSize: 13, fontWeight: '600' },
  dot: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#D0CDDD' },
  disclaimer: {
    color: '#787586',
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    paddingHorizontal: 8,
  },
});
import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BottomNavBar from '../components/BottomNavBar';
import { RootStackParamList } from '../navigation/AppNavigator';
import { uiColors, uiSpacing, uiTypography } from '../theme/ui';

type ProfileNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

type ProfileScreenProps = {
  navigation: ProfileNavigationProp;
};

export default function ProfileScreen({ navigation }: ProfileScreenProps) {
  const [darkMode, setDarkMode] = React.useState(false);
  const [notifications, setNotifications] = React.useState(true);

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Hồ sơ</Text>
        </View>

        <Pressable style={styles.iconBtn} onPress={() => navigation.navigate('Settings')}>
          <MaterialIcons name="settings" size={24} color="#5341CD" />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.profileCard}>
          <View style={styles.avatarWrap}>
            <Image source={require('../assets/profile/profile-avatar.jpg')} style={styles.avatar} />
            <View style={styles.editAvatarDot}>
              <MaterialIcons name="edit" size={14} color="#FFFFFF" />
            </View>
          </View>

          <Text style={styles.nameText}>Alex Johnson</Text>
          <Text style={styles.emailText}>alex@example.com</Text>
          <View style={styles.memberPill}>
            <Text style={styles.memberPillText}>THÀNH VIÊN PREMIUM</Text>
          </View>
          <Pressable style={styles.editProfileBtn} onPress={() => navigation.navigate('EditProfile')}>
            <Text style={styles.editProfileText}>Chỉnh sửa hồ sơ</Text>
          </Pressable>
        </View>

        <View style={styles.streakCard}>
          <View>
            <Text style={styles.streakTitle}>Chuỗi 7 ngày</Text>
            <Text style={styles.streakSub}>Bạn đang rất tốt! Hãy duy trì đọc mỗi ngày.</Text>
          </View>
          <View style={styles.fireWrap}>
            <MaterialIcons name="local-fire-department" size={36} color="#FFFFFF" />
          </View>
        </View>

        <Pressable style={styles.statsCard} onPress={() => navigation.navigate('ReadingStats')}>
          <Text style={styles.statsTitle}>Thống kê đọc</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <MaterialIcons name="schedule" size={20} color="#5341CD" />
              <View>
                <Text style={styles.statValue}>245 phút</Text>
                <Text style={styles.statLabel}>TỔNG THỜI GIAN TÓM TẮT</Text>
              </View>
            </View>

            <View style={styles.statItem}>
              <MaterialIcons name="menu-book" size={20} color="#5341CD" />
              <View>
                <Text style={styles.statValue}>18 tóm tắt</Text>
                <Text style={styles.statLabel}>ĐÃ ĐỌC</Text>
              </View>
            </View>

            <View style={styles.statItem}>
              <MaterialIcons name="auto-stories" size={20} color="#5341CD" />
              <View>
                <Text style={styles.statValue}>42 tóm tắt</Text>
                <Text style={styles.statLabel}>ĐÃ LƯU</Text>
              </View>
            </View>

            <View style={styles.statItem}>
              <MaterialIcons name="headphones" size={20} color="#5341CD" />
              <View>
                <Text style={styles.statValue}>9 phiên</Text>
                <Text style={styles.statLabel}>PHIÊN NGHE</Text>
              </View>
            </View>
          </View>
        </Pressable>

        <View style={styles.sectionBlock}>
          <Text style={styles.sectionTitle}>Trung tâm studio</Text>

          <View style={styles.menuCard}>
            <Pressable style={styles.menuRow} onPress={() => navigation.navigate('TranslatorStudio')}>
              <View style={styles.menuRowLeft}>
                <MaterialIcons name="translate" size={22} color="#5341CD" />
                <Text style={styles.menuRowText}>Mở Studio</Text>
              </View>
              <MaterialIcons name="chevron-right" size={22} color="#787586" />
            </Pressable>
          </View>
        </View>

        <View style={styles.sectionBlock}>
          <Text style={styles.prefTitle}>Nội dung cá nhân</Text>
          <View style={styles.menuCard}>
            <Pressable style={styles.menuRow} onPress={() => navigation.navigate('NotesHighlights')}>
              <View style={styles.menuRowLeft}>
                <MaterialIcons name="sticky-note-2" size={22} color="#5341CD" />
                <Text style={styles.menuRowText}>Ghi chú và đánh dấu</Text>
              </View>
              <MaterialIcons name="chevron-right" size={22} color="#787586" />
            </Pressable>
          </View>
        </View>

        <View style={styles.sectionBlock}>
          <Text style={styles.prefTitle}>Tùy chọn</Text>
          <View style={styles.menuCard}>
            <View style={styles.menuRow}>
              <View style={styles.menuRowLeft}>
                <MaterialIcons name="dark-mode" size={22} color="#787586" />
                <Text style={styles.menuRowText}>Chế độ tối</Text>
              </View>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: '#E1E2E6', true: '#5341CD' }}
                thumbColor="#FFFFFF"
              />
            </View>
            <View style={styles.menuDivider} />
            <View style={styles.menuRow}>
              <View style={styles.menuRowLeft}>
                <MaterialIcons name="notifications" size={22} color="#787586" />
                <Text style={styles.menuRowText}>Thông báo</Text>
              </View>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: '#E1E2E6', true: '#5341CD' }}
                thumbColor="#FFFFFF"
              />
            </View>
            <View style={styles.menuDivider} />
            <Pressable style={styles.menuRow} onPress={() => navigation.navigate('Membership')}>
              <View style={styles.menuRowLeft}>
                <MaterialIcons name="credit-card" size={22} color="#787586" />
                <Text style={styles.menuRowText}>Quản lý gói đăng ký</Text>
              </View>
              <MaterialIcons name="chevron-right" size={22} color="#787586" />
            </Pressable>
          </View>
        </View>

        <Pressable style={styles.logoutBtn}>
          <MaterialIcons name="logout" size={20} color="#BA1A1A" />
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </Pressable>
      </ScrollView>

      <BottomNavBar activeTab="profile" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: uiColors.background,
  },
  header: {
    height: 60,
    paddingHorizontal: uiSpacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconBtn: {
    width: 34,
    height: 34,
    borderRadius: 99,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: uiTypography.h2,
    fontWeight: '800',
    color: '#6C5CE7',
  },
  content: {
    paddingHorizontal: uiSpacing.lg,
    paddingTop: 8,
    paddingBottom: 100,
    gap: 14,
  },
  profileCard: {
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: uiSpacing.lg,
    paddingVertical: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  avatarWrap: {
    position: 'relative',
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 4,
    borderColor: '#F2F3F7',
  },
  editAvatarDot: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#006B55',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  nameText: {
    marginTop: 12,
    color: '#191C1F',
    fontSize: uiTypography.h2,
    fontWeight: '700',
  },
  emailText: {
    marginTop: 2,
    color: '#474554',
    fontSize: 15,
    fontWeight: '500',
  },
  memberPill: {
    marginTop: 10,
    borderRadius: 999,
    backgroundColor: '#6DFAD2',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  memberPillText: {
    color: '#00725B',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  editProfileBtn: {
    marginTop: 14,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
  },
  editProfileText: {
    color: '#5341CD',
    fontSize: uiTypography.bodySm,
    fontWeight: '600',
  },
  streakCard: {
    borderRadius: 24,
    backgroundColor: '#5D4AD6',
    paddingHorizontal: uiSpacing.lg,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  streakTitle: {
    color: '#FFFFFF',
    fontSize: uiTypography.h2,
    fontWeight: '700',
  },
  streakSub: {
    marginTop: 2,
    color: '#E9E4FF',
    fontSize: 15,
    fontWeight: '500',
    maxWidth: 220,
  },
  fireWrap: {
    width: 68,
    height: 68,
    borderRadius: 20,
    backgroundColor: '#FFFFFF30',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  statsCard: {
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: uiSpacing.lg,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  statsTitle: {
    color: '#191C1F',
    fontSize: uiTypography.h3,
    fontWeight: '700',
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 14,
  },
  statItem: {
    width: '50%',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-start',
    paddingRight: 8,
  },
  statValue: {
    color: '#191C1F',
    fontSize: 15,
    fontWeight: '700',
  },
  statLabel: {
    marginTop: 2,
    color: '#66657A',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.4,
  },
  sectionBlock: {
    gap: 8,
  },
  sectionTitle: {
    color: '#191C1F',
    fontSize: 16,
    fontWeight: '700',
    paddingHorizontal: 4,
  },
  sectionSub: {
    color: '#474554',
    fontSize: 14,
    fontWeight: '500',
    paddingHorizontal: 4,
  },
  prefTitle: {
    color: '#191C1F',
    fontSize: 17,
    fontWeight: '700',
    paddingHorizontal: 4,
  },
  menuCard: {
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  menuRow: {
    paddingHorizontal: 14,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuRowText: {
    color: '#191C1F',
    fontSize: uiTypography.body,
    fontWeight: '500',
  },
  menuDivider: {
    marginHorizontal: 14,
    height: 1,
    backgroundColor: '#ECECF2',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  logoutBtn: {
    borderRadius: 14,
    backgroundColor: '#F2F3F7',
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  logoutText: {
    color: '#BA1A1A',
    fontSize: 15,
    fontWeight: '700',
  },
});
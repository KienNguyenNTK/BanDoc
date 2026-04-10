import React from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Screen, TopBar } from '../components/ui';
import { uiSpacing } from '../theme/ui';

type SettingsNavigationProp = StackNavigationProp<RootStackParamList, 'Settings'>;

type SettingsScreenProps = {
  navigation: SettingsNavigationProp;
};

export default function SettingsScreen({ navigation }: SettingsScreenProps) {
  const [darkMode, setDarkMode] = React.useState(false);
  const [pushNotifications, setPushNotifications] = React.useState(true);
  const [weeklyDigest, setWeeklyDigest] = React.useState(true);
  const [wifiOnly, setWifiOnly] = React.useState(true);

  return (
    <Screen mode="static" edges={['top']} contentStyle={styles.screenContent}>
      <TopBar
        title="Cài đặt"
        onBack={() => navigation.goBack()}
        tone="primary"
        right={
          <Pressable style={styles.iconBtn}>
            <MaterialIcons name="help-outline" size={24} color="#6C5CE7" />
          </Pressable>
        }
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tài khoản & quyền riêng tư</Text>
          <View style={styles.card}>
            <Pressable style={styles.rowItemWithBorder} onPress={() => navigation.navigate('EditProfile')}>
              <View style={styles.rowLeft}>
                <View style={styles.rowIconCircle}>
                  <MaterialIcons name="person-outline" size={20} color="#5341CD" />
                </View>
                <Text style={styles.rowText}>Thông tin cá nhân</Text>
              </View>
              <MaterialIcons name="chevron-right" size={22} color="#C1BFD0" />
            </Pressable>

            <Pressable style={styles.rowItemWithBorder}>
              <View style={styles.rowLeft}>
                <View style={styles.rowIconCircle}>
                  <MaterialIcons name="lock-open" size={20} color="#5341CD" />
                </View>
                <Text style={styles.rowText}>Bảo mật & mật khẩu</Text>
              </View>
              <MaterialIcons name="chevron-right" size={22} color="#C1BFD0" />
            </Pressable>

            <Pressable style={styles.rowItem} onPress={() => navigation.navigate('Membership')}>
              <View style={styles.rowLeft}>
                <View style={styles.rowIconCircle}>
                  <MaterialIcons name="credit-card" size={20} color="#5341CD" />
                </View>
                <Text style={styles.rowText}>Quản lý gói đăng ký</Text>
              </View>
              <MaterialIcons name="chevron-right" size={22} color="#C1BFD0" />
            </Pressable>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trải nghiệm đọc</Text>
          <View style={styles.card}>
            <Pressable style={styles.rowItemWithBorder}>
              <View style={styles.rowLeft}>
                <View style={styles.rowIconCircle}>
                  <MaterialIcons name="format-size" size={20} color="#5341CD" />
                </View>
                <Text style={styles.rowText}>Cỡ chữ</Text>
              </View>
              <View style={styles.rowRightWithChip}>
                <Text style={styles.valueChip}>VỪA</Text>
                <MaterialIcons name="chevron-right" size={22} color="#C1BFD0" />
              </View>
            </Pressable>

            <View style={styles.rowItem}>
              <View style={styles.rowLeft}>
                <View style={styles.rowIconCircle}>
                  <MaterialIcons name="dark-mode" size={20} color="#5341CD" />
                </View>
                <Text style={styles.rowText}>Chế độ tối</Text>
              </View>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: '#D3D5DE', true: '#6C5CE7' }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Âm thanh & phát lại</Text>
          <View style={styles.card}>
            <Pressable style={styles.rowItemWithBorder}>
              <View style={styles.rowLeft}>
                <View style={styles.rowIconCircle}>
                  <MaterialIcons name="speed" size={20} color="#5341CD" />
                </View>
                <Text style={styles.rowText}>Tốc độ phát</Text>
              </View>
              <View style={styles.rowRightWithChip}>
                <Text style={styles.valueChip}>1.5X</Text>
                <MaterialIcons name="chevron-right" size={22} color="#C1BFD0" />
              </View>
            </Pressable>

            <Pressable style={styles.rowItem}>
              <View style={styles.rowLeft}>
                <View style={styles.rowIconCircle}>
                  <MaterialIcons name="timer" size={20} color="#5341CD" />
                </View>
                <Text style={styles.rowText}>Hẹn giờ ngủ</Text>
              </View>
              <View style={styles.rowRightWithChip}>
                <Text style={styles.valueChip}>15 PHÚT</Text>
                <MaterialIcons name="chevron-right" size={22} color="#C1BFD0" />
              </View>
            </Pressable>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông báo</Text>
          <View style={styles.card}>
            <View style={styles.notifyRowWithBorder}>
              <View style={styles.notifyTextWrap}>
                <Text style={styles.rowText}>Thông báo đẩy</Text>
                <Text style={styles.subText}>Nhận cảnh báo khi có nội dung mới</Text>
              </View>
              <Switch
                value={pushNotifications}
                onValueChange={setPushNotifications}
                trackColor={{ false: '#D3D5DE', true: '#6C5CE7' }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={styles.notifyRow}>
              <View style={styles.notifyTextWrap}>
                <Text style={styles.rowText}>Bản tin tuần</Text>
                <Text style={styles.subText}>Tóm tắt tiến độ đọc hàng tuần của bạn</Text>
              </View>
              <Switch
                value={weeklyDigest}
                onValueChange={setWeeklyDigest}
                trackColor={{ false: '#D3D5DE', true: '#6C5CE7' }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ứng dụng</Text>
          <View style={styles.card}>
            <Pressable style={styles.rowItemWithBorder}>
              <View style={styles.rowLeft}>
                <View style={styles.rowIconCircle}>
                  <MaterialIcons name="language" size={20} color="#5341CD" />
                </View>
                <Text style={styles.rowText}>Ngôn ngữ</Text>
              </View>
              <View style={styles.rowRightWithChip}>
                <Text style={styles.valueChip}>TIẾNG VIỆT</Text>
                <MaterialIcons name="chevron-right" size={22} color="#C1BFD0" />
              </View>
            </Pressable>

            <View style={styles.rowItem}>
              <View style={styles.rowLeft}>
                <View style={styles.rowIconCircle}>
                  <MaterialIcons name="cloud-download" size={20} color="#5341CD" />
                </View>
                <Text style={styles.rowText}>Chỉ tải qua Wi-Fi</Text>
              </View>
              <Switch
                value={wifiOnly}
                onValueChange={setWifiOnly}
                trackColor={{ false: '#D3D5DE', true: '#6C5CE7' }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>
        </View>

        <View style={styles.bottomArea}>
          <Pressable style={styles.signOutBtn}>
            <MaterialIcons name="logout" size={20} color="#BA1A1A" />
            <Text style={styles.signOutText}>Đăng xuất</Text>
          </Pressable>
          <Text style={styles.versionText}>Phiên bản 2.4.1 (Build 890)</Text>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContent: {
    paddingHorizontal: 0,
  },
  iconBtn: {
    width: 34,
    height: 34,
    borderRadius: 99,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: uiSpacing.lg,
    paddingTop: 8,
    paddingBottom: 30,
    gap: 18,
  },
  section: {
    gap: 8,
  },
  sectionTitle: {
    color: '#474554',
    fontSize: 16.67,
    fontWeight: '700',
    paddingHorizontal: 4,
  },
  card: {
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  rowItem: {
    minHeight: 72,
    paddingHorizontal: uiSpacing.lg,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowItemWithBorder: {
    minHeight: 72,
    paddingHorizontal: uiSpacing.lg,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ECECF2',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rowIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0EEFB',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  rowText: {
    color: '#191C1F',
    fontSize: 16.67,
    fontWeight: '500',
  },
  rowRightWithChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  valueChip: {
    backgroundColor: '#ECECF2',
    color: '#474554',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.6,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  notifyRowWithBorder: {
    minHeight: 82,
    paddingHorizontal: uiSpacing.lg,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ECECF2',
  },
  notifyRow: {
    minHeight: 82,
    paddingHorizontal: uiSpacing.lg,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  notifyTextWrap: {
    flex: 1,
    paddingRight: 10,
  },
  subText: {
    marginTop: 2,
    color: '#787586',
    fontSize: 14,
    fontWeight: '500',
  },
  bottomArea: {
    paddingTop: 2,
    paddingBottom: 10,
    alignItems: 'center',
    gap: 10,
  },
  signOutBtn: {
    width: '100%',
    height: 48,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  signOutText: {
    color: '#BA1A1A',
    fontSize: 16,
    fontWeight: '700',
  },
  versionText: {
    color: '#787586',
    fontSize: 14,
    fontWeight: '500',
  },
});
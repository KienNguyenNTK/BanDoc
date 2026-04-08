import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from '../navigation/AppNavigator';
import AppTextInput from '../components/AppTextInput';
import { uiColors, uiRadius, uiSizing, uiSpacing, uiTypography } from '../theme/ui';

type EditProfileNavigationProp = StackNavigationProp<RootStackParamList, 'EditProfile'>;

type EditProfileScreenProps = {
  navigation: EditProfileNavigationProp;
};

export default function EditProfileScreen({ navigation }: EditProfileScreenProps) {
  const [fullName, setFullName] = React.useState('Alex Johnson');
  const [email, setEmail] = React.useState('alex@example.com');
  const [bio, setBio] = React.useState('Người kể chuyện kỹ thuật số và yêu đọc sách. Khám phá điểm giao giữa công nghệ và nghệ thuật.');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable style={styles.iconBtn} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color="#667085" />
          </Pressable>
          <Text style={styles.headerTitle}>Chỉnh sửa hồ sơ</Text>
        </View>

        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.saveText}>Lưu</Text>
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.avatarSection}>
          <View style={styles.avatarWrap}>
            <Image source={require('../assets/profile/profile-avatar.jpg')} style={styles.avatar} />
            <Pressable style={styles.avatarEditBtn}>
              <MaterialIcons name="edit" size={16} color="#FFFFFF" />
            </Pressable>
          </View>
          <Text style={styles.avatarHint}>CẬP NHẬT ẢNH ĐẠI DIỆN</Text>
        </View>

        <View style={styles.formGroup}>
          <AppTextInput
            label="HỌ VÀ TÊN"
            value={fullName}
            onChangeText={setFullName}
            placeholder="Nhập họ và tên"
            inputWrapStyle={styles.formInputContainer}
            style={styles.formInput}
          />
        </View>

        <View style={styles.formGroup}>
          <AppTextInput
            label="EMAIL"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="Nhập email"
            inputWrapStyle={styles.formInputContainer}
            style={styles.formInput}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>TIỂU SỬ</Text>
          <AppTextInput
            value={bio}
            onChangeText={setBio}
            multiline
            textAlignVertical="top"
            placeholder="Giới thiệu ngắn về bạn"
            inputWrapStyle={styles.formInputContainer}
            style={styles.bioInput}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>TÀI KHOẢN LIÊN KẾT</Text>
          <View style={styles.accountCard}>
            <View style={styles.accountLeft}>
              <View style={styles.accountBadge}>
                <Text style={styles.accountBadgeText}>G</Text>
              </View>
              <Text style={styles.accountName}>Google</Text>
            </View>
            <Text style={styles.connectedText}>Đã kết nối</Text>
          </View>

          <View style={[styles.accountCard, styles.accountCardMuted]}>
            <View style={styles.accountLeft}>
              <View style={styles.accountBadge}>
                <Text style={styles.accountBadgeText}>iOS</Text>
              </View>
              <Text style={styles.accountName}>Apple ID</Text>
            </View>
            <Text style={styles.linkText}>Liên kết</Text>
          </View>
        </View>

        <Pressable style={styles.saveBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.saveBtnText}>Lưu thay đổi</Text>
        </Pressable>

        <Text style={styles.updatedText}>Cập nhật gần nhất: 15/06/2024</Text>
      </ScrollView>
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
    flex: 1,
  },
  iconBtn: {
    width: 34,
    height: 34,
    borderRadius: 99,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: uiColors.text,
    fontSize: uiTypography.h3,
    fontWeight: '700',
  },
  saveText: {
    color: uiColors.primaryDeep,
    fontSize: uiTypography.h3,
    fontWeight: '700',
  },
  content: {
    paddingHorizontal: uiSpacing.lg,
    paddingTop: uiSpacing.sm,
    paddingBottom: 26,
    gap: 14,
  },
  avatarSection: {
    alignItems: 'center',
    gap: 10,
    marginBottom: 4,
  },
  avatarWrap: {
    position: 'relative',
  },
  avatar: {
    width: 132,
    height: 132,
    borderRadius: 66,
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  avatarEditBtn: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5341CD',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  avatarHint: {
    color: '#7B8BA3',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.6,
  },
  formGroup: {
    gap: 8,
  },
  label: {
    color: '#546A85',
    fontSize: uiTypography.caption,
    fontWeight: '600',
    letterSpacing: 0.6,
    paddingHorizontal: 4,
  },
  formInputContainer: {
    backgroundColor: uiColors.surface,
    borderRadius: uiRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  formInput: {
    minHeight: uiSizing.inputHeight,
    fontSize: uiTypography.body,
    fontWeight: '500',
  },
  bioInput: {
    minHeight: 150,
    borderRadius: uiRadius.lg,
    backgroundColor: uiColors.surface,
    paddingHorizontal: uiSpacing.lg,
    paddingVertical: 14,
    color: uiColors.text,
    fontSize: uiTypography.body,
    lineHeight: 27,
    fontWeight: '500',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  accountCard: {
    borderRadius: 16,
    backgroundColor: '#F2F3F7',
    minHeight: 74,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  accountCardMuted: {
    opacity: 0.75,
  },
  accountLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  accountBadge: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  accountBadgeText: {
    color: '#2E3134',
    fontSize: 15,
    fontWeight: '700',
  },
  accountName: {
    color: '#2E3134',
    fontSize: 15,
    fontWeight: '600',
  },
  connectedText: {
    color: '#006B55',
    fontSize: 16,
    fontWeight: '600',
  },
  linkText: {
    color: '#6C5CE7',
    fontSize: 16,
    fontWeight: '700',
  },
  saveBtn: {
    marginTop: 10,
    minHeight: 54,
    borderRadius: uiRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5D4AD6',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontSize: uiTypography.body,
    fontWeight: '700',
  },
  updatedText: {
    textAlign: 'center',
    color: uiColors.textSubtle,
    fontSize: uiTypography.bodySm,
    fontWeight: '500',
    marginTop: 4,
  },
});

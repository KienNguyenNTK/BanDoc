import React, { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { RootStackParamList } from '../navigation/AppNavigator';
import AppTextInput from '../components/AppTextInput';
import { Screen } from '../components/ui';
import { uiColors, uiRadius, uiSizing, uiSpacing, uiTypography } from '../theme/ui';

type SignUpNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;

type SignUpScreenProps = {
  navigation: SignUpNavigationProp;
};

const COLORS = {
  background: uiColors.background,
  surface: uiColors.surface,
  primary: uiColors.primary,
  text: uiColors.text,
  mutedText: uiColors.textMuted,
};

export default function SignUpScreen({ navigation }: SignUpScreenProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onCreateAccount = () => {
    navigation.replace('Home');
  };

  return (
    <Screen mode="static" edges={['top']} contentStyle={styles.screenContent}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        <View style={styles.heroWrap}>
          <View style={styles.logoCircle}>
            <MaterialIcons name="auto-awesome" size={34} color="#FFFFFF" />
          </View>
          <Text style={styles.title}>Tạo tài khoản</Text>
          <Text style={styles.subtitle}>Bắt đầu đọc tóm tắt nhanh, xem sơ đồ và hỏi đáp theo ngữ cảnh</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.fieldWrap}>
            <AppTextInput
              label="Họ và tên"
              leftIcon="person"
              placeholder="Nguyễn Văn A"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          <View style={styles.fieldWrap}>
            <AppTextInput
              label="Địa chỉ email"
              leftIcon="mail"
              placeholder="hello@example.vn"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.fieldWrap}>
            <AppTextInput
              label="Mật khẩu"
              leftIcon="lock"
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureToggle
            />
          </View>

          <View style={styles.fieldWrap}>
            <AppTextInput
              label="Xác nhận mật khẩu"
              leftIcon="verified-user"
              placeholder="••••••••"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureToggle
            />
          </View>

          <Pressable onPress={onCreateAccount} style={styles.signUpButton}>
            <Text style={styles.signUpButtonText}>Tạo tài khoản</Text>
            <MaterialIcons name="arrow-forward" size={18} color="#FFFFFF" />
          </Pressable>

          <View style={styles.socialDividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Hoặc tiếp tục với</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.socialGrid}>
            <Pressable style={styles.socialButton}>
              <Image source={require('../assets/icons/google-g.png')} style={styles.googleIcon} />
              <Text style={styles.socialText}>Google</Text>
            </Pressable>
            <Pressable style={styles.socialButton}>
              <FontAwesome5 name="apple" size={18} color={COLORS.text} brand />
              <Text style={styles.socialText}>Apple</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Đã có tài khoản?</Text>
          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text style={styles.footerLink}>Đăng nhập</Text>
          </Pressable>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContent: {
    paddingHorizontal: 0,
  },
  content: {
    paddingHorizontal: uiSpacing.xl,
    paddingBottom: 28,
  },
  brandRow: {
    paddingTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandText: {
    color: COLORS.primary,
    fontSize: 22,
    fontWeight: '800',
  },
  heroWrap: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  logoCircle: {
    width: 82,
    height: 82,
    borderRadius: 26,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  title: {
    marginTop: 14,
    fontSize: 30,
    fontWeight: '800',
    color: COLORS.text,
  },
  subtitle: {
    marginTop: 6,
    color: COLORS.mutedText,
    fontSize: uiTypography.bodySm,
    fontWeight: '600',
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 26,
    padding: uiSpacing.xl,
    borderWidth: 1,
    borderColor: '#C8C4D730',
  },
  fieldWrap: {
    marginBottom: 12,
  },
  signUpButton: {
    marginTop: 8,
    height: uiSizing.buttonHeight,
    borderRadius: uiRadius.lg,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  signUpButtonText: {
    color: '#FFFFFF',
    fontSize: uiTypography.body,
    fontWeight: '800',
  },
  socialDividerRow: {
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#C8C4D760',
  },
  dividerText: {
    fontSize: uiTypography.overline,
    color: uiColors.textSubtle,
    textTransform: 'uppercase',
    fontWeight: '700',
    letterSpacing: 0.9,
  },
  socialGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  socialButton: {
    flex: 1,
    height: 46,
    borderRadius: uiRadius.md,
    borderWidth: 1,
    borderColor: '#C8C4D780',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    backgroundColor: '#FFFFFF',
  },
  googleIcon: {
    width: 18,
    height: 18,
  },
  socialText: {
    color: COLORS.text,
    fontSize: uiTypography.bodySm,
    fontWeight: '700',
  },
  footerRow: {
    marginTop: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  footerText: {
    color: COLORS.mutedText,
    fontSize: uiTypography.bodySm,
    fontWeight: '600',
  },
  footerLink: {
    color: COLORS.primary,
    fontSize: uiTypography.bodySm,
    fontWeight: '800',
  },
});

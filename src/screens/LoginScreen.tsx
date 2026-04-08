import React, { useState } from 'react';
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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { RootStackParamList } from '../navigation/AppNavigator';
import AppTextInput from '../components/AppTextInput';
import { uiColors, uiRadius, uiSizing, uiSpacing, uiTypography } from '../theme/ui';

type LoginNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type LoginScreenProps = {
  navigation: LoginNavigationProp;
};

const COLORS = {
  background: uiColors.background,
  surface: uiColors.surface,
  primary: uiColors.primary,
  text: uiColors.text,
  mutedText: uiColors.textMuted,
};

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => {
    navigation.replace('Home');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroWrap}>
          <View style={styles.blurGlow} />
          <View style={styles.logoBox}>
            <MaterialIcons name="auto-awesome" size={34} color={COLORS.primary} />
          </View>
          <Text style={styles.brand}>Bạn Đọc</Text>
          <Text style={styles.tagline}>Biến sách thành tri thức dễ ứng dụng</Text>
        </View>

        <View style={styles.card}>
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
            <View style={styles.passwordTopRow}>
              <Text style={styles.labelInline}>Mật khẩu</Text>
              <Pressable>
                <Text style={styles.forgotText}>Quên mật khẩu?</Text>
              </Pressable>
            </View>
            <AppTextInput
              leftIcon="lock"
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureToggle
            />
          </View>

          <Pressable onPress={onLogin} style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Đăng nhập</Text>
          </Pressable>

          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Hoặc tiếp tục với</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.socialWrap}>
            <Pressable style={styles.socialButton}>
              <Image source={require('../assets/icons/google-g.png')} style={styles.googleIcon} />
              <Text style={styles.socialText}>Google</Text>
            </Pressable>
            <Pressable style={[styles.socialButton, styles.socialApple]}>
              <FontAwesome5 name="apple" size={18} color="#FFFFFF" brand />
              <Text style={[styles.socialText, styles.socialAppleText]}>Apple</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Chưa có tài khoản?</Text>
          <Pressable onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.footerLink}>Đăng ký</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingHorizontal: uiSpacing.xl,
    paddingBottom: 28,
  },
  heroWrap: {
    alignItems: 'center',
    paddingTop: 34,
    paddingBottom: 26,
    position: 'relative',
  },
  blurGlow: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 120,
    backgroundColor: '#6C5CE728',
    top: -20,
  },
  logoBox: {
    width: 76,
    height: 76,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#6C5CE721',
  },
  brand: {
    marginTop: 16,
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.text,
  },
  tagline: {
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
    marginBottom: 14,
  },
  labelInline: {
    marginBottom: 8,
    marginLeft: 4,
    fontSize: uiTypography.overline,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: '700',
    color: COLORS.mutedText,
  },
  passwordTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  forgotText: {
    fontSize: uiTypography.caption,
    fontWeight: '700',
    color: COLORS.primary,
  },
  loginButton: {
    marginTop: 10,
    height: uiSizing.buttonHeight,
    borderRadius: uiRadius.md,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: uiTypography.body,
    fontWeight: '800',
  },
  dividerRow: {
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
  socialWrap: {
    gap: 10,
  },
  socialButton: {
    height: 48,
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
  socialApple: {
    borderColor: '#000000',
    backgroundColor: '#000000',
  },
  socialText: {
    color: COLORS.text,
    fontSize: uiTypography.bodySm,
    fontWeight: '700',
  },
  socialAppleText: {
    color: '#FFFFFF',
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

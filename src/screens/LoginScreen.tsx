import React, { useState } from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { RootStackParamList } from '../navigation/AppNavigator';

type LoginNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type LoginScreenProps = {
  navigation: LoginNavigationProp;
};

const COLORS = {
  background: '#F8F9FD',
  surface: '#FFFFFF',
  primary: '#6C5CE7',
  primaryDeep: '#5341CD',
  text: '#191C1F',
  mutedText: '#474554',
  border: '#C8C4D7',
  softSurface: '#F2F3F7',
};

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
          <Text style={styles.brand}>BanDoc</Text>
          <Text style={styles.tagline}>Biến sách thành tri thức dễ ứng dụng</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.fieldWrap}>
            <Text style={styles.label}>Địa chỉ email</Text>
            <View style={styles.inputWrap}>
              <MaterialIcons name="mail" size={20} color={COLORS.mutedText} style={styles.leftIcon} />
              <TextInput
                placeholder="hello@bandoc.vn"
                placeholderTextColor="#787586"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
              />
            </View>
          </View>

          <View style={styles.fieldWrap}>
            <View style={styles.passwordTopRow}>
              <Text style={styles.label}>Mật khẩu</Text>
              <Pressable>
                <Text style={styles.forgotText}>Quên mật khẩu?</Text>
              </Pressable>
            </View>
            <View style={styles.inputWrap}>
              <MaterialIcons name="lock" size={20} color={COLORS.mutedText} style={styles.leftIcon} />
              <TextInput
                placeholder="••••••••"
                placeholderTextColor="#787586"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                style={styles.input}
              />
              <Pressable onPress={() => setShowPassword((v) => !v)} style={styles.rightIconButton}>
                <MaterialIcons
                  name={showPassword ? 'visibility-off' : 'visibility'}
                  size={20}
                  color={COLORS.mutedText}
                />
              </Pressable>
            </View>
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
    paddingHorizontal: 22,
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
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 24,
    shadowOpacity: 0.26,
    elevation: 8,
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
    fontWeight: '600',
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 26,
    padding: 20,
    borderWidth: 1,
    borderColor: '#C8C4D730',
    shadowColor: '#191C1F',
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 24,
    shadowOpacity: 0.08,
    elevation: 5,
  },
  fieldWrap: {
    marginBottom: 14,
  },
  label: {
    marginBottom: 8,
    marginLeft: 4,
    fontSize: 11,
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
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
  },
  inputWrap: {
    height: 54,
    borderRadius: 14,
    backgroundColor: COLORS.softSurface,
    justifyContent: 'center',
  },
  leftIcon: {
    position: 'absolute',
    left: 14,
  },
  rightIconButton: {
    position: 'absolute',
    right: 14,
    padding: 2,
  },
  input: {
    height: 54,
    paddingLeft: 44,
    paddingRight: 44,
    color: COLORS.text,
    fontWeight: '600',
  },
  loginButton: {
    marginTop: 10,
    height: 52,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    shadowOpacity: 0.3,
    elevation: 7,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
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
    fontSize: 10,
    color: '#787586',
    textTransform: 'uppercase',
    fontWeight: '700',
    letterSpacing: 0.9,
  },
  socialWrap: {
    gap: 10,
  },
  socialButton: {
    height: 48,
    borderRadius: 14,
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
    fontWeight: '600',
  },
  footerLink: {
    color: COLORS.primary,
    fontWeight: '800',
  },
});

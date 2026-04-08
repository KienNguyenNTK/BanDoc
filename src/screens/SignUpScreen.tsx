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

type SignUpNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;

type SignUpScreenProps = {
  navigation: SignUpNavigationProp;
};

const COLORS = {
  background: '#F8F9FD',
  surface: '#FFFFFF',
  primary: '#6C5CE7',
  text: '#191C1F',
  mutedText: '#474554',
  border: '#C8C4D7',
  softSurface: '#F2F3F7',
};

export default function SignUpScreen({ navigation }: SignUpScreenProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onCreateAccount = () => {
    navigation.replace('Home');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        <View style={styles.heroWrap}>
          <View style={styles.logoCircle}>
            <MaterialIcons name="auto-awesome" size={34} color="#FFFFFF" />
          </View>
          <Text style={styles.title}>Tạo tài khoản</Text>
          <Text style={styles.subtitle}>Bắt đầu hành trình đọc thông minh cùng BanDoc</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.fieldWrap}>
            <Text style={styles.label}>Họ và tên</Text>
            <View style={styles.inputWrap}>
              <MaterialIcons name="person" size={20} color={COLORS.mutedText} style={styles.leftIcon} />
              <TextInput
                placeholder="Nguyễn Văn A"
                placeholderTextColor="#787586"
                value={fullName}
                onChangeText={setFullName}
                style={styles.input}
              />
            </View>
          </View>

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
            <Text style={styles.label}>Mật khẩu</Text>
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

          <View style={styles.fieldWrap}>
            <Text style={styles.label}>Xác nhận mật khẩu</Text>
            <View style={styles.inputWrap}>
              <MaterialIcons
                name="verified-user"
                size={20}
                color={COLORS.mutedText}
                style={styles.leftIcon}
              />
              <TextInput
                placeholder="••••••••"
                placeholderTextColor="#787586"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                style={styles.input}
              />
              <Pressable
                onPress={() => setShowConfirmPassword((v) => !v)}
                style={styles.rightIconButton}
              >
                <MaterialIcons
                  name={showConfirmPassword ? 'visibility-off' : 'visibility'}
                  size={20}
                  color={COLORS.mutedText}
                />
              </Pressable>
            </View>
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
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    shadowOpacity: 0.26,
    elevation: 8,
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
    marginBottom: 12,
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
  inputWrap: {
    height: 52,
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
    height: 52,
    paddingLeft: 44,
    paddingRight: 44,
    color: COLORS.text,
    fontWeight: '600',
  },
  signUpButton: {
    marginTop: 8,
    height: 50,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    shadowOpacity: 0.3,
    elevation: 7,
  },
  signUpButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
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
    fontSize: 10,
    color: '#787586',
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
  socialText: {
    color: COLORS.text,
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
    fontWeight: '600',
  },
  footerLink: {
    color: COLORS.primary,
    fontWeight: '800',
  },
});

import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { uiColors, uiRadius, uiSizing, uiSpacing, uiTypography } from '../theme/ui';

type AppTextInputProps = TextInputProps & {
  label?: string;
  leftIcon?: string;
  secureToggle?: boolean;
  containerStyle?: object;
  inputWrapStyle?: object;
};

export default function AppTextInput({
  label,
  leftIcon,
  secureTextEntry,
  secureToggle = false,
  containerStyle,
  inputWrapStyle,
  style,
  ...props
}: AppTextInputProps) {
  const [showPassword, setShowPassword] = React.useState(false);
  const isSecureField = Boolean(secureTextEntry || secureToggle);

  return (
    <View style={containerStyle}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={[styles.inputWrap, inputWrapStyle]}>
        {leftIcon ? <MaterialIcons name={leftIcon} size={20} color={uiColors.textMuted} style={styles.leftIcon} /> : null}
        <TextInput
          {...props}
          secureTextEntry={isSecureField ? !showPassword : secureTextEntry}
          placeholderTextColor={uiColors.textSubtle}
          style={[styles.input, leftIcon ? styles.inputWithLeftIcon : undefined, style]}
        />
        {isSecureField ? (
          <Pressable onPress={() => setShowPassword((value) => !value)} style={styles.rightIconButton}>
            <MaterialIcons name={showPassword ? 'visibility-off' : 'visibility'} size={20} color={uiColors.textMuted} />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    marginBottom: uiSpacing.sm,
    marginLeft: uiSpacing.xs,
    fontSize: uiTypography.overline,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: '700',
    color: uiColors.textMuted,
  },
  inputWrap: {
    height: uiSizing.inputHeight,
    borderRadius: uiRadius.md,
    backgroundColor: uiColors.surfaceMuted,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E3E8EF',
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
    height: uiSizing.inputHeight,
    paddingLeft: 14,
    paddingRight: 14,
    color: uiColors.text,
    fontWeight: '600',
    fontSize: uiTypography.bodySm,
  },
  inputWithLeftIcon: {
    paddingLeft: 44,
    paddingRight: 44,
  },
});

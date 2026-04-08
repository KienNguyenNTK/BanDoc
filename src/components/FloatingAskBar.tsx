import React from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { uiColors, uiRadius, uiSizing, uiSpacing, uiTypography } from '../theme/ui';

type FloatingAskBarProps = {
  placeholder?: string;
  onOpenFullChat?: () => void;
  onSubmitPrompt?: (prompt: string) => void;
};

const COLORS = {
  primary: uiColors.primary,
  mutedText: uiColors.textMuted,
};

export default function FloatingAskBar({
  placeholder = 'Hỏi Bạn Đọc về sách hoặc chủ đề...',
  onOpenFullChat,
  onSubmitPrompt,
}: FloatingAskBarProps) {
  const [prompt, setPrompt] = React.useState('');
  const insets = useSafeAreaInsets();
  const bottomOffset = uiSizing.bottomNavHeight + Math.max(insets.bottom, 6) + 8;

  const handleSubmit = React.useCallback(() => {
    const trimmedPrompt = prompt.trim();

    if (trimmedPrompt.length > 0) {
      onSubmitPrompt?.(trimmedPrompt);
      setPrompt('');
      return;
    }

    onOpenFullChat?.();
  }, [onOpenFullChat, onSubmitPrompt, prompt]);

  return (
    <View style={[styles.askBarWrap, { bottom: bottomOffset }]}>
      <View style={styles.askBar}>
        <Pressable style={styles.magicButton} onPress={onOpenFullChat}>
          <MaterialIcons name="auto-awesome" size={18} color={COLORS.primary} />
        </Pressable>
        <TextInput
          value={prompt}
          onChangeText={setPrompt}
          placeholder={placeholder}
          placeholderTextColor="#9A97A9"
          style={styles.askBarInput}
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
        />
        <Pressable style={styles.sendButton} onPress={handleSubmit}>
          <MaterialIcons
            name={prompt.trim().length > 0 ? 'arrow-upward' : 'arrow-forward'}
            size={18}
            color={COLORS.primary}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  askBarWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    paddingHorizontal: uiSpacing.xl,
  },
  askBar: {
    height: uiSizing.floatingAskHeight,
    borderRadius: uiRadius.lg,
    backgroundColor: uiColors.surface,
    borderWidth: 1,
    borderColor: '#6C5CE712',
    paddingHorizontal: uiSpacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: uiSpacing.sm,
  },
  magicButton: {
    width: 34,
    height: 34,
    borderRadius: 99,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0EEFF',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  askBarInput: {
    flex: 1,
    color: COLORS.mutedText,
    fontSize: uiTypography.bodySm,
    fontWeight: '600',
    paddingVertical: 0,
    paddingHorizontal: 2,
  },
  sendButton: {
    width: 34,
    height: 34,
    borderRadius: 99,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8E5FB',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
});

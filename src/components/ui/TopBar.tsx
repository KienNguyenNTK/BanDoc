import React from 'react';
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { uiColors, uiSpacing, uiTypography } from '../../theme/ui';

export type TopBarTone = 'default' | 'primary';

export type TopBarProps = {
  title: string;
  subtitle?: string;
  badgeText?: string;
  onBack?: () => void;
  left?: ReactNode;
  right?: ReactNode;
  tone?: TopBarTone;
};

export function TopBar({
  title,
  subtitle,
  badgeText,
  onBack,
  left,
  right,
  tone = 'default',
}: TopBarProps) {
  const backColor = tone === 'primary' ? uiColors.primary : uiColors.text;

  return (
    <View style={styles.wrap}>
      <View style={styles.left}>
        {left ? (
          left
        ) : onBack ? (
          <Pressable accessibilityRole="button" style={styles.iconBtn} onPress={onBack}>
            <MaterialIcons name="arrow-back" size={22} color={backColor} />
          </Pressable>
        ) : null}

        <View style={styles.titleBlock}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          {subtitle ? (
            <Text style={styles.subtitle} numberOfLines={1}>
              {subtitle}
            </Text>
          ) : null}
        </View>

        {badgeText ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badgeText}</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.right}>{right}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: uiSpacing.xl,
    paddingTop: uiSpacing.sm,
    paddingBottom: uiSpacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: uiColors.background,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: uiSpacing.sm,
    flex: 1,
    paddingRight: uiSpacing.sm,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: uiSpacing.sm,
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 99,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: uiColors.surface,
    borderWidth: 1,
    borderColor: uiColors.borderSoft,
  },
  titleBlock: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    fontSize: uiTypography.h2,
    fontWeight: '800',
    color: uiColors.text,
  },
  subtitle: {
    marginTop: 2,
    fontSize: uiTypography.bodySm,
    fontWeight: '600',
    color: uiColors.textSubtle,
  },
  badge: {
    paddingHorizontal: uiSpacing.sm,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: uiColors.surfaceMuted,
    borderWidth: 1,
    borderColor: uiColors.borderSoft,
  },
  badgeText: {
    fontSize: uiTypography.overline,
    fontWeight: '800',
    letterSpacing: 0.8,
    color: uiColors.textMuted,
  },
});


import React from 'react';
import type { ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { uiColors, uiRadius, uiSpacing } from '../../theme/ui';

export type CardVariant = 'default' | 'muted' | 'outlined';

export type CardProps = {
  children: ReactNode;
  variant?: CardVariant;
  style?: StyleProp<ViewStyle>;
};

export function Card({ children, variant = 'default', style }: CardProps) {
  return <View style={[styles.base, variantStyles[variant], style]}>{children}</View>;
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: uiColors.surface,
    borderRadius: uiRadius.lg,
    padding: uiSpacing.lg,
    borderWidth: 1,
    borderColor: uiColors.borderSoft,
  },
  muted: {
    backgroundColor: uiColors.surfaceMuted,
  },
  outlined: {
    backgroundColor: uiColors.surface,
    borderColor: uiColors.border,
  },
});

const variantStyles: Record<CardVariant, ViewStyle> = {
  default: {},
  muted: styles.muted,
  outlined: styles.outlined,
};


import React from 'react';
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { uiColors, uiSpacing, uiTypography } from '../../theme/ui';

export type SectionHeaderProps = {
  title: string;
  rightLabel?: string;
  onRightPress?: () => void;
  rightNode?: ReactNode;
  style?: object;
};

export function SectionHeader({ title, rightLabel, onRightPress, rightNode, style }: SectionHeaderProps) {
  return (
    <View style={[styles.row, style]}>
      <Text style={styles.title}>{title}</Text>
      {rightNode ? (
        rightNode
      ) : rightLabel ? (
        <Pressable
          accessibilityRole="button"
          onPress={onRightPress}
          style={styles.rightPressable}
          hitSlop={8}
        >
          <Text style={styles.rightLabel}>{rightLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: uiSpacing.xl,
    marginBottom: uiSpacing.md,
    gap: uiSpacing.md,
  },
  title: {
    fontSize: uiTypography.h3,
    fontWeight: '800',
    color: uiColors.text,
  },
  rightPressable: {
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 10,
  },
  rightLabel: {
    fontSize: uiTypography.bodySm,
    fontWeight: '700',
    color: uiColors.primary,
  },
});


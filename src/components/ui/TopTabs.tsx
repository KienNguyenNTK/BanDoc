import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { uiColors, uiRadius, uiSizing, uiSpacing, uiTypography } from '../../theme/ui';

type TabOption<T extends string> = {
  key: T;
  label: string;
};

export type TopTabsProps<T extends string> = {
  value: T;
  options: Array<TabOption<T>>;
  onChange: (value: T) => void;
};

export function TopTabs<T extends string>({ value, options, onChange }: TopTabsProps<T>) {
  return (
    <View style={styles.wrap}>
      {options.map((option) => {
        const active = option.key === value;
        return (
          <Pressable
            key={option.key}
            accessibilityRole="button"
            style={[styles.tab, active ? styles.tabActive : undefined]}
            onPress={() => onChange(option.key)}
          >
            <Text style={[styles.text, active ? styles.textActive : undefined]}>{option.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    gap: uiSpacing.sm,
    paddingHorizontal: uiSpacing.xl,
    paddingBottom: uiSpacing.sm,
  },
  tab: {
    flex: 1,
    minHeight: uiSizing.tabHeight,
    borderRadius: uiRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: uiColors.surface,
    borderWidth: 1,
    borderColor: uiColors.borderSoft,
  },
  tabActive: {
    backgroundColor: uiColors.primary,
    borderColor: uiColors.primary,
  },
  text: {
    fontSize: uiTypography.bodySm,
    fontWeight: '700',
    color: uiColors.textMuted,
  },
  textActive: {
    color: '#FFFFFF',
  },
});


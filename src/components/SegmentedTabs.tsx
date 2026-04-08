import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { uiColors, uiRadius, uiSizing, uiSpacing, uiTypography } from '../theme/ui';

type TabOption<T extends string> = {
  key: T;
  label: string;
};

type SegmentedTabsProps<T extends string> = {
  value: T;
  options: Array<TabOption<T>>;
  onChange: (value: T) => void;
};

export default function SegmentedTabs<T extends string>({ value, options, onChange }: SegmentedTabsProps<T>) {
  return (
    <View style={styles.wrap}>
      {options.map((option) => {
        const active = option.key === value;

        return (
          <Pressable
            key={option.key}
            style={[styles.button, active ? styles.buttonActive : undefined]}
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
    borderRadius: uiRadius.lg,
    backgroundColor: '#E7E8EC',
    padding: uiSpacing.xs,
    gap: uiSpacing.xs,
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  button: {
    flex: 1,
    minHeight: uiSizing.tabHeight,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: uiSpacing.md,
  },
  buttonActive: {
    backgroundColor: uiColors.primary,
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  text: {
    color: uiColors.textMuted,
    fontSize: uiTypography.bodySm,
    fontWeight: '600',
  },
  textActive: {
    color: '#FFFFFF',
  },
});

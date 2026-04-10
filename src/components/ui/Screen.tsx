import React from 'react';
import type { ReactNode } from 'react';
import type { Edge } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { uiColors, uiSpacing } from '../../theme/ui';

type ScreenMode = 'scroll' | 'static';

export type ScreenProps = {
  children: ReactNode;
  mode?: ScreenMode;
  edges?: Edge[];
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
};

export function Screen({
  children,
  mode = 'scroll',
  edges = ['top'],
  style,
  contentStyle,
}: ScreenProps) {
  return (
    <SafeAreaView edges={edges} style={[styles.safeArea, style]}>
      {mode === 'scroll' ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.scrollContent, contentStyle]}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.staticContent, contentStyle]}>{children}</View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: uiColors.background,
  },
  scrollContent: {
    paddingHorizontal: uiSpacing.xl,
    paddingBottom: uiSpacing.xl,
  },
  staticContent: {
    flex: 1,
    paddingHorizontal: uiSpacing.xl,
  },
});


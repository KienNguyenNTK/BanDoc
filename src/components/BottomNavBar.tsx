import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from '../navigation/AppNavigator';
import { uiColors, uiSizing, uiTypography } from '../theme/ui';

type BottomTab = 'home' | 'search' | 'ai' | 'library' | 'profile';

type BottomNavBarProps = {
  activeTab?: BottomTab;
};

const COLORS = {
  primary: uiColors.primary,
  inactive: '#A0A3B1',
};

const ITEMS: Array<{ key: BottomTab; label: string; icon: string }> = [
  { key: 'home', label: 'Trang chủ', icon: 'home' },
  { key: 'search', label: 'Tìm kiếm', icon: 'search' },
  { key: 'ai', label: 'AI', icon: 'auto-awesome' },
  { key: 'library', label: 'Thư viện', icon: 'local-library' },
  { key: 'profile', label: 'Cá nhân', icon: 'person' },
];

export default function BottomNavBar({ activeTab = 'home' }: BottomNavBarProps) {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handlePress = (tab: BottomTab) => {
    if (tab === activeTab) {
      return;
    }

    if (tab === 'home') {
      navigation.navigate('Home');
      return;
    }

    if (tab === 'search') {
      navigation.navigate('Search');
      return;
    }

    if (tab === 'ai') {
      navigation.navigate('AskAI', {});
      return;
    }

    if (tab === 'library') {
      navigation.navigate('Library');
      return;
    }

    if (tab === 'profile') {
      navigation.navigate('Profile');
    }
  };

  return (
    <View style={styles.bottomNav}>
      {ITEMS.map((item) => {
        const active = item.key === activeTab;

        return (
          <Pressable key={item.key} style={styles.navItem} onPress={() => handlePress(item.key)}>
            <MaterialIcons name={item.icon} size={22} color={active ? COLORS.primary : COLORS.inactive} />
            <Text
              style={[styles.navText, active ? styles.navTextActive : undefined]}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.85}
              allowFontScaling={false}
            >
              {item.label}
            </Text>
            {active ? <View style={styles.navActiveDot} /> : null}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: uiSizing.bottomNavHeight,
    borderTopWidth: 1,
    borderTopColor: uiColors.borderSoft,
    backgroundColor: uiColors.surface,
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
  },
  navText: {
    color: COLORS.inactive,
    fontSize: uiTypography.overline,
    lineHeight: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.2,
    textAlign: 'center',
    width: '100%',
  },
  navTextActive: {
    color: COLORS.primary,
  },
  navActiveDot: {
    marginTop: 1,
    width: 5,
    height: 5,
    borderRadius: 99,
    backgroundColor: COLORS.primary,
  },
});

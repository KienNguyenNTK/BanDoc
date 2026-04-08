import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type BottomTab = 'home' | 'search' | 'ai' | 'library' | 'profile';

type BottomNavBarProps = {
  activeTab?: BottomTab;
};

const COLORS = {
  primary: '#6C5CE7',
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
  return (
    <View style={styles.bottomNav}>
      {ITEMS.map((item) => {
        const active = item.key === activeTab;

        return (
          <Pressable key={item.key} style={styles.navItem}>
            <MaterialIcons name={item.icon} size={22} color={active ? COLORS.primary : COLORS.inactive} />
            <Text style={[styles.navText, active ? styles.navTextActive : undefined]}>{item.label}</Text>
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
    height: 68,
    borderTopWidth: 1,
    borderTopColor: '#E4E2EE',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    paddingHorizontal: 6,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
  },
  navText: {
    color: COLORS.inactive,
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
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

import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type FloatingAskBarProps = {
  text?: string;
  onPress?: () => void;
};

const COLORS = {
  primary: '#6C5CE7',
  mutedText: '#474554',
};

export default function FloatingAskBar({ text = 'Hỏi BanDoc nên học gì tiếp theo', onPress }: FloatingAskBarProps) {
  return (
    <View style={styles.askBarWrap}>
      <Pressable style={styles.askBar} onPress={onPress}>
        <MaterialIcons name="auto-awesome" size={20} color={COLORS.primary} />
        <Text style={styles.askBarText}>{text}</Text>
        <MaterialIcons name="arrow-forward" size={18} color="#787586" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  askBarWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 76,
    paddingHorizontal: 20,
  },
  askBar: {
    height: 50,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#6C5CE712',
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    shadowColor: '#191C1F',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 5,
  },
  askBarText: {
    flex: 1,
    color: COLORS.mutedText,
    fontSize: 13,
    fontWeight: '600',
  },
});

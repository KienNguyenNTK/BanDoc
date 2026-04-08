import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import ScreenContainer from '../components/ScreenContainer';
import { RootStackParamList } from '../navigation/AppNavigator';

type ReaderScreenRouteProp = RouteProp<RootStackParamList, 'Reader'>;

type ReaderScreenProps = {
  route: ReaderScreenRouteProp;
};

export default function ReaderScreen({ route }: ReaderScreenProps) {
  const { bookId, title } = route.params;

  return (
    <ScreenContainer>
      <Text style={styles.heading}>Màn hình đọc</Text>
      <Text style={styles.text}>Đang đọc sách: {title}</Text>
      <Text style={styles.text}>Mã sách: {bookId}</Text>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
    color: '#111827',
  },
  text: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 8,
  },
});

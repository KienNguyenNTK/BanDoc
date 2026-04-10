import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Screen, TopBar } from '../components/ui';
import { uiSpacing } from '../theme/ui';

type NotificationsNavigationProp = StackNavigationProp<RootStackParamList, 'Notifications'>;

type NotificationsScreenProps = {
  navigation: NotificationsNavigationProp;
};

type NotificationCategory = 'all' | 'uploads' | 'recommendations' | 'account';

type NotificationItem = {
  id: string;
  title: string;
  message: string;
  time: string;
  category: Exclude<NotificationCategory, 'all'>;
  icon: string;
  iconBg: string;
  iconColor: string;
  actionLabel?: string;
  actionType?: 'soft' | 'primary';
  statusLabel?: string;
};

const FILTERS: Array<{ key: NotificationCategory; label: string }> = [
  { key: 'all', label: 'Tất cả' },
  { key: 'uploads', label: 'Tải lên' },
  { key: 'recommendations', label: 'Gợi ý' },
  { key: 'account', label: 'Tài khoản' },
];

const NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n-1',
    title: 'Tóm tắt của bạn đã sẵn sàng',
    message: 'World History Notes đã sẵn sàng để đọc tóm tắt, xem sơ đồ và hỏi đáp.',
    time: '2 phút trước',
    category: 'uploads',
    icon: 'cloud-done',
    iconBg: '#E4DFFF',
    iconColor: '#5341CD',
    actionLabel: 'Mở tóm tắt',
    actionType: 'soft',
  },
  {
    id: 'n-2',
    title: 'Tóm tắt đã sẵn sàng',
    message: 'Sơ đồ đang tiếp tục xử lý cho World History Notes.',
    time: 'Hôm nay',
    category: 'uploads',
    icon: 'auto-awesome',
    iconBg: '#6DFAD2',
    iconColor: '#00725B',
    statusLabel: 'Đang xử lý',
  },
  {
    id: 'n-3',
    title: 'Gợi ý tóm tắt mới',
    message: 'Dựa trên sở thích tâm lý học, bạn có thể thích Tư duy nhanh và chậm.',
    time: 'Hôm qua',
    category: 'recommendations',
    icon: 'recommend',
    iconBg: '#FFDCC3',
    iconColor: '#884800',
    actionLabel: 'Xem tóm tắt',
    actionType: 'soft',
  },
  {
    id: 'n-4',
    title: 'Gói Premium sẽ gia hạn vào ngày mai',
    message: 'Bạn có thể quản lý gói bất cứ lúc nào trong Hồ sơ.',
    time: '12 Th01',
    category: 'account',
    icon: 'account-balance-wallet',
    iconBg: '#E7E8EC',
    iconColor: '#191C1F',
    actionLabel: 'Quản lý gói',
    actionType: 'primary',
  },
];

export default function NotificationsScreen({ navigation }: NotificationsScreenProps) {
  const [activeFilter, setActiveFilter] = React.useState<NotificationCategory>('all');

  const list = React.useMemo(() => {
    if (activeFilter === 'all') {
      return NOTIFICATIONS;
    }

    return NOTIFICATIONS.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  return (
    <Screen mode="static" edges={['top']} contentStyle={styles.screenContent}>
      <TopBar
        title="Thông báo"
        onBack={() => navigation.goBack()}
        right={
          <Pressable style={styles.iconBtn}>
            <MaterialIcons name="filter-list" size={23} color="#5E6274" />
          </Pressable>
        }
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
          {FILTERS.map((filter) => {
            const active = activeFilter === filter.key;

            return (
              <Pressable
                key={filter.key}
                style={[styles.filterChip, active ? styles.filterChipActive : undefined]}
                onPress={() => setActiveFilter(filter.key)}
              >
                <Text style={[styles.filterText, active ? styles.filterTextActive : undefined]}>{filter.label}</Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={styles.listWrap}>
          {list.map((item) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.cardTop}>
                <View style={styles.iconAndContent}>
                  <View style={[styles.cardIconWrap, { backgroundColor: item.iconBg }]}>
                    <MaterialIcons name={item.icon} size={22} color={item.iconColor} />
                  </View>
                  <View style={styles.cardContent}>
                    <View style={styles.titleRow}>
                      <Text style={styles.cardTitle}>{item.title}</Text>
                      {item.statusLabel ? <Text style={styles.statusPill}>{item.statusLabel}</Text> : null}
                    </View>
                    <Text style={styles.cardMessage}>{item.message}</Text>
                    <Text style={styles.cardTime}>{item.time}</Text>
                  </View>
                </View>
              </View>

              {item.actionLabel ? (
                <View style={styles.actionRow}>
                  <Pressable style={item.actionType === 'primary' ? styles.primaryBtn : styles.softBtn}>
                    <Text style={item.actionType === 'primary' ? styles.primaryBtnText : styles.softBtnText}>
                      {item.actionLabel}
                    </Text>
                  </Pressable>
                </View>
              ) : null}
            </View>
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContent: {
    paddingHorizontal: 0,
  },
  iconBtn: {
    width: 34,
    height: 34,
    borderRadius: 99,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: uiSpacing.lg,
    paddingBottom: 26,
    gap: 14,
  },
  filterRow: {
    gap: 10,
    paddingVertical: 10,
  },
  filterChip: {
    borderRadius: 999,
    paddingHorizontal: 22,
    paddingVertical: 12,
    backgroundColor: '#EEF0F4',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  filterChipActive: {
    backgroundColor: '#5341CD',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  filterText: {
    fontSize: 15,
    color: '#343449',
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  listWrap: {
    gap: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingVertical: 18,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  cardTop: {
    flexDirection: 'row',
    gap: 12,
  },
  iconAndContent: {
    flexDirection: 'row',
    gap: 12,
    flex: 1,
  },
  cardIconWrap: {
    width: 64 / 1.4,
    height: 64 / 1.4,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  cardTitle: {
    color: '#191C1F',
    fontSize: 16.67,
    lineHeight: 27,
    fontWeight: '700',
    flex: 1,
  },
  statusPill: {
    backgroundColor: '#B9F4E3',
    color: '#00725B',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.7,
    textTransform: 'uppercase',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  cardMessage: {
    marginTop: 2,
    color: '#474554',
    fontSize: 13.85,
    lineHeight: 29.23,
    fontWeight: '500',
  },
  cardTime: {
    marginTop: 8,
    color: '#787586',
    fontSize: 15.5,
    fontWeight: '500',
  },
  actionRow: {
    paddingLeft: 58,
    marginTop: 12,
  },
  softBtn: {
    alignSelf: 'flex-start',
    backgroundColor: '#E7E8EC',
    borderRadius: 12,
    paddingHorizontal: 26,
    paddingVertical: 9,
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  softBtnText: {
    color: '#5341CD',
    fontSize: 13.33,
    fontWeight: '700',
  },
  primaryBtn: {
    alignSelf: 'flex-start',
    backgroundColor: '#5341CD',
    borderRadius: 12,
    paddingHorizontal: 26,
    paddingVertical: 11,
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 13.33,
    fontWeight: '700',
  },
});
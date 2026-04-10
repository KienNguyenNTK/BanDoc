import React from 'react';
import { Animated, Easing, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from '../navigation/AppNavigator';
import { uiColors, uiSpacing } from '../theme/ui';

type UploadManagementNavigationProp = StackNavigationProp<RootStackParamList, 'UploadManagement'>;

type UploadManagementScreenProps = {
  navigation: UploadManagementNavigationProp;
};

type ProcessStep = {
  id: string;
  label: string;
  state: 'done' | 'active' | 'pending';
};

type RecentUpload = {
  id: string;
  title: string;
  status: 'ready' | 'processing' | 'failed';
  meta?: string;
};

const INITIAL_STEPS: ProcessStep[] = [
  { id: 'extract', label: 'Trích xuất văn bản', state: 'done' },
  { id: 'summary', label: 'Tạo tóm tắt nội dung', state: 'active' },
  { id: 'graph', label: 'Xây dựng sơ đồ kiến thức', state: 'pending' },
  { id: 'audio', label: 'Tạo audio', state: 'pending' },
];

const INITIAL_UPLOADS: RecentUpload[] = [
  { id: 'r1', title: 'Modern Philosophy.pdf', status: 'ready', meta: '2 giờ trước' },
  { id: 'r2', title: 'Deep Work Notes.epub', status: 'processing' },
  { id: 'r3', title: 'History Lecture Scan.pdf', status: 'failed' },
];

export default function UploadManagementScreen({ navigation }: UploadManagementScreenProps) {
  const [steps, setSteps] = React.useState<ProcessStep[]>(INITIAL_STEPS);
  const [currentFile, setCurrentFile] = React.useState('World History Notes.pdf');
  const [currentStatus, setCurrentStatus] = React.useState('Đang tóm tắt');
  const [currentMeta, setCurrentMeta] = React.useState('4.2 MB • Đang xử lý');
  const [uploads, setUploads] = React.useState<RecentUpload[]>(INITIAL_UPLOADS);
  const spinAnim = React.useRef(new Animated.Value(0)).current;
  const pulseAnim = React.useRef(new Animated.Value(0)).current;
  const entranceAnim = React.useRef(new Animated.Value(0)).current;

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const pulseScale = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.12],
  });

  const pulseOpacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.75, 1],
  });

  const getEntranceStyle = (order: number) => ({
    opacity: entranceAnim,
    transform: [
      {
        translateY: entranceAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [14 + order * 4, 0],
        }),
      },
    ],
  });

  React.useEffect(() => {
    const spinLoop = Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 1200,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    Animated.timing(entranceAnim, {
      toValue: 1,
      duration: 450,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();

    spinLoop.start();
    pulseLoop.start();

    return () => {
      spinLoop.stop();
      pulseLoop.stop();
      spinAnim.stopAnimation();
      pulseAnim.stopAnimation();
    };
  }, [entranceAnim, pulseAnim, spinAnim]);

  const startMockPipeline = React.useCallback((fileName: string) => {
    setCurrentFile(fileName);
    setCurrentMeta('3.8 MB • Đang xử lý');
    setCurrentStatus('Đang tóm tắt');
    setSteps(INITIAL_STEPS);

    const stage2 = setTimeout(() => {
      setSteps([
        { id: 'extract', label: 'Trích xuất văn bản', state: 'done' },
        { id: 'summary', label: 'Tạo tóm tắt nội dung', state: 'done' },
        { id: 'graph', label: 'Xây dựng sơ đồ kiến thức', state: 'active' },
        { id: 'audio', label: 'Tạo audio', state: 'pending' },
      ]);
      setCurrentStatus('Đang dựng sơ đồ');
    }, 2500);

    const stage3 = setTimeout(() => {
      setSteps([
        { id: 'extract', label: 'Trích xuất văn bản', state: 'done' },
        { id: 'summary', label: 'Tạo tóm tắt nội dung', state: 'done' },
        { id: 'graph', label: 'Xây dựng sơ đồ kiến thức', state: 'done' },
        { id: 'audio', label: 'Tạo audio', state: 'pending' },
      ]);
      setCurrentStatus('Đã có tóm tắt và sơ đồ');
      setCurrentMeta('3.8 MB • Sẵn sàng');
      setUploads((prev) => [{ id: String(Date.now()), title: fileName, status: 'ready', meta: 'Vừa xong' }, ...prev]);
    }, 5000);

    return () => {
      clearTimeout(stage2);
      clearTimeout(stage3);
    };
  }, []);

  const onSelectFile = () => {
    const name = `Tai_lieu_moi_${Math.floor(Math.random() * 100)}.pdf`;
    startMockPipeline(name).catch(() => {
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable style={styles.iconBtn} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color="#191C1F" />
          </Pressable>
          <Text style={styles.headerTitle}>Quản lý tải lên</Text>
        </View>
        <Pressable style={styles.helpBtn}>
          <MaterialIcons name="help" size={20} color="#5341CD" />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Animated.View style={[styles.heroCard, getEntranceStyle(0)]}>
          <Text style={styles.heroTitle}>Xử lý thông minh</Text>
          <Text style={styles.heroDesc}>
            Chuyển tài liệu tĩnh thành tri thức tương tác bằng AI: tóm tắt, sơ đồ và audio.
          </Text>
          <View style={styles.heroChipRow}>
            <View style={styles.heroChip}>
              <MaterialIcons name="description" size={15} color="#FFFFFF" />
              <Text style={styles.heroChipText}>Tóm tắt</Text>
            </View>
            <View style={styles.heroChip}>
              <MaterialIcons name="hub" size={15} color="#FFFFFF" />
              <Text style={styles.heroChipText}>Sơ đồ</Text>
            </View>
            <View style={styles.heroChip}>
              <MaterialIcons name="record-voice-over" size={15} color="#FFFFFF" />
              <Text style={styles.heroChipText}>Audio</Text>
            </View>
          </View>
        </Animated.View>

        <Animated.View style={[styles.selectCard, getEntranceStyle(1)]}>
          <View style={styles.uploadIconWrap}>
            <MaterialIcons name="upload-file" size={34} color="#5341CD" />
          </View>

          <Pressable style={styles.selectBtn} onPress={onSelectFile}>
            <Text style={styles.selectBtnText}>Chọn tệp</Text>
          </Pressable>
          <Text style={styles.selectHint}>Hỗ trợ định dạng: PDF, EPUB</Text>

          <View style={styles.featureRow}>
            <View style={styles.featureItem}>
              <MaterialIcons name="verified-user" size={20} color="#676767" />
              <Text style={styles.featureText}>AN TOÀN</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialIcons name="bolt" size={20} color="#676767" />
              <Text style={styles.featureText}>NHANH</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialIcons name="auto-awesome" size={20} color="#676767" />
              <Text style={styles.featureText}>AI READY</Text>
            </View>
          </View>
        </Animated.View>

        <Animated.View style={[styles.processingCard, getEntranceStyle(2)]}>
          <View style={styles.processingHead}>
            <View style={styles.fileHeadLeft}>
              <View style={styles.fileIconWrap}>
                <MaterialIcons name="description" size={21} color="#5341CD" />
              </View>
              <View>
                <Text style={styles.fileTitle}>{currentFile}</Text>
                <Text style={styles.fileMeta}>{currentMeta}</Text>
              </View>
            </View>
            <Animated.View
              style={[
                styles.statusPill,
                currentStatus.includes('Đang')
                  ? {
                      opacity: pulseOpacity,
                      transform: [{ scale: pulseScale }],
                    }
                  : undefined,
              ]}
            >
              <Text style={styles.statusText}>{currentStatus}</Text>
            </Animated.View>
          </View>

          <View style={styles.timelineWrap}>
            <View style={styles.timelineLine} />
            {steps.map((step) => {
              const color = step.state === 'done' ? '#00856D' : step.state === 'active' ? '#5341CD' : '#A9A9B2';
              return (
                <View key={step.id} style={styles.stepRow}>
                  <Animated.View
                    style={[
                      styles.stepDot,
                      { backgroundColor: color },
                      step.state === 'active'
                        ? {
                            transform: [{ scale: pulseScale }],
                            opacity: pulseOpacity,
                          }
                        : undefined,
                    ]}
                  />
                  {step.state === 'active' ? (
                    <Animated.View style={{ transform: [{ rotate: spin }] }}>
                      <MaterialIcons name="sync" size={18} color={color} />
                    </Animated.View>
                  ) : (
                    <MaterialIcons name={step.state === 'done' ? 'check-circle' : 'circle'} size={18} color={color} />
                  )}
                  <Text style={[styles.stepText, step.state === 'active' ? styles.stepTextActive : undefined]}>
                    {step.label}
                  </Text>
                </View>
              );
            })}
          </View>

          <View style={styles.processingBottomRow}>
            {['TÓM TẮT', 'SƠ ĐỒ', 'AUDIO'].map((tab, idx) => (
              <Text key={tab} style={[styles.bottomTab, idx === 0 ? styles.bottomTabActive : undefined]}>
                {tab}
              </Text>
            ))}
            <Pressable>
              <MaterialIcons name="close" size={21} color="#5F6072" />
            </Pressable>
          </View>
        </Animated.View>

        <Animated.View style={[styles.actionsCard, getEntranceStyle(3)]}>
          <Pressable style={styles.actionItem}>
            <View style={styles.actionLeft}>
              <MaterialIcons name="edit" size={20} color="#474554" />
              <Text style={styles.actionText}>Đổi tên tệp</Text>
            </View>
            <MaterialIcons name="chevron-right" size={22} color="#747486" />
          </Pressable>

          <View style={styles.actionDivider} />

          <Pressable style={styles.actionItem}>
            <View style={styles.actionLeft}>
              <MaterialIcons name="swap-horiz" size={20} color="#474554" />
              <Text style={styles.actionText}>Thay thế tệp</Text>
            </View>
            <MaterialIcons name="chevron-right" size={22} color="#747486" />
          </Pressable>

          <View style={styles.actionDivider} />

          <Pressable style={styles.actionItem}>
            <View style={styles.actionLeft}>
              <MaterialIcons name="delete" size={20} color="#BA1A1A" />
              <Text style={styles.actionDeleteText}>Xóa tệp</Text>
            </View>
            <MaterialIcons name="chevron-right" size={22} color="#B7B8C3" />
          </Pressable>
        </Animated.View>

        <Animated.View style={[styles.recentSection, getEntranceStyle(4)]}>
          <Text style={styles.recentTitle}>Tải lên gần đây</Text>
          <View style={styles.recentList}>
            {uploads.map((item) => {
              const statusStyle =
                item.status === 'ready'
                  ? styles.readyTag
                  : item.status === 'failed'
                    ? styles.failedTag
                    : styles.processingTag;
              const statusText =
                item.status === 'ready' ? 'SẴN SÀNG' : item.status === 'failed' ? 'THẤT BẠI' : 'ĐANG XỬ LÝ';

              return (
                <View key={item.id} style={styles.recentItem}>
                  <View style={styles.recentLeft}>
                    <View
                      style={[
                        styles.recentIconWrap,
                        item.status === 'failed' ? styles.recentIconFailed : undefined,
                        item.status === 'processing' ? styles.recentIconProcessing : undefined,
                      ]}
                    >
                      <MaterialIcons
                        name={item.status === 'failed' ? 'warning' : item.status === 'processing' ? 'auto-stories' : 'description'}
                        size={20}
                        color={item.status === 'failed' ? '#BA1A1A' : '#5341CD'}
                      />
                    </View>
                    <View>
                      <Text style={styles.recentItemTitle}>{item.title}</Text>
                      <View style={styles.recentMetaRow}>
                        <Text style={[styles.statusTag, statusStyle]}>{statusText}</Text>
                        {item.meta ? <Text style={styles.recentMetaText}>{item.meta}</Text> : null}
                      </View>
                    </View>
                  </View>

                  {item.status === 'ready' ? (
                    <Pressable style={styles.openBtn}>
                      <Text style={styles.openBtnText}>MỞ</Text>
                    </Pressable>
                  ) : item.status === 'failed' ? (
                    <Pressable style={styles.retryBtn}>
                      <Text style={styles.retryBtnText}>THỬ LẠI</Text>
                    </Pressable>
                  ) : (
                    <Animated.View style={[styles.processingSpinner, { transform: [{ rotate: spin }] }]} />
                  )}
                </View>
              );
            })}
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: uiColors.background,
  },
  header: {
    height: 64,
    paddingHorizontal: uiSpacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconBtn: {
    width: 34,
    height: 34,
    borderRadius: 99,
    alignItems: 'center',
    justifyContent: 'center',
  },
  helpBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E9E9EF',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  headerTitle: {
    color: '#191C1F',
    fontSize: 18.75,
    fontWeight: '700',
  },
  content: {
    paddingHorizontal: uiSpacing.lg,
    paddingTop: 8,
    paddingBottom: 30,
    gap: 14,
  },
  heroCard: {
    borderRadius: 16,
    backgroundColor: '#6C5CE7',
    paddingHorizontal: 18,
    paddingVertical: 18,
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 17.6,
    fontWeight: '800',
  },
  heroDesc: {
    marginTop: 8,
    color: '#EAE5FF',
    fontSize: 11.54,
    lineHeight: 23.08,
    maxWidth: 290,
  },
  heroChipRow: {
    marginTop: 14,
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  heroChip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#9F93F2',
    paddingHorizontal: 10,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  heroChipText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  selectCard: {
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    paddingVertical: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  uploadIconWrap: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#EDEEF2',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  selectBtn: {
    marginTop: 14,
    borderRadius: 16,
    backgroundColor: '#5341CD',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  selectBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  selectHint: {
    marginTop: 10,
    color: '#474554',
    fontSize: 13,
    fontWeight: '500',
  },
  featureRow: {
    marginTop: 18,
    flexDirection: 'row',
    gap: 36,
  },
  featureItem: {
    alignItems: 'center',
    gap: 4,
  },
  featureText: {
    color: '#656677',
    fontSize: 10,
    letterSpacing: 0.8,
    fontWeight: '700',
  },
  processingCard: {
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  processingHead: {
    paddingHorizontal: uiSpacing.lg,
    paddingTop: 16,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  fileHeadLeft: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    flex: 1,
  },
  fileIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F2F7',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  fileTitle: {
    color: '#191C1F',
    fontSize: 17,
    fontWeight: '700',
    maxWidth: 170,
  },
  fileMeta: {
    marginTop: 2,
    color: '#626273',
    fontSize: 13,
    fontWeight: '500',
  },
  statusPill: {
    borderRadius: 999,
    backgroundColor: '#BFF5E8',
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  statusText: {
    color: '#006F58',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.7,
    textTransform: 'uppercase',
  },
  timelineWrap: {
    paddingHorizontal: uiSpacing.lg,
    paddingBottom: 16,
    paddingTop: 6,
    gap: 12,
  },
  timelineLine: {
    position: 'absolute',
    left: 22,
    top: 12,
    bottom: 18,
    width: 2,
    backgroundColor: '#ECECF2',
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingLeft: 14,
  },
  stepDot: {
    width: 10,
    height: 10,
    borderRadius: 99,
  },
  stepText: {
    color: '#7A7B8A',
    fontSize: 15,
    fontWeight: '500',
  },
  stepTextActive: {
    color: '#5341CD',
    fontWeight: '700',
  },
  processingBottomRow: {
    borderTopWidth: 1,
    borderTopColor: '#ECECF2',
    backgroundColor: '#F4F5F9',
    paddingHorizontal: uiSpacing.lg,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  bottomTab: {
    color: '#9EA0AD',
    fontSize: 12,
    fontWeight: '800',
  },
  bottomTabActive: {
    color: '#5341CD',
  },
  actionsCard: {
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  actionItem: {
    paddingHorizontal: uiSpacing.lg,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionText: {
    color: '#191C1F',
    fontSize: 15,
    fontWeight: '500',
  },
  actionDeleteText: {
    color: '#BA1A1A',
    fontSize: 15,
    fontWeight: '500',
  },
  actionDivider: {
    marginHorizontal: 16,
    height: 1,
    backgroundColor: '#ECECF2',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  recentSection: {
    gap: 10,
  },
  recentTitle: {
    color: '#474554',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 2,
    textTransform: 'uppercase',
    paddingHorizontal: 4,
  },
  recentList: {
    gap: 10,
  },
  recentItem: {
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  recentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  recentIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0EEFB',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  recentIconProcessing: {
    backgroundColor: '#F2F3F7',
  },
  recentIconFailed: {
    backgroundColor: '#FEEDEA',
  },
  recentItemTitle: {
    color: '#191C1F',
    fontSize: 16,
    fontWeight: '600',
  },
  recentMetaRow: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    marginTop: 3,
  },
  statusTag: {
    fontSize: 9,
    fontWeight: '800',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    overflow: 'hidden',
  },
  readyTag: {
    color: '#006B55',
    backgroundColor: '#D4FCEC',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  processingTag: {
    color: '#4C4F5F',
    backgroundColor: '#EBECF3',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  failedTag: {
    color: '#BA1A1A',
    backgroundColor: '#FFDAD6',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  recentMetaText: {
    color: '#7A7B8A',
    fontSize: 11,
    fontWeight: '500',
  },
  openBtn: {
    borderRadius: 999,
    backgroundColor: '#ECECF2',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  openBtnText: {
    color: '#5341CD',
    fontSize: 12,
    fontWeight: '800',
  },
  retryBtn: {
    borderRadius: 999,
    backgroundColor: '#FFEAEA',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  retryBtnText: {
    color: '#BA1A1A',
    fontSize: 12,
    fontWeight: '800',
  },
  processingSpinner: {
    width: 34,
    height: 34,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#D6D7E1',
    borderTopColor: '#5341CD',
  },
});
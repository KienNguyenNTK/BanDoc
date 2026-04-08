import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  LayoutAnimation,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  UIManager,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from '../navigation/AppNavigator';
import { uiColors, uiSpacing } from '../theme/ui';

const ONBOARDING_DONE_KEY = 'app.onboarding.completed';

type OnboardingNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Onboarding'
>;

type OnboardingScreenProps = {
  navigation: OnboardingNavigationProp;
};

type Goal = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

type Topic = {
  id: string;
  label: string;
  icon: string;
};

type DailyTime = {
  id: string;
  title: string;
  hint: string;
  icon: string;
};

const COLORS = {
  background: '#F8F9FD',
  surface: '#FFFFFF',
  primary: '#6C5CE7',
  primaryDeep: '#5341CD',
  text: '#191C1F',
  mutedText: '#474554',
  border: '#C8C4D7',
  softPrimary: '#6C5CE710',
};

const GOALS: Goal[] = [
  {
    id: 'skills',
    title: 'Học kỹ năng mới',
    description: 'Nâng cao năng lực qua lộ trình học tập có cấu trúc.',
    icon: 'psychology',
  },
  {
    id: 'career',
    title: 'Nâng cao kiến thức nghề nghiệp',
    description: 'Luôn dẫn đầu lĩnh vực với những góc nhìn chuyên sâu.',
    icon: 'work',
  },
  {
    id: 'growth',
    title: 'Phát triển bản thân',
    description: 'Nuôi dưỡng tư duy và xây dựng thói quen tích cực bền vững.',
    icon: 'self-improvement',
  },
  {
    id: 'stories',
    title: 'Thư giãn với những câu chuyện hay',
    description: 'Đắm mình vào thế giới hư cấu và các câu chuyện cuốn hút.',
    icon: 'auto-stories',
  },
  {
    id: 'news',
    title: 'Cập nhật thông tin',
    description: 'Theo dõi sự kiện nổi bật qua bản tin được chọn lọc.',
    icon: 'newspaper',
  },
];

const TOPICS: Topic[] = [
  { id: 'psychology', label: 'Tâm lý học', icon: 'psychology' },
  { id: 'business', label: 'Kinh doanh', icon: 'work' },
  { id: 'technology', label: 'Công nghệ', icon: 'memory' },
  { id: 'history', label: 'Lịch sử', icon: 'account-balance' },
  { id: 'science', label: 'Khoa học', icon: 'science' },
  { id: 'philosophy', label: 'Triết học', icon: 'menu-book' },
  { id: 'finance', label: 'Tài chính', icon: 'payments' },
  { id: 'self-improvement', label: 'Phát triển bản thân', icon: 'trending-up' },
  { id: 'productivity', label: 'Năng suất', icon: 'timer' },
  { id: 'biographies', label: 'Tiểu sử', icon: 'person' },
  { id: 'entrepreneurship', label: 'Khởi nghiệp', icon: 'rocket-launch' },
  { id: 'health', label: 'Sức khỏe', icon: 'favorite' },
  { id: 'ai', label: 'AI', icon: 'smart-toy' },
  { id: 'design', label: 'Thiết kế', icon: 'palette' },
];

const DAILY_TIMES: DailyTime[] = [
  { id: '10', title: '10 phút', hint: 'Học nhanh', icon: 'timer' },
  { id: '20', title: '20 phút', hint: 'Thói quen đều đặn', icon: 'schedule' },
  { id: '30', title: '30 phút', hint: 'Học chuyên sâu', icon: 'auto-stories' },
  { id: '45', title: '45 phút', hint: 'Tập trung cao', icon: 'psychology' },
  { id: '60+', title: '1 giờ+', hint: 'Mức nâng cao', icon: 'all-inclusive' },
];

export default function OnboardingScreen({ navigation }: OnboardingScreenProps) {
  const [step, setStep] = useState(1);
  const [selectedGoal, setSelectedGoal] = useState<string>('skills');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([
    'psychology',
    'technology',
    'philosophy',
  ]);
  const [selectedTime, setSelectedTime] = useState<string>('20');
  const stepAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  useEffect(() => {
    stepAnimation.setValue(0);
    Animated.timing(stepAnimation, {
      toValue: 1,
      duration: 260,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [step, stepAnimation]);

  const animateLayout = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(180, LayoutAnimation.Types.easeInEaseOut, LayoutAnimation.Properties.opacity),
    );
  };

  const animatedStepStyle = {
    opacity: stepAnimation,
    transform: [
      {
        translateY: stepAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [18, 0],
        }),
      },
    ],
  };

  const canContinue = useMemo(() => {
    if (step === 1) {
      return Boolean(selectedGoal);
    }

    if (step === 2) {
      return selectedTopics.length >= 3;
    }

    return Boolean(selectedTime);
  }, [selectedGoal, selectedTime, selectedTopics.length, step]);

  const goNext = () => {
    if (!canContinue) {
      return;
    }

    if (step < 3) {
      animateLayout();
      setStep((current) => current + 1);
      return;
    }

    void completeOnboarding();
  };

  const goBack = () => {
    if (step > 1) {
      animateLayout();
      setStep((current) => current - 1);
      return;
    }

    void completeOnboarding();
  };

  const skipAll = () => {
    void completeOnboarding();
  };

  const toggleTopic = (topicId: string) => {
    animateLayout();
    setSelectedTopics((current) => {
      if (current.includes(topicId)) {
        if (current.length <= 1) {
          return current;
        }

        return current.filter((id) => id !== topicId);
      }

      return [...current, topicId];
    });
  };

  const selectGoal = (goalId: string) => {
    animateLayout();
    setSelectedGoal(goalId);
  };

  const selectTime = (timeId: string) => {
    animateLayout();
    setSelectedTime(timeId);
  };

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem(ONBOARDING_DONE_KEY, 'true');
    } finally {
      navigation.replace('Login');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable onPress={goBack} hitSlop={10} style={styles.headerButton}>
          <Text style={styles.headerButtonText}>{step === 1 ? 'Đóng' : 'Quay lại'}</Text>
        </Pressable>
        <View style={styles.headerCenter}>
          <Text style={styles.stepText}>Bước {step}/3</Text>
          <View style={styles.progressRow}>
            {[1, 2, 3].map((index) => (
              <View
                key={index}
                style={[
                  styles.progressDot,
                  step >= index ? styles.progressDotActive : undefined,
                ]}
              />
            ))}
          </View>
        </View>
        <Pressable onPress={skipAll} hitSlop={10} style={styles.headerButton}>
          <Text style={styles.headerButtonText}>Bỏ qua</Text>
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {step === 1 ? (
          <Animated.View style={animatedStepStyle}>
            <View style={styles.titleWrap}>
              <Text style={styles.title}>Điều gì đưa bạn đến với Bạn Đọc?</Text>
              <Text style={styles.subtitle}>
                Giúp chúng tôi cá nhân hóa trải nghiệm theo mục tiêu đọc hiện tại của bạn.
              </Text>
            </View>

            <View style={styles.cardsWrap}>
              {GOALS.map((goal) => {
                const selected = selectedGoal === goal.id;

                return (
                  <Pressable
                    key={goal.id}
                    onPress={() => selectGoal(goal.id)}
                    style={[styles.goalCard, selected ? styles.goalCardSelected : undefined]}
                  >
                    <MaterialIcons name={goal.icon} size={34} color={COLORS.primary} />
                    <Text style={styles.goalTitle}>{goal.title}</Text>
                    <Text style={styles.goalDescription}>{goal.description}</Text>
                    {selected ? (
                      <MaterialIcons
                        name="check-circle"
                        size={24}
                        color={COLORS.primary}
                        style={styles.check}
                      />
                    ) : null}
                  </Pressable>
                );
              })}
            </View>
          </Animated.View>
        ) : null}

        {step === 2 ? (
          <Animated.View style={animatedStepStyle}>
            <View style={styles.titleWrap}>
              <Text style={styles.title}>Bạn quan tâm chủ đề nào?</Text>
              <Text style={styles.subtitle}>
                Chọn ít nhất 3 chủ đề để cá nhân hóa nội dung đọc của bạn.
              </Text>
            </View>

            <View style={styles.tagsWrap}>
              {TOPICS.map((topic) => {
                const selected = selectedTopics.includes(topic.id);

                return (
                  <Pressable
                    key={topic.id}
                    onPress={() => toggleTopic(topic.id)}
                    style={[styles.topicTag, selected ? styles.topicTagSelected : undefined]}
                  >
                    <MaterialIcons
                      name={topic.icon}
                      size={16}
                      color={selected ? '#FFFFFF' : COLORS.primary}
                    />
                    <Text
                      style={[
                        styles.topicLabel,
                        selected ? styles.topicLabelSelected : undefined,
                      ]}
                    >
                      {topic.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </Animated.View>
        ) : null}

        {step === 3 ? (
          <Animated.View style={animatedStepStyle}>
            <View style={styles.titleWrap}>
              <Text style={styles.title}>Mỗi ngày bạn dành bao lâu để học?</Text>
              <Text style={styles.subtitle}>Chúng tôi sẽ tùy chỉnh nội dung theo lịch của bạn.</Text>
            </View>

            <View style={styles.timeWrap}>
              {DAILY_TIMES.map((time) => {
                const selected = selectedTime === time.id;

                return (
                  <Pressable
                    key={time.id}
                    onPress={() => selectTime(time.id)}
                    style={[styles.timeCard, selected ? styles.timeCardSelected : undefined]}
                  >
                    <View style={styles.timeLeft}>
                      <MaterialIcons
                        name={time.icon}
                        size={26}
                        color={selected ? '#FFFFFF' : COLORS.mutedText}
                      />
                      <View>
                        <Text
                          style={[
                            styles.timeTitle,
                            selected ? styles.timeTitleSelected : undefined,
                          ]}
                        >
                          {time.title}
                        </Text>
                        <Text
                          style={[
                            styles.timeHint,
                            selected ? styles.timeHintSelected : undefined,
                          ]}
                        >
                          {time.hint}
                        </Text>
                      </View>
                    </View>
                    <View style={[styles.radio, selected ? styles.radioSelected : undefined]}>
                      {selected ? (
                        <MaterialIcons name="check" size={14} color={COLORS.primary} />
                      ) : null}
                    </View>
                  </Pressable>
                );
              })}
            </View>

            <View style={styles.tipCard}>
              <MaterialIcons
                name="lightbulb"
                size={18}
                color={COLORS.primary}
                style={styles.tipIcon}
              />
              <Text style={styles.tipText}>
                Sự đều đặn là chìa khóa. Phần lớn người học hiệu quả bắt đầu với{' '}
                <Text style={styles.tipHighlight}>20 phút</Text> mỗi ngày.
              </Text>
            </View>
          </Animated.View>
        ) : null}
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          onPress={goNext}
          disabled={!canContinue}
          style={[styles.ctaButton, !canContinue ? styles.ctaButtonDisabled : undefined]}
        >
          <Text style={styles.ctaText}>{step === 3 ? 'Hoàn tất' : 'Tiếp tục'}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    height: 64,
    paddingHorizontal: uiSpacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerButton: {
    minWidth: 48,
    paddingVertical: 6,
  },
  headerButtonText: {
    color: COLORS.mutedText,
    fontWeight: '700',
    fontSize: 14,
  },
  headerCenter: {
    alignItems: 'center',
    gap: 6,
  },
  stepText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  progressRow: {
    flexDirection: 'row',
    gap: 6,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 99,
    backgroundColor: '#D6D2E9',
  },
  progressDotActive: {
    backgroundColor: COLORS.primary,
  },
  scrollContent: {
    paddingHorizontal: uiSpacing.xl,
    paddingTop: 10,
    paddingBottom: 120,
  },
  titleWrap: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    color: COLORS.text,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '800',
  },
  subtitle: {
    marginTop: 10,
    textAlign: 'center',
    color: COLORS.mutedText,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    opacity: 0.8,
  },
  cardsWrap: {
    gap: 12,
  },
  goalCard: {
    position: 'relative',
    borderWidth: 1,
    borderColor: '#E7E5F1',
    backgroundColor: COLORS.surface,
    borderRadius: 22,
    padding: 18,
  },
  goalCardSelected: {
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  goalTitle: {
    color: COLORS.text,
    fontSize: 19,
    fontWeight: '800',
    marginTop: 10,
    marginBottom: 4,
  },
  goalDescription: {
    color: COLORS.mutedText,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
    opacity: 0.8,
    paddingRight: 22,
  },
  check: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  tagsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
    paddingTop: 4,
  },
  topicTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    borderRadius: 999,
    paddingHorizontal: uiSpacing.lg,
    paddingVertical: 10,
  },
  topicTagSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
    borderWidth: 1,
  },
  topicLabel: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '700',
  },
  topicLabelSelected: {
    color: '#FFFFFF',
  },
  timeWrap: {
    gap: 10,
  },
  timeCard: {
    borderWidth: 1,
    borderColor: '#DED9EC',
    backgroundColor: COLORS.surface,
    borderRadius: 22,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeCardSelected: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  timeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  timeTitle: {
    color: COLORS.text,
    fontSize: 19,
    fontWeight: '800',
  },
  timeTitleSelected: {
    color: '#FFFFFF',
  },
  timeHint: {
    marginTop: 2,
    color: COLORS.mutedText,
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: '800',
    opacity: 0.9,
  },
  timeHintSelected: {
    color: '#FFFFFF',
    opacity: 0.92,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#C9C4DB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: '#FFFFFF',
    backgroundColor: '#FFFFFF',
  },
  tipCard: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#DAD4F6',
    backgroundColor: '#F4F1FF',
    borderRadius: 20,
    padding: 14,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
  },
  tipIcon: {
    marginTop: 1,
  },
  tipText: {
    flex: 1,
    color: COLORS.mutedText,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
  },
  tipHighlight: {
    color: COLORS.primary,
    fontWeight: '800',
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: uiSpacing.xl,
    paddingBottom: 16,
    paddingTop: 10,
    backgroundColor: '#F8F9FDE6',
    borderTopWidth: 1,
    borderTopColor: '#ECE8F8',
  },
  ctaButton: {
    height: 52,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  ctaButtonDisabled: {
    opacity: 0.45,
  },
  ctaText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
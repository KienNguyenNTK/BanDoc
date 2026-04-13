import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BottomNavBar from '../components/BottomNavBar';
import { RootStackParamList } from '../navigation/AppNavigator';
import { uiColors, uiSizing, uiSpacing } from '../theme/ui';
import { listSummaries, resolveSummaryCoverSource } from '../data';
import type { ChatContext } from '../types/content';

function defaultUserPromptForContext(context: ChatContext | undefined): string {
  switch (context?.source) {
    case 'home':
      return 'Tôi nên đọc gì tiếp theo?';
    case 'explore':
      return 'Gợi ý cho tôi tóm tắt hoặc chủ đề phù hợp.';
    case 'summary':
      return 'Hãy giúp tôi hiểu sâu hơn về bản tóm tắt này.';
    case 'graph':
      return 'Hãy giúp tôi hiểu sơ đồ và các mối liên hệ này.';
    case 'library':
      return 'Gợi ý từ thư viện của tôi nên đọc gì tiếp?';
    default:
      return 'Bạn có thể gợi ý nội dung cho tôi không?';
  }
}

type AskAIScreenRouteProp = RouteProp<RootStackParamList, 'AskAI'>;
type AskAIScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AskAI'>;

type AskAIScreenProps = {
  route: AskAIScreenRouteProp;
  navigation: AskAIScreenNavigationProp;
};

const SUGGESTED_PROMPTS = [
  'Xem thêm nội dung giống vậy',
  'Có bộ sưu tập nào cho chủ đề này?',
  'Gợi ý tóm tắt trong 15 phút',
  'Nên đọc gì tiếp theo?',
];

export default function AskAIScreen({ route, navigation }: AskAIScreenProps) {
  const context: ChatContext | undefined = route.params?.context;
  const userPrompt =
    route.params?.initialPrompt?.trim() || defaultUserPromptForContext(context);
  const [composerText, setComposerText] = React.useState('');
  const insets = useSafeAreaInsets();
  const bottomInset = Math.max(insets.bottom, 6);
  const bottomNavOffset = uiSizing.bottomNavHeight + bottomInset;
  const composerAreaHeight = 126;

  const handleSendComposer = React.useCallback(() => {
    setComposerText('');
  }, []);

  const hasComposerText = composerText.trim().length > 0;
  const recs = React.useMemo(() => listSummaries().slice(0, 2), []);

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Hỏi Bạn Đọc</Text>
        </View>
        <Pressable style={styles.iconBtn}>
          <MaterialIcons name="more-vert" size={20} color="#787586" />
        </Pressable>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: composerAreaHeight + bottomNavOffset }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contextWrap}>
          <Text style={styles.contextTitle}>Hỏi mọi thứ về tóm tắt và sơ đồ</Text>
          <View style={styles.contextChip}>
            <MaterialIcons
              name={context?.source === 'summary' || context?.source === 'graph' ? 'menu-book' : context?.source === 'library' ? 'local-library' : 'home'}
              size={13}
              color="#4029BA"
            />
            <Text style={styles.contextChipText}>
              {context?.source === 'summary'
                ? 'Ngữ cảnh tóm tắt'
                : context?.source === 'graph'
                  ? 'Ngữ cảnh sơ đồ'
                  : context?.source === 'library'
                    ? 'Ngữ cảnh thư viện'
                    : context?.source === 'explore'
                      ? 'Ngữ cảnh khám phá'
                      : 'Ngữ cảnh trang chủ'}
            </Text>
          </View>
        </View>

        <View style={styles.userBubbleRow}>
          <View style={styles.userBubble}>
            <Text style={styles.userBubbleText}>{userPrompt}</Text>
          </View>
        </View>

        <View style={styles.assistantWrap}>
          <View style={styles.assistantRow}>
            <View style={styles.assistantIconWrap}>
              <MaterialIcons name="auto-awesome" size={16} color="#FFFFFF" />
            </View>
            <View style={styles.assistantBubble}>
              <Text style={styles.assistantText}>
                {context?.contextText
                  ? `Mình đang bám theo ngữ cảnh bạn chọn. Dưới đây là trả lời dựa trên thông tin hiện có (mock).\n\n${context.contextText.slice(0, 280)}${context.contextText.length > 280 ? '…' : ''}`
                  : 'Bạn có thể hỏi mọi thứ về tóm tắt, ý chính, nhân vật/khái niệm trong sơ đồ, hoặc xin gợi ý đọc tiếp.'}
              </Text>
            </View>
          </View>

          <View style={styles.cardsWrap}>
            {recs.map((s) => (
            <Pressable key={s.id} style={styles.bookCard} onPress={() => navigation.navigate('BookDetail', { summaryId: s.id })}>
              <Image source={resolveSummaryCoverSource(s.id) ?? require('../assets/library/continue-reading.jpg')} style={styles.bookCover} />
              <View style={styles.bookMeta}>
                <Text style={styles.bookTitle}>{s.title}</Text>
                {s.author ? <Text style={styles.bookAuthor}>{s.author}</Text> : null}
                <View style={styles.openBookBtn}>
                    <Text style={styles.openBookText}>Mở tóm tắt</Text>
                </View>
              </View>
            </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={[styles.bottomArea, { bottom: bottomNavOffset, paddingBottom: uiSpacing.sm }]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.suggestionRow}
        >
          {SUGGESTED_PROMPTS.map((prompt) => (
            <Pressable key={prompt} style={styles.suggestionChip} onPress={() => setComposerText(prompt)}>
              <Text style={styles.suggestionChipText}>{prompt}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.composerWrap}>
          <View style={styles.magicButton}>
            <MaterialIcons name="auto-awesome" size={18} color="#6C5CE7" />
          </View>
          <TextInput
            value={composerText}
            onChangeText={setComposerText}
            placeholder="Hỏi Bạn Đọc về tóm tắt, ý chính, sơ đồ, nhân vật..."
            placeholderTextColor="#9A97A9"
            style={styles.composerInput}
            returnKeyType="send"
            onSubmitEditing={handleSendComposer}
          />
          <Pressable style={styles.composerSendBtn} onPress={handleSendComposer}>
            <MaterialIcons name={hasComposerText ? 'arrow-upward' : 'arrow-forward'} size={18} color="#6C5CE7" />
          </Pressable>
        </View>
      </View>

      <BottomNavBar activeTab="ai" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: uiColors.background,
  },
  header: {
    minHeight: 56,
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
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#6C5CE7',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: uiSpacing.xl,
    paddingTop: 8,
    gap: 18,
  },
  contextWrap: {
    gap: 10,
  },
  contextTitle: {
    fontSize: 13,
    color: '#474554',
    fontWeight: '600',
  },
  contextChip: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: '#E4DFFF',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  contextChipText: {
    fontSize: 11,
    color: '#4029BA',
    fontWeight: '700',
  },
  userBubbleRow: {
    alignItems: 'flex-end',
  },
  userBubble: {
    maxWidth: '86%',
    backgroundColor: '#6C5CE7',
    paddingHorizontal: uiSpacing.lg,
    paddingVertical: 12,
    borderRadius: 22,
    borderTopRightRadius: 8,
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  userBubbleText: {
    fontSize: 15,
    lineHeight: 21,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  assistantWrap: {
    gap: 12,
  },
  assistantRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  assistantIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 99,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5341CD',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  assistantBubble: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 20,
    borderTopLeftRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E2F0',
  },
  assistantText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#191C1F',
    fontWeight: '500',
  },
  cardsWrap: {
    paddingLeft: 38,
    gap: 10,
  },
  bookCard: {
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E2F0',
    padding: 10,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  bookCover: {
    width: 58,
    height: 86,
    borderRadius: 10,
  },
  bookMeta: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 15,
    color: '#191C1F',
    fontWeight: '800',
  },
  bookAuthor: {
    marginTop: 3,
    fontSize: 12,
    color: '#787586',
    fontWeight: '600',
  },
  openBookBtn: {
    marginTop: 8,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: '#6C5CE7',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  openBookText: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  bottomArea: {
    position: 'absolute',
    left: 0,
    right: 0,
    paddingTop: 10,
    backgroundColor: uiColors.background,
  },
  suggestionRow: {
    paddingHorizontal: uiSpacing.xl,
    gap: 8,
    paddingBottom: 10,
  },
  suggestionChip: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 9,
    backgroundColor: '#E7E8EC',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  suggestionChipText: {
    fontSize: 12,
    color: '#474554',
    fontWeight: '600',
  },
  composerWrap: {
    marginHorizontal: uiSpacing.xl,
    marginBottom: 0,
    height: 52,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#6C5CE712',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  magicButton: {
    width: 34,
    height: 34,
    borderRadius: 99,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0EEFF',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  composerInput: {
    flex: 1,
    color: '#474554',
    fontSize: 14,
    fontWeight: '600',
    paddingVertical: 0,
  },
  composerSendBtn: {
    width: 34,
    height: 34,
    borderRadius: 99,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8E5FB',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
});
import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from '../navigation/AppNavigator';
import { getNode, getSummaryById } from '../data';
import { uiColors, uiSpacing } from '../theme/ui';
import type { GraphNode } from '../types/content';

type CharacterChatRouteProp = RouteProp<RootStackParamList, 'CharacterChat'>;
type CharacterChatNavigationProp = StackNavigationProp<RootStackParamList, 'CharacterChat'>;

type CharacterChatScreenProps = {
  navigation: CharacterChatNavigationProp;
  route: CharacterChatRouteProp;
};

type ChatMessage = {
  id: string;
  role: 'user' | 'character';
  text: string;
  createdAtLabel: string;
};

function nowLabel(): string {
  return 'Vừa xong';
}

function id(): string {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function pickNodeImage(summaryId: string, node?: GraphNode) {
  if (!node?.imageAsset) {
    return summaryId === 'innsmouth'
      ? require('../assets/translator/robert-chat.jpg')
      : require('../assets/library/continue-reading.jpg');
  }

  if (node.imageAsset.includes('robert-chat')) return require('../assets/translator/robert-chat.jpg');
  if (node.imageAsset.includes('zadok')) return require('../assets/translator/zadok.jpg');
  if (node.imageAsset.includes('clerk')) return require('../assets/translator/clerk.jpg');

  return require('../assets/library/continue-reading.jpg');
}

export default function CharacterChatScreen({ navigation, route }: CharacterChatScreenProps) {
  const { summaryId, nodeId } = route.params;
  const summary = React.useMemo(() => getSummaryById(summaryId), [summaryId]);
  const node = React.useMemo(() => (summary ? getNode(summary, nodeId) : undefined), [nodeId, summary]);

  const character = node?.type === 'character' ? node : undefined;
  const roleLabel = character?.meta?.role?.toUpperCase() ?? 'NHÂN VẬT';
  const openingLine = character?.meta?.openingLine ?? character?.description ?? 'Bạn muốn hỏi điều gì?';

  const [composerText, setComposerText] = React.useState('');
  const [replyIndex, setReplyIndex] = React.useState(0);
  const [messages, setMessages] = React.useState<ChatMessage[]>(() => [
    { id: id(), role: 'character', text: openingLine, createdAtLabel: nowLabel() },
  ]);

  const insets = useSafeAreaInsets();
  const bottomInset = Math.max(insets.bottom, 10);

  const scriptedReplies = React.useMemo(() => character?.chat ?? [], [character?.chat]);

  const send = React.useCallback(() => {
    const trimmed = composerText.trim();
    if (!trimmed) return;

    setComposerText('');
    setMessages((prev) => [
      ...prev,
      { id: id(), role: 'user', text: trimmed, createdAtLabel: nowLabel() },
    ]);

    const nextReply =
      scriptedReplies.find((item) => trimmed.toLowerCase().includes(item.question.toLowerCase().slice(0, 6))) ??
      scriptedReplies[replyIndex % Math.max(1, scriptedReplies.length)];

    const replyText =
      nextReply?.reply ??
      `${character?.label ?? 'Nhân vật'}: Tôi không chắc, nhưng những gì xảy ra trong "${summary?.title ?? 'tóm tắt này'}" đang khiến tôi phải cảnh giác.`;

    setReplyIndex((v) => v + 1);
    setMessages((prev) => [
      ...prev,
      { id: id(), role: 'character', text: replyText, createdAtLabel: nowLabel() },
    ]);
  }, [character?.label, composerText, replyIndex, scriptedReplies, summary?.title]);

  const canSend = composerText.trim().length > 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable style={styles.iconBtn} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color="#5341CD" />
          </Pressable>
          <View>
            <Text style={styles.headerTitle}>Chat nhân vật</Text>
            <Text style={styles.headerSub}>{`${summary?.title ?? 'Tóm tắt'} • ${(character?.label ?? '').toUpperCase()}`}</Text>
          </View>
        </View>
        <Pressable style={styles.iconBtn}>
          <MaterialIcons name="more-vert" size={22} color="#5341CD" />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.characterCard}>
          <View style={styles.cardTop}>
            <Image source={pickNodeImage(summaryId, character)} style={styles.characterImage} />
            <View style={styles.cardTopRight}>
              <Text style={styles.roleTag}>{roleLabel}</Text>
              <Text style={styles.chapterTag}>{summary?.durationMinutes ? `${summary.durationMinutes} phút tóm tắt` : 'Tóm tắt'}</Text>
            </View>
          </View>

          <Text style={styles.characterName}>{character?.label ?? 'Nhân vật'}</Text>
          <Text style={styles.characterDesc}>{character?.description ?? 'Chọn nhân vật từ sơ đồ để chat.'}</Text>

          <View style={styles.memoryHintRow}>
            <MaterialIcons name="auto-awesome" size={14} color="#8A8897" />
            <Text style={styles.memoryHint}>Trả lời theo kịch bản (mock) để chốt UX</Text>
          </View>
        </View>

        <View style={styles.messagesWrap}>
          {messages.map((m) =>
            m.role === 'character' ? (
              <View key={m.id} style={styles.aiMessageRow}>
                <View style={styles.aiIcon}>
                  <MaterialIcons name="auto-awesome" size={14} color="#5341CD" />
                </View>
                <View style={styles.messageBubbleGroup}>
                  <View style={styles.aiBubble}>
                    <Text style={styles.aiText}>{m.text}</Text>
                  </View>
                  <Text style={styles.metaText}>{`${character?.label ?? 'Nhân vật'} • ${m.createdAtLabel}`}</Text>
                </View>
              </View>
            ) : (
              <View key={m.id} style={styles.userMessageRow}>
                <View style={styles.userAvatar}>
                  <MaterialIcons name="person" size={14} color="#006B55" />
                </View>
                <View style={styles.messageBubbleGroupUser}>
                  <View style={styles.userBubble}>
                    <Text style={styles.userText}>{m.text}</Text>
                  </View>
                  <Text style={styles.metaTextUser}>{`Bạn • ${m.createdAtLabel}`}</Text>
                </View>
              </View>
            )
          )}
        </View>

        <View style={styles.suggestionWrap}>
          {['Bạn đang nghĩ gì?', 'Ai liên quan đến chuyện này?', 'Điểm mấu chốt là gì?', 'Kể lại bối cảnh ngắn gọn'].map((q) => (
            <Pressable key={q} style={styles.suggestionChip} onPress={() => setComposerText(q)}>
              <Text style={styles.suggestionText}>{q}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <View style={[styles.bottomInputWrap, { paddingBottom: bottomInset }]}>
        <View style={styles.inputRow}>
          <MaterialIcons name="chat" size={20} color="#B4AEE8" />
          <TextInput
            value={composerText}
            onChangeText={setComposerText}
            style={styles.input}
            placeholder="Hỏi nhân vật này về diễn biến, mối quan hệ..."
            placeholderTextColor="#7D7A8E"
            returnKeyType="send"
            onSubmitEditing={send}
          />
          <Pressable style={[styles.sendBtn, !canSend ? styles.sendBtnDisabled : undefined]} onPress={send}>
            <MaterialIcons name="send" size={18} color="#FFFFFF" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: uiColors.background },
  header: {
    height: 64,
    paddingHorizontal: uiSpacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1, paddingRight: 8 },
  iconBtn: { width: 34, height: 34, borderRadius: 99, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { color: '#191C1F', fontSize: 16.67, fontWeight: '700' },
  headerSub: { color: '#727082', fontSize: 10, fontWeight: '600', letterSpacing: 1.1 },
  content: { paddingHorizontal: uiSpacing.lg, paddingTop: 8, paddingBottom: 160, gap: 16 },
  characterCard: {
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#ECECF2',
    padding: 14,
    gap: 10,
  },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  characterImage: { width: 104, height: 104, borderRadius: 18 },
  cardTopRight: { alignItems: 'flex-end', gap: 8 },
  roleTag: {
    color: '#FFFFFF',
    backgroundColor: '#5341CD',
    fontSize: 11,
    fontWeight: '800',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  chapterTag: { color: '#7B788C', fontSize: 13, fontWeight: '500' },
  characterName: { color: '#191C1F', fontSize: 25, fontWeight: '800' },
  characterDesc: { color: '#474554', fontSize: 14.17, lineHeight: 24.17 },
  memoryHintRow: {
    marginTop: 2,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ECECF2',
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  memoryHint: { color: '#8A8897', fontSize: 12, fontStyle: 'italic' },
  messagesWrap: { gap: 16 },
  aiMessageRow: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  aiIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#F1EEFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  messageBubbleGroup: { flex: 1, gap: 6 },
  aiBubble: {
    borderRadius: 16,
    borderTopLeftRadius: 4,
    backgroundColor: '#F2F3F7',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  aiText: { color: '#191C1F', fontSize: 14.17, lineHeight: 25.83 },
  metaText: { color: '#66657A', fontSize: 12, fontWeight: '500', paddingHorizontal: 4 },
  userMessageRow: { flexDirection: 'row-reverse', gap: 10, alignItems: 'flex-start' },
  userAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#D9F3EA',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  messageBubbleGroupUser: { maxWidth: '84%', alignItems: 'flex-end', gap: 6 },
  userBubble: {
    borderRadius: 16,
    borderTopRightRadius: 4,
    backgroundColor: '#5341CD',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  userText: { color: '#FFFFFF', fontSize: 14.17, lineHeight: 25.83 },
  metaTextUser: { color: '#66657A', fontSize: 12, fontWeight: '500', paddingHorizontal: 4 },
  suggestionWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'center' },
  suggestionChip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#D8D6E6',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    minHeight: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  suggestionText: { color: '#474554', fontSize: 13, fontWeight: '500' },
  bottomInputWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: uiSpacing.lg,
    paddingTop: 10,
    backgroundColor: '#F8F9FDEB',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  inputRow: {
    minHeight: 56,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DEDEEA',
    paddingLeft: 12,
    paddingRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  input: { flex: 1, color: '#191C1F', fontSize: 13.33 },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#5341CD',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  sendBtnDisabled: {
    opacity: 0.55,
  },
});


import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from '../navigation/AppNavigator';
import { uiColors, uiSpacing } from '../theme/ui';

type TranslatorCharacterChatNavigationProp = StackNavigationProp<RootStackParamList, 'TranslatorCharacterChat'>;

type TranslatorCharacterChatScreenProps = {
  navigation: TranslatorCharacterChatNavigationProp;
};

export default function TranslatorCharacterChatScreen({ navigation }: TranslatorCharacterChatScreenProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable style={styles.iconBtn} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color="#5341CD" />
          </Pressable>
          <View>
            <Text style={styles.headerTitle}>Trò chuyện với nhân vật</Text>
            <Text style={styles.headerSub}>XƯỞNG DỊCH • ROBERT OLMSTEAD</Text>
          </View>
        </View>
        <Pressable style={styles.iconBtn}>
          <MaterialIcons name="more-vert" size={22} color="#5341CD" />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.characterCard}>
          <View style={styles.cardTop}>
            <Image source={require('../assets/translator/robert-chat.jpg')} style={styles.characterImage} />
            <View style={styles.cardTopRight}>
              <Text style={styles.roleTag}>NHÂN VẬT CHÍNH</Text>
              <Text style={styles.chapterTag}>Chương 12</Text>
            </View>
          </View>

          <Text style={styles.characterName}>Robert Olmstead</Text>
          <Text style={styles.characterDesc}>
            Hiện đang trong trạng thái sinh tồn căng thẳng. Tò mò khoa học đã bị lấn át bởi nỗi sợ nguyên thủy. Anh tập trung né tránh các thực thể địa phương trong khi cố giữ tỉnh táo.
          </Text>

          <View style={styles.tagRow}>
            {['Innsmouth', 'Zadok Allen (Người dẫn dắt)', 'Kinh dị vũ trụ'].map((tag) => (
              <Text key={tag} style={styles.contextTag}>{tag}</Text>
            ))}
          </View>

          <View style={styles.memoryHintRow}>
            <MaterialIcons name="auto-awesome" size={14} color="#8A8897" />
            <Text style={styles.memoryHint}>Phản hồi được neo theo bộ nhớ sơ đồ cốt truyện</Text>
          </View>
        </View>

        <View style={styles.messagesWrap}>
          <View style={styles.aiMessageRow}>
            <View style={styles.aiIcon}><MaterialIcons name="auto-awesome" size={14} color="#5341CD" /></View>
            <View style={styles.messageBubbleGroup}>
              <View style={styles.aiBubble}>
                <Text style={styles.aiText}>
                  Động lực của tôi lúc này đã chuyển hẳn sang sinh tồn trong hoảng loạn. Tôi đang men theo những con phố tối đen, cố vòng qua Gilman House. Mỗi bóng đổ đều như một cánh tay vươn lên từ vực sâu.
                </Text>
              </View>
              <Text style={styles.metaText}>Robert Olmstead • Vừa xong</Text>
            </View>
          </View>

          <View style={styles.userMessageRow}>
            <View style={styles.userAvatar}><MaterialIcons name="person" size={14} color="#006B55" /></View>
            <View style={styles.messageBubbleGroupUser}>
              <View style={styles.userBubble}>
                <Text style={styles.userText}>Anh có tin thông tin mà Zadok Allen đã đưa không?</Text>
              </View>
              <Text style={styles.metaTextUser}>Bạn • 2 phút trước</Text>
            </View>
          </View>

          <View style={styles.aiMessageRow}>
            <View style={styles.aiIcon}><MaterialIcons name="auto-awesome" size={14} color="#5341CD" /></View>
            <View style={styles.messageBubbleGroup}>
              <View style={styles.aiBubble}>
                <Text style={styles.aiText}>
                  Tôi muốn gạt lời lảm nhảm của ông ấy như cơn mê sảng, nhưng thực tại lạnh lẽo ở những con phố này lại khớp quá đáng với các cảnh báo đó. Niềm tin là thứ xa xỉ tôi không có, nhưng lời ông ấy là tấm bản đồ duy nhất tôi đang nắm.
                </Text>
              </View>
              <Text style={styles.metaText}>Robert Olmstead • 1 phút trước</Text>
            </View>
          </View>
        </View>

        <View style={styles.suggestionWrap}>
          {[
            'Anh ấy sẽ mô tả khoảnh khắc này thế nào?',
            'Anh ấy đang cảm thấy gì?',
            'Giọng điệu hội thoại ra sao?',
            'Chi tiết cần giữ nhất quán',
          ].map((q) => (
            <Pressable key={q} style={styles.suggestionChip}><Text style={styles.suggestionText}>{q}</Text></Pressable>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomInputWrap}>
        <View style={styles.inputRow}>
          <MaterialIcons name="chat" size={20} color="#B4AEE8" />
          <TextInput
            style={styles.input}
            placeholder="Hỏi nhân vật này về chương hiện tại..."
            placeholderTextColor="#7D7A8E"
          />
          <Pressable style={styles.sendBtn}>
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
  content: { paddingHorizontal: uiSpacing.lg, paddingTop: 8, paddingBottom: 140, gap: 16 },
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
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  contextTag: {
    color: '#5341CD',
    backgroundColor: '#F2F3F7',
    fontSize: 13,
    fontWeight: '600',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E3E8EF',
  },
  memoryHintRow: { marginTop: 2, paddingTop: 10, borderTopWidth: 1, borderTopColor: '#ECECF2', flexDirection: 'row', gap: 6, alignItems: 'center' },
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
    paddingBottom: 18,
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
});

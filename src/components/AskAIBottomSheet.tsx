import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type AskAIBottomSheetProps = {
  visible: boolean;
  onClose: () => void;
};

const QUICK_PROMPTS = [
  'Tôi nên đọc gì tiếp theo?',
  'Gợi ý tóm tắt trong 10 phút',
  'Giúp tôi học tâm lý học',
];

export default function AskAIBottomSheet({ visible, onClose }: AskAIBottomSheetProps) {
  const bottomSheetRef = React.useRef<BottomSheetModal>(null);
  const snapPoints = React.useMemo(() => ['72%', '88%'], []);

  React.useEffect(() => {
    if (visible) {
      bottomSheetRef.current?.present();
      return;
    }

    bottomSheetRef.current?.dismiss();
  }, [visible]);

  const renderBackdrop = React.useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="close"
      />
    ),
    []
  );

  const handleSheetChange = React.useCallback(
    (index: number) => {
      if (index === -1) {
        onClose();
      }
    },
    [onClose]
  );

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChange}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={styles.handle}
      backgroundStyle={styles.sheetBackground}
    >
      <View style={styles.sheet}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Hỏi Immersify</Text>
            <Text style={styles.subtitle}>Trang chủ • Khám phá sách tiếp theo</Text>
          </View>
          <Pressable style={styles.closeBtn} onPress={onClose}>
            <MaterialIcons name="close" size={18} color="#787586" />
          </Pressable>
        </View>

        <BottomSheetScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          <View style={styles.quickPromptWrap}>
            {QUICK_PROMPTS.map((prompt) => (
              <Pressable key={prompt} style={styles.promptChip}>
                <Text style={styles.promptChipText}>{prompt}</Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.assistantCard}>
            <View style={styles.assistantRow}>
              <MaterialIcons name="auto-awesome" size={18} color="#6C5CE7" />
              <View style={styles.assistantContent}>
                <Text style={styles.assistantLabel}>Trợ lý</Text>
                <Text style={styles.assistantText}>
                  Dựa trên lịch sử đọc gần đây, bạn có thể hợp với sách tâm lý học ứng dụng và năng suất.
                  Mình gợi ý bắt đầu bằng một bản tóm tắt ngắn và một bộ sưu tập phù hợp.
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.recommendHeader}>
            <Text style={styles.recommendTitle}>Gợi ý từ AI</Text>
            <Pressable style={styles.openChatBtn}>
              <Text style={styles.openChatText}>Mở chat đầy đủ</Text>
              <MaterialIcons name="open-in-new" size={14} color="#6C5CE7" />
            </Pressable>
          </View>

          <Pressable style={styles.resultCard}>
            <View style={styles.bookCoverWrap}>
              <Image source={require('../assets/home/home-2.jpg')} style={styles.bookCover} />
            </View>
            <View style={styles.resultContent}>
              <View style={styles.resultTopRow}>
                <Text style={styles.resultBadge}>Sách</Text>
                <MaterialIcons name="bookmark-border" size={16} color="#B2AFC1" />
              </View>
              <Text style={styles.resultName}>Thinking, Fast and Slow</Text>
              <Text style={styles.resultMeta}>Daniel Kahneman • 15 phút đọc</Text>
              <View style={styles.exploreRow}>
                <Text style={styles.exploreText}>Xem bản tóm tắt</Text>
                <MaterialIcons name="chevron-right" size={16} color="#6C5CE7" />
              </View>
            </View>
          </Pressable>

          <Pressable style={styles.resultCard}>
            <View style={styles.topicIconWrap}>
              <MaterialIcons name="psychology" size={28} color="#006B55" />
            </View>
            <View style={styles.resultContent}>
              <Text style={styles.resultBadge}>Chủ đề</Text>
              <Text style={styles.resultName}>Tâm lý học</Text>
              <Text style={styles.resultMeta}>128 bản tóm tắt có sẵn</Text>
            </View>
            <View style={styles.topicArrowWrap}>
              <MaterialIcons name="chevron-right" size={20} color="#B2AFC1" />
            </View>
          </Pressable>

          <View style={styles.openFullWrap}>
            <Pressable style={styles.openFullBtn}>
              <MaterialIcons name="chat-bubble-outline" size={17} color="#474554" />
              <Text style={styles.openFullText}>Mở phiên chat đầy đủ</Text>
            </Pressable>
          </View>
        </BottomSheetScrollView>

        <View style={styles.inputWrap}>
          <View style={styles.inputInner}>
            <MaterialIcons name="auto-awesome" size={20} color="#6C5CE7" />
            <TextInput
              placeholder="Hỏi về sách hoặc chủ đề..."
              placeholderTextColor="#9A97A9"
              style={styles.input}
            />
            <Pressable style={styles.sendBtn}>
              <MaterialIcons name="send" size={18} color="#6C5CE7" />
            </Pressable>
          </View>
        </View>
      </View>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  sheetBackground: {
    backgroundColor: '#F7F8FC',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  sheet: {
    flex: 1,
    backgroundColor: '#F7F8FC',
    overflow: 'hidden',
  },
  handle: {
    width: 42,
    height: 4,
    borderRadius: 99,
    backgroundColor: '#C8C4D7',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    color: '#191C1F',
    fontWeight: '800',
  },
  subtitle: {
    marginTop: 2,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    color: '#787586',
    fontWeight: '700',
  },
  closeBtn: {
    width: 30,
    height: 30,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E9E8EF',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 112,
    gap: 12,
  },
  quickPromptWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  promptChip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#D8D5E4',
    backgroundColor: '#FFFFFF',
  },
  promptChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#474554',
  },
  assistantCard: {
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8E6F2',
    padding: 14,
  },
  assistantRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
  },
  assistantContent: {
    flex: 1,
  },
  assistantLabel: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: '#6C5CE7',
    fontWeight: '800',
  },
  assistantText: {
    marginTop: 3,
    fontSize: 14,
    lineHeight: 19,
    color: '#474554',
    fontWeight: '500',
  },
  recommendHeader: {
    marginTop: 2,
    marginBottom: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recommendTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#191C1F',
  },
  openChatBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  openChatText: {
    fontSize: 12,
    color: '#6C5CE7',
    fontWeight: '700',
  },
  resultCard: {
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E2F0',
    padding: 12,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  bookCoverWrap: {
    width: 64,
    height: 96,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#E7E8EC',
  },
  bookCover: {
    width: '100%',
    height: '100%',
  },
  resultContent: {
    flex: 1,
  },
  resultTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resultBadge: {
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    color: '#787586',
    fontWeight: '800',
  },
  resultName: {
    marginTop: 4,
    fontSize: 15,
    color: '#191C1F',
    fontWeight: '800',
  },
  resultMeta: {
    marginTop: 2,
    fontSize: 12,
    color: '#787586',
    fontWeight: '600',
  },
  exploreRow: {
    marginTop: 7,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  exploreText: {
    fontSize: 12,
    color: '#6C5CE7',
    fontWeight: '800',
  },
  topicIconWrap: {
    width: 64,
    height: 64,
    borderRadius: 999,
    backgroundColor: '#E2F7EF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topicArrowWrap: {
    paddingLeft: 8,
  },
  openFullWrap: {
    marginTop: 6,
    marginBottom: 4,
    alignItems: 'center',
  },
  openFullBtn: {
    borderRadius: 999,
    backgroundColor: '#ECEBF2',
    paddingHorizontal: 16,
    paddingVertical: 9,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  openFullText: {
    color: '#474554',
    fontSize: 12,
    fontWeight: '700',
  },
  inputWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: 1,
    borderTopColor: '#E5E2F0',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 16,
  },
  inputInner: {
    height: 44,
    borderRadius: 20,
    backgroundColor: '#F1F2F7',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    gap: 8,
  },
  input: {
    flex: 1,
    color: '#191C1F',
    fontSize: 14,
    fontWeight: '500',
    paddingVertical: 0,
  },
  sendBtn: {
    width: 30,
    height: 30,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8E5FB',
  },
});

---
name: bandoc-translator-flow
description: 'Quy trình phát triển tính năng cho luồng Translator của BanDoc. Use when thêm bước mới trong TranslatorStudio -> Preparing -> ProjectReady -> UploadStatus -> Chapters -> ChapterSource/ChapterTranslation/ChapterGraph/CharacterChat, hoặc sửa dữ liệu chuyển bước.'
argument-hint: 'Nêu bước Translator cần thêm hoặc sửa, cùng dữ liệu truyền giữa các màn hình'
---

# BanDoc Translator Flow

## Khi Nên Dùng
- Thêm màn hình hoặc bước mới trong luồng Translator
- Sửa logic chuyển màn giữa các màn Translator
- Chuẩn hóa dữ liệu truyền qua navigation params

## Luồng Tham Chiếu
- TranslatorStudio
- TranslatorPreparing
- TranslatorProjectReady
- TranslatorUploadStatus
- TranslatorChapters
- TranslatorChapterSource
- TranslatorChapterTranslation
- TranslatorChapterGraph
- TranslatorCharacterChat

## Quy Trình
1. Vẽ lại flow trước khi code
- Xác định entry point, next step, back behavior, và trạng thái lỗi/loading.
- Liệt kê dữ liệu vào/ra của từng bước.

2. Chốt contract params
- Ưu tiên truyền dữ liệu qua navigation params theo chuẩn hiện tại của dự án.
- Cập nhật RootStackParamList trong AppNavigator.
- Đặt tên params nhất quán theo ngữ nghĩa nghiệp vụ.
- Tránh any; ưu tiên union hoặc object rõ ràng.

3. Cập nhật màn hình và điều hướng
- Sửa logic navigate/goBack tại màn hình nguồn.
- Thêm/điều chỉnh màn hình đích trong src/screens.
- Đảm bảo không phá đường quay lại của người dùng.

4. Xử lý trạng thái chuyển bước
- Loading: tránh navigate khi dữ liệu chưa sẵn sàng.
- Error: có thông điệp rõ ràng và đường hồi phục.
- Success: điều hướng đúng bước kế tiếp theo flow.

5. Kiểm tra hồi quy
- Đi qua full flow từ TranslatorStudio đến bước cuối.
- Kiểm tra case thiếu dữ liệu params.
- Kiểm tra back stack để tránh vòng lặp hoặc màn mồ côi.

## Điểm Quyết Định
- Mặc định ưu tiên navigation params; chỉ dùng state chia sẻ khi dữ liệu quá lớn hoặc dùng xuyên nhiều bước.
- Nếu màn hình có cả đọc và chỉnh sửa dữ liệu: tách mode rõ ràng (view/edit).
- Nếu một bước có nhiều nhánh: chuẩn hóa điều kiện chuyển bước thành hàm riêng dễ test.

## Tiêu Chí Hoàn Thành
- Toàn bộ luồng Translator chạy end-to-end không lỗi điều hướng.
- Params các route đúng kiểu, không cần cast không an toàn.
- Luồng chính không phụ thuộc state chia sẻ khi có thể truyền qua params.
- Người dùng luôn có đường back hợp lệ.
- Trạng thái loading/error/success được xử lý rõ ràng ở từng bước.

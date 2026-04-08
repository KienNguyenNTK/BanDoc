---
name: bandoc-screen-workflow
description: 'Quy trình thêm hoặc chỉnh sửa màn hình trong BanDoc React Native. Use when thêm screen mới, refactor UI screen, nối navigation, cập nhật component dùng chung, hoặc chuẩn hóa giao diện theo src/theme/ui.ts.'
argument-hint: 'Mô tả màn hình hoặc thay đổi cần làm (ví dụ: thêm màn hình A và nối từ Home)'
---

# BanDoc Screen Workflow

## Khi Nên Dùng
- Thêm màn hình mới trong src/screens
- Chỉnh sửa UI/UX của màn hình hiện có
- Nối điều hướng giữa các màn hình trong AppNavigator
- Tách logic thành component dùng chung trong src/components

## Quy Trình
1. Chốt phạm vi thay đổi
- Xác định màn hình nguồn, màn hình đích, và dữ liệu cần truyền.
- Nếu có điều hướng mới, liệt kê rõ tên route và params.

2. Cập nhật điều hướng trước
- Sửa RootStackParamList trong src/navigation/AppNavigator.tsx.
- Import màn hình mới và thêm Stack.Screen tương ứng.
- Giữ options headerShown: false nếu theo chuẩn hiện tại.

3. Triển khai màn hình
- Tạo/cập nhật file trong src/screens.
- Tái sử dụng component chung khi có thể (AppTextInput, BottomNavBar, FloatingAskBar, SegmentedTabs, AskAIBottomSheet).
- Chỉ thêm component mới vào src/components khi có giá trị tái sử dụng.

4. Chuẩn hóa giao diện
- Ưu tiên token từ src/theme/ui.ts: uiColors, uiSpacing, uiRadius, uiTypography, uiSizing.
- Tránh hard-code màu, spacing, kích thước nếu đã có token phù hợp.
- Ưu tiên StyleSheet.create để style ổn định.

5. Kiểm tra chất lượng
- Chạy lint và test:
  - rtk npm run lint
  - rtk npm test
- Kiểm tra nhanh các đường điều hướng chính bị ảnh hưởng.

## Điểm Quyết Định
- Nếu params phức tạp hoặc dùng lại ở nhiều nơi: cân nhắc tạo type riêng trong file type chung.
- Nếu một khối UI xuất hiện từ 2 màn hình trở lên: trích ra component chung.
- Nếu thay đổi chạm nhiều route: cập nhật theo hướng tương thích ngược trước, sau đó mới dọn dẹp API cũ.

## Tiêu Chí Hoàn Thành
- Không có lỗi TypeScript/Lint mới từ phần đã chỉnh.
- Màn hình mới hiển thị đúng và điều hướng chạy được.
- Params route đúng kiểu và không cần ép kiểu bất an toàn.
- UI tuân theo token trong src/theme/ui.ts.

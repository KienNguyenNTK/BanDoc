---
name: bandoc-ui-consistency-vn
description: 'Chuẩn hóa UI và nội dung tiếng Việt cho BanDoc React Native. Use when tạo/chỉnh màn hình mới, cập nhật text hiển thị, đồng bộ style token, hoặc review nhanh độ nhất quán giao diện trong src/screens và src/components.'
argument-hint: 'Mô tả màn hình cần chuẩn hóa UI/copy tiếng Việt'
---

# BanDoc UI Consistency VN

## Khi Nên Dùng
- Viết mới hoặc sửa text hiển thị cho người dùng
- Rà soát nhanh tính nhất quán màu sắc, khoảng cách, typography
- Review màn hình trước khi bàn giao QA

## Quy Trình
1. Chuẩn hóa nội dung
- Bắt buộc 100% Việt hóa nội dung hiển thị cho người dùng.
- Dùng tiếng Việt rõ nghĩa, nhất quán thuật ngữ trên toàn app.
- Không trộn Anh-Việt trong UI, trừ tên thương hiệu hoặc tên riêng không dịch.
- Giữ microcopy ngắn gọn, hành động rõ ràng.

2. Chuẩn hóa design token
- Ưu tiên dùng token từ src/theme/ui.ts.
- Không hard-code màu/chữ/khoảng cách khi đã có token tương ứng.

3. Chuẩn hóa component
- Ưu tiên tái sử dụng component chung trước khi tạo mới.
- Khi cần component mới, tách props rõ ràng và tránh ôm nhiều trách nhiệm.

4. Kiểm tra trải nghiệm
- Kiểm tra trên màn hình nhỏ để tránh vỡ layout/chữ tràn.
- Kiểm tra trạng thái loading, empty, error có nội dung tiếng Việt phù hợp.

5. Kiểm tra nhanh trước merge
- Chạy lint và test:
  - rtk npm run lint
  - rtk npm test

## Điểm Quyết Định
- Nếu text dài: ưu tiên tách dòng hoặc rút gọn copy trước khi giảm cỡ chữ.
- Nếu style lặp lại ở 2+ nơi: tạo style/helper dùng chung.
- Nếu cùng một hành động có nhiều cách gọi tên: chọn 1 cách và đồng bộ toàn app.
- Nếu gặp text tiếng Anh cũ trong code: dịch sang tiếng Việt trước khi tinh chỉnh UI.

## Tiêu Chí Hoàn Thành
- Toàn bộ nội dung hiển thị cho người dùng là tiếng Việt nhất quán.
- UI dùng token hệ thống thay vì hard-code rải rác.
- Không có lỗi lint/test mới phát sinh.
- Màn hình giữ được bố cục ổn định trên mobile.

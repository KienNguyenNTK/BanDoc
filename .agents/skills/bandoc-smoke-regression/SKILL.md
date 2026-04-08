---
name: bandoc-smoke-regression
description: 'Checklist smoke test va regression nhanh cho BanDoc React Native. Use when can xac nhan ban build truoc khi gui QA, sau khi sua navigation, hoac sau khi cap nhat cac man hinh src/screens.'
argument-hint: 'Mo ta pham vi thay doi de chon bo smoke test phu hop'
---

# BanDoc Smoke Regression

## Khi Nen Dung
- Truoc khi gui ban moi cho QA/UAT
- Sau khi sua navigation trong src/navigation/AppNavigator.tsx
- Sau khi cap nhat cac man hinh trong src/screens
- Sau khi build APK release

## Quy Trinh
1. Kiem tra tinh on dinh code
- Chay:
  - rtk npm run lint
  - rtk npm test
- Neu co loi moi, xu ly truoc khi smoke test thu cong.

2. Smoke test luong chinh
- Mo app va kiem tra vao duoc Home.
- Kiem tra Library, Search, Profile mo duoc va khong crash.
- Kiem tra 1 luong Translator day du tu TranslatorStudio den mot man hinh chapter.

3. Smoke test dieu huong
- Kiem tra deep link dieu huong noi bo (neu co) va nut quay lai.
- Dam bao khong co man hinh mo coi trong back stack.
- Dam bao params route duoc truyen day du, khong co man hinh hien thi du lieu rong bat thuong.

4. Kiem tra noi dung va UI
- Noi dung hien thi cho nguoi dung phai 100% tieng Viet.
- Kiem tra nhanh trang thai loading, empty, error cua cac man hinh bi anh huong.
- Ra soat token UI (mau, spacing, typo) theo src/theme/ui.ts.

5. Tong hop ket qua
- Danh dau Pass/Fail cho tung muc da test.
- Neu fail, ghi ro man hinh, buoc tai hien, ket qua mong doi, ket qua thuc te.

## Diem Quyet Dinh
- Neu thay doi nho va khong cham navigation: co the rut gon smoke test con Home + man hinh bi anh huong.
- Neu thay doi cham RootStackParamList: bat buoc test lai toan bo nhom man hinh co route lien quan.
- Neu build APK cho QA: uu tien smoke test tren file BanDoc-latest.apk.

## Tieu Chi Hoan Thanh
- Lint/test khong co loi moi.
- Luong man hinh chinh va Translator qua smoke test.
- Khong co crash hoac loi dieu huong trong cac man da test.
- Noi dung UI dat yeu cau 100% tieng Viet.

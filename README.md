# MODULUX FE

Dự án Frontend cho hệ thống **Modulux Homes**, được xây dựng bằng các công nghệ hiện đại nhằm mang lại trải nghiệm người dùng tốt nhất.

## Công nghệ sử dụng
- **Framework:** Vue 3
- **Build Tool:** Vite
- **Styling:** Tailwind CSS 4
- **State Management:** Pinia
- **Routing:** Vue Router
- **HTTP Client:** Axios

## Hướng dẫn cài đặt và chạy dự án

### Yêu cầu hệ thống
- **Node.js**: Phiên bản 18.x hoặc mới hơn.
- Trình quản lý gói: `npm` (gợi ý) hoặc `yarn`, `pnpm`.

### Các bước thực hiện

**1. Clone dự án và di chuyển vào thư mục:**
Cài đặt mã nguồn về máy và chuyển đến thư mục chứa Frontend.

**2. Cài đặt các thư viện phụ thuộc (Dependencies):**
Mở terminal tại thư mục gốc của dự án (`MODULUX_FE`) và chạy lệnh:
```bash
npm install
```

**3. Cấu hình biến môi trường:**
Tạo file `.env` dựa trên file `.env.example` (nếu có) hoặc điền các thông tin API cần thiết (Ví dụ: `VITE_API_BASE_URL`). Bạn có thể tham khảo `.env.production` nếu có.

**4. Chạy dự án ở chế độ phát triển (Development):**
```bash
npm run dev
```
Sau khi chạy thành công, project thường sẽ khởi chạy tại `http://localhost:5173`.

**5. Build dự án để đưa lên môi trường thật (Production):**
```bash
npm run build
```
Lệnh này sẽ tạo ra thư mục `dist/` chứa mã nguồn đã tối ưu dùng để deploy.

**6. Xem trước bản Build (Preview):**
```bash
npm run preview
```
Dùng để chạy thử phiên bản đã build ở máy tính nội bộ.

---
_Lưu ý: Luôn đảm bảo bạn đã khởi chạy Backend (MODULUX_BE) tương ứng để các chức năng gọi API hoạt động trơn tru._

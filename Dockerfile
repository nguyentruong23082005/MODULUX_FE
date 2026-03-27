# ===== TẦNG 1: BIÊN DỊCH ỨNG DỤNG =====
FROM node:20-alpine AS build-stage

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép file cấu hình packages trước (để tăng tốc bộ nhớ đệm cache của Docker)
COPY package*.json ./

# Cài đặt thư viện phụ thuộc (phải dùng npm ci nếu có package-lock.json)
RUN npm install

# Copy toàn bộ mã nguồn frontend vào Image
COPY . .

# Tiến hành Build dự án Vue.js ra thư mục dạng Static Files (HTML/CSS/JS thuần)
RUN npm run build

# ===== TẦNG 2: TRIỂN KHAI VỚI NGINX =====
FROM nginx:alpine AS production-stage

# Loại bỏ các file trang mặc định của Web server nginx
RUN rm -rf /usr/share/nginx/html/*

# Lấy bản build đã đóng gói từ Tầng 1 (build-stage) nhét vào Nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Ghi đè file cấu hình nginx (Giải quyết lỗi NotFound 404 trang khi F5 trên Vue Router)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Cho phép cổng 80 được lắng nghe
EXPOSE 80

# Chạy ngầm tiến trình bảo vệ host NGINX
CMD ["nginx", "-g", "daemon off;"]

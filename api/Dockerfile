# 1. Sử dụng môi trường Node.js
FROM node:18-slim

# 2. Tạo thư mục làm việc trong container
WORKDIR /usr/src/app

# 3. Copy file quản lý thư viện vào trước
COPY package*.json ./

# 4. Cài đặt các thư viện (express, cors...)
RUN npm install

# 5. Copy toàn bộ mã nguồn server vào
COPY . .

# 6. Mở cổng 5000
EXPOSE 5000

# 7. Lệnh khởi chạy server
CMD ["node", "server.js"]
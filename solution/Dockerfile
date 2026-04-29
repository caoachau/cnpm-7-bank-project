# 1. Sử dụng Nginx để chạy web tĩnh
FROM nginx:alpine

# 2. Copy toàn bộ giao diện (HTML, JS, CSS) vào thư mục của Nginx
COPY . /usr/share/nginx/html

# 3. Mở cổng 80 bên trong container
EXPOSE 80

# (Cổng 80 này sau đó sẽ được map ra cổng 3000 ở bước sau)
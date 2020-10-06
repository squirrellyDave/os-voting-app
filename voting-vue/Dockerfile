FROM node:alpine as builder
WORKDIR '/app'
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.17
COPY ./nginx.conf /etc/nginx/nginx.conf
WORKDIR /code
COPY --from=builder /app/dist . 
EXPOSE 8080:8080
CMD ["nginx", "-g", "daemon off;"]
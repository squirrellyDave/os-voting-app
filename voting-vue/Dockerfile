# Create a 'builder' container to compile the application
FROM node:alpine as builder
WORKDIR '/app'
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Create a 'production' container using nginx to serve the application
FROM nginx:1.17
# Copy the special nginx configuration file for Openshift into the container
COPY ./nginx.conf /etc/nginx/nginx.conf
WORKDIR /code
# Copy over the compiled application from the 'builder' container
COPY --from=builder /app/dist . 
COPY entrypoint.sh ./
EXPOSE 8080:8080
#CMD ["nginx", "-g", "daemon off;"]
CMD ["entrypoint.sh"]
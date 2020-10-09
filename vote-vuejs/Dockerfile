# Create a 'builder' container to compile the application
FROM node:alpine as builder
WORKDIR '/app'
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Create a 'production' container using nginx to serve the application
FROM nginx:1.17
# Copy the nginx configuration file for Openshift into the container
COPY ./nginx.conf /etc/nginx/nginx.conf
# Copy over startup shell script
COPY ./entrypoint.sh /
# Set execution rights for the startup shell script inside the running container
RUN chmod +x /entrypoint.sh
# Copy over the compiled application from the 'builder' container
COPY --from=builder /app/dist /usr/share/nginx/html
# For the startup shell script to work correctly set the rights to create and update files
RUN chmod -R 777 /usr/share/nginx/html
# Expose a container port to access its' service
EXPOSE 8080:8080
# Call the startup shell script and inside of that file start nginx in the last step
ENTRYPOINT ["/entrypoint.sh"]
#CMD ["nginx", "-g", "daemon off;"]
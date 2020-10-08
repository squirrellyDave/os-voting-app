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
#COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Copy over startup shell script
COPY ./entrypoint.sh /
RUN chmod +rwx /entrypoint.sh

# Copy over the compiled application from the 'builder' container
#WORKDIR /code
#COPY --from=builder /app/dist ./
COPY --from=builder /app/dist /usr/share/nginx/html

# Setting the rights for the WORKDIR ('/code') and all files inside and also all subdirs and files
# This is necessary for the entrypoint.sh script to write temporary files and update existing ones
#RUN chmod -R 777 ./
EXPOSE 8080:8080
#CMD ["nginx", "-g", "daemon off;"]
# Call the startup shell script
ENTRYPOINT ["/entrypoint.sh"]
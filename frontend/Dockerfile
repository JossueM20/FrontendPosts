FROM node:18 as builder
WORKDIR /proyecto
COPY ./package.json /proyecto
#RUN npm config set proxy http://172.17.33.10:3128
#RUN npm config set https-proxy http://172.17.33.10:3128
RUN npm install 
COPY ./ /proyecto
RUN npm run build
#2.-
FROM nginx
COPY --from=builder /proyecto/dist/frontend /usr/share/nginx/html

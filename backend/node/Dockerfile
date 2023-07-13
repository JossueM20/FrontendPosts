FROM node:18
WORKDIR /proyecto
COPY ./package.json ./
#RUN npm config set proxy http://172.17.33.10:3128
#RUN npm config set https-proxy http://172.17.33.10:3128
RUN npm install
RUN npm install -g @angular/cli && npm cache clean 
COPY ./ ./
CMD ["node","index.js"]

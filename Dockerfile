FROM node:11
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM ubuntu:16.04
RUN apt-get update && \    
    apt-get -y install \
    apache2 && apt-get -y install \
    vim &&
COPY ./apache/ports.conf /etc/apache2/
RUN service apache2 restart
COPY --from=0 /usr/src/app/build /var/www/html
EXPOSE 3000
CMD /usr/sbin/apache2ctl -D FOREGROUND

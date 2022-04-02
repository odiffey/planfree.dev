FROM node:10

RUN apt-get update
RUN apt-get install nginx -y

RUN mkdir -p /app
WORKDIR /app
COPY . /app/

RUN npm install

RUN chmod u+x /app/bootstrap.sh

CMD bash /app/bootstrap.sh
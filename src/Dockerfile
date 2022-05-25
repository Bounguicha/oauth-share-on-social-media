FROM node:alpine

WORKDIR /home/api
RUN apk update && apk add bash

COPY . .

EXPOSE 80
ENTRYPOINT ["yarn", "start"]

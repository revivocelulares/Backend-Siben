FROM node:18-alpine

RUN apk update && apk upgrade && \
    apk add --no-cache git

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY ./api/package.json /usr/src/app/

RUN npm install --production && npm cache clean --force

COPY ./api/ /usr/src/app

ENV NODE_ENV production
ENV PORT 3005
EXPOSE 80

CMD [ "npm", "start" ]


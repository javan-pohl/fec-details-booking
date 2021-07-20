FROM node:10.23.0

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

RUN yarn install

EXPOSE 3002

CMD [ "npm", "start"]
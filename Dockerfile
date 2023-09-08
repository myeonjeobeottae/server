FROM node:18

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn install --immutable --immutable-cache --check-cache

COPY . .

RUN yarn build

EXPOSE 3000

CMD [ "yarn","start" ]
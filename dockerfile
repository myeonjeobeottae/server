FROM node:18

WORKDIR /app

COPY package* yarn.lock 

COPY . .

RUN yarn install --immutable --immutable-cache --check-cache

RUN yarn build

EXPOSE 3000

CMD [ "yarn","start" ]
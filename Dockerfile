FROM node:14-alpine

WORKDIR /app

COPY . .

RUN yarn

# RUN yarn build

CMD ["node", "index.js" ]
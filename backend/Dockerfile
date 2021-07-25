FROM node:16-alpine

WORKDIR /app

COPY package.json .

RUN yarn

COPY . .

EXPOSE 3000

ENV PORT=5000

CMD ["yarn","start"]
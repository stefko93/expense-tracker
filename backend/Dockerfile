FROM node:16-alpine

WORKDIR /app

COPY package.json .

RUN yarn

COPY . .

EXPOSE 3000

ENV PORT=5000

ENV MONGO_URL=mongodb://host.docker.internal:27017/expense-tracker

CMD ["yarn","start"]
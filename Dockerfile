ARG NODE_VERSION=18.19.0

FROM node:${NODE_VERSION}-alpine as build-stage

COPY . /app
WORKDIR /app

# 建立生產版本
RUN npm run build

# 暴露的連接埠
EXPOSE 3000

# 啟動應用程式
CMD ["node", ".output/server/index.mjs"]
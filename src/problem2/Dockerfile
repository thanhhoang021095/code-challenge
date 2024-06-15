FROM node:20 as builder

RUN corepack enable

WORKDIR /app/frontend

ARG BOT_PRIVATE_TOKEN=${BOT_PRIVATE_TOKEN}
COPY .npmrc /app/frontend/.npmrc
COPY package.json /app/frontend/package.json
COPY pnpm-lock.yaml /app/frontend/pnpm-lock.yaml

RUN  pnpm install

COPY . /app/frontend

ARG ENV

RUN pnpm build:${ENV}

FROM nginx:alpine
ARG SERVICE
WORKDIR /app/
EXPOSE 80
# COPY utils/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/frontend/dist /app/html
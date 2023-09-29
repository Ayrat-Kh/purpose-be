FROM node:20-alpine AS development

RUN npm i -g pnpm
WORKDIR /app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN pnpm install

COPY ./prisma/ ./prisma/
COPY tsconfig*.json ./
COPY ./src ./src

RUN pnpm prisma generate
RUN pnpm run build

FROM development AS production

WORKDIR /app

#COPY ./.env ./
COPY ./prisma/* ./prisma/
COPY package.json ./
COPY start.sh ./
RUN chmod +x /app/start.sh
COPY pnpm-lock.yaml ./
RUN pnpm install

COPY --from=development /app/dist/ ./dist/

EXPOSE 3000

CMD [ "./start.sh" ]

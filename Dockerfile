# Stage 1: Install production dependencies
FROM node:16-alpine as builder

WORKDIR /app

COPY package.json package-lock.json /app/
RUN npm i -g typescript && npm install

FROM node:16-alpine as compiler

WORKDIR /app

COPY --from=builder /app /app
COPY . /app
RUN npm run build

FROM gcr.io/distroless/nodejs16-debian11

WORKDIR /app

COPY --from=compiler /app /app

EXPOSE 3000

CMD [ "node", "dist/main.js" ]
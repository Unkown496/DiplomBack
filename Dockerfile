FROM oven/bun

WORKDIR /app

COPY package.json .
COPY bun.lockb .

RUN bun install
RUN npm i sqlite3 --save

COPY src src
COPY database.db .
COPY tsconfig.json .
# COPY public public


CMD ["bun", "run dev"]

EXPOSE 3000

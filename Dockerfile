FROM oven/bun

WORKDIR /app

COPY package.json .
COPY bun.lockb .

RUN bun install

COPY src src
COPY database.db .
COPY tsconfig.json .
# COPY public public


CMD ["bun", "run dev"]

EXPOSE 3000

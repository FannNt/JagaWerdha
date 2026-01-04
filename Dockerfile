FROM oven/bun:1-slim

WORKDIR /app

COPY package.json bun.lockb* ./
RUN bun install

COPY . .
RUN bunx prisma generate

CMD ["bun", "dev"]

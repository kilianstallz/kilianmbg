# Build stage
FROM oven/bun:1 AS builder
WORKDIR /usr/src/app

# Install dependencies first (cache via copying lockfiles)
COPY package.json package-lock.json* bun.lock* ./
RUN bun install --frozen-lockfile

# Copy rest of the source and build
COPY . .

ENV NODE_ENV=production
ENV BUN_ENV=production
RUN bun run build

# Production stage
FROM lipanski/docker-static-website:latest AS runner

# Copy built site from builder into /srv (document root used below)
COPY --from=builder /usr/src/app/dist /srv

EXPOSE 80
CMD ["/busybox-httpd", "-f", "-v", "-p", "80", "-h", "/srv"]

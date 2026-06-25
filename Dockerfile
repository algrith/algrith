# Install dependencies only when needed
FROM node:22-alpine AS installer

WORKDIR /app

# Install libc6-compat for Next.js + SWC
RUN apk add --no-cache libc6-compat

# Install dependencies (include package-lock.json or yarn.lock)
COPY package.json package-lock.json* yarn.lock* ./
RUN npm ci --prefer-offline --no-audit


# Rebuild the source code only when needed
FROM node:22-alpine AS builder

WORKDIR /app
COPY --from=installer /app/node_modules ./node_modules
COPY . .

# Build the Next.js app
RUN npm run build


# Production image with minimal size
FROM node:22-alpine AS runner

ENV NODE_ENV=production

WORKDIR /app

# Install Nginx
RUN apk add --no-cache nginx

COPY --from=builder /app/ecosystem.config.js ./ecosystem.config.js
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/entrypoint.sh ./entrypoint.sh
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/socket ./socket
COPY --from=builder /app/public ./public
COPY --from=builder /app/utils ./utils
COPY --from=builder /app/types ./types
COPY --from=builder /app/libs ./libs

# Copy Nginx config
COPY nginx.conf /etc/nginx/http.d/default.conf

RUN chmod +x /app/entrypoint.sh

EXPOSE 8080

CMD ["/app/entrypoint.sh"]
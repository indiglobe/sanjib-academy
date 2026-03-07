# ------------------------------------
# ---------- Stage 1: Build ----------
# ------------------------------------
FROM node:lts-alpine3.22 AS builder

WORKDIR /app

# Copy package files first for caching
COPY package.json pnpm-lock.yaml ./

# Install pnpm and all dependencies (dev + prod)
RUN npm install -g pnpm
RUN pnpm install

# Copy source code
COPY . .

# Declare build args (secrets for prerender)
ARG BETTER_AUTH_SECRET
ARG BETTER_AUTH_URL
ARG CLOUDINARY_API_KEY
ARG CLOUDINARY_API_SECRET
ARG DATABASE_URL
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET
ARG JWT_ENCRYPTION_KEY
ARG RAZOR_PAY_KEY
ARG RAZOR_PAY_SECRET
ARG VITE_RAZOR_PAY_KEY
ARG VITE_APP_HOST

# Set temporary ENV for build (not persisted in final image)
ENV \
  BETTER_AUTH_SECRET=$BETTER_AUTH_SECRET \
  BETTER_AUTH_URL=$BETTER_AUTH_URL \
  CLOUDINARY_API_KEY=$CLOUDINARY_API_KEY \
  CLOUDINARY_API_SECRET=$CLOUDINARY_API_SECRET \
  DATABASE_URL=$DATABASE_URL \
  GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID \
  GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET \
  JWT_ENCRYPTION_KEY=$JWT_ENCRYPTION_KEY \
  RAZOR_PAY_KEY=$RAZOR_PAY_KEY \
  RAZOR_PAY_SECRET=$RAZOR_PAY_SECRET \
  VITE_RAZOR_PAY_KEY=$VITE_RAZOR_PAY_KEY \
  VITE_APP_HOST=$VITE_APP_HOST 

# Build app (uses build-time ENV)
RUN pnpm build

# -----------------------------------------
# ---------- Stage 2: Production ----------
# -----------------------------------------
FROM node:lts-alpine3.22 AS runner

WORKDIR /app

# Install pnpm (needed to serve)
RUN npm install -g pnpm

# Copy only prod dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod

# Copy built output from builder
COPY --from=builder /app/dist ./dist

EXPOSE 3000

ENTRYPOINT ["node","dist/server/index.mjs"]

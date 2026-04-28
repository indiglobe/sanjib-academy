# ------------------------------------
# ---------- Stage 1: Build ----------
# ------------------------------------
FROM node:lts-alpine3.22 AS builder

WORKDIR /app

# Copy package files first for caching
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/campus/package.json ./apps/web/campus/package.json
COPY apps/web/socket/package.json ./apps/web/socket/package.json
COPY packages/env/package.json ./packages/env/package.json
COPY packages/data/package.json ./packages/data/package.json
COPY packages/utils/package.json ./packages/utils/package.json
COPY packages/local-assets/package.json ./packages/local-assets/package.json

# Install pnpm and all dependencies (dev + prod)
RUN corepack enable
RUN pnpm install

# Copy source code
COPY . .

# Declare build args (secrets for prerender)
ARG BETTER_AUTH_SECRET
ARG CAMPUS_BETTER_AUTH_URL
ARG STORAGE_BETTER_AUTH_URL
ARG CLOUDINARY_API_KEY
ARG CLOUDINARY_API_SECRET
ARG CLOUDINARY_CLOUD_NAME
ARG DATABASE_URL
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET
ARG JWT_ENCRYPTION_KEY
ARG RAZOR_PAY_KEY
ARG RAZOR_PAY_SECRET
ARG VITE_RAZOR_PAY_KEY
ARG VITE_CAMPUS_APP_HOST

# Set temporary ENV for build (not persisted in final image)
ENV \
  BETTER_AUTH_SECRET=$BETTER_AUTH_SECRET \
  CAMPUS_BETTER_AUTH_URL=$CAMPUS_BETTER_AUTH_URL \
  STORAGE_BETTER_AUTH_URL=$STORAGE_BETTER_AUTH_URL \
  CLOUDINARY_API_KEY=$CLOUDINARY_API_KEY \
  CLOUDINARY_API_SECRET=$CLOUDINARY_API_SECRET \
  CLOUDINARY_CLOUD_NAME=$CLOUDINARY_CLOUD_NAME \
  DATABASE_URL=$DATABASE_URL \
  GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID \
  GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET \
  JWT_ENCRYPTION_KEY=$JWT_ENCRYPTION_KEY \
  RAZOR_PAY_KEY=$RAZOR_PAY_KEY \
  RAZOR_PAY_SECRET=$RAZOR_PAY_SECRET \
  VITE_RAZOR_PAY_KEY=$VITE_RAZOR_PAY_KEY \
  VITE_CAMPUS_APP_HOST=$VITE_CAMPUS_APP_HOST 

# build local workspace dependencies first
RUN pnpm build \
  --filter @repo/env \
  --filter @repo/data \
  --filter @repo/local-assets \
  --filter @repo/utils

# re-install to add local workspace dependencies files to projects
RUN pnpm install --frozen-lockfile

# Build app (uses build-time ENV)
RUN pnpm build --filter campus



# -----------------------------------------
# ---------- Stage 2: Production ----------
# -----------------------------------------
FROM node:lts-alpine3.22 AS runner

WORKDIR /app

# Install pnpm (needed to serve)
RUN corepack enable

# Copy only package.json
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/campus/package.json ./apps/web/campus/package.json
COPY apps/web/socket/package.json ./apps/web/socket/package.json
COPY packages/env/package.json ./packages/env/package.json
COPY packages/data/package.json ./packages/data/package.json
COPY packages/utils/package.json ./packages/utils/package.json
COPY packages/local-assets/package.json ./packages/local-assets/package.json

# Copy built output from builder
COPY --from=builder /app/apps/web/campus/dist ./apps/web/campus/dist
# COPY --from=builder /app/apps/web/socket/dist ./apps/web/socket/dist
COPY --from=builder /app/packages/env/dist ./packages/env/dist
COPY --from=builder /app/packages/data/dist ./packages/data/dist
COPY --from=builder /app/packages/utils/dist ./packages/utils/dist
# COPY --from=builder /app/packages/local-assets/dist ./packages/local-assets/dist

# # install prod deps
RUN pnpm install --prod

EXPOSE 3000

ENTRYPOINT ["node","apps/web/campus/dist/server/index.mjs"]

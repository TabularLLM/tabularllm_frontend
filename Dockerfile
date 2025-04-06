FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ../
RUN npm ci

# Copy the rest of the app
COPY . .

# Generate Prisma client
RUN cd /app/src && npx prisma generate

# Build the Next.js app
RUN npm run build

# Production image
FROM node:20-alpine AS runner

WORKDIR /app

# Copy built assets and dependencies from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/src ./src
COPY --from=builder /app/package.json ./package.json

# Expose the port Next.js runs on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "run", "start"]

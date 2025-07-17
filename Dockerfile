# Use official Bun image
FROM oven/bun:1.1.13 as base

# Set working directory
WORKDIR /app

# Copy package and lock files
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --production

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on (change if needed)
EXPOSE 3000

# Start the server
CMD ["bun", "src/server.ts"]

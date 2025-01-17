# Use the official Node.js image as the base
FROM node:18-alpine AS builder

ARG NEXT_PUBLIC_APP_URL
ARG NEXTAUTH_SECRET
ARG NEXTAUTH_URL
ARG AUTH_URL

ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL  \
  NEXTAUTH_SECRET=$NEXTAUTH_SECRET  \
  NEXTAUTH_URL=$NEXTAUTH_URL  \
  AUTH_URL=$AUTH_URL

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Build the Next.js app
RUN npm run build

# Remove dev dependencies to optimize the final image
RUN npm prune --production

# Use a lightweight Node.js runtime for the final image
FROM node:18-alpine

# Set the working directory for the final image
WORKDIR /app

# Copy the built app and necessary files from the builder stage
COPY --from=builder /app ./

# Expose the port the app will run on
EXPOSE 8080

# Start the Next.js app
CMD ["npm", "start"]
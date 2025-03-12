# Stage 1: Build the React Vite app
FROM node:23-alpine AS builder
WORKDIR /app

# Accept environment variables as build arguments
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Pass environment variables to the build
RUN echo "VITE_SUPABASE_URL=$VITE_SUPABASE_URL" >> .env
RUN echo "VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY" >> .env

# Build the Vite project
RUN npm run build

# Stage 2: Serve the built files using Nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Copy built files from the previous stage
COPY --from=builder /app/dist .

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

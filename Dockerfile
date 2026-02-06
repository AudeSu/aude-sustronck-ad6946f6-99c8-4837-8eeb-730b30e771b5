# Build Stage
FROM node:22-alpine AS build
RUN mkdir /app
WORKDIR /app

# Install dependencies
COPY backend/package.json backend/package-lock.json backend/tsconfig.json backend/tsconfig.build.json backend/.env backend/testSequencer.js ./backend/
RUN cd backend && npm install

# Copy source files
COPY backend/src backend/src/
COPY backend/test backend/test/

# Build the application
RUN cd backend && npm run build

# Runtime Stage
FROM node:22-alpine AS runtime
WORKDIR /app

# Copy only necessary files from build stage
COPY --from=build /app/backend/node_modules /app/node_modules
COPY --from=build /app/backend/dist /app/dist
COPY backend/package.json backend/package-lock.json backend/tsconfig.json backend/tsconfig.build.json backend/.env backend/testSequencer.js ./
COPY backend/src src/
COPY backend/test test/

# Expose port 80
EXPOSE 80

# Command to run the application
CMD ["node", "dist/src/main.js"]

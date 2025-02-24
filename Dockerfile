# Use Node.js 20 Alpine
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies (including devDependencies)
RUN npm install 

# Copy the rest of the project files
COPY . .

# Expose Vite's default port
EXPOSE 5173

# Start Vite dev server
CMD ["npm", "run", "dev"]

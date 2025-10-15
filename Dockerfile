# Use Node.js official image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Start the server
CMD ["node", "server.js"]

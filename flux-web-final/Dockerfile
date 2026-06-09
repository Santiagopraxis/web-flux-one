FROM node:20-alpine

WORKDIR /app

# Copy package definition
COPY package.json ./

# Install dependencies if they ever get added (currently none)
# RUN npm install --production

# Copy all static content and server files
COPY . .

# Expose port 3000 as configured in server.js
EXPOSE 3000

# Start node server
CMD ["node", "server.js"]

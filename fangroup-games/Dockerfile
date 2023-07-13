# Base image
FROM node:18-alpine

# Define the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Next.js application
# RUN npm run build

# Expose the port that the Next.js application listens on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "run", "dev"]
# Use the Node.js image to build and run the application
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port the dev server runs on
EXPOSE 3000

# Set the command to start the development server
CMD ["npm", "run", "start"]

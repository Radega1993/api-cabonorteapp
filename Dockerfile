FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files separately for caching
COPY package.json package-lock.json ./

# Install app dependencies
RUN npm ci --only=production

# Bundle app source
COPY . .

#Expose the port
EXPOSE 3006

CMD [ "node", "index.js" ]
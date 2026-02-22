FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
COPY apps/worker/package.json apps/worker/package.json
RUN npm install
COPY . .
RUN npm run -w @cyx/worker build
CMD ["node","apps/worker/dist/index.js"]

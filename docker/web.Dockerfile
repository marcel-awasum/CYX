FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
COPY apps/web/package.json apps/web/package.json
RUN npm install
COPY . .
RUN npm run -w @cyx/web build
CMD ["npm","run","-w","@cyx/web","start"]

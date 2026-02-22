FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
COPY apps/api/package.json apps/api/package.json
COPY packages/shared/package.json packages/shared/package.json
RUN npm install
COPY . .
RUN npm run -w @cyx/shared build && npm run -w @cyx/api build
CMD ["npm","run","-w","@cyx/api","start"]

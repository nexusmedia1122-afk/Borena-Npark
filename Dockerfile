FROM node:18-alpine

WORKDIR /app

# install build deps
COPY package.json package-lock.json* ./
RUN npm install --silent --no-audit --no-fund || npm install --silent

# copy sources
COPY . .

# build
RUN npm run build

# serve with a small static server
RUN npm install -g serve@14

EXPOSE 5000
CMD ["serve", "-s", "dist", "-l", "5000"]

FROM node:20.11.1-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV HOST=0.0.0.0
ENV PORT=3000

EXPOSE 3000

# По умолчанию запускать build/start, но можно переопределить в docker-compose
CMD ["npm", "run", "dev"]

# FROM node:20.11.1-alpine

# WORKDIR /app

# COPY package*.json ./

# RUN npm install

# COPY . .

# RUN npm run build

# ENV HOST=0.0.0.0
# ENV PORT=3000

# EXPOSE 3000

# CMD ["npm", "run", "start"] 
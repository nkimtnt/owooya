FROM node:14

WORKDIR /Users/kimvayne/Desktop/showandprove/owooya

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD [ "node", "dist/main.js" ]


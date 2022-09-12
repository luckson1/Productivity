FROM node
WORKDIR /app
COPY package.json .
RUN npm i && npm cache clean --force
COPY . .
EXPOSE 3000
CMD [ "npm", "run", "start"] 

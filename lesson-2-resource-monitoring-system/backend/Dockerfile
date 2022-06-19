# pull the Node.js Docker image
FROM node:14-alpine3.15

# create the directory inside the container
WORKDIR /usr/src/app

# copy the package.json files from local machine to the workdir in container
COPY package*.json ./

# run npm install in our local machine
RUN npm ci

# copy the generated modules and all other files to the container
COPY . .

EXPOSE 3000

# the command that starts our app
CMD ["npm", "run", "start:dev" ]
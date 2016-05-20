FROM node:latest

MAINTAINER Bill Dan

# Usage: ADD [source directory or URL] [destination directory]
#ADD . /root/shortly-deploy
run git clone https://github.com/billramsey/shortly-deploy.git /root/shortly-deploy


EXPOSE 4568

WORKDIR /root/shortly-deploy

RUN npm install --ignore-scripts --unsafe-perm

CMD [ "npm", "start" ]
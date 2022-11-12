FROM node:16

WORKDIR /usr/src/app
COPY . .

RUN npm install
RUN npm install -g @angular/cli
RUN npm install -g http-server

CMD ng build && http-server -p 80 -P http://chatapialb-env.eba-gmfkmzma.eu-west-2.elasticbeanstalk.com/ -c-1 dist/web-chat
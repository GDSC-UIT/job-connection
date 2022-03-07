FROM node:16.14

WORKDIR /jc
COPY package.json /jc
COPY yarn.lock /jc
RUN yarn

COPY . /jc
CMD yarn dev

EXPOSE 3000
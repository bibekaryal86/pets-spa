# STAGE 1: BUILD #
FROM node:22-alpine as build
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN npm install --production
COPY . /usr/src/app/
RUN npm run docker-build

# STAGE 2: PRODUCTION DEPLOYMENT #
FROM nginx:1.27.3-alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

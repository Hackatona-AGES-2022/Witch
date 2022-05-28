FROM node:14.7 as build

WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM node:14.7 as production

ENV NODE_ENV=production
ENV DATABASE_HOST=us-cdbr-east-05.cleardb.net
ENV DATABASE_PORT=3306
ENV DATABASE_USER=ba475365ea9017
ENV DATABASE_PASSWORD=1b7208ae
ENV DATABASE_NAME=heroku_1f5ce035fe9d198


ENV PORT=80
ENV DEVELOPMENT_MODE=false
ENV GOOGLE_API_KEY=
ENV FACEBOOK_APP_ID=
ENV FACEBOOK_APP_SECRET=

WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY --from=build /app/dist ./dist
COPY --from=build /app/src/db/init.sql ./dist/src/db/init.sql
CMD npm run start:prod

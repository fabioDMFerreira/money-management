# Stage 1
FROM node:10 AS react-build
WORKDIR /app
COPY package*.json ./
COPY . ./
RUN npm install --only=production
RUN npm run build

# Stage 2 - the production environment
FROM nginx:1.17.8
COPY default.conf.template /etc/nginx/conf.d/default.conf.template
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=react-build /app/build /usr/share/nginx/html
ENV PORT=${PORT:-80}
CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'


FROM nginx:1.19-alpine
RUN rm  /usr/share/nginx/html/*
COPY ./default.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
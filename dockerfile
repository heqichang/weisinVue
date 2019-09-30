FROM nginx:alpine

COPY ./dist /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/web.conf

RUN rm /etc/nginx/conf.d/default.conf\
    && apk update && apk add curl bash tree tzdata \
    && cp -r -f /usr/share/zoneinfo/Hongkong /etc/localtime \
    && echo -ne "Alpine Linux 3.4 image. (`uname -rsv`)\n" >> /root/.built


CMD ["nginx", "-g", "daemon off;"]
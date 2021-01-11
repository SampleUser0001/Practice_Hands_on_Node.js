FROM node:14.15.4

WORKDIR /app

COPY app /app
COPY start.sh /start.sh

RUN chmod 755 /start.sh

CMD [ "/start.sh" ]

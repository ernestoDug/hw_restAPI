# скачай
FROM node
# створи таку папку 
WORKDIR /REST_API
# скопіюй в паку всі файли
COPY . .
# встанови всі пакети
RUN npm install
# порт
EXPOSE 3000
# команда запуску
CMD ["node", "REST_API"]
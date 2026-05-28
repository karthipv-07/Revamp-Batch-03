FROM node:20
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3003
ENTRYPOINT ["node"]
CMD ["server.js", "development"]


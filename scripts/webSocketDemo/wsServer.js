/* eslint-disable @typescript-eslint/explicit-function-return-type */
const WebSocketServer = require("websocket").server;
const faker = require("faker");
const http = require("http");

const server = http.createServer();
server.listen(9898, function() {
    console.log((new Date()) + " Server is listening on port 9898");
});

const wsServer = new WebSocketServer({
    httpServer: server
});

wsServer.on("request", function(request) {
    const connection = request.accept(null, request.origin);

    setInterval(() => {
        const newBooks = [
            generateRandomBook(),
            generateRandomBook(),
            generateRandomBook()
        ];
        console.log("Send new books to the client: ", newBooks);
        connection.sendUTF(JSON.stringify(newBooks));
    }, 5000);

    connection.on("message", function(message) {
      console.log("Received Message:", message.utf8Data);
      connection.sendUTF("Hi this is WebSocket server!");
    });

    connection.on("close", function(reasonCode, description) {
        console.log("Client has disconnected.");
    });
});

const generateRandomBook = () => (
    {
        id: faker.random.uuid(), 
        author: faker.name.findName(),
        name: faker.random.words(),
        price: faker.commerce.price(),
    }
);
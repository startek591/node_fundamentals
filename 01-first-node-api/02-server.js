const http = require('http');

const port = process.env.PORT || 1337;

const server = http.createServer(function (req, res) {
    // Telling client that the data expecting to be json object
    res.setHeader('Content-Type', 'application/json')

    // Sending back a JSON-stringify object
    res.end(JSON.stringify({ text: 'hi', numbers: [1, 2, 3]}))
})

server.listen(port);
console.log(`Server listening on port ${port}`);
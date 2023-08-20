// loads the core module http and stores it into a variable
const http = require('http');

// setting the env variable on PORT 1337
const port = process.env.PORT || 1337;

const server = http.createServer(function (req, res) {
    res.end('hi');
});

// server object is listening on port 1337
server.listen(port);
console.log(`Server listening on port ${port}`);

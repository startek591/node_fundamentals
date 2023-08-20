// Create web server on port 8080
// send back a response hello world!
require('http')
    .createServer((req, res) => res.end('hello world!'))
    .listen(8080)
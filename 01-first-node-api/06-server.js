const fs = require('fs');

// Drop in replacement of http module
// Built routing module
const express = require('express');

const port = process.env.PORT || 1337;

const app = express();

app.get('/', respondText);
app.get('/json', respondJson);
app.get('/echo', respondEcho);
app.get('/static/*', respondStatic);

app.listen(port, () => console.log(`Server listening on port ${port}`));

function respondText(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.end('hi');
}

function respondJson(req, res) {
  // res.json automatically send the correct Content-Type
  res.json({ text: 'hi', numbers: [1, 2, 3] });
}

function respondEcho(req, res) {
  const { input = '' } = req.query;

  res.json({
    normal: input,
    shouty: input.toUpperCase(),
    characterCount: input.length,
    backwards: input.split('').reverse().join(''),
  });
}

function respondStatic(req, res) {
  const filename = `${__dirname}/public/${req.params[0]}`;
  fs.createReadStream(filename)
    .on('error', () => respondNotFound(req, res))
    .pipe(res);
}

function respondNotFound(req, res) {
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
}

/* this file is being used to serve the files from /dist folder. It is being used by heroku */
var port = process.env.PORT || 8080;

var express = require('express');
var serveStatic = require('serve-static');
var compression = require('compression');

// Application setup.
var CACHE_DURATION = 0;
var DOCUMENT_ROOT = __dirname + '/build';

/*
 * start server
 */
var app = express();

// server gzip
app.use(compression());

// static with cache headers
app.use(serveStatic(DOCUMENT_ROOT, { maxAge: CACHE_DURATION, cacheControl: true }));

console.log('server is now starting on port ', port);
app.listen(port);

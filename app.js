var express = require('express');
var app = express();
const port = process.env.PORT || 3000;

app.use(express.static('.'))
app.listen(port);
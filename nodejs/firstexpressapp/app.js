const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use('/writesomething', (req, res, next) => {
    res.send('<form action="/dealwithtext" method="POST"><input type="text" name="written"><button type="submit">Write something</button></form>');
});

app.post('/dealwithtext', (req, res, next) => {
    console.log(req.body.written);
    res.redirect('/');
})

app.use('/saymore',(req, res, next) => {
    res.send('<h1>More info</h1>')
});

app.use('/',(req, res, next) => {
    res.send('<h2>Basic info</h2>')
});

app.listen(3000);








/* const http = require('http');

const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log('In middleware!');
    next();
});

app.use((req, res, next) => {
    console.log('In Prague');
    res.send('<h1>Halo! Halo!</h1>')
});

const server = http.createServer(app);

server.listen(3000); */
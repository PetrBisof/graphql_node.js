const http = require('http');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    if(url==='/'){
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<header><title>Mz first</title></header>');
        res.write('<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        res.end();}
    else if(url==='/list'){
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<header><title>Mz first</title></header>');
        res.write('<body>');
        res.write('<ul>');
        res.write('<li>Pepa</li>');
        res.write('<li>Jarda</li>');
        res.write('<li>Venca</li>');
        res.write('</ul>');
        res.write('</body>');
        res.write('</html>');
        res.end();}
    else if(url==='/create-user' && method==='POST'){
        const body = [];
            req.on('data', (chunk) => {
                console.log(chunk);
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const username = parsedBody.split('=')[1];
            console.log(username);
        })
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }

});

server.listen(3000);